import { useState, useEffect } from 'react';

import TopButtons from './components/TopButtons/TopButtons';
import Inputs from './components/Inputs/Inputs';
import TimeAndLocation from './components/TimeAndLocation/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails/TemperatureAndDetails';
import Forecast from './components/Forecast/Forecast';

import { ToastContainer, toast } from 'react-toastify';

import getFormatedWeatherData from './services/WeatherService';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [query, setQuery] = useState({q: 'kyiv'});
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);
  
  useEffect(() => {
    const fetchWeather = async () => {
      const message = query.q ? query.q : "current location.";

      toast.info(`Fetching weather for ${message.charAt(0).toUpperCase() + message.slice(1)}...`);
      await getFormatedWeatherData({...query, units})
            .then(data => {
              toast.success(`Successfully fetched weather for ${data.name}, ${data.country}!`)
              setWeather(data)
            });
    }
  
    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    const threshold = units === 'metric' ? 20 : 60;

    if (!weather) {
      return 'from-cyan-600 to-blue-600';
    }

    if (weather.temp <= threshold) {
      return 'from-cyan-600 to-blue-600';
    }

    return 'from-yellow-600 to-orange-600';
  }
  return (
    <div className={`App pb-12 md:pb-40 bg-gradient-to-br ${formatBackground()}`}>
      <div className="mx-auto max-w-screen-sm md:max-w-screen-md px-2 md:px-0 pt-4">
        <TopButtons setQuery={setQuery}/>
        <Inputs setQuery={setQuery} units={units} setUnits={setUnits}/>
        {weather && (
          <div>
            <TimeAndLocation weather={weather}/>
            <TemperatureAndDetails weather={weather}/>
            <Forecast title="Hourly forecast" items={weather.hourly}/>
            <Forecast title="Daily forecast" items={weather.daily}/>
          </div>
        )}
        <ToastContainer autoClose={2000} 
                        theme="colored" 
                        newestOnTop={true}/>
      </div>
    </div>
  );
}

export default App;

