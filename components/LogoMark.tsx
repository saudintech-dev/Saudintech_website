/**
 * SaudinTech badge mark — gradient green circle with a white chevron.
 * `dark`  = gradient badge (for light surfaces: header).
 * `light` = reversed white badge with green chevron (for the brand-green footer).
 */
export default function LogoMark({
  variant = "dark",
  size = 34,
}: {
  variant?: "dark" | "light";
  size?: number;
}) {
  if (variant === "light") {
    return (
      <svg width={size} height={size} viewBox="0 0 46 46" fill="none" aria-hidden="true">
        <circle cx="23" cy="23" r="21" fill="#ffffff" />
        <path
          d="M17 15 L28 23 L17 31"
          stroke="#0a5c3a"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 46 46" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="saudintech-badge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#34d399" />
          <stop offset="1" stopColor="#0a5c3a" />
        </linearGradient>
      </defs>
      <circle cx="23" cy="23" r="21" fill="url(#saudintech-badge)" />
      <path
        d="M17 15 L28 23 L17 31"
        stroke="#ffffff"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
