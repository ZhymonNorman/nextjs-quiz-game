import { Component } from 'react';

class ErrorBoundary extends Component<any, { hasError: boolean }> {
  constructor(props: any) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <>
          <div className="border-top-0 text-bold w-full bg-red-700 py-2 text-center text-white">
            There has been an unknown error. Please refresh or
            <button
              type="button"
              className={`hover:opacity75 ml-1 inline-flex transform-gpu cursor-pointer items-center justify-center rounded-lg border border-transparent py-1 text-base font-bold uppercase text-white transition duration-500 ease-in-out hover:scale-105`}
              onClick={() => this.setState({ hasError: false })}
            >
              Try again
            </button>
          </div>
          {this.props.children}
        </>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default ErrorBoundary;
