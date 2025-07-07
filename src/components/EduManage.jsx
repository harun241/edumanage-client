const EduManage = ({ width = 150, height = 50, color = "#1E40AF" }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 240 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Book icon */}
    <path
      d="M20 10 L60 10 L60 70 L20 70 Z M60 10 L100 10 L100 70 L60 70 Z"
      stroke={color}
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M60 10 L80 40 L100 10"
      stroke={color}
      strokeWidth="5"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Text "EduManage" */}
    <text
      x="110"
      y="50"
      fill={color}
      fontFamily="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
      fontWeight="700"
      fontSize="36"
    >
      EduMa
    </text>
  </svg>
);

export default EduManage;
