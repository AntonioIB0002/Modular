import os
import pickle
import numpy as np
import pandas as pd
from sklearn.neural_network import MLPClassifier
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics import confusion_matrix, accuracy_score
from sklearn.model_selection import train_test_split


class TextClassifier:
    def __init__(self):
        self.vectorizer = None
        self.model = None
        self.X = []
        self.y = []

    def load_data(self, filepath):
        """Carga los datos desde un archivo CSV."""
        data = pd.read_csv(filepath)
        self.X = data["texto"].values
        self.y = data["label"].values

    def train(self):
        """Entrena el modelo con los datos cargados."""
        # Convertir texto a representaciones TF-IDF
        self.vectorizer = TfidfVectorizer(max_features=1000)
        X_tfidf = self.vectorizer.fit_transform(self.X)

        # Dividir los datos en entrenamiento y prueba
        X_train, X_test, y_train, y_test = train_test_split(X_tfidf, self.y, test_size=0.2, random_state=42)

        # Crear y entrenar el modelo
        self.model = MLPClassifier(hidden_layer_sizes=(6,), max_iter=1000, random_state=42)
        self.model.fit(X_train, y_train)

        # Evaluar el modelo
        y_pred = self.model.predict(X_test)
        conf_matrix = confusion_matrix(y_test, y_pred)
        print("Matriz de Confusión:")
        print(conf_matrix)
        print("Precisión del modelo:", accuracy_score(y_test, y_pred))

        # Guardar el modelo y el vectorizador
        self.save_model()

    def classify(self, text):
        """Clasifica un texto ingresado por el usuario."""
        text_transformed = self.vectorizer.transform([text])
        prediction = self.model.predict(text_transformed)[0]
        return "Comentario" if prediction == 1 else "Incidente"

    def save_model(self):
        """Guarda el modelo y el vectorizador en archivos."""
        with open("modelo.pkl", "wb") as model_file:
            pickle.dump(self.model, model_file)
        with open("vectorizer.pkl", "wb") as vectorizer_file:
            pickle.dump(self.vectorizer, vectorizer_file)

    def load_model(self):
        """Carga un modelo previamente entrenado."""
        with open("Servidor\\modelo.pkl", "rb") as model_file:
            self.model = pickle.load(model_file)
        with open("Servidor\\vectorizer.pkl", "rb") as vectorizer_file:
            self.vectorizer = pickle.load(vectorizer_file)


# if __name__ == "__main__":
#     classifier = TextClassifier()
#     # filepath = "data_entrenamiento.xlsx"
#     classifier.load_model()
#     """  if os.path.exists(filepath):
#         classifier.load_data(filepath)
#         classifier.train()
#     else:
#          print("El archivo no existe.") """
    
#     text = input("Introduce un texto para clasificar: ")
#     print("El texto es clasificado como:", classifier.classify(text))

    

