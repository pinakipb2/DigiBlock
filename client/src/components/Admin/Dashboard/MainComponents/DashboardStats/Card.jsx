import React from 'react';

const Card = ({
  icon, color, count, text,
}) => (
  <div className="w-1/3 lg:w-1/2 p-2 cursor-pointer">
    <div className={`${color} flex items-center justify-evenly p-4 w-full h-32 rounded-md`}>
      <div className="flex flex-col space-y-1 text-white font-semibold">
        <div className="text-lg md:text-2xl xl:text-4xl">
          {count}
        </div>
        <div className="text-sm md:text-lg xl:text-2xl">
          {text}
        </div>
      </div>
      <i className={`${icon} transform transition hover:scale-110 text-gray-700 opacity-50 duration-500 text-2xl md:text-3xl xl:text-5xl`} />
    </div>
  </div>
);

export default Card;
