import React from "react";
import PlaceHolder from "../../assets/images/place-holder.png";
const Icon = ({ img = PlaceHolder, size = "w-5" }) => {
  return (
    <>
      <img src={img} className={size} />
    </>
  );
};

export default Icon;
