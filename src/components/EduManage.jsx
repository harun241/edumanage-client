import React from "react";

const EduManage = () => (
  <div className="flex items-center gap-4 overflow-hidden">

    {/* Animated Logo */}
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="logo-move-rotate"
    >
      {/* Graduation Cap */}
      <path
        d="M42 8L48 20L32 32L2 20L32"
        fill="url(#orangeGradient)"
      />
      <path
        d="M32 32V48"
        stroke="#F973"
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

      {/* Gradient */}
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

    {/* Brand Text */}
    <h1 className="text-3xl font-extrabold flex gap-2">
      <span className="text-blue-800 animate-bounce-text">Edu</span>
      <span className="text-green-500 animate-bounce-text-delay">Quest</span>
    </h1>

    {/* Custom Animations */}
    <style>{`
      /* Logo move left to right and rotate */
      @keyframes moveRotate {
        0%   { transform: translateX(-100px) rotate(0deg); }
        50%  { transform: translateX(100px) rotate(180deg); }
        100% { transform: translateX(-100px) rotate(360deg); }
      }

      .logo-move-rotate {
        animation: moveRotate 4s linear infinite;
        transform-origin: center;
      }

      /* Text bounce */
      @keyframes bounceText {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }

      .animate-bounce-text {
        animation: bounceText 1s ease-in-out infinite;
      }

      .animate-bounce-text-delay {
        animation: bounceText 1s ease-in-out infinite;
        animation-delay: 0.5s;
      }
    `}</style>
  </div>
);

export default EduManage;
