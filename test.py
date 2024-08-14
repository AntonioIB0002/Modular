from sqlalchemy import create_engine, text


DATABASE_URL = "postgresql://us6aywspjna2d7hootm9:dssa41xvbdHEOwrc6TML@bwtfeqqk9qwynx1mgqxi-postgresql.services.clever-cloud.com:7195/bwtfeqqk9qwynx1mgqxi"
engine = create_engine(DATABASE_URL)

with engine.connect() as connection:
    # Convertir la cadena SQL en un objeto text
    result = connection.execute(text("SELECT version();"))
    for row in result:
        print(row)

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