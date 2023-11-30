import { useContext, useLayoutEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import { MapContext, PlacesContext } from "../context";
import { Loading } from "./";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading && mapDiv.current) {
      const map = new mapboxgl.Map({
        container: mapDiv.current,
        // style: "mapbox://styles/mapbox/light-v10",
        style: "mapbox://styles/mapbox/dark-v10", // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 16, // starting zoom
      });

      setMap(map);
    }
  }, [isLoading, userLocation, setMap]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div
      ref={mapDiv}
      style={{
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    ></div>
  );
};
