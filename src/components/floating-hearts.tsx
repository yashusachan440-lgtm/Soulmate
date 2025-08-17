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
      return Array.from({ length: 10 }).map(() => ({
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 2 + 3}s`, // 3s to 5s
        animationDelay: `${Math.random() * 2}s`,
        fontSize: `${Math.random() * 1.5 + 0.75}rem`, // 0.75rem to 2.25rem
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
