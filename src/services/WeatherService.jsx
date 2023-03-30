import { DateTime } from "luxon";
import * as dotenv from 'dotenv';

const _API_KEY = process.env.REACT_APP_API_KEY;
const _WEATHER_URL = 'https://api.openweathermap.org/data/2.5';
const _ONECALL_URL = 'https://api.openweathermap.org/data/3.0';

dotenv.config()
console.log(process.env)

const getWeatherData = (infoType, params) => {
  const url = new URL(_WEATHER_URL + '/' + infoType);
  url.search = new URLSearchParams({...params, appid:_API_KEY});

  return fetch(url)
         .then(res => res.json());
}

const getOnecallData = (infoType, params) => {
  const url = new URL(_ONECALL_URL + '/' + infoType);
  url.search = new URLSearchParams({...params, appid:_API_KEY});

  return fetch(url)
         .then(res => res.json());
}

const formatCurrentWeather = (data) => {
  const {
    coord: {lat, lon},
    main: {temp, feels_like, temp_min, temp_max, humidity},
    name: name,
    dt: dt,
    sys: {country, sunrise, sunset},
    weather: weather,
    wind: {speed}
  } = data;

  const {main: details, icon} = weather[0];

  return {lat, lon, temp, feels_like, temp_min, temp_max, 
    humidity, name, dt, country, sunrise, sunset, details, 
    icon, speed}
}

const formatForecastWeather = (data) => {
  let { timezone, daily, hourly } = data;
  daily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormatedWeatherData = async (params) => {
  const formattedCurrentWeather = await getWeatherData('weather', params).then(formatCurrentWeather);

  const {lat, lon} = formattedCurrentWeather;
  const formattedForecastWeather = await getOnecallData('onecall', {
    lat: lat, 
    lon: lon, 
    exclude: 'current,minutely,alerts', 
    units: params.units
  }).then(formatForecastWeather);

  return {...formattedCurrentWeather, ...formattedForecastWeather};
}

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL, yyyy' | Local time: 'hh:mm a") => {
  return DateTime.fromSeconds(secs).setZone(zone).toFormat(format);
}

const iconUrl = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`

export default getFormatedWeatherData;
export {formatToLocalTime, iconUrl}