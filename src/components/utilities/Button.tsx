import React, { useState } from "react";

const Button = ({
  name,
  size = "h-36 w-36",
  action,
  bgColor = "bg-white",
  extraStyle = " ",
  onClickColor = "bg-blue-900",
}: any) => {
  const [onClickStyle, setClickStyle] = useState("");

  const changeBgColor = () => {
    setClickStyle(onClickColor);
    setTimeout(() => setClickStyle(bgColor), 100);
  };

  return (
    <>
      <button
        className={`${size} rounded-full ${bgColor} ${extraStyle} ${onClickStyle}`}
        onClick={() => {
          action();
          changeBgColor();
        }}
      >
        {name}
      </button>
    </>
  );
};
export default Button;
