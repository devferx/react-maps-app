import { PlacesProvider } from "./context";

import { HomePage } from "./pages/HomePage";

export const MapsApp = () => {
  return (
    <PlacesProvider>
      <HomePage />
    </PlacesProvider>
  );
};
