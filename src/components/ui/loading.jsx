import { Loader2 } from "lucide-react";

export function LoadingSpinner({ className, size = "default" }) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <Loader2
      className={`animate-spin text-primary ${sizeClasses[size]} ${className}`}
    />
  );
}

export function LoadingPage() {
  return (
    <div className="h-[calc(100vh-3.5rem)] w-full flex items-center justify-center">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export function LoadingOverlay() {
  return (
    <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

export function LoadingInline({ size = "sm" }) {
  return (
    <div className="flex items-center justify-center p-4">
      <LoadingSpinner size={size} />
    </div>
  );
}
