interface ChevronRightIconProps {
  className?: string;
}

export function ChevronRightIcon({
  className = "w-4 h-4",
}: ChevronRightIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 9 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 1L8 8L1 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
