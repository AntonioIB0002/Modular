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
