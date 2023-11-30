import React from "react";
import ReactDOM from "react-dom/client";

import { MapsApp } from "./MapsApp.tsx";
import "./index.css";

if (!navigator.geolocation) {
  window.alert("Tu navegador no soporta geolocalización");
  throw new Error("Tu navegador no soporta geolocalización");
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
