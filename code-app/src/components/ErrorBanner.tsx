interface ErrorBannerProps {
  message: string;
}

/** Simple, accessible error state, announced to assistive technology via role="alert". */
export function ErrorBanner({ message }: ErrorBannerProps) {
  return (
    <div className="error-banner" role="alert">
      <strong>Something went wrong:</strong> {message}
    </div>
  );
}
