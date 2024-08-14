from transformers import pipeline
import pandas as pd

from sqlalchemy import create_engine, text


DATABASE_URL = "postgresql://us6aywspjna2d7hootm9:dssa41xvbdHEOwrc6TML@bwtfeqqk9qwynx1mgqxi-postgresql.services.clever-cloud.com:7195/bwtfeqqk9qwynx1mgqxi"
engine = create_engine(DATABASE_URL)
try:
    with engine.connect() as connection:
        result = connection.execute(text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"))
        print("Tablas en el esquema público:")
        for row in result:
            print(row.table_name)
    print("Consulta ejecutada con éxito")
except Exception as e:
    print(f"Error al ejecutar la consulta: {e}")

# # Ruta al archivo Excel de entrada
# file_path = "C:/Users/AIBARRA/Downloads/Copia de datos en crudo.xlsx"

# # Leer el archivo Excel
# df = pd.read_excel(file_path)

# # Extraer el texto de la columna 'Review Text'
# review_text_column = df['Review Text']

# # Inicializar los pipelines para análisis de sentimiento
# sentiment_pipeline = pipeline("sentiment-analysis", model="nlptown/bert-base-multilingual-uncased-sentiment")
# resena = pipeline('sentiment-analysis')

# # Listas para almacenar resultados
# lista_gpt = []
# lista_internet = []

# # Iterar sobre cada comentario
# for comentario in review_text_column:
#     if pd.isna(comentario):
#         resultado_gpt = "INDIFERENTE"
#         resultado_internet = "INDIFERENTE"
#     else:
#         resultado_gpt = sentiment_pipeline(str(comentario))
#         resultado_gpt = resultado_gpt[0]['label']
#         resultado_internet = resena(str(comentario))
#         resultado_internet = resultado_internet[0]['label']

#     lista_gpt.append(resultado_gpt)
#     lista_internet.append(resultado_internet)

# # Agregar columnas al DataFrame con los resultados
# df['Percepcion Internet'] = lista_internet
# df['Percepcion gpt'] = lista_gpt
# # Ruta donde deseas guardar el archivo Excel de salida
# output_file = "C:/Users/AIBARRA/Documents/Modular/resultados.xlsx"

# # Guardar el DataFrame en un archivo Excel
# df.to_excel(output_file, index=False)

# print(f"DataFrame guardado en {output_file}")
