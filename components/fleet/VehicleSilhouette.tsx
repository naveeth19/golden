export default function VehicleSilhouette({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="120"
      height="60"
      viewBox="0 0 120 60"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      opacity="0.15"
    >
      <rect x="15" y="22" width="90" height="22" rx="4" />
      <circle cx="35" cy="48" r="7" />
      <circle cx="85" cy="48" r="7" />
      <path d="M82 22V12H48v10" />
      <path d="M15 30h-5v8h5" />
      <path d="M105 30h5v8h-5" />
    </svg>
  );
}
