import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import styles from "../styles/weather.module.css";

const WeatherNewComp = () => {
  const [cityName, setCityName] = useState("");
  const [weatherData, setWeatherData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  async function getWeatherData() {
    try {
      setLoading(true);
      let API_KEY = 'cf1a5d649b6ffe51e14f6b31aab2dbe8';
      let response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`
      );
      let result = await response.json();
      console.log(result);
      if (result.cod == "404") {
        setError(result.message);
        console.log("error occurred");
      }
      if (result.cod !== "400" && result.cod !== "404") {
        setWeatherData(result);
        setError("");
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = () => {
    getWeatherData();
  };

  const handleInputChange = (e) => {
    setCityName(e.target.value);
  };

  function convertToCelcius(temp) {
    let newTemp = temp - 273;
    return Math.floor(newTemp);
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.heading}>Weather App</h1>
          <div className={styles.searchContainer}>
            <input
              type="text"
              value={cityName}
              onChange={handleInputChange}
              className={styles.search}
              placeholder="Enter the City"
            />
            <button onClick={handleSearch} className={styles.searchButton}>
              Search
            </button>
          </div>
          {loading && (
            <ColorRing
              visible={true}
              height="70"
              width="70"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
            />
          )}
          {error && <p style={{ color: "red" }}>Error: {error}</p>}
          {weatherData && (
            <div className={styles.box}>
              <h3 className={styles.country}>
                {weatherData.name} ({weatherData?.sys?.country}){" "}
              </h3>
              <h3 className={styles.weatherType}>
                {weatherData.weather &&
                  weatherData?.weather[0]?.description}{" "}
              </h3>
              {weatherData.weather && (
                <img
                  className="weatherimg"
                  alt="image1"
                  src={`${weatherData?.weather[0].icon}.svg`}
                  style={{ width: "200px", height: "200px" }}
                />
              )}
              <h3 className={styles.temp}>
                {convertToCelcius(weatherData?.main?.temp)} °C
              </h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WeatherNewComp;
