import { useState } from "react";
import CityWeather from "../components/city-weather-refactor";
import ErrorBoundary from "../components/error-boundary";
import Spinner from "../components/spinner";

export default function IndexPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCity(searchTerm);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="py-2 h-screen bg-gray">
      <form
        className="flex items-center justify-center"
        onSubmit={handleFormSubmit}
      >
        <label htmlFor="search" className="font-bold">
          Weather Search:
        </label>
        <input
          id="search"
          data-testid="weather-input"
          className="ml-3 shadow-sm border border-white px-4 py-2 rounded-l-lg"
          type="text"
          name="city"
          value={searchTerm}
          onChange={handleChange}
        />
        <button
          className="flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg uppercase"
          type="submit"
          disabled={loading}
        >
          {loading ? "submitting" : "Submit"}
          {loading && (
            <span className="ml-2">
              <Spinner size="5" />
            </span>
          )}
        </button>
      </form>

      {city && (
        <CityWeather city={city} loading={loading} setLoading={setLoading} />
      )}
    </div>
  );
}
