import Clock from "../clock/Clock";
import { useState, useEffect } from "react";
import RegisterRenderer from "../RegisterRenderer";
import jsonEn from "../../assets/text/homeEn.json";
import jsonEs from "../../assets/text/homeEs.json";
import Modal from "../utilities/Modal";
let userLang = navigator.language;
let textLanguage: any;
if (userLang.substring(0, 2) === `es`) {
  textLanguage = jsonEs;
} else {
  textLanguage = jsonEn;
}
function Home() {
  const [register, setRegister] = useState<any>([]);
  const [tPomodoro, setTPomodoro] = useState<any>(25);
  const [tRest, setTRest] = useState<any>(5);
  const addPomodoroRegister = () => {
    const date = new Date();
    const today = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
    const hour = `${date.getHours()}:${date.getMinutes()}`;
    const newRegister = {
      today,
      hour,
    };
    setRegister([...register, newRegister]);
    let oldItems = JSON.parse(localStorage.getItem("register") || "[]");
    oldItems.push(newRegister);
    localStorage.setItem("register", JSON.stringify(oldItems));
  };

  useEffect(() => {
    const oldPomodoros = localStorage.getItem("register") || "empty";

    if (oldPomodoros != "empty") {
      let registrosPomodoro = JSON.parse(oldPomodoros);
      setRegister(registrosPomodoro);
    }
  }, []);
  const saveValues = () => {
    return;
  };
  useEffect(() => {
    //
  }, [tPomodoro, tRest]);

  return (
    <div className="bg-slate-700 h-fit min-h-screen  flex items-center justify-center md:flex-row font-ubuntu flex-col-reverse">
      <div className="w-1/2">
        <RegisterRenderer register={register} text={textLanguage} />
      </div>
      <div className="w-1/2 ">
        <Clock
          pomodoroDuration={25}
          restDuration={5}
          textLanguage={textLanguage}
          addNewToRegister={addPomodoroRegister}
        />
      </div>
    </div>
  );
}

export default Home;
