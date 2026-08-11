import { Navigate, Route, Routes } from "react-router-dom";
import { AboutScreen } from "./components/AboutScreen";
import { LoadingScreen } from "./components/LoadingScreen";
import { MainScreen } from "./components/MainScreen";

/**
 * Top-level screen composition, recreating the three screens of the
 * original canvas app (`scr_loading`, `scr_Main`, `scr_About`) using
 * client-side routes instead of Power Fx `Navigate()` calls.
 */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoadingScreen />} />
      <Route path="/main" element={<MainScreen />} />
      <Route path="/about" element={<AboutScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
