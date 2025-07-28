import pandas as pd
import numpy as np
import requests
from PIL import Image
from io import BytesIO
from sklearn.model_selection import train_test_split
from tensorflow.keras.models import Model, load_model
from tensorflow.keras.layers import Input, Conv2D, MaxPooling2D, Flatten, Dense, Dropout, BatchNormalization
from tensorflow.keras.preprocessing.image import img_to_array
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from tensorflow.keras.optimizers import Adam
import os

class PostureModel:
    def __init__(self, model_path='posture_model.h5'):
        self.model_path = model_path
        self.model = None
        self.input_shape = (64, 64, 3)
        
    def download_and_resize(self, url, size=(64, 64)):
        """Download and preprocess image from URL"""
        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
            img = Image.open(BytesIO(response.content)).convert('RGB')
            img = img.resize(size)
            return img_to_array(img) / 255.0
        except Exception as e:
            print(f"Image error for {url}: {e}")
            return None
    
    def preprocess_image(self, image_array, size=(64, 64)):
        """Preprocess image array for model prediction"""
        if isinstance(image_array, np.ndarray):
            # Convert to PIL Image first
            if image_array.max() <= 1.0:
                image_array = (image_array * 255).astype(np.uint8)
            img = Image.fromarray(image_array)
            img = img.resize(size)
            return img_to_array(img) / 255.0
        return None
    
    def load_data(self, csv_path):
        """Load and preprocess data from CSV"""
        df = pd.read_csv(csv_path)
        
        images, labels = [], []
        
        print(f"Loading {len(df)} samples...")
        
        for i, row in df.iterrows():
            if i % 100 == 0:
                print(f"Processing image {i+1}/{len(df)}")
            
            # Download and preprocess image
            img = self.download_and_resize(row['file_url'])
            
            # Get label - try different column names
            label = None
            for col in ['overall_posture', 'overall posture', 'posture_score']:
                if col in row and pd.notna(row[col]):
                    label = row[col]
                    break
            
            if img is not None and label is not None:
                images.append(img)
                # Convert label to binary (0 for bad posture, 1 for good posture)
                labels.append(int(float(label)))
        
        print(f"Successfully loaded {len(images)} images")
        return np.array(images), np.array(labels)
    
    def build_model(self):
        """Build CNN model for posture classification"""
        image_input = Input(shape=self.input_shape)
        
        # First Conv Block
        x = Conv2D(32, (3, 3), activation='relu', padding='same')(image_input)
        x = BatchNormalization()(x)
        x = MaxPooling2D((2, 2))(x)
        x = Dropout(0.25)(x)
        
        # Second Conv Block
        x = Conv2D(64, (3, 3), activation='relu', padding='same')(x)
        x = BatchNormalization()(x)
        x = MaxPooling2D((2, 2))(x)
        x = Dropout(0.25)(x)
        
        # Third Conv Block
        x = Conv2D(128, (3, 3), activation='relu', padding='same')(x)
        x = BatchNormalization()(x)
        x = MaxPooling2D((2, 2))(x)
        x = Dropout(0.25)(x)
        
        # Dense layers
        x = Flatten()(x)
        x = Dense(128, activation='relu')(x)
        x = Dropout(0.5)(x)
        x = Dense(64, activation='relu')(x)
        x = Dropout(0.5)(x)
        
        # Output layer
        output = Dense(1, activation='sigmoid')(x)
        
        model = Model(inputs=image_input, outputs=output)
        
        # Compile model
        model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='binary_crossentropy',
            metrics=['accuracy']
        )
        
        return model
    
    def train(self, csv_path, validation_split=0.2, epochs=50, batch_size=32):
        """Train the posture classification model"""
        # Load data
        X, y = self.load_data(csv_path)
        
        if len(X) == 0:
            raise ValueError("No valid images loaded from CSV")
        
        # Split data
        X_train, X_val, y_train, y_val = train_test_split(
            X, y, test_size=validation_split, random_state=42, stratify=y
        )
        
        print(f"Training samples: {len(X_train)}")
        print(f"Validation samples: {len(X_val)}")
        print(f"Good posture samples: {np.sum(y_train)}")
        print(f"Bad posture samples: {len(y_train) - np.sum(y_train)}")
        
        # Build model
        self.model = self.build_model()
        self.model.summary()
        
        # Callbacks
        callbacks = [
            EarlyStopping(patience=10, restore_best_weights=True),
            ModelCheckpoint(self.model_path, save_best_only=True, monitor='val_accuracy')
        ]
        
        # Train model
        history = self.model.fit(
            X_train, y_train,
            validation_data=(X_val, y_val),
            epochs=epochs,
            batch_size=batch_size,
            callbacks=callbacks,
            verbose=1
        )
        
        # Save model
        self.model.save(self.model_path)
        print(f"Model saved to {self.model_path}")
        
        return history
    
    def load_model(self):
        """Load trained model"""
        if os.path.exists(self.model_path):
            self.model = load_model(self.model_path)
            print(f"Model loaded from {self.model_path}")
        else:
            raise FileNotFoundError(f"Model file {self.model_path} not found")
    
    def predict(self, image_array):
        """Predict posture quality from image"""
        if self.model is None:
            self.load_model()
        
        # Preprocess image
        processed_img = self.preprocess_image(image_array)
        if processed_img is None:
            return None
        
        # Add batch dimension
        img_batch = np.expand_dims(processed_img, axis=0)
        
        # Make prediction
        prediction = self.model.predict(img_batch, verbose=0)[0][0]
        
        return {
            'probability': float(prediction),
            'binary_prediction': int(prediction > 0.5),
            'posture_quality': 'Good' if prediction > 0.5 else 'Poor',
            'confidence': float(abs(prediction - 0.5) * 2)  # Distance from 0.5, scaled to 0-1
        }

# Usage example
if __name__ == "__main__":
    # Initialize model
    posture_model = PostureModel()
    
    # Train model (uncomment to train)
    # history = posture_model.train('your_posture_data.csv')
    
    # Load pre-trained model for inference
    # posture_model.load_model()
    
    # Make prediction on new image
    # result = posture_model.predict(your_image_array)
    # print(result)