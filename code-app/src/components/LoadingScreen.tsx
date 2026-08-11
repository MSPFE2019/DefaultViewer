import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LOADING_DURATION_MS = 1500;

/**
 * Recreates `scr_loading`: an indeterminate progress indicator that is shown
 * briefly on start-up before automatically navigating to the Main screen
 * (the canvas app used a 3s `Timer` control with `OnTimerEnd` navigation).
 */
export function LoadingScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => navigate("/main", { replace: true }), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="loading-spinner" aria-hidden="true" />
      <p className="loading-text">Scanning Default Environment...Standby</p>
    </div>
  );
}
