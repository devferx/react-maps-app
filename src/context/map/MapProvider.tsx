import { useCallback, useReducer } from "react";
import { Marker, type Map, Popup } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
};

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);

  const setMap = useCallback(
    (map: Map) => {
      const myLocationPopup = new Popup().setHTML(`
      <h4>Aquí estoy</h4>
      <p>En algún lugar del mundo</p>
      `);

      new Marker({
        color: "#5859DF",
      })
        .setLngLat(map.getCenter())
        .setPopup(myLocationPopup)
        .addTo(map);
      dispatch({
        type: "setMap",
        payload: map,
      });
    },
    [dispatch]
  );

  return (
    <MapContext.Provider
      value={{
        ...state,

        setMap,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};
