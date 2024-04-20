import { useState, useRef, useEffect } from "react";
import {
  GoogleMap,
  useLoadScript,
  Polygon
} from "@react-google-maps/api";

const Map = ({ polygonData }) => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchLngLat, setSearchLngLat] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Parse polygon data and calculate the center
  useEffect(() => {
    if (polygonData && polygonData.length > 0) {
      let minX = Infinity;
      let minY = Infinity;
      let maxX = -Infinity;
      let maxY = -Infinity;
  
      polygonData.forEach(pathData =>
        pathData.split('|').forEach(point => {
          const [lng, lat] = point.split(',').map(parseFloat);
          minX = Math.min(minX, lng);
          minY = Math.min(minY, lat);
          maxX = Math.max(maxX, lng);
          maxY = Math.max(maxY, lat);
        })
      );
  
      const centerLat = (minY + maxY) / 2;
      const centerLng = (minX + maxX) / 2;
  
      setMapCenter({ lat: centerLat, lng: centerLng });
      setIsLoading(false); // Set isLoading to false once data is loaded
    }
  }, [polygonData]);


  // laod script for google map
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  if (!isLoaded) return <div>Loading....</div>;

  // static lat and lng
  // Define map options
  const mapOptions = {
    center: mapCenter,
    zoom: 10,
    mapTypeId: 'satellite', // Set map type to satellite
  };

  // on map load
  const onMapLoad = (map) => {
    const controlDiv = document.createElement("div");
    const controlUI = document.createElement("div");

    controlUI.style.backgroundColor = "white";
    controlUI.style.color = "black";
    controlUI.style.border = "2px solid #ccc";
    controlUI.style.borderRadius = "3px";
    controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
    controlUI.style.cursor = "pointer";
    controlUI.style.marginBottom = "22px";
    controlUI.style.textAlign = "center";
    controlUI.style.width = "100%";
    controlUI.style.padding = "8px 0";

    controlDiv.appendChild(controlUI);

    // const centerControl = new window.google.maps.ControlPosition(
    //   window.google.maps.ControlPosition.TOP_CENTER,
    //   0,
    //   10
    // );


  };
  if (isLoading) return <div>Loading...</div>;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >

      <GoogleMap

        mapContainerClassName="map"
        mapContainerStyle={{ width: "80%", height: "600px", margin: "auto" }}
        onLoad={onMapLoad}
        center={mapOptions.center}
        zoom={mapOptions.zoom}
        mapTypeId={mapOptions.mapTypeId}
      >
        {polygonData.map((pathData, index) => (
            <Polygon
              key={index}
              paths={pathData.split('|').map(point => {
                const [lng, lat] = point.split(',').map(parseFloat);
                return { lat, lng };
              })}
              options={{
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
              }}
            />
          ))}

      </GoogleMap>
    </div>
  );
};

export default Map;