import React from "react";

const EduManage = () => (
  <div className="flex items-center gap-2">
    {/* Logo Icon */}
    <svg
      width="40"
      height="40"
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Graduation Cap */}
      <path
        d="M32 8L56 20L32 32L8 20L32 8Z"
        fill="#4F46E5"
      />
      <path
        d="M32 34V48"
        stroke="#4F46E5"
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Gear Circle */}
      <circle
        cx="48"
        cy="48"
        r="8"
        stroke="#10B981"
        strokeWidth="4"
      />
      <path
        d="M45 48h6"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>

    {/* Brand Name */}
    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
      <span className="text-indigo-600">Edu</span>
      <span className="text-emerald-500">Manage</span>
    </h1>
  </div>
);

export default EduManage;
