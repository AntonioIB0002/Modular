from transformers import pipeline
import pandas as pd

# Ruta al archivo Excel de entrada
file_path = "C:/Users/AIBARRA/Downloads/Copia de datos en crudo.xlsx"

# Leer el archivo Excel
df = pd.read_excel(file_path)

# Extraer el texto de la columna 'Review Text'
review_text_column = df['Review Text']

# Inicializar los pipelines para análisis de sentimiento
sentiment_pipeline = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")
resena = pipeline('sentiment-analysis')

# Listas para almacenar resultados
lista_gpt = []
lista_internet = []

# Iterar sobre cada comentario
for comentario in review_text_column:
    if pd.isna(comentario):
        resultado_gpt = "INDIFERENTE"
        resultado_internet = "INDIFERENTE"
    else:
        resultado_gpt = sentiment_pipeline(str(comentario))
        resultado_gpt = resultado_gpt[0]['label']
        resultado_internet = resena(str(comentario))
        resultado_internet = resultado_internet[0]['label']

    lista_gpt.append(resultado_gpt)
    lista_internet.append(resultado_internet)

# Agregar columnas al DataFrame con los resultados
df['Percepcion Internet'] = lista_internet
df['Percepcion gpt'] = lista_gpt
# Ruta donde deseas guardar el archivo Excel de salida
output_file = "C:/Users/AIBARRA/Documents/Modular/resultados.xlsx"

# Guardar el DataFrame en un archivo Excel
df.to_excel(output_file, index=False)

print(f"DataFrame guardado en {output_file}")
