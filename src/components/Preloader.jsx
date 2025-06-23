// src/components/Preloader.jsx
import React, { useState, useEffect } from 'react';

const Preloader = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading process by incrementing progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev === 100) {
          clearInterval(interval);
        }
        return Math.min(prev + 10, 100); // Increment by 10 every second
      });
    }, 200); // Increase progress every 200ms

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50">
      <div className="w-64 h-2 bg-gray-200">
        <div
          className="h-full bg-blue-600 transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Preloader;
