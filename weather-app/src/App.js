import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import WeatherIcon from './WeatherIcon';
import './App.css';
import './LocationForm.css';
import './weather-info.css';

function App() {
  const [weatherData, setWeatherData] = useState(null); 
  const [location, setLocation] = useState(''); 

  
  const getWeatherData = async (latitude, longitude) => {
    const weatherApiKey = '8b52dccdb3101bf24ac7a32088872473b90af43eb90a240ea94cabcc3cd71363';

    try {
      const response = await axios.get(`https://api.ambeedata.com/weather/latest/by-lat-lng?lat=${latitude}&lng=${longitude}&units=si`, {
        headers: {
          'x-api-key': weatherApiKey,
          'Accept-Language': 'en' // In future can change language
        }
      });

      const weatherData = response.data.data;
      console.log(weatherData); // Verify data

      setWeatherData(weatherData); // Update state
    } catch (error) {
      console.log(error);
    }
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // GeoCoding API
    const geocodingApiKey = '70670cb58ce54377bd3ab626e9e53701';
    const geocodingUrl = `https://api.opencagedata.com/geocode/v1/json?key=${geocodingApiKey}&q=${encodeURIComponent(location)}`;

    try {
      const geocodingResponse = await axios.get(geocodingUrl);
      const results = geocodingResponse.data.results;

      if (results.length > 0) {
        const { lat, lng } = results[0].geometry;

        console.log(lat, lng); // Verify data

        setLocation({ latitude: lat, longitude: lng });
        getWeatherData(lat, lng);
        setLocation(''); // Reset location
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeatherData(28, -16); // Default values
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header">Weather App</h1>
      </header>
      <main>
        <div className="location-form">
          <h2>Enter Location</h2>
          <div className="location-form-container">
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              className="location-input"
              placeholder="Enter location"
            />
            <button type="submit" onClick={handleSubmit} className="location-button">
              Get Weather
            </button>
          </div>
        </div>

        <div className="weather-info">
          {weatherData ? (
            <>
            <h2>
              Current Weather
              <WeatherIcon weatherIcon={weatherData.icon} />
            </h2>
              <p>Temperature: {weatherData.temperature}°C</p>
              <p>Feels like: {weatherData.apparentTemperature}°C</p>
              <p>Dew Point: {weatherData.dewPoint}°C</p>
              <p>Humidity: {weatherData.humidity}%</p>
              <p>Pressure: {weatherData.pressure} mb</p>
              <p>Wind Speed: {weatherData.windSpeed} km/h</p>
              <p>Wind Gust: {weatherData.windGust} km/h</p>
              <p>Wind Direction: {weatherData.windBearing}°</p>
              <p>Cloud Cover: {weatherData.cloudCover}</p>
              <p>UV Index: {weatherData.uvIndex}</p>
              <p>Visibility: {weatherData.visibility} km</p>
              <p>Summary: {weatherData.summary}</p>
            </>
          ) : (
            <p>Loading weather data...</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
