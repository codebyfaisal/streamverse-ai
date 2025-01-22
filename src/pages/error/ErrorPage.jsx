import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  Ban,
  FileWarning,
  Home,
  RefreshCcw,
  WifiOff,
} from "lucide-react";

const errorTypes = {
  404: {
    icon: Ban,
    title: "Page not found",
    description: "Sorry, we couldn't find the page you're looking for.",
  },
  500: {
    icon: AlertCircle,
    title: "Server error",
    description: "Oops! Something went wrong on our end.",
  },
  offline: {
    icon: WifiOff,
    title: "No internet connection",
    description: "Please check your internet connection and try again.",
  },
  error: {
    icon: FileWarning,
    title: "An error occurred",
    description: "We encountered an unexpected error.",
  },
};

function ErrorPage({ status = "error", message }) {
  const errorType = errorTypes[status] || errorTypes.error;
  const ErrorIcon = errorType.icon;

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex flex-col">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md text-center">
          <div className="w-full flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl" />
              <div className="relative bg-background border rounded-full p-4">
                <ErrorIcon className="h-12 w-12 text-primary" />
              </div>
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight mb-2">
            {errorType.title}
          </h1>
          <p className="text-muted-foreground mb-8">
            {message || errorType.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Button asChild>
              <Link to="/">
                <Home className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              <RefreshCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default ErrorPage;
