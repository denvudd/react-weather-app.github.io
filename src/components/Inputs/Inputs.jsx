import { useState } from 'react';
import { toast } from 'react-toastify';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

const Inputs = ({setQuery, units, setUnits}) => {
  const [city, setCity] = useState('');

  const handleSearchClick = (e) => {
    e.preventDefault();

    if (city !== '') {
      setQuery({q: city});
    }
  }

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Fetching user location...');
      navigator.geolocation.getCurrentPosition(position => {
        toast.success("Location fetched!");
        let lat = position.coords.latitude,
            lon = position.coords.longitude;

        setQuery({
          lat: lat,
          lon: lon
        })
      })
    }
  }

  const handleUnitsChange = (e) => {
    const selectedUnit = e.currentTarget.name;

    if (units !== selectedUnit) {
      setUnits(selectedUnit);
    }
  }

  return (
    <div className='flex flex-row flex-wrap md:flex-nowrap justify-center my-6'>
      <form onSubmit={handleSearchClick} className="flex flex-row w-8/12 md:w-3/4 items-center justify-center space-x-2 md:space-x-4 mr-5 md:mr-0" >
        <input type="text" 
               placeholder="Search..."
               value={city}
               onChange={(e) => setCity(e.currentTarget.value)} 
               className="text-sm md:text-lg font-light rounded-sm px-2 py-1 md:p-2 w-full shadow-xl focus:outline-none capitalize" />
        <UilSearch size={25} 
                   className="text-white cursor-pointer transition ease-out hover:scale-125"
                   onClick={handleSearchClick}/>
        <UilLocationPoint size={25} 
                          className="text-white cursor-pointer transition ease-out hover:scale-125"
                          onClick={handleLocationClick}/>
      </form>
      <div className="flex flex-row w-auto md:w-1/4 items-center justify-center">
        <button name="metric" 
                className="text-lg md:text-xl text-white font-light transition ease-out hover:scale-125"
                onClick={handleUnitsChange}>°C</button>
        <p className="text-lg md:text-xl text-white mx-1">|</p>
        <button name="imperial" 
                className="text-lg md:text-xl text-white font-light transition ease-out hover:scale-125"
                onClick={handleUnitsChange}>°F</button>
      </div>
    </div>
  );
};

export default Inputs;