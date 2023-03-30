import { formatToLocalTime, iconUrl } from "../../services/WeatherService";
import {
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from "@iconscout/react-unicons";

const TemperatureAndDetails = ({weather}) => {
  const {details, icon, temp, temp_min, temp_max, 
         sunrise, sunset, speed, humidity, feels_like, timezone} = weather;
  return (
    <div>
      <div className="flex items-center justify-center py-4 md:py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap md:flex-nowrap items-center md:justify-between text-white md:py-3 space-y-4">
        <div className="flex items-center justify-center md:w-1/3">
          <img src={iconUrl(icon)} alt="weather icon" 
             className="w-24 md:w-20"/>
        </div>
        <span className="text-5xl md:w-1/3">{`${temp.toFixed()}°`}</span>
        <div className="flex flex-col pt-3 md:pt-0 space-y-2 md:w-1/3">
          <div className="flex font-light text-sm items-center justify-center">
            <UilTemperature size="18" className="mr-1"/>
            Feels like:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilTear size="18" className="mr-1"/>
            Humidity:
            <span className="font-medium ml-1">{`${humidity.toFixed()}%`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <UilWind size="18" className="mr-1"/>
            Wind Speed:
            <span className="font-medium ml-1">{`${speed.toFixed()} km/h`}</span>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap md:flex-row items-center justify-center space-x-2 text-white text-sm py-6 md:py-3">
        <UilSun/>
        <p className="font-light">
          Rise: 
          <span className="font-medium ml-1">
            {formatToLocalTime(sunrise, timezone, 'hh:mm a')}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSunset/>
        <p className="font-light">
          Set: 
          <span className="font-medium ml-1">
            {formatToLocalTime(sunset, timezone, 'hh:mm a')}
          </span>
        </p>
        <p className="font-light">|</p>
        <UilSun/>
        <p className="font-light">
          High: <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>
        <UilSun/>
        <p className="font-light">
          Low: <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
};

export default TemperatureAndDetails;