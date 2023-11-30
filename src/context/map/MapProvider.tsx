import { useCallback, useReducer } from "react";
import type { Map } from "mapbox-gl";

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
