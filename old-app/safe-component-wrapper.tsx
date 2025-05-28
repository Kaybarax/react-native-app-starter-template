/**
 * @authored by Kaybarax
 * Twitter @_ https://twitter.com/Kaybarax
 * Github @_ https://github.com/Kaybarax
 * LinkedIn @_ https://linkedin.com/in/kaybarax
 */

import React, { ErrorInfo, ReactNode, useState } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode; // Fallback UI to show during an error
}

// Internal class component that handles the error boundary functionality
class ErrorBoundaryInner extends React.Component<
  ErrorBoundaryProps & { onError: (error: Error | null, hasError: boolean) => void },
  { hasError: boolean }
> {
  constructor(props: ErrorBoundaryProps & { onError: (error: Error | null, hasError: boolean) => void }) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error: Error) {
    // Update state so the next render shows the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error if needed, e.g., to an error reporting service
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // Pass the error state to the parent functional component
    this.props.onError(error, true);
  }

  render() {
    if (this.state.hasError) {
      // Render the fallback UI if an error occurred
      return this.props.fallback;
    }

    // Otherwise, render children
    return this.props.children;
  }
}

// Functional wrapper component
const SafeComponentWrapper = (props: ErrorBoundaryProps) => {
  const [error, setError] = useState<Error | null>(null);
  const [hasError, setHasError] = useState(false);

  const handleError = (error: Error | null, hasError: boolean) => {
    setError(error);
    setHasError(hasError);
  };

  return <ErrorBoundaryInner {...props} onError={handleError} />;
};

export default SafeComponentWrapper;
