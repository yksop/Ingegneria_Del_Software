import pandas as pd
from pymongo import MongoClient             # pip install pandas pymongo
from dotenv import load_dotenv
import os
import re
import utm                    # pip install utm 


# path of .env file
env_path = os.path.join('backend/', '.env')

# Carica le variabili di ambiente dal file .env
load_dotenv(dotenv_path=env_path)

# Recupera la stringa di connessione da una variabile di ambiente
mongo_connection_string = os.getenv('DB_CONNECT')

# Se non è stata definita la variabile di ambiente, esci
if not mongo_connection_string:
    print("Stringa di connessione a MongoDB non definita.")
    exit(1)


# Nome del database e della collezione
mongo_db_name = 'test'
mongo_collection_name = 'clinics'

# Connessione a MongoDB
try:
    client = MongoClient(mongo_connection_string)
    db = client[mongo_db_name]
    collection = db[mongo_collection_name]
    print("Connessione riuscita")
except Exception as e:
    print(f"Errore di connessione: {e}")
    exit(1)

# Read csv file
csv_file_path = 'openDataLoader/data/ambulatori.csv'

df = pd.read_csv(csv_file_path, sep=';')  # Assicurati di usare il separatore corretto

# Funzione per estrarre le coordinate dalla colonna WKT
def extract_coordinates(wkt):
    match = re.match(r'POINT \(([^ ]+) ([^ ]+)\)', wkt)
    if match:
        return float(match.group(1)), float(match.group(2))
    return None, None

# Estrazione e stampa dei dati
data = []
for index, row in df.iterrows():
    lat, lon = extract_coordinates(row['WKT'])
    # Conversione delle coordinate da UTM a latitudine e longitudine
    lat, lon = utm.to_latlon(lat, lon, 32, 'T')
    record = {
        'latitudine': lat,
        'longitudine': lon,
        'civico_num': row['civico_num'],
        'civico_let': row['civico_let'],
        'civico_alf': row['civico_alf'],
        'desvia': row['desvia'],
        'strada': row['strada'],
        'fumetto': row['fumetto']
    }
    data.append(record)
    print("Latitudine: ", lat, "Longitudine: ", lon, "Civico: ", row['civico_num'], row['civico_let'], row['civico_alf'], "Descrizione via: ", row['desvia'], "Strada: ", row['strada'], "Fumetto: ", row['fumetto'] )

# Inserimento dei dati in MongoDB
try:
    collection.insert_many(data)
    print(f'Inseriti {len(data)} documenti in MongoDB nella collezione "{mongo_collection_name}".')
except Exception as e:
    print(f"Errore durante l'inserimento dei dati: {e}")

