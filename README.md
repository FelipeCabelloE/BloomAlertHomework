# BloomAlertHomework

A Bloom Alert Homework repository

## timeseries_dataset.csv

**timestamp** (TIMESTAMP): Estampa horaria que representa el dato (UTC-0).

**variable** (STRING): Id de la variable medida.

**organization** (STRING): organización a la que corresponde el dato.

**value** (FLOAT): valor medido de la variable en la estampa horaria.

**ingestion_time** (TIMESTAMP): Estampa horaria que representa día en que se ingesto el dato a las bases de datos internas de Bloom Alert.

## organization_and_zones_dataset.csv
**organization** (STRING): organización a la que corresponde el dato.

**zone_id** (INTEGER): id único de una zona.

**polygon_decoded** (STRING): Este campo es especial, ya que si bien es un STRING, corresponde a un arreglo de puntos geográficos que dan origen a un polígono en el espacio. 

### note
Se adjunta un ejemplo (example_polygon.json) de la zone "caldera" transformada al formato que admite esta página https://geojson.io/#map=3.5/-31.79/-73.47 para visualizar polígonos en el territorio.


