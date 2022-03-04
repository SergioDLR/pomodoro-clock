import React from "react";

const Card = ({ day, hour }: any) => {
  return (
    <>
      <div className="text-center bg-slate-900 rounded-md text-white shadow-lg w-1/2 m-auto p-5 mb-2 mt-2 ">
        <p className="inline"> {hour} - </p>
        <p className="inline">{day}</p>
      </div>
    </>
  );
};

export default Card;
