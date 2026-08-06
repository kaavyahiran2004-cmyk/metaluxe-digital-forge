import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Unhandled UI error", error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-paper grain flex items-center justify-center px-6">
        <div className="max-w-md w-full border-2 border-border bg-sheet press">
          <div className="nameplate">Fault / ERR-500</div>
          <div className="p-8 space-y-4">
            <h1 className="font-display text-2xl font-bold text-foreground">
              Something came loose
            </h1>
            <p className="text-muted-foreground">
              A part of this page failed to load. Reload to continue, or email
              amitjain@alsandouqalahmar.com and we'll help directly.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="h-11 px-6 bg-primary text-primary-foreground border border-border font-mono text-xs uppercase tracking-[0.18em] press-sm hover:bg-rust hover:text-accent-foreground transition-colors duration-150"
            >
              Reload Page
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
