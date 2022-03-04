import Clock from "../clock/Clock";
import { useState } from "react";
import RegisterRenderer from "../RegisterRenderer";
import jsonEn from "../../assets/text/homeEn.json";
import jsonEs from "../../assets/text/homeEs.json";

let userLang = navigator.language;
let textLanguaje: any;
if (userLang.substring(0, 2) === `es`) {
  textLanguaje = jsonEs;
} else {
  textLanguaje = jsonEn;
}
function Home() {
  const [register, setRegister] = useState<any>([]);

  const addPomodoroRegister = () => {
    const date = new Date();
    const today = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const hour = `${date.getHours()}:${date.getMinutes()}`;
    const newRegister = {
      today,
      hour,
    };
    setRegister([...register, newRegister]);
  };

  return (
    <div className="bg-slate-700 h-screen flex items-center justify-center flex-row font-ubuntu">
      <div className="w-1/2">
        <RegisterRenderer register={register} text={textLanguaje} />
      </div>
      <div className="w-1/2">
        <Clock pomodoroDuration={25} restDuration={5} addNewToRegister={addPomodoroRegister} />
      </div>
    </div>
  );
}

export default Home;
