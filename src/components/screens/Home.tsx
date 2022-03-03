import Clock from "../clock/Clock";

function Home() {
  return (
    <div className="bg-slate-700 h-screen flex items-center justify-center">
      <Clock pomodoroDuration={25} restDuration={5} />
    </div>
  );
}

export default Home;
