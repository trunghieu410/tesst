interface ArrowRightIconProps {
  className?: string;
}

export function ArrowRightIcon({ className }: ArrowRightIconProps) {
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
        d="M13.8728 4.68307C14.0424 4.51353 14.0424 4.23459 13.8728 4.06504L9.93495 0.127161C9.76541 -0.042387 9.48647 -0.042387 9.31693 0.127161C9.14738 0.296709 9.14738 0.575642 9.31693 0.74519L12.5083 3.93652H0.437543C0.196894 3.93652 0 4.13341 0 4.37406C0 4.61471 0.196894 4.8116 0.437543 4.8116H12.5083L9.31693 8.00293C9.14738 8.17248 9.14738 8.45141 9.31693 8.62096C9.48647 8.79051 9.76541 8.79051 9.93495 8.62096L13.8728 4.68307Z"
        fill="#021337"
      />
    </svg>
  );
}
