/**
 * Interface representing the structure of weather data retrieved from the weather API.
 */
export interface WeatherApiResult {
  // Geographic coordinates of the location
  coord?: {
    lon: number; // Longitude of the location
    lat: number; // Latitude of the location
  };
  // Weather conditions
  weather?: [
    {
      id?: number; // Weather condition ID
      main?: string; // Main weather condition (e.g., Rain, Snow, Clear)
      description?: string; // Description of the weather condition
      icon?: string; // Weather icon code
    },
  ];
  base?: string; // Information source
  // Main weather information
  main?: {
    temp?: number; // Current temperature
    feels_like?: number; // "Feels like" temperature
    temp_min: number; // Minimum temperature
    temp_max: number; // Maximum temperature
    pressure: number; // Atmospheric pressure
    humidity: number; // Humidity level
  };
  visibility: number; // Visibility in meters
  // Wind information
  wind: {
    speed: number; // Wind speed
    deg: number; // Wind direction in degrees
    gust: number; // Wind gust speed
  };
  // Cloudiness information
  clouds: {
    all: number; // Cloudiness percentage
  };
  dt: number; // Time of data calculation (UNIX, UTC)
  // Additional system information
  sys?: {
    type?: number; // System type
    id?: number; // System ID
    country?: string; // Country code
    sunrise?: number; // Sunrise time (UNIX, UTC)
    sunset?: number; // Sunset time (UNIX, UTC)
  };
  timezone?: number; // Timezone offset in seconds
  id?: number; // City ID
  name?: string; // City name
  message?: string; // Error message (if any)
  cod: HttpStatusCode; // HTTP status code of the response
}

/**
 * Interface representing the state of weather information to be displayed.
 */
export interface WeatherState {
  temperature: string; // Current temperature
  description: string; // Description of the weather condition
  icon: string; // Weather icon code
}

/**
 * Interface representing the props required by the Weather component.
 */
export interface WeatherProps {
  city: string; // City name
  loading: boolean; // Loading state
  setLoading: React.Dispatch<React.SetStateAction<boolean>>; // Function to set loading state
}
