import { useEffect, useReducer } from "react";

import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./placesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import { Places } from "../../interfaces/Places";

export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
};

export const PlacesProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  useEffect(() => {
    getUserLocation().then((lngLat) =>
      dispatch({
        type: "setUserLocation",
        payload: lngLat,
      })
    );
  }, []);

  const searchPlacesByTerm = async (query: string) => {
    if (query.length === 0) return;
    if (!state.userLocation) throw new Error("No hay ubicación del usuario");

    const resp = await searchApi.get<Places>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(","),
      },
    });

    console.log(resp.data);
    return resp.data;
  };

  return (
    <PlacesContext.Provider
      value={{
        ...state,
        searchPlacesByTerm,
      }}
    >
      {children}
    </PlacesContext.Provider>
  );
};
