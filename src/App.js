import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
    const [location, setLocation] = useState({});
    const [weather, setWeather] = useState();

    useEffect(() => {
      fetch("http://ip-api.com/json/")
        .then(y => y.json())
        .then(data => setLocation(data));
    },[]);

    useEffect(() => { async function getWeather(city){
      if (location && location.city) {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1c2d09630b095c17f9c51ac1302665f9`)
      const responseJson = await response.json();
      setWeather(responseJson);
      }
    }
        getWeather(location.city);
    },[location])
    console.log(weather);
    return (
      <div>
        <h1>{weather? `${Math.round(weather.main.temp - 273.15)}°` : "Loading..."}</h1>
        <h2>{weather? `IT'S ${weather.weather[0].main.toUpperCase()}.. STAY HOME!`: "Loading..."}</h2>
        <h3>{weather? weather.name: "Loading..."}</h3>
      </div>
  );
}

export default App;
