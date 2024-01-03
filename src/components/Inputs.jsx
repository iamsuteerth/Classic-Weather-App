/* eslint-disable react/prop-types */
import React from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";
import { useState } from "react";
import { toast } from "react-toastify";
function Inputs({ setQuery, query }) {
  const [city, setCity] = useState("");
  const handleSearchClick = () => {
    if (city !== "" && city.length > 3) {
      setQuery({ ...query, q: city });
    }
  };
  const handleLocationClick = () => {
    if (navigator.geolocation) {
      toast.info('Fetching user location...');
      navigator.geolocation.getCurrentPosition((position) => {
        toast.success('Location fetched!');
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        setQuery({
          lat,
          lon,
          units: query.units,
        });
      });
    }
  };
  const handleUnitsChange = (e) => {
    e.preventDefault();
    const selectedUnit = e.currentTarget.name;
    if (query.units !== selectedUnit)
      setQuery({ ...query, units: selectedUnit });
  };
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          placeholder="Search..."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize"
          onChange={(e) => setCity(e.target.value)}
        />
        <div onClick={handleSearchClick}>
          <UilSearch
            size={26}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
          />
        </div>
        <div onClick={handleLocationClick}>
          <UilLocationPoint
            size={26}
            className="text-white cursor-pointer transition ease-out hover:scale-125"
          />
        </div>
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button
          name="metric"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °C
        </button>
        <p className="text-xl text-white mx-1">{` | `}</p>
        <button
          name="imperial"
          className="text-xl text-white font-light transition ease-out hover:scale-125"
          onClick={handleUnitsChange}
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
