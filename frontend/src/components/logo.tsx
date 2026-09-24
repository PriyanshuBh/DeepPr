import React, { useId } from "react";

export const DeepPRLogo = ({
  className = "w-12 h-12",
}: {
  className?: string;
}) => {
  const gradientId = useId();
  
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background (Optional: remove if you want a transparent logo) */}
      <rect width="100" height="100" rx="24" fill="#09090B" />

      {/* Neon Gradient Definition */}
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8B5CF6" /> {/* Tailwind purple-500 */}
          <stop offset="100%" stopColor="#3B82F6" /> {/* Tailwind blue-500 */}
        </linearGradient>
      </defs>

      {/* Main Git Branch */}
      <path
        d="M35 80 L35 25"
        stroke={`url(#${gradientId})`}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Merge Branch */}
      <path
        d="M35 60 C55 60, 65 50, 65 30"
        stroke={`url(#${gradientId})`}
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Commit Nodes */}
      <circle
        cx="35"
        cy="80"
        r="7"
        fill="#09090B"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
      />
      <circle
        cx="35"
        cy="25"
        r="7"
        fill="#09090B"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
      />
      <circle
        cx="65"
        cy="30"
        r="7"
        fill="#09090B"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
      />

      {/* AI Spark Icon */}
      <path
        d="M75 15 Q80 15 80 10 Q80 15 85 15 Q80 15 80 20 Q80 15 75 15 Z"
        fill="#60A5FA"
      />
    </svg>
  );
};
