interface ArrowLeftIconProps {
  className?: string;
}

export function ArrowLeftIcon({ className }: ArrowLeftIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="9"
      viewBox="0 0 14 9"
      fill="none"
      className={className}
    >
      <path
        d="M0.127161 4.06504C-0.042387 4.23459 -0.042387 4.51353 0.127161 4.68307L4.06504 8.62096C4.23459 8.79051 4.51353 8.79051 4.68307 8.62096C4.85262 8.45141 4.85262 8.17248 4.68307 8.00293L1.49175 4.8116H13.5625C13.8031 4.8116 14 4.61471 14 4.37406C14 4.13341 13.8031 3.93652 13.5625 3.93652H1.49175L4.68307 0.74519C4.85262 0.575642 4.85262 0.296709 4.68307 0.127161C4.51353 -0.0423869 4.23459 -0.0423869 4.06504 0.127161L0.127161 4.06504Z"
        fill="#021337"
      />
    </svg>
  );
}
