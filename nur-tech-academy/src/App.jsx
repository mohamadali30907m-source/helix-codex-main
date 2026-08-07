import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing";
import Modules from "./pages/Modules";
import Dashboard from "./pages/Dashboard";
import Teleop from "./pages/Teleop";

function App() {
  const [systemState, setSystemState] = useState({
    isOnline: true,
    version: "1.0.0",
    coreStatus: "ACTIVE",
  });

  const handleInitializeNode = () => {
    setSystemState((prev) => ({
      ...prev,
      coreStatus: prev.coreStatus === "ACTIVE" ? "SYNCING..." : "ACTIVE",
    }));
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Landing
            isOnline={systemState.isOnline}
            version={systemState.version}
            coreStatus={systemState.coreStatus}
            onInitialize={handleInitializeNode}
          />
        }
      />
      <Route path="/modules" element={<Modules />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/teleop" element={<Teleop />} />
    </Routes>
  );
}

export default App;