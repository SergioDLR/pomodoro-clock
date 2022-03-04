import React from "react";
import Card from "./utilities/Card";

const RegisterRenderer = ({ register, text }: any) => {
  return (
    <>
      <h1 className="text-center text-white ">{text.titleText}</h1>
      {register.map((item: any) => (
        <Card title="patata" description="patata" day={item.today} hour={item.hour} key={item.hour} />
      ))}
    </>
  );
};

export default RegisterRenderer;
