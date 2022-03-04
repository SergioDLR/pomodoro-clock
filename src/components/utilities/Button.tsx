import React, { useState } from "react";

const Button = ({ name, action, bgColor = "bg-white", extraStyle = " ", onClickColor = "bg-blue-900" }: any) => {
  const [onClickStyle, setClickStyle] = useState("");

  const changeBgColor = () => {
    setClickStyle(onClickColor);
    setTimeout(() => setClickStyle(bgColor), 100);
  };

  return (
    <>
      <button
        className={`h-48 w-1/4 rounded-full ${bgColor} ${extraStyle} ${onClickStyle}`}
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
