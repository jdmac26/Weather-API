import { useState, useEffect } from "react";

const API_KEY = "97f44d05d6f149489ec230105212903";
const QUERY = "Brisbane";

export function useWeather() {
  const [loading, setLoading] = useState(true);
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  function getForecastByQuery(q) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${q}`;
    return fetch(url)
      .then((res) => res.json())
      .then((res) => res.forecast.forecastday[0].hour)
      .then((forecasts) =>
        forecasts.map((forecast) => ({
          time: forecast.time,
          text: forecast.condition.text,
          temp: forecast.temp_c,
          wind: forecast.wind_kph
        }))
      );
  }

  useEffect(() => {
    getForecastByQuery(QUERY)
      .then((headlines) => {
        setHeadlines(headlines);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    loading,
    headlines,
    error
  };
}
