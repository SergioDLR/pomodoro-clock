import { useEffect, useState } from 'react'
import Button from '../utilities/Button'
import Icon from '../utilities/Icon'
import playImage from '../../assets/images/play-white.png'
import pauseImage from '../../assets/images/pause-white.png'
import fastForward from '../../assets/images/forward-white.png'
import settingsIcon from '../../assets/images/settings-white.png'
import BellSound from '../../assets/sounds/bellsound.mp3'
import Modal from '../utilities/Modal'
const bellMusic = new Audio(BellSound)
let tiempoDeInicio = Date.now()
const Clock = ({ pomodoroDuration = 25, restDuration = 5, addNewToRegister, textLanguage }: any) => {
  let tiempoRestanteEnMs = pomodoroDuration * (60 * 1000)
  const [pomodoroTime, setPomodoroTimer] = useState(pomodoroDuration)
  const [restTime, setRestTimer] = useState(restDuration)
  const [fin, setFin] = useState(tiempoDeInicio + tiempoRestanteEnMs)
  const [tiempoRestante, setTiempoRestante] = useState(tiempoRestanteEnMs)
  const [isPlaying, setPlaying] = useState(false)
  const [resting, setResting] = useState(false)
  const [modalShow, setShow] = useState('hidden')
  const calcularNuevoFinal = (fTimpo: number): number => {
    return fTimpo - Date.now()
  }

  const openModal = () => {
    setResting(false)
    setPlaying(false)
    setShow('block')
  }
  const closeShow = () => {
    setShow('hidden')
  }
  const pause = () => {
    setFin(Date.now() + tiempoRestante)
    setPlaying(!isPlaying)
  }

  const stop = () => {
    setPlaying(false)
    setTiempoRestante(pomodoroTime * 60 * 1000)
    setResting(false)
  }

  const setPomodoroTime = (event: any) => {
    setPlaying(false)
    if (event.target.value > 0) setPomodoroTimer(parseFloat(event.target.value))
    else setPomodoroTime(25)
    setResting(false)
    setTiempoRestante(pomodoroTime * 60 * 1000)
  }

  const setRestTime = (event: any) => {
    setPlaying(false)
    if (event.target.value > 0) setRestTimer(parseFloat(event.target.value))
    else setPomodoroTime(25)
    setResting(false)
    setTiempoRestante(pomodoroTime * 60 * 1000)
  }

  const endPomodoro = () => {
    if (tiempoRestante <= 1000) {
      pause()
      setResting(!resting)
      setTiempoRestante(pomodoroTime * 60 * 1000)
      bellMusic.play()
      if (!resting) {
        setTiempoRestante(restTime * 60 * 1000)
        addNewToRegister()
      }
    }
  }

  useEffect(() => {
    const updateTime = 500
    let tTimer = setTimeout(() => {
      if (isPlaying) {
        setTiempoRestante(calcularNuevoFinal(fin))
        endPomodoro()
      }
    }, updateTime)
    return () => {
      clearTimeout(tTimer)
    }
  }, [tiempoRestante, isPlaying])

  let minutesRemaining = Math.floor(tiempoRestante / 60 / 1000)
  let secondsRemaining = Math.floor((tiempoRestante / 1000) % 60)

  const pauseOrPlay = () => {
    if (isPlaying) return <Icon img={pauseImage} />
    return <Icon img={playImage} />
  }

  useEffect(() => {
    setPlaying(false)
    setPomodoroTimer(pomodoroTime)
    setTiempoRestante(pomodoroTime * 60 * 1000)
  }, [pomodoroTime])

  useEffect(() => {
    setPlaying(false)
    setRestTimer(restTime)
    setResting(false)
  }, [restTime])

  return (
    <div className="text-white text-center ">
      <div
        className={`border-2 align-middle rounded-full m-auto w-56 h-56 lg:w-96  lg:h-96 flex justify-center ${
          resting ? 'bg-green-600' : 'bg-red-600'
        }`}
      >
        <p className="text-6xl m-auto ">
          {minutesRemaining < 10 && `0`}
          {minutesRemaining} : {secondsRemaining < 10 && `0`}
          {secondsRemaining}
        </p>
      </div>
      <Button name={pauseOrPlay()} action={pause} bgColor="bg-black" />
      <Button name={<Icon img={fastForward} />} action={stop} extraStyle={'ml-2'} bgColor="bg-black" />
      <Button
        name={<Icon img={settingsIcon} />}
        size={'w-24 h-24'}
        extraStyle={'ml-2'}
        action={openModal}
        bgColor="bg-black"
      />
      <Modal show={modalShow} updateShow={closeShow}>
        <div className="text-black">
          <label htmlFor="">{textLanguage.cant || 'place'}</label>
          <input
            type="number"
            className="bg-gray-200  text-center rounded-md block w-full "
            onChange={(event) => setPomodoroTime(event)}
            min={1}
            placeholder="25"
            max={999}
          />
          <label htmlFor="">{textLanguage.restCant || 'place'}</label>
          <input
            type="number"
            className="bg-gray-200  text-center rounded-md block w-full "
            onChange={(event) => setRestTime(event)}
            min={1}
            max={999}
            placeholder="5"
          />
        </div>
      </Modal>
    </div>
  )
}

export default Clock
