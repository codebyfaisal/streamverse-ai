import { AlertCircle, RefreshCcw } from "lucide-react";
import { Button } from "./button";
import { Link } from "react-router-dom";

export function ErrorMessage({
  title = "Something went wrong",
  message = "An error occurred while processing your request.",
  retry,
  home,
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-4">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h2 className="text-2xl font-bold tracking-tight mb-2">{title}</h2>
      <p className="text-muted-foreground mb-6 max-w-md">{message}</p>
      <div className="flex gap-4">
        {retry && (
          <Button onClick={retry} variant="outline">
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        )}
        {home && (
          <Link to="/">
            <Button>Go Home</Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export function ErrorPage({
  title = "Page Error",
  message = "We couldn't load this page.",
  retry,
}) {
  return (
    <div className="h-[calc(100vh-3.5rem)] w-full flex items-center justify-center">
      <ErrorMessage title={title} message={message} retry={retry} home />
    </div>
  );
}

export function ErrorInline({ message = "An error occurred.", retry }) {
  return (
    <div className="rounded-lg border border-destructive/50 p-4">
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-4 w-4" />
        <p className="text-sm font-medium">{message}</p>
        {retry && (
          <Button size="sm" variant="ghost" className="ml-auto" onClick={retry}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
