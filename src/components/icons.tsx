export function ArrowIcon({ className = "size-[18px]" }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M4 12h16M14 6l6 6-6 6" />
    </svg>
  );
}

export function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M3 7h18M3 12h12M3 17h18" />
    </svg>
  );
}

export function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path d="M5 5l14 14M19 5L5 19" />
    </svg>
  );
}
