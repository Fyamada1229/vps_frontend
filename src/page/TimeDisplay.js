import React from "react";
import { useState, useEffect } from "react";

const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <div>{currentTime}</div>;
};

export default TimeDisplay;
