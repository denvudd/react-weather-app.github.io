import { formatToLocalTime } from "../../services/WeatherService";

const TimeAndLocation = ({weather}) => {
  const {dt, timezone, name, country} = weather;
  return (
    <div>
      <div className="flex items-center justify-center my-5 md:my-6">
        <p className="text-white text-md md:text-xl font-extralight">
          {formatToLocalTime(dt, timezone)}
        </p>
      </div>
      <div className="flex items-center justify-center my-3">
        <p className="text-white text-2xl md:text-3xl font-medium">
          {`${name}, ${country}`}
        </p>
      </div>
    </div>
  );
};

export default TimeAndLocation;