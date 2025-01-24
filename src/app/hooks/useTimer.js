import { useState, useEffect } from "react";

const timerEventEmitter = new EventTarget();

export function useTimer() {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        const newTime = time + 1;
        setTime(newTime);
        // Emit timer tick event with current time
        timerEventEmitter.dispatchEvent(
          new CustomEvent("timerTick", { detail: newTime })
        );
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isActive, time]);

  const start = () => setIsActive(true);
  const stop = () => setIsActive(false);

  const reset = () => {
    setTime(0);
    setIsActive(false);
  };

  // Add event listener helper
  const onTick = (callback) => {
    timerEventEmitter.addEventListener("timerTick", (e) => callback(e.detail));
    return () => {
      timerEventEmitter.removeEventListener("timerTick", callback);
    };
  };

  return { time, isActive, start, stop, reset, onTick };
}
