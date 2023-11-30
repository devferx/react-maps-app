import { MapProvider, PlacesProvider } from "./context";
import { HomePage } from "./pages/HomePage";

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <MapProvider>
        <HomePage />
      </MapProvider>
    </PlacesProvider>
  );
};
