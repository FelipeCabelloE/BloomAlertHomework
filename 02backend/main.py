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


async def get_timeseries_subset_bytimestamp(db_conn, variable, organization, start_time, end_time):
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

async def get_timeseries_subset(db_conn, variable, organization):
    query = """
        SELECT value, timestamp
        FROM timeseries_dataset
        WHERE variable = ?
          AND organization = ?
        ORDER BY timestamp;
    """
    
    result = db_conn.execute(query, [variable, 
                                     organization]).fetchdf()
    return result




@app.get('/timeseriesdata/{organization}/{variable}')
async def timeseries_data(organization: str, variable:str):
    db = duckdb.connect()

    db.execute(f"IMPORT DATABASE '{file_path}'")
    df = await get_timeseries_subset(db, variable, organization)
    df = df.dropna()

    db.close()
    data = df[['timestamp', 'value']].to_dict('records')
    formatted_data = [{'date': str(record['timestamp'].date()), 'value': round(record['value'],3)} for record in data]

    return formatted_data


@app.get('/organizationdata/{organization}')
async def organization_metrics(organization: str):
        db = duckdb.connect()

        db.execute(f"IMPORT DATABASE '{file_path}'")
        df = db.execute("""
        SELECT *
        FROM companies
        WHERE organization = ?
        """, [organization]).fetchdf()

        db.close()
        
        return {column_name : df[column_name].values.tolist() for column_name in df.columns.tolist()}