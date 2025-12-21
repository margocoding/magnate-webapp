export const CloseIcon = ({ color }: { color?: string }) => (
  <svg
    className="w-full p-1"
    viewBox="0 0 23 23"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M21.5 21.5L11.5 11.5M11.5 11.5L1.5 1.5M11.5 11.5L21.5 1.5M11.5 11.5L1.5 21.5"
      stroke={color || "#FF383C"}
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
