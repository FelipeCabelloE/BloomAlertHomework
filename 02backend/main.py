from fastapi import FastAPI
import pandas as pd
import duckdb
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

import os
# Get the current working directory
cwd = os.getcwd()

# Construct the desired file path
file_path = os.path.join(cwd, '..', '01data','interim', 'mydb.db')



app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_timeseries_subset(db_conn, variable, organization, start_time, end_time):
    query = """
        SELECT value, timestamp
        FROM timeseries_dataset
        WHERE variable = ?
          AND organization = ?
          AND timestamp BETWEEN ? AND ?
        ORDER BY timestamp;
    """
    
    result = db_conn.execute(query, [variable, 
                                     organization, 
                                     start_time, 
                                     end_time]).fetchdf()
    return result




@app.get('/')
def read_root():
    db = duckdb.connect()

    db.execute(f"IMPORT DATABASE '{file_path}'")
    df = get_timeseries_subset(db, 'CHL-01', 'adasa', datetime(2023, 12, 1),datetime(2024, 12, 1))
    df = df.dropna()

    db.close()
    return {'data':df['timestamp'].values.tolist()}


@app.get('/edt')
def notas():
    return {'promedio de notas':'7.0'}