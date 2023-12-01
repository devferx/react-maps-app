import axios from "axios";

const searchApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5/mapbox.places",
  params: {
    limit: 5,
    language: "es",
    access_token: import.meta.env.VITE_APP_MAPBOX_API_KEY,
  },
});

export default searchApi;
