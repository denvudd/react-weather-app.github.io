import { iconUrl } from "../../services/WeatherService";

const Forecast = ({title, items}) => {
  return (
    <div>
      <div className="flex items-center justify-start mt-4 md:mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2"/>
      <div className="flex flex-row items-center md:justify-between text-white">
        {items.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col items-center w-1/5 md:w-auto justify-center px-1 md:border-r-0 ${
              index < items.length - 1 ? 'border-r' : ''
            }`}
          >
            <p className="font-light text-sm">{item.title}</p>
            <img src={iconUrl(item.icon)} alt="weather icon" className="w-12 my-1" />
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;