import { useEffect, useState } from "react";
import Button from "../utilities/Button";
import Icon from "../utilities/Icon";
import playImage from "../../assets/images/play-white.png";
import pauseImage from "../../assets/images/pause-white.png";
import fastForward from "../../assets/images/forward-white.png";
import BellSound from "../../assets/sounds/Bellsound.mp3";
const bellMusic = new Audio(BellSound);
let tiempoDeInicio = Date.now();
const Clock = ({ pomodoroDuration = 25, restDuration = 5, addNewToRegister }: any) => {
  let tiempoRestanteEnMs = pomodoroDuration * (60 * 1000);
  const [fin, setFin] = useState(tiempoDeInicio + tiempoRestanteEnMs);
  const [tiempoRestante, setTiempoRestante] = useState(tiempoRestanteEnMs);
  const [isPlaying, setPlaying] = useState(false);
  const [resting, setResting] = useState(false);

  const calcularNuevoFinal = (fTimpo: number): number => {
    return fTimpo - Date.now();
  };

  const pause = () => {
    setFin(Date.now() + tiempoRestante);
    setPlaying(!isPlaying);
  };

  const stop = () => {
    setPlaying(false);
    setTiempoRestante(tiempoRestanteEnMs);
    setResting(false);
  };

  const endPomodoro = () => {
    if (tiempoRestante <= 1000) {
      pause();
      setResting(!resting);
      setTiempoRestante(restDuration * 60 * 1000);
      bellMusic.play();
      if (!resting) addNewToRegister();
    }
  };

  useEffect(() => {
    const updateTime = 500;
    let tTimer = setTimeout(() => {
      if (isPlaying) {
        setTiempoRestante(calcularNuevoFinal(fin));
        endPomodoro();
      }
    }, updateTime);
    return () => {
      clearTimeout(tTimer);
    };
  }, [tiempoRestante, isPlaying]);

  let minutesRemaining = Math.floor(tiempoRestante / 60 / 1000);
  let secondsRemaining = Math.floor((tiempoRestante / 1000) % 60);

  const pauseOrPlay = () => {
    if (isPlaying) return <Icon img={pauseImage} />;
    return <Icon img={playImage} />;
  };

  return (
    <div className="text-white text-center ">
      <div
        className={`border-2 align-middle rounded-full m-auto w-1/2 h-96 flex justify-center ${
          resting ? "bg-green-600" : "bg-red-600"
        }`}
      >
        <p className="text-6xl m-auto ">
          {minutesRemaining < 10 && `0`}
          {minutesRemaining} : {secondsRemaining < 10 && `0`}
          {secondsRemaining}
        </p>
      </div>
      <Button name={pauseOrPlay()} action={pause} bgColor="bg-black" />
      <Button name={<Icon img={fastForward} />} action={stop} bgColor="bg-black" />
    </div>
  );
};

export default Clock;
