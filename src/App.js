import { useEffect, useState } from "react";
import Length from "./Length";
import sound from "./TimeStop.wav";


const App = () => {

  const [displayTime, setDisplayTime] = useState(5);
  const [breakTime, setBreakTime] = useState(5*60);
  const [sessionTime, setSessionTime] = useState(25*60);
  const [timerOn, setTimerOn] = useState(false);
  const [onBreak, setOnBreak] = useState(false);
  const [reRender, setReRender] = useState(false);
  let breakAudio = (document.getElementById("beep"));
  
  
  const playBreakSound = () => {
    breakAudio = (document.getElementById("beep"));
    breakAudio.currentTime = 0;
    breakAudio.play();
  }

  const formatTime = (time) => {
    let minutes = Math.floor(time/60);
    let seconds = time%60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) + " : " + (seconds < 10 ? "0" + seconds : seconds)
    );
  }

  const changeTime = (amount, type) => {
    if(type === "break") {
      if (breakTime <= 60 && amount < 0){
        return;
      }
      if (breakTime >=3540 && amount > 0){
        return;
      } 
      setBreakTime(breakTime => breakTime + amount);
    }
    if(type === "session") {
      if (sessionTime <= 60 && amount < 0){
        return;
      }
      if (sessionTime >=3540 && amount > 0){
        return;
      } 
      setSessionTime(sessionTime => sessionTime + amount);
      if (!timerOn) {
        setDisplayTime(sessionTime + amount);
      }
    }
  }
  
  const controlTimePlay = () => {
    setTimerOn(true);
    controlTime();
  }

  const controlTimePause = () => {
    setTimerOn(false);
    clearInterval(localStorage.getItem("interval-id"));
  }

  useEffect(()=> {
    clearInterval(localStorage.getItem("interval-id"));
    setReRender(reRender=>!reRender);
  }, [onBreak]);

  useEffect(()=>{
    if(timerOn) {
      controlTime()
    }
    // eslint-disable-next-line
  },[reRender]);

  const controlTime = () => {
    let second = 1000;
    let date = new Date().getTime();
    let nextDate = new Date().getTime() + second;
    let onBreakVar = onBreak;
    let interval = setInterval(() => {
      date = new Date().getTime();
      if(date > nextDate) {
        setDisplayTime(prev => {
          if (prev <= 0 && !onBreakVar ) {
            playBreakSound();
            setOnBreak(true);
            return breakTime;
          } else if (prev <=0 && onBreakVar) {
            playBreakSound();
            setOnBreak(false);
            return sessionTime;
          }
          return prev-1
        });
        nextDate += second;
      }
    }, 30);
    localStorage.clear();
    localStorage.setItem("interval-id", interval);
  }

  const resetTime = () => {
    setDisplayTime(25*60);
    setBreakTime(5*60);
    setSessionTime(25*60);
    breakAudio = (document.getElementById("beep"));
    breakAudio.pause();
    breakAudio.currentTime= 0;
    setTimerOn(false);
    clearInterval(localStorage.getItem("interval-id"));
    setOnBreak(false);
  }


  return (
    <div className="center-align app-container">
      <h1>Session-Break Clock</h1>
      <div className="dual-container">
        <Length 
          title={"Break"} 
          changeTime={changeTime} 
          type={"break"}
          time={breakTime}
          formateTime={formatTime}
          id="break-label"
        />
        <Length 
          title={"Session"} 
          changeTime={changeTime} 
          type={"session"}
          time={ sessionTime }
          formateTime={formatTime}
          id="session-label"
        />
      </div>
      <h3 id="timer-label">{ onBreak ? "Break" : "Session" }</h3>
      <h3 id="time-left">{ formatTime(displayTime) }</h3>
      <button 
        className={timerOn ? ("btn-large blue lighten-3" ) : ("btn-large orange accent-4")}
        onClick={timerOn ? (controlTimePause) : (controlTimePlay)}
      >
        {timerOn ? (
          <i className="material-icons">pause_circle_filled</i>
        ) : (
          <i className="material-icons">play_circle_filled</i>
        )}
      </button>
      <button 
        className="btn-large orange accent-4" 
        id="reset" 
        onClick={resetTime}
      >
        <i className="material-icons">autorenew</i>
      </button>
      <audio id="beep" src={sound} />
    </div>
  );
}
 
export default App;