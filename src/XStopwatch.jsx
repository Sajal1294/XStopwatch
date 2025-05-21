import React, { useEffect, useRef, useState } from "react";

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0); // time in ms
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      // Capture start time based on previously elapsed time
      startTimeRef.current = Date.now() - elapsedTime;

      // Update time at regular intervals
      intervalRef.current = setInterval(() => {
        const now = Date.now();
        setElapsedTime(now - startTimeRef.current);
      }, 100); // 100ms interval ensures test responsiveness
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning]); 

  const handleStartStop = () => {
    setIsRunning((prev) => !prev);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setElapsedTime(0);
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div style={styles.container}>
      <h1>Stopwatch</h1>
      <h2>Time: {formatTime(elapsedTime)}</h2>
      <div>
        <button onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px",
    fontFamily: "Arial, sans-serif",
  },
};

export default Stopwatch;
