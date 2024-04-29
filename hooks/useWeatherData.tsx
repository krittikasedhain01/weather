import React, { useState, useEffect } from "react";

import fetchWeatherData from "../utils/fetchWeatherData";
import { WeatherState } from "../types";

const initialState = {
  temperature: "",
  description: "",
  icon: "",
};

interface useWeatherDataType extends WeatherState {
  error: string;
}

/**
 * Custom hook to fetch weather data for a specified city and manage loading state.
 * @param {Object} options - Options object containing city name, loading state, and setLoading function.
 * @param {string} options.city - The name of the city for which weather data is to be fetched.
 * @param {boolean} options.loading - The loading state indicating whether data is being fetched.
 * @param {Function} options.setLoading - The function to set the loading state.
 * @returns {Object} - An object containing weather data, loading state, and error message.
 */
const useWeatherData = ({ city, loading, setLoading }): useWeatherDataType => {
  const [weatherResult, setWeatherResult] =
    useState<WeatherState>(initialState);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true); // Set loading state to true when fetching data
    setError(""); // Clear any previous error message
    fetchWeatherData(city) // Fetch weather data
      .then(({ temperature, description, icon }) => {
        setWeatherResult({ temperature, description, icon }); // Update weather data state
      })
      .catch((error) => {
        setError(error.message || "Unable to fetch data"); // Set error message if fetching fails
      })
      .finally(() => setLoading(false)); // Set loading state to false after fetching completes
  }, [city]); // Execute effect when city changes

  // Return weather data, error message, and loading state
  return {
    ...weatherResult,
    error,
  };
};

export default useWeatherData;
