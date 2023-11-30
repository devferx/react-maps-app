import React from "react";
import ReactDOM from "react-dom/client";
import mapboxgl from "mapbox-gl"; // or "const mapboxgl = require('mapbox-gl');"

import { MapsApp } from "./MapsApp.tsx";
import "./index.css";
import "mapbox-gl/dist/mapbox-gl.css";

if (!navigator.geolocation) {
  window.alert("Tu navegador no soporta geolocalización");
  throw new Error("Tu navegador no soporta geolocalización");
}

mapboxgl.accessToken = import.meta.env.VITE_APP_MAPBOX_API_KEY;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
