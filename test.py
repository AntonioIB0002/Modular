# from sqlalchemy import create_engine, text


# DATABASE_URL = "postgresql://us6aywspjna2d7hootm9:dssa41xvbdHEOwrc6TML@bwtfeqqk9qwynx1mgqxi-postgresql.services.clever-cloud.com:7195/bwtfeqqk9qwynx1mgqxi"
# engine = create_engine(DATABASE_URL)

# with engine.connect() as connection:
#     # Convertir la cadena SQL en un objeto text
#     result = connection.execute(text("SELECT version();"))
#     for row in result:
#         print(row)
import psycopg2
from psycopg2 import sql

# Parámetros de conexión
conn_params = {
    'dbname': 'bnkdry4qf8veynczig3o',
    'user': 'u63sroyguduv22w4kjgz',
    'password': 'ij8UD7BiR9jOdqsmBHgR',
    'host': 'bnkdry4qf8veynczig3o-postgresql.services.clever-cloud.com',  # o la dirección IP de tu servidor
    'port': '7197'        # Puerto por defecto de PostgreSQL
}

try:
    # Conexión a la base de datos
    conn = psycopg2.connect(**conn_params)
    cursor = conn.cursor()

    # Consulta para obtener todas las tablas en el esquema 'public'
    cursor.execute(sql.SQL(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';"
    ))

    # Mostrar las tablas encontradas
    tables = cursor.fetchall()
    print("Tablas en el esquema 'public':")
    for table in tables:
        print(table[0])

except Exception as e:
    print(f"Error al conectar a la base de datos: {e}")

finally:
    # Cerrar la conexión
    if conn:
        cursor.close()
        conn.close()

# from pymongo.mongo_client import MongoClient
# from pymongo.server_api import ServerApi
# uri = "mongodb+srv://antonio:admin@cluster0.mzp1p9z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
# # Create a new client and connect to the server
# client = MongoClient(uri, server_api=ServerApi('1'))
# # Send a ping to confirm a successful connection
# try:
#     client.admin.command('ping')
#     print("Pinged your deployment. You successfully connected to MongoDB!")
# except Exception as e:
#     print(e)