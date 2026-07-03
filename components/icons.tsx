/**
 * Feather-style stroke icons used across the sections.
 * All inherit `currentColor` so CSS controls their color.
 */
type IconProps = { size?: number };

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none" as const,
  "aria-hidden": true as const,
});

const stroke = {
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const IconLayers = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M12 2L2 7l10 5 10-5-10-5z" {...stroke} />
    <path d="M2 17l10 5 10-5M2 12l10 5 10-5" {...stroke} />
  </svg>
);

export const IconGlobe = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="10" {...stroke} />
    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" {...stroke} />
  </svg>
);

export const IconClock = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="10" {...stroke} />
    <polyline points="12 6 12 12 16 14" {...stroke} />
  </svg>
);

export const IconCoffee = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M18 8h1a4 4 0 010 8h-1" {...stroke} />
    <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" {...stroke} />
    <line x1="6" y1="1" x2="6" y2="4" {...stroke} />
    <line x1="10" y1="1" x2="10" y2="4" {...stroke} />
    <line x1="14" y1="1" x2="14" y2="4" {...stroke} />
  </svg>
);

export const IconActivity = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" {...stroke} />
  </svg>
);

export const IconUsers = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" {...stroke} />
    <circle cx="9" cy="7" r="4" {...stroke} />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" {...stroke} />
  </svg>
);

export const IconSend = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M3 11l19-9-9 19-2-8-8-2z" {...stroke} />
  </svg>
);

export const IconBag = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" {...stroke} />
    <line x1="3" y1="6" x2="21" y2="6" {...stroke} />
    <path d="M16 10a4 4 0 01-8 0" {...stroke} />
  </svg>
);

export const IconHeart = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" {...stroke} />
  </svg>
);

export const IconBriefcase = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="2" y="7" width="20" height="14" rx="2" {...stroke} />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" {...stroke} />
  </svg>
);

export const IconBook = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" {...stroke} />
    <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" {...stroke} />
  </svg>
);

export const IconPackage = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" {...stroke} />
    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" {...stroke} />
  </svg>
);

export const IconSearch = ({ size = 32 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="11" cy="11" r="8" {...stroke} />
    <path d="M21 21l-4.35-4.35" {...stroke} />
  </svg>
);

export const IconPen = ({ size = 32 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M12 19l7-7 3 3-7 7-3-3z" {...stroke} />
    <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" {...stroke} />
  </svg>
);

export const IconCode = ({ size = 32 }: IconProps) => (
  <svg {...base(size)}>
    <polyline points="16 18 22 12 16 6" {...stroke} />
    <polyline points="8 6 2 12 8 18" {...stroke} />
  </svg>
);

export const IconCheckCircle = ({ size = 32 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" {...stroke} />
    <polyline points="22 4 12 14.01 9 11.01" {...stroke} />
  </svg>
);

export const IconCheck = ({ size = 18, color }: IconProps & { color?: string }) => (
  <svg {...base(size)}>
    <polyline points="20 6 9 17 4 12" {...stroke} stroke={color ?? "currentColor"} />
  </svg>
);

export const IconX = ({ size = 18, color }: IconProps & { color?: string }) => (
  <svg {...base(size)}>
    <line x1="18" y1="6" x2="6" y2="18" {...stroke} stroke={color ?? "currentColor"} />
    <line x1="6" y1="6" x2="18" y2="18" {...stroke} stroke={color ?? "currentColor"} />
  </svg>
);

export const IconXCircle = ({ size = 24 }: IconProps) => (
  <svg {...base(size)}>
    <circle cx="12" cy="12" r="10" {...stroke} />
    <line x1="15" y1="9" x2="9" y2="15" {...stroke} />
    <line x1="9" y1="9" x2="15" y2="15" {...stroke} />
  </svg>
);

export const IconMail = ({ size = 20 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" {...stroke} />
    <polyline points="22,6 12,13 2,6" {...stroke} />
  </svg>
);

export const IconWhatsApp = ({ size = 20 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" {...stroke} />
  </svg>
);

export const IconUser = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" {...stroke} />
    <circle cx="12" cy="7" r="4" {...stroke} />
  </svg>
);

export const IconFileText = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" {...stroke} />
    <polyline points="14 2 14 8 20 8" {...stroke} />
    <line x1="16" y1="13" x2="8" y2="13" {...stroke} />
    <line x1="16" y1="17" x2="8" y2="17" {...stroke} />
  </svg>
);

export const IconKey = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" {...stroke} />
  </svg>
);

export const IconEye = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" {...stroke} />
    <circle cx="12" cy="12" r="3" {...stroke} />
  </svg>
);

export const IconUnlock = ({ size = 28 }: IconProps) => (
  <svg {...base(size)}>
    <rect x="3" y="11" width="18" height="11" rx="2" {...stroke} />
    <path d="M7 11V7a5 5 0 019.9-1" {...stroke} />
  </svg>
);
