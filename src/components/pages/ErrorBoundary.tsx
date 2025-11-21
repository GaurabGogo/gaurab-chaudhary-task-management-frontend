// app/components/ErrorBoundary.tsx
"use client";

import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Component, ErrorInfo, ReactNode } from "react";
import { toast } from "sonner";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundaryPage extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
    toast.error("Something went wrong. Please try again later.");
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <section className="w-full flex min-h-screen flex-col items-center justify-center bg-red-50 p-6">
          <div className="max-w-md w-full text-center space-y-6">
            <AlertTriangle className="mx-auto h-16 w-16 text-red-600" />
            <h1 className="text-2xl font-semibold text-red-700">
              Something went wrong.
            </h1>
            <Button
              variant="default"
              size="lg"
              className="flex items-center justify-center gap-2 mx-auto"
              onClick={() => (window.location.href = "/login")}
            >
              <ArrowLeft className="h-5 w-5" />
              Go Back
            </Button>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundaryPage;
