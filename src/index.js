import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Headline from "./components/headline";
import { useWeather } from "./api";

function App() {
  const { loading, headlines, error } = useWeather();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div className="App">
      <h1>Brisbane Weather Forecast Today</h1>
      {headlines.map((headline) => (
        <Headline
          key={headline.time}
          time={headline.time}
          text={headline.text}
          temp={headline.temp}
          wind={headline.wind}
        />
      ))}
    </div>
  );
}

export default App;
const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
