import { useContext, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { PlacesContext } from "../context";
import { SearchResults } from "./";

export const SearchBar = () => {
  const { searchPlacesByTerm } = useContext(PlacesContext);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 350);

  useEffect(() => {
    searchPlacesByTerm(debouncedSearchValue);
  }, [debouncedSearchValue, searchPlacesByTerm]);

  return (
    <div className="search-container">
      <input
        type="text"
        className="form-control"
        placeholder="Buscar lugar..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <SearchResults />
    </div>
  );
};
