import React from "react";
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

  const flattenedCitiesList = citiesList?.reduce(
    (acc, currItem) => [
      ...acc,
      ...currItem.cities.map((city) => ({
        city: city,
        country: currItem.country,
      })),
    ],
    []
  );
  console.log(flattenedCitiesList);
  return (
    <div>
      <input
        type="text"
        placeholder="Type your city"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button>search</button>
      {searchQuery
        ? flattenedCitiesList
            .filter((item) =>
              item.city.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .map((item) => (
              <div className="search_result">{`${item.city}, ${item.country}`}</div>
            ))
        : ""}
    </div>
  );
}

export default SearchBar;
