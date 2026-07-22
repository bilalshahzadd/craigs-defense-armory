"use client";

export function ConfirmButton({
  children,
  className,
  message = "Are you sure? This cannot be undone.",
}: {
  children: React.ReactNode;
  className?: string;
  message?: string;
}) {
  return (
    <button
      type="submit"
      className={className}
      onClick={(e) => {
        if (!window.confirm(message)) e.preventDefault();
      }}
    >
      {children}
    </button>
  );
}
