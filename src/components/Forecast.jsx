/* eslint-disable react/prop-types */
import React from "react";
import { iconUrlFromCode } from "../services/weather_service";

function Forecast({ title, items }) {
  return (
    <>
      <div className="flex items-center justify-start mt-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        {items.map((item) => {
          return (
            <div
              key={item.title}
              className="flex flex-col items-center justify-center"
            >
              <p className="font-light text-sm">04:30 PM</p>
              <img
                src={iconUrlFromCode(item.icon)}
                className="w-12 my-1"
                alt="icon"
              />
              <p className="font-medium">{item.temp.toFixed()}°</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Forecast;
