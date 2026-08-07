import { useState } from "react";
import Landing from "./pages/Landing";

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
    <Landing
      isOnline={systemState.isOnline}
      version={systemState.version}
      coreStatus={systemState.coreStatus}
      onInitialize={handleInitializeNode}
    />
  );
}

export default App;