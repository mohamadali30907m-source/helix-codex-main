import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing";
import Modules from "./pages/modules";
import Dashboard from "./pages/dashboard";
import Teleop from "./pages/teleop";
import VirtualRobotTest from "./VirtualRobotTest";

function App() {
  const [systemState, setSystemState] = useState({
    isOnline: true,
    version: "1.0.0",
    coreStatus: "ACTIVE",
  });

  const handleInitializeNode = () => {
    setSystemState((prev) => ({
      ...prev,
      coreStatus:
        prev.coreStatus === "ACTIVE"
          ? "SYNCING..."
          : "ACTIVE",
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

      <Route
        path="/modules"
        element={<Modules />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/teleop"
        element={<Teleop />}
      />

      <Route
        path="/virtual-robot"
        element={<VirtualRobotTest />}
      />
    </Routes>
  );
}

export default App;