import React from "react";
import Image from "next/image";
import Spinner from "./spinner";
import { WeatherProps } from "../types";
import useWeatherData from "../hooks/useWeatherData";

/**
 * Functional component to display weather information for a specific city.
 * @param {WeatherProps} props - The props containing city, loading state, and setLoading function.
 * @returns {JSX.Element} - JSX element representing the weather information for the city.
 */
const CityWeatherRefactor = ({
  city,
  loading,
  setLoading,
}: WeatherProps): JSX.Element => {
  // Fetching weather data using custom hook
  const { description, temperature, icon, error } = useWeatherData({
    loading,
    setLoading,
    city,
  });

  // Rendering spinner if loading is true
  if (loading) {
    return (
      <div className="flex justify-center mt-10">
        <Spinner />
      </div>
    );
  }

  // Rendering weather information if no error and not loading
  return (
    <div className="flex justify-center">
      <div className="w-fit p-8 bg-white mt-10 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-8 uppercase">
          {city}
        </h1>
        {/* Displaying error message if exists */}
        {error && <p className="uppercase font-bold text-red-500">{error}</p>}
        {!error && !loading && (
          <div className="flex flex-col items-center">
            {/* Displaying weather icon */}
            <Image
              alt={description}
              src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
              height={100}
              width={100}
            />
            {/* Displaying weather description */}
            <div className="text-xl text-zinc-400 capitalize">
              {description}
            </div>
            <div className="my-4">
              <span className="text-zinc-400">Temperature: </span>
              <span className="text-4xl font-bold ">{temperature} &#8457;</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CityWeatherRefactor;
