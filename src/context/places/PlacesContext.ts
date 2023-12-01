import { createContext } from "react";

import { Places } from "../../interfaces/Places";

export interface PlacesContextProps {
  isLoading: boolean;
  userLocation?: [number, number];

  searchPlacesByTerm: (query: string) => Promise<Places | undefined>;
}

export const PlacesContext = createContext({} as PlacesContextProps);
