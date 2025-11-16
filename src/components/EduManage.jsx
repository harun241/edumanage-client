import React from "react";

const EduManage = () => (
  <div className="flex items-center gap-4">
    {/* Animated Logo */}
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-spin-slow"
    >
      {/* Graduation Cap */}
      <path
        d="M32 8L56 20L32 32L8 20L32 8Z"
        fill="url(#orangeGradient)"
      />
      <path
        d="M32 32V48"
        stroke="#F97388"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Circle Accent */}
      <circle
        cx="48"
        cy="48"
        r="8"
        stroke="#14B8A6"
        strokeWidth="3"
        className="animate-pulse"
      />
      <path
        d="M45 48h6"
        stroke="#14B8A6"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Gradient Definition */}
      <defs>
        <linearGradient
          id="orangeGradient"
          x1="8"
          y1="8"
          x2="56"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F97316" />
          <stop offset="1" stopColor="#FB923C" />
        </linearGradient>
      </defs>
    </svg>

    {/* Brand Name with staggered bounce */}
    <h1 className="text-3xl font-extrabold flex space-x-2">
      <span className="text-blue-800 animate-bounce-alternate">Edu</span>
      <span className="text-green-500 animate-bounce-alternate-delay">Quest</span>
    </h1>
  </div>
);

export default EduManage;
