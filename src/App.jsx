import { useState } from "react";
import Forecast from "./components/Forecast";
import Inputs from "./components/Inputs";
import TemperatureNDetails from "./components/TemperatureNDetails";
import TimeAndLocation from "./components/TimeAndLocation";
import TopButtons from "./components/TopButtons";
import "./index.css";
import getFormattedWeatherData from "./services/weather_service";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "Vellore", units: "metric" });
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : 'Current Location.';
      toast.info('Fetching weather for ' + message);
      await getFormattedWeatherData({ ...query }).then((data) => {
        toast.success(`Successfully fetched weather for ${data.name}, ${data.country}.`);
        setWeather(data);
      });
    };
    fetchWeather();
  }, [query]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = query.units === "metric" ? 28 : 82;
    if (weather.temp <= threshold) {
      return "from-cyan-700 to-blue-700";
    } else {
      return "from-yellow-700 to-orange-700";
    }
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400`}
    >
      <TopButtons setQuery={setQuery} query={query} />
      <Inputs setQuery={setQuery} query={query} />
      {weather && (
        <>
          <TimeAndLocation weather={weather} />
          <TemperatureNDetails weather={weather} />
          <Forecast title={"Hourly Forecast"} items={weather.hourly} />
          <Forecast title={"Daily Forecast"} items={weather.daily} />
        </>
      )}
    <ToastContainer autoClose={4000} theme="colored" newestOnTop={true}/>
    </div>
  );
}

export default App;
