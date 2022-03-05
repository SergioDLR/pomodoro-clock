import React, { useState, useEffect } from "react";
import Button from "./Button";
const Modal = ({ text, children, show }: any) => {
  const [visible, setVisible] = useState("hidden");

  const cerrar = () => {
    setVisible("hidden");
  };
  useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <div className={`bg-white absolute top-1/4 m-auto rounded-md p-5 ${visible} `}>
      {children}
      <div>
        <Button name="cerrar" size="w-full" action={cerrar} extraStyle="text-white mt-2" bgColor="bg-slate-700" />
      </div>
    </div>
  );
};

export default Modal;
