from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline
import pandas as pd
import json
from adaline import TextClassifier
app = Flask(__name__)
CORS(app)
classifier = TextClassifier()
classifier.load_model()
# Inicializar el pipeline de análisis de sentimiento
resena = pipeline('sentiment-analysis', model="nlptown/bert-base-multilingual-uncased-sentiment")
def singlecomment(comentario):
    resultado = []
    if comentario == "":
        resultado.append("INDIFERENTE")
        resultado.append("Sin Analsis")
    else:
        res = resena(str(comentario))
        resultado.append(res[0]['label'])

        resultado.append(classifier.classify(str(comentario)))
        print(resultado)
        print(resultado[0])
        print(resultado[1])
    return resultado
def sentimentAnalyst(data):
    # Convertir JSON a DataFrame
    df = pd.DataFrame(data)

    # Asegurarse de que la columna 'Review Text' existe
    if 'Review Text' not in df.columns:
        return {'error': 'La columna "Review Text" no se encuentra en el JSON.'}

    # Extraer el texto de la columna 'Review Text'
    review_text_column = df['Review Text']

    # Listas para almacenar resultados
    lista_internet = []
    lista_incidencia = []

    # Iterar sobre cada comentario
    for comentario in review_text_column:
        if str(comentario) == "":
            resultado_internet = "INDIFERENTE"
            resultado_incidencia = "Sin Analisis"
        else:
            resultado_internet = resena(str(comentario))
            resultado_internet = resultado_internet[0]['label']
            resultado_incidencia = classifier.classify(str(comentario))
        lista_internet.append(resultado_internet)
        lista_incidencia.append(resultado_incidencia)

    # Agregar la columna de resultados al DataFrame
    df['Analisis del texto'] = lista_internet
    df['Comentario-Incidencia'] = lista_incidencia
    # Convertir el DataFrame a un JSON
    result_json = df.to_dict(orient='records')

    return result_json

@app.route('/analizarExcel', methods=['POST'])
def analyze_sentiment():
    if not request.is_json:
        return jsonify({'error': 'Formato de solicitud no válido. Se requiere JSON.'}), 400

    data = request.get_json()

    try:
        result_json = sentimentAnalyst(data)
        return jsonify(result_json)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route('/analizarcomentario', methods=['POST'])
def analyze_single_comment():
    try:
        comment = request.data.decode('utf-8')  # Leer el cuerpo de la solicitud como string
        if not comment:
            return jsonify({'error': 'No se proporcionó un comentario válido.'}), 400

        result = singlecomment(comment)
        return jsonify({'result': result})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
if __name__ == '__main__':
    app.run(port=3000, debug=True)
