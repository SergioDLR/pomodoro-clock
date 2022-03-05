import React, { useState } from "react";

const Modal = ({ text }: any) => {
  const [visible, setVisible] = useState("opacity-1");
  return (
    <div className={`bg-white absolute top-1/4 m-auto rounded-md p-5 ${visible} `}>
      <label htmlFor="">{text.cant || "place"}</label>
      <input type="number" className="bg-gray-400 rounded-md block w-full " />
    </div>
  );
};

export default Modal;
