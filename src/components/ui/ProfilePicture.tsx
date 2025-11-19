interface ProfilePictureProps {
  name?: string;
  image?: string;
  size?: "small" | "medium" | "large";
  className?: string;
}

const sizeStyles = {
  small: "w-8 h-8 text-xs",
  medium: "w-10 h-10 text-sm",
  large: "w-12 h-12 text-base",
};

function getInitials(name: string): string {
  const parts = name.trim().split(" ");
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
}

function getGradientColor(name: string): string {
  // Generate a consistent gradient based on the name
  const colors = [
    "from-[#ff6e7f] to-[#bfe9ff]",
    "from-[#a8edea] to-[#fed6e3]",
    "from-[#ffd89b] to-[#19547b]",
    "from-[#667eea] to-[#764ba2]",
    "from-[#f093fb] to-[#f5576c]",
  ];
  const index = name.charCodeAt(0) % colors.length;
  return colors[index];
}

export function ProfilePicture({
  name = "User",
  image,
  size = "medium",
  className = "",
}: ProfilePictureProps) {
  const initials = getInitials(name);
  const gradient = getGradientColor(name);

  if (image) {
    return (
      <div
        className={`${sizeStyles[size]} rounded-full overflow-hidden ${className}`}
      >
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`${sizeStyles[size]} rounded-full bg-linear-to-b ${gradient} flex items-center justify-center font-medium text-[#021337] ${className}`}
    >
      {initials}
    </div>
  );
}
