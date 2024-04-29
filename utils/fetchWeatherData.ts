import { KtoF } from "./temperature";
import { WeatherApiResult } from "../types";

/**
 * Fetches weather data for a specified city from the OpenWeatherMap API.
 * @param {string} city - The name of the city for which weather data is to be fetched.
 * @returns {Promise<WeatherState>} - A promise that resolves with the weather state if successful, or rejects with an error if unsuccessful.
 */
const fetchWeatherData = (city: string): Promise<WeatherState> => {
  return new Promise(
    (
      resolve: (weatherState: WeatherState) => void,
      reject: (error: any) => void,
    ) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`,
      )
        .then((resp) => resp.json())
        .then((data: WeatherApiResult) => {
          if (data.cod === "404") {
            // Reject if city not found
            reject({ message: data.message });
          } else {
            // Convert temperature to Fahrenheit using KtoF function
            const temperature = data?.main?.temp
              ? KtoF(data.main.temp)?.toFixed(0)
              : "";
            const icon = data?.weather[0]?.icon; // Weather icon code
            const description = data?.weather?.[0]?.description || ""; // Weather description
            // Resolve with weather state
            resolve({ temperature, description, icon });
          }
        })
        .catch((err) => reject(err)); // Reject on fetch error
    },
  );
};

export default fetchWeatherData;
