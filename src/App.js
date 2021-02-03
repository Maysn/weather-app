import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
    const [location, setLocation] = useState({});
    const [weather, setWeather] = useState();

    useEffect(() => {
      const myKey = 'df35fbdda85415498def473162c912f8b4edac30e599f6d0eb4e9025';
      fetch(`https://api.ipdata.co?api-key=${myKey}`)
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

    const weatherDesc= weather? weather.weather[0].main : '';
    
    return (
      <div className={weatherDesc.toLowerCase() === 'clear' ? 'container clear' : 
                      weatherDesc.toLowerCase() === 'clouds' ? 'container cloudy' : 
                      weatherDesc.toLowerCase() === 'rain' ? 'container rainy' : 
                      weatherDesc.toLowerCase() === 'snow' ? 'container snow' : ''}>
        <div>
         <div>
            <h1>{weather? weather.name: "Loading..."}</h1>
            <h1>{weather? `${Math.round(weather.main.temp - 273.15)}°` : "Loading..."}</h1>
         </div>
         <div>
            <h1>{weather? `${weatherDesc.toUpperCase()}.. STAY HOME!`: "Loading..."}</h1>
         </div>
        </div>
      </div>
        
  );
}

export default App;
