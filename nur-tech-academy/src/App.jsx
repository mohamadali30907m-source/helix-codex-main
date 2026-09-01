import { Routes, Route, useNavigate } from "react-router-dom";
import { useState } from "react";
import Landing from "./pages/Landing";
import Modules from "./pages/modules";
import Dashboard from "./pages/dashboard";
import Teleop from "./pages/teleop";
import VirtualRobotTest from "./VirtualRobotTest";

function App() {
  const navigate = useNavigate();
  const [systemState, setSystemState] = useState({
    isOnline: true,
    version: "1.0.0",
    coreStatus: "ACTIVE",
  });

  const handleInitializeNode = () => {
    setSystemState((prev) => ({
      ...prev,
      coreStatus: "ACTIVE",
    }));
    navigate("/modules");
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
      <Route path="/virtual-robot" element={<VirtualRobotTest />} />
    </Routes>
  );
}

export default App;