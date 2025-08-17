"use client";

import React from 'react';

export const FloatingHearts = () => (
  <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
    {Array.from({ length: 10 }).map((_, i) => (
      <span
        key={i}
        className="heart-particle"
        style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${Math.random() * 2 + 3}s`, // 3s to 5s
          animationDelay: `${Math.random() * 2}s`,
          fontSize: `${Math.random() * 1.5 + 0.75}rem`, // 0.75rem to 2.25rem
        }}
      >
        ❤️
      </span>
    ))}
  </div>
);
