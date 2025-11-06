interface XCircleIconProps {
  className?: string;
}

export function XCircleIcon({ className = "" }: XCircleIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="8" cy="8" r="7" fill="currentColor" />
      <path
        d="M10 6L6 10M6 6L10 10"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
