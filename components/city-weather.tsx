import React from "react";
import fetchWeatherData from "../utils/fetchWeatherData"; // Importing a function to fetch weather data
import { WeatherState, WeatherProps } from "../types"; // Importing custom types for weather state and props

export default class CityWeather extends React.Component<
  WeatherProps,
  WeatherState
> {
  public constructor(props) {
    super(props);
    // Initializing state with temperature and description as empty strings
    this.state = {
      temperature: "",
      description: "",
    };
  }

  // Lifecycle method called after the component is mounted
  public componentDidMount() {
    this.fetchWeather(); // Calling the method to fetch weather data
  }

  // Lifecycle method called after the component updates
  public componentDidUpdate(prevProps) {
    // Checking if the city prop has changed since the last update
    if (prevProps.city !== this.props.city) {
      this.fetchWeather(); // Fetching weather data if the city has changed
    }
  }

  // Method to fetch weather data for the specified city
  fetchWeather() {
    const { city, setLoading } = this.props; // Destructuring props
    setLoading(true); // Setting loading state to true
    // Calling the fetchWeatherData function to fetch weather data asynchronously
    fetchWeatherData(city)
      .then(({ temperature, description }) => {
        // Setting state with the fetched temperature and description
        this.setState({ temperature, description });
      })
      .catch((error) => {
        console.log(error); // Logging any errors that occur during data fetching
      })
      .finally(() => setLoading(false)); // Setting loading state to false regardless of success or failure
  }

  // Render method to display the component's UI
  public render() {
    const { city, loading } = this.props; // Destructuring props
    const { temperature, description } = this.state; // Destructuring state

    // Conditionally rendering null if loading is true to prevent rendering before data is fetched
    if (loading) {
      return null;
    }

    // Returning JSX to display weather information
    return (
      <div>
        <h1>{city}</h1> {/* Displaying the city name */}
        {/* Conditionally rendering temperature if it exists */}
        {temperature ? <div>Temperature: {temperature} &#8457;</div> : null}
        {/* Conditionally rendering description if it exists */}
        {description ? <div>Description: {description}</div> : null}
      </div>
    );
  }
}
