import { useContext, useLayoutEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

import { PlacesContext } from "../context";
import { Loading } from "./";

export const MapView = () => {
  const { isLoading, userLocation } = useContext(PlacesContext);
  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading && mapDiv.current) {
      new mapboxgl.Map({
        container: mapDiv.current,
        style: "mapbox://styles/mapbox/streets-v12", // style URL
        center: [-74.5, 40], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
    }
  }, [isLoading]);

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
    >
      {userLocation?.join(",")}
    </div>
  );
};
