import { useCallback, useContext, useEffect, useReducer } from "react";
import { Marker, Popup, type Map } from "mapbox-gl";

import { MapContext } from "./MapContext";
import { mapReducer } from "./MapReducer";
import { PlacesContext } from "..";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE: MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
};

export const MapProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(mapReducer, INITIAL_STATE);
  const { places } = useContext(PlacesContext);

  useEffect(() => {
    if (!state.map) return;

    state.markers.forEach((marker) => marker.remove());
    const newMarkers: Marker[] = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
        <h6>${place.text_es}</h6>
        <p>${place.place_name_es}</p>
      `);

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(state.map);

      newMarkers.push(newMarker);
    }

    // TODO: clear polylines

    dispatch({
      type: "setMarkers",
      payload: newMarkers,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

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
