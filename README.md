# Helix Codex

Helix Codex is an interactive biology learning platform combined with a 4-joint robot teleoperation interface built for Hack Club Horizons.
![image alt](https://github.com/mohamadali30907m-source/helix-codex-main/blob/7b04a7a6933c7bb768c107142e664b5130cadcf2/Screenshot%20(406).png)


Website: [Helix Codex](https://helix-codex1.vercel.app)
Frontend: [GitHub](https://github.com/mohamadali30907m-source/helix-codex-main)
Backend: [GitHub](https://github.com/mohamadali30907m-source/helix-codex-backend)
Screenshots & docs: [Google Drive](https://drive.google.com/drive/folders/1gwiHyRosJrpIGGCNq3po-vV_tVlA5K9T?usp=sharing)
Videos: [Youtube](https://youtu.be/FhJd8ZqvivE)



## Features

`Virtual 3D Robot Teleop:` Control a 4-joint robot (left/right shoulders, left/right arms, and gripper) built with React Three Fiber.
`3D DNA Viewer:` Interactive DNA model rendered using Spline.
`Safety Sync:` Real-time emergency stop button that hard-locks controls on both client and server.
`Telemetry Dashboard:` Live status metrics for battery, connection, and joint angles.
![image alt](https://github.com/mohamadali30907m-source/helix-codex-main/blob/6e5454f8eae8e2058a717531f98b2a6264ceaf21/Screenshot%20(408).png)

## Architecture 

The project uses a two-repo setup connected via HTTP APIs:

`Frontend:` React, Vite, React Three Fiber (Three.js), Spline, React Router, CSS Grid/Tokens.
`Backend:` Python + FastAPI running on `127.0.0.1:8000`.

`Note:` Helix Codex project, I built it in two parts:
        a frontend and a backend. the frontend is in `HTML Projects` folder in [GitHub main Repo](https://github.com/mohamadali30907m-source/helix-codex-main), while the backend is in `Python Projects` folder in [GitHub backend Repo](https://github.com/mohamadali30907m-source/helix-codex-backend) (I was built it with Python and FastAPI to connect with the Web). Hackatime tracks the time under these folder names separately, but both are part of the same Helix Codex project and work together through the FastAPI backend.

    Also, the current version is still a work in progress. I'm still developing the project, So the version submitted here is the current working version, not the final version of the project.
  
```text
React Frontend (Vite + 3D) ... HTTP ... FastAPI Backend (Robot State)
```

## Problems & How I Fixed Them

`State Sync Bug:` clicking the gripper updated the UI instantly before the server responded. If the backend failed, the UI showed a false state. 
`Fix:` Rewrote it so the UI only updates after backend API confirmation.

`3D Animation Stutter:` Updating React state inside the Three.js render loop caused constant re-renders and lag. 
`Fix:` Switched to React `refs` for values that update every frame.

`Vite Port Conflicts & CORS:` Vite jumped to port `5175` when `5174` was busy, causing the backend to reject requests. `Fix:` Updated FastAPI CORS to accept dynamic local origins instead of a hardcoded port.

`Vercel Case Sensitivity:` Build succeeded locally on Windows but failed on Vercel's Linux server due to casing mismatches in file imports (e.g., `Dashboard.jsx` vs `dashboard.jsx`). 
`Fix:` Normalized all file imports to match exact file casing.

`Dashboard UI Mismatch:` Early dashboard mockups showed 6 joints, but the actual robot model only had 4. 
`Fix:` Updated the dashboard grid and recalculated progress bar angles to accurately match the 4-joint system.

`DNA 3D Axis Rotation:` Rotating the Spline DNA helix via standard CSS made it spin flat like a 2D clock hand. 
`Fix:` Moved the rotation logic directly into the Spline 3D runtime environment.


## Quick Start / Local Setup

### 1. Frontend

```bash
git clone https://github.com/mohamadali30907m-source/helix-codex-main.git
cd helix-codex-main
npm install
npm run dev
```

### 2. Backend

```bash
git clone https://github.com/mohamadali30907m-source/helix-codex-backend.git
cd helix-codex-backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn server.main:app --reload --port 8000
```



## Built For

Built for `Hack Club Horizons`. Tracked ~52 hours using Hackatime (including a full design rebuild from scratch using custom design tokens).
