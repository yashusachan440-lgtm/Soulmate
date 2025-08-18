"use client";

import React, { useState, useEffect } from 'react';

interface HeartStyle {
  left: string;
  animationDuration: string;
  animationDelay: string;
  fontSize: string;
}

export const FloatingHearts = () => {
  const [hearts, setHearts] = useState<HeartStyle[]>([]);

  useEffect(() => {
    const generateHearts = () => {
      return Array.from({ length: 15 }).map(() => ({
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 4}s`, // 4s to 7s
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${Math.random() * 2 + 1}rem`, // 1rem to 3rem
      }));
    };
    setHearts(generateHearts());
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {hearts.map((style, i) => (
        <span
          key={i}
          className="heart-particle"
          style={style}
        >
          ❤️
        </span>
      ))}
    </div>
  );
};
