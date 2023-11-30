import type { Map } from "mapbox-gl";
import { MapState } from "./MapProvider";

type MapAction = {
  type: "setMap";
  payload: Map;
};

export function mapReducer(state: MapState, action: MapAction): MapState {
  switch (action.type) {
    default:
      return state;
  }
}
