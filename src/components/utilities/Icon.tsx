import React from "react";
import PlaceHolder from "../../assets/images/place-holder.png";
const Icon = ({ img = PlaceHolder, size = "w-1/4" }) => {
  return (
    <>
      <img src={img} className={`m-auto ${size}`} />
    </>
  );
};

export default Icon;
