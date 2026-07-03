export default function LogoMark({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const square = variant === "dark" ? "#0a5c3a" : "#22c55e";
  const line = variant === "dark" ? "#22c55e" : "#fff";
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill={square} />
      <path
        d="M8 22L14 10L20 18L24 12"
        stroke={line}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="12" r="2" fill={line} />
    </svg>
  );
}
