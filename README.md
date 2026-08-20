 Helix Codex

Website: [Helix Codex](https://helix-codex1.vercel.app)
Frontend: [GitHub](https://github.com/mohamadali30907m-source/helix-codex-main)
Backend: [GitHub](https://github.com/mohamadali30907m-source/helix-codex-backend)
Screenshots & docs: [Google Drive](https://drive.google.com/drive/folders/1gwiHyRosJrpIGGCNq3po-vV_tVlA5K9T?usp=sharing)
Videos: [Youtube](https://youtu.be/FhJd8ZqvivE)



I built this for Hack Club Horizons. It started as a biology learning platform idea but grew into a robot control interface too  the whole point was making science feel like something you interact with instead of just reading about.

The site has learning modules and a telemetry dashboard, but the part I'm proud of is the Teleoperation page. You can connect to a robot with four joints (left shoulder, left arm, right shoulder, right arm) and a gripper.

I Started design in Figma before writing the code. The first version looked nothing like my design it was basically a generic dark website with CSS patched everywhere and no real hierarchy. I had to stop adding features, rebuild the entire design system from scratch, and start over. Background became #0B0F19, I switched to Space Grotesk for the UI and Fredoka One for the logo, and I set up spacing tokens at 4/8/16/24/32/48/64/96px. The accent colors are electric blue (#4000FF), neon green (#39FF14), red (#FF0037), and purple (#B026FF). That rebuild took about 2 days and was probably the most important part of the whole project.

 ## How it's split up

Two repos, intentionally. The frontend handles the UI and 3D stuff, the backend handles the robot state and API. They talk over HTTP.

```text
Helix Codex
     React Frontend (Vite)
           ( HTTP ──► Python Backend (FastAPI) )
                              ( Robot State )
```

1.Frontend: React + Vite, React Router for navigation, React Three Fiber + Three.js + @react-three/drei for the 3D robot, and Spline for the DNA helix on the landing page. The virtual robot is built from primitive geometries: a body, segmented arms, shoulder joints, forearms, a face/display, servo parts, and status lights. It's not meant to be a detailed CAD model. I only built enough geometry to make the robot and its controls easy to understand visually. It's not meant to be a detailed CAD model. I only built enough geometry to make the robot and its controls easy to understand visually.

2.Backend: Python + FastAPI running on 127.0.0.1:8000. Endpoints are GET /api/robot/status, POST /api/robot/connect, POST /api/robot/disconnect, POST /api/robot/command, POST /api/robot/joint (has limits so you can't send arbitrary values), POST /api/robot/gripper, POST /api/robot/reset, and POST /api/robot/emergency-stop. The backend tracks connection status, operating mode, emergency stop state, battery, joint positions, and gripper state.

The emergency stop is more than a red button in the UI. When it's active, the frontend blocks normal controls and the backend locks the safety state. I learned that the hard way after the gripper bug.

Project structure:

```text
src/
├── components/
│   ├── layout/Navbar.jsx
│   ├── ui/DNAViewer.jsx
│   ├── ui/PrimaryButton.jsx
│   └── VirtualRobot/VirtualRobot.jsx
├── pages/
│   ├── Landing.jsx
│   ├── Teleop.jsx
│   ├── Dashboard.jsx
│   └── Modules.jsx
├── styles/design-tokens/
├── App.jsx
└── index.css
```

 ## Running it locally

Frontend:
```bash
git clone https://github.com/mohamadali30907m-source/helix-codex-main.git
cd helix-codex-main
npm install
npm run dev
```
Backend:
```bash
git clone https://github.com/mohamadali30907m-source/helix-codex-backend.git
cd helix-codex-backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn server.main:app --reload --port 8000
```

Then open the frontend, go to `/teleop`, hit connect, and check the backend responds. Quick test from the browser console:
```bash
fetch("http://127.0.0.1:8000/api/robot/status")
  .then(r => r.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

 ## Things that broke

Vite ports and CORS. I hardcoded `localhost:5174` in the backend CORS config. Then one day Vite jumped to 5175 because 5174 was already taken. Everything looked broken and I spent maybe an hour thinking it was a frontend bug before realizing the backend was rejecting the new origin. Now the dev CORS config handles Vite's dynamic ports instead of assuming one fixed origin.

Gripper state sync. At first I was updating local React state immediately when you clicked the gripper button, then firing the API call in the background. The problem was obvious once I saw it: if the backend was slow or failed, the UI would show a state that didn't match reality. I flipped the flow so the UI updates from the synchronized backend state instead of assuming local state is truth. Small bug, but it changed how I think about control interfaces — local UI state shouldn't automatically be treated as the real device state.

Six joints to four joints. The dashboard originally showed J1 through J6. The actual robot interface only has four joints: LS, LA, RS, RA. So the dashboard and the teleop page were describing two different robots. I fixed the dashboard to use the same four-joint model and recalculated the progress bars so the percentage represents the real angle range.

Teleop layout. The first layout was a vertical stack. Buttons were too wide, the robot preview was tiny and constrained, and the joint controls were hard to scan. I rebuilt the whole page as a CSS grid, connection panel on the left, 3D robot in the center, status on the right, joint controls and gripper below. Much easier to understand at a glance.

Vercel case sensitivity. My local npm run build  worked fine. The first Vercel deployment failed because it couldn't resolve imports like ./pages/Dashboard  the actual files were lowercase (dashboard.jsx) but the imports used capitalized names. Windows didn't care. Vercel's Linux build environment did. Took me a while to figure out why it worked locally but broke in production.

DNA rotation. I tried rotating the DNA helix with CSS at first. It spun like a flat 2D clock hand instead of rotating around its own 3D axis. I had to move the animation into the Spline runtime. The "Built with Spline" badge was another annoyance. Spline adds it dynamically, so it didn't behave like a normal DOM element. I tried positioning it with regular CSS, but that wasn't reliable.

React Three Fiber performance. I was originally updating React state inside the render loop for robot movement. That made the animation stutter because constantly triggering React re-renders is not the same as updating an object in a 3D scene. Switching to refs for values that change every frame fixed it completely.


## What I still want to change

There are a few things I didn't get time to finish:

- Landing page: The CTA is still the simple version. In Figma I made a neon gradient border with a glow, but I haven't moved that version into CSS yet. The hero also has more empty space than I want, so I'll tighten the spacing around the DNA model and the CTA.

- Spline DNA: On smaller screens, the Spline "Built with" badge can end up over the middle of the DNA. The next fix is to separate the canvas wrapper from the overlay positioning instead of trying to position the badge with normal page CSS.

- Teleop on mobile: The desktop layout works well, but the same grid gets cramped when the screen gets narrow. I want to change the grid at smaller breakpoints and give the robot preview more room instead of just shrinking everything.

- Robot updates: Right now the frontend checks the backend with HTTP polling. It works, but there is a small delay when joint values change. Later I'd replace the polling with a WebSocket connection so the backend can push the new joint state to the UI immediately.

## AI disclosure
 
I used AI occasionally as a support tool while working on the project, mainly to help me think better through check ideas, and understand things when I got stuck.
and The design, implementation, debugging, and technical decisions were done by me.

## Time spent

Around 51 hours tracked through Hackatime. That includes the first rushed version, the full rebuild, frontend work, backend work, debugging, design, and fixing the production deployment issues.


Built for Hack Club Horizons.