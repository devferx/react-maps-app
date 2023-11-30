import { createContext } from "react";
import type { Map } from "mapbox-gl";

export interface MapContextProps {
  isMapReady: boolean;
  map?: Map;
}

export const MapContext = createContext({} as MapContextProps);
