import React from "react";

const Button = ({ name, action, bgColor = "bg-white", extraStyle = " " }: any) => {
  return (
    <>
      <button className={`p-5 rounded-full ${bgColor} ${extraStyle}`} onClick={() => action()}>
        {name}
      </button>
    </>
  );
};
export default Button;
