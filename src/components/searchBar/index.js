import React, { useEffect } from "react";
import { useState } from "react";

function SearchBar({ citiesList }) {
  // const cities = [
  //   "Cairo",
  //   "Msh-Cairo",
  //   "Alex",
  //   "Msh-Alex",
  //   "Luxor",
  //   "Msh-Luxor",
  //   "Giza",
  //   "Msh-Giza",
  //   "Sharkeya",
  //   "Mo7e-Mo7e-Mo7e-Mo7e-EL-Sharkawy",
  //   "Monofeya",
  //   "Monofeya-msh-bakhel",
  // ];
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const result = citiesList?.filter((item) =>
      item.city.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResult(result);
  }, [searchQuery, citiesList]);

  console.log({ searchResult, citiesList });
  return (
    <div>
      <input
        type="text"
        placeholder="Type your city"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button>search</button>
      {searchResult
        ? searchResult.map((item) => (
            <div className="search_result">{`${item.city}, ${item.country}`}</div>
          ))
        : ""}
    </div>
  );
}

export default SearchBar;
