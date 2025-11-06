export const ImageIcon = ({ classes }: { classes: string }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    className={classes}
  >
    <rect
      x="2.5"
      y="2.5"
      width="15"
      height="15"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <circle cx="7.5" cy="7.5" r="1.25" fill="currentColor" />
    <path
      d="M17.5 12.5L14.375 9.375L8.75 15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
