"use client";

import React from "react";

export default function Stopwatch() {
  const [time, setTime] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="bg-black/50 text-white px-4 py-2 rounded-md font-mono text-lg">
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  );
}
