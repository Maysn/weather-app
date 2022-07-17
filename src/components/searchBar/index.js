import React from "react";
import { useState } from "react";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import { FaSearch } from "react-icons/fa";

function SearchBar({ setWeather, location }) {
  const [searchQuery, setSearchQuery] = useState("");

  const findWeather = async (requiredCity) => {
    const fetchWeather = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${requiredCity}&appid=fe4a3c1a83213dc5022ec42fcfc14d53`
    );
    const weatherJson = await fetchWeather.json();

    if (weatherJson.message === "city not found") {
      alert("Invalid city name!");
      setSearchQuery("");
      return findWeather(location.city);
    }
    setWeather(weatherJson);
  };

  const handleEnterPress = (e) => {
    if (!searchQuery) {
      return;
    }
    if (e.key === "Enter") {
      findWeather(searchQuery);
    }
  };
  const handleSearch = () => {
    if (!searchQuery) {
      return;
    }
    findWeather(searchQuery);
  };

  const ariaLabel = { "aria-label": "description" };

  return (
    <div className="searchbar">
      <Input
        sx={{
          color: "#DCDCDC",
          "&::after": {
            borderBottom: "2px solid #DCDCDC",
          },
        }}
        className="Input"
        placeholder="Type required city"
        inputProps={ariaLabel}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleEnterPress}
      />
      <Button
        sx={{
          minWidth: 45,
          color: "#DCDCDC",
          borderColor: "#DCDCDC",
          "&:hover": {
            color: "white",
            borderColor: "white",
          },
        }}
        onClick={() => handleSearch()}
        variant="outlined"
      >
        <FaSearch />
      </Button>
    </div>
  );
}

export default SearchBar;
