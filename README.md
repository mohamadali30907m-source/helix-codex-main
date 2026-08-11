" Helix Codex "

Helix Codex is an interactive learning and robot-control project built around one idea: 
make science feel less like something you only read about and more like something you can interact with.

The project combines a React/Vite frontend with a separate Python FastAPI backend. The frontend contains the learning interface, telemetry dashboard, and teleoperation controls, while the backend handles the robot state and control API.

The project was developed as two separate repositories:

- Frontend: <https://github.com/mohamadali30907m-source/helix-codex-main>
- Backend:  <https://github.com/mohamadali30907m-source/helix-codex-backend>
- Website:  <https://nur-tech-academy.vercel.app>
- DOCs :    <https://drive.google.com/drive/folders/1gwiHyRosJrpIGGCNq3po-vV_tVlA5K9T?usp=sharing>
            <https://youtu.be/FhJd8ZqvivE>


The separation is intentional> The frontend is responsible for the user experience and visualization,
 while the backend provides the robot-control layer.



1- What it does

Helix Codex currently includes four main areas:

- "Landing" — the main project experience with the DNA visualization and project identity.
- "Modules" — interactive learning modules with progress tracking.
- "Dashboard" — robot telemetry and joint state information.
- "Teleoperation" — the main control interface for the robot.

The Teleoperation page is the most important technical part of the project....
 It combines a virtual 3D robot with controls that communicate with the Python backend



2- How the system is structured


                    Helix Codex
                         │
             ┌───────────┴───────────┐
             │                       │
        React Frontend          Python Backend
        helix-codex-main       helix-codex-backend
             │                       │
             │ HTTP API              │
             └───────────►───────────┘
                         │
                   Robot State


During local development, the frontend runs through Vite and the backend runs through Uvicorn.

The frontend normally runs around:

<http://localhost:5174>

The backend runs on:

<http://127.0.0.1:8000>


The exact frontend port can change if the requested port is already occupied.
 This became an important issue during development and is one of the reasons the backend CORS configuration was changed
 to support Vite development ports instead of depending on one fixed port.



3- Tech Stack

- Frontend

- React
- Vite
- React Router
- JavaScript / JSX
- CSS
- React Three Fiber
- Three.js
- @react-three/drei
- Spline
- Space Grotesk
- Fredoka One

- Backend

- Python
- FastAPI
- Uvicorn
- REST API
- CORS configuration


4- Frontend Structure

src/
├── components/
│   ├── layout/
│   │   └── Navbar.jsx
│   ├── ui/
│   │   ├── DNAViewer.jsx
│   │   └── PrimaryButton.jsx
│   └── VirtualRobot/
│       └── VirtualRobot.jsx
│
├── pages/
│   ├── Landing.jsx
│   ├── Teleop.jsx
│   ├── Dashboard.jsx
│   └── Modules.jsx
│
├── styles/
│   └── design-tokens/
│
├── App.jsx
└── index.css

    The project was originally much less organized.
A significant part of the development process was separating the interface into clearer components and pages instead of continuing 
to patch everything through global CSS.



5- Backend

The backend lives in its own repository:

helix-codex-backend/
├── server/
│   └── main.py
├── requirements.txt
└── ...


The FastAPI server exposes the robot-control API.

Current endpoints include:

GET  /api/robot/status

POST /api/robot/connect
POST /api/robot/disconnect
POST /api/robot/command
POST /api/robot/joint
POST /api/robot/gripper
POST /api/robot/reset
POST /api/robot/emergency-stop


The backend maintains the robot state:
 including connection status, operating mode, emergency-stop state, battery information, joint positions, and gripper state.
 The joint API also has limits so that arbitrary values cannot simply be sent to the robot.



6- Teleoperation

The Teleoperation interface is built around a four-joint robot model:

- LS — Left Shoulder
- LA — Left Arm
- RS — Right Shoulder
- RA — Right Arm

It also includes gripper control.

The interface contains:

Connection Controls
        │
        ▼
    3D Robot
        │
        ├── Joint Controls
        ├── Gripper
        └── System Status

The frontend synchronizes its state with the backend instead of assuming that local UI state is always correct.

The frontend polls the backend periodically during development to keep the displayed robot state synchronized.


7- Safety

One of the important parts of the backend is the emergency-stop state.

The Emergency Stop is not treated as just a red button in the UI.
When the emergency-stop state is active, the frontend prevents normal robot controls from continuing,
while the backend maintains the corresponding safety state.

This was one of the areas where I learned that a robot interface cannot be treated like an ordinary dashboard.
 UI state and actual control state have to agree.



8- Design System

I designed the interface in Figma before doing the final visual pass.

The final visual system uses:

- Background: `#0B0F19`
- Electric Blue: `#4000FF`
- Neon Green: `#39FF14`
- Red: `#FF0037`
- Purple: `#B026FF`

Typography:

- Space Grotesk — primary interface typography
- Fredoka One — project/logo typography

The spacing system follows:

4
8
16
24
32
48
64
96 px

The goal was to avoid the generic "dark website" appearance of the first version and 
make the interface feel like one coherent product.



9- Development Story

The first version of the project was much rougher than the current version.

The biggest lesson was that having a Figma design is not enough. The implementation has to actually follow the design.

The first submission exposed several problems:

- the README did not properly explain the project;
- the backend repository did not contain enough visible development work;
- the frontend design did not match the intended Figma design;
- the Git history did not communicate the development process clearly enough.

Instead of treating the rejection as something to work around, I used it as a checklist for the next version.

I rebuilt the backend documentation, continued developing the backend itself,
 rebuilt the frontend design system, improved the Teleoperation interface, added the virtual robot,
 cleaned the Git history, and tested the frontend/backend integration locally.

- what I’m fixing next:

I shipped this version as a functional MVP within the hackathon timeline. The main robot control and backend synchronization are working, but there are still a few UI details that I didn't have enough time to finish the way I wanted:

1- Landing Page CTA Button: The main button is still using basic styling. I originally designed it with a glowing 

gradient border and neon effects in Figma, so I'm planning to bring those details into the actual CSS and also fix 

some of the spacing in the hero section.

2- Spline DNA Watermark: The "Built with Spline" badge can overlap with the center of the DNA model on some screen 

sizes. I'm working on the canvas wrapper and the overlay positioning so the model stays clear.

3- Mobile Layout & Real-time Updates: The Teleoperation layout looks good on desktop, but some parts still feel too

 tight on smaller screens. The current HTTP polling is also working for state updates, but I want to move to 
 
 WebSockets later so joint movements can be updated with less delay.


10- Some Problems I Had to Solve

1.10 Vite port changes

At one point Vite was expected to run on port `5174`, but that port was already occupied.

Vite automatically moved the development server to another port.

That caused a CORS problem because the backend had originally been configured around one fixed frontend origin.

The solution was to make the development CORS configuration handle the Vite development ports instead of assuming that only one port would ever be used.



2.10 Teleoperation state synchronization

The gripper originally updated local state before the backend request had successfully synchronized.

That could make the interface display a state that did not necessarily match the backend.

I changed the flow so that the UI state is updated from the synchronized robot state instead.



3.10 Six joints vs four joints

The Dashboard originally represented six joints:

J1
J2
J3
J4
J5
J6

while the actual robot interface used four joints.

That was a data-model problem rather than simply a visual problem.

The Dashboard was changed to represent the same four-joint model used by Teleoperation.


4.10 Teleoperation layout

The first Teleoperation layout was essentially a vertical stack.

The buttons were too wide, the robot preview was constrained, and the joint controls were difficult to scan.

I changed the layout to a grid:

┌────────────┬─────────────────────┬────────────┐
│ Connection │                     │   Status   │
│            │     3D Robot        │            │
│            │                     │            │
├────────────┴─────────────────────┼────────────┤
│        Joint Controls            │  Gripper   │
└──────────────────────────────────┴────────────┘

This made the main control area much easier to understand.


11- 3D Robot

The virtual robot was built using React Three Fiber and primitive geometries.

The model contains:

- body geometry;
- segmented arms;
- shoulder joints;
- elbow components;
- forearms;
- display/face elements;
- servo components;
- status lighting;
- scene lighting.

The robot is intended to act as a visual twin of the physical control system.
The goal is not to make a perfect industrial CAD model. The goal is to make the relationship between
 the controls and the robot state immediately understandable.



12- DNA Visualization

The landing page uses a 3D DNA visualization created with Spline.

During development, the DNA initially rotated incorrectly.

A normal CSS rotation made it behave more like a flat object rotating around the screen rather than rotating around its own axis.

I moved the rotation behavior to the Spline runtime so the animation behaved more like the intended 3D motion.

The Spline badge also required additional work because it is injected dynamically rather than behaving like an ordinary DOM element.



13- Running the project

- Frontend

Clone the frontend repository:

git clone https://github.com/mohamadali30907m-source/helix-codex-main.git
cd helix-codex-main


Install dependencies:

npm install


Start the development server:

npm run dev


Build the production version:


npm run build




- Backend

Clone the backend repository:


git clone https://github.com/mohamadali30907m-source/helix-codex-backend.git
cd helix-codex-backend


Create the virtual environment:


python -m venv venv


Windows:

.\venv\Scripts\Activate.ps1

Install dependencies:

pip install -r requirements.txt


Start FastAPI:

uvicorn server.main:app --reload --port 8000


14- Connecting the two repositories locally

With both servers running:

1. Open the frontend.
2. Navigate to `/teleop`.
3. Start the backend on port `8000`.
4. Use the connection control.
5. Verify the robot status.
6. Test joint movement and gripper control.
7. Test Emergency Stop and Reset.

A simple backend health check can also be performed from the browser console:

fetch("http://127.0.0.1:8000/api/robot/status")
  .then(r => {
    console.log("HTTP STATUS:", r.status);
    return r.json();
  })
  .then(data => console.log("BACKEND RESPONSE:", data))
  .catch(err => console.error("BACKEND ERROR:", err));

A successful response confirms that the frontend environment can reach the local backend.


15- Deployment

The frontend is deployed using Vercel.

Production deployment is generated from the frontend repository after a successful production build.

The local production build is verified with:

npm run build

The generated `dist/` directory is a Vite build artifact. It is not the source of truth for the project;
 the source files remain the important part of the repository.


16- Evidence

Development evidence is kept alongside the project documentation.

The evidence includes:

- Figma design work;
- screenshots of early and final interfaces;
- screenshots of debugging sessions;
- screenshots of the Teleoperation interface;
- screenshots of the Dashboard and Modules pages;
- development videos;
- deployment/build results;
- backend API testing;
- Git commits and repository history.

- Screenshots 

Example:

  <https://drive.google.com/drive/folders/1gwiHyRosJrpIGGCNq3po-vV_tVlA5K9T?usp=sharing>
  <https://youtu.be/FhJd8ZqvivE>


17- Current Status

The project has reached a working frontend/backend integration stage.

The frontend contains the main product interface, the backend contains the robot-control API,

and the two repositories are maintained separately.

There are still areas that can be improved in future iterations, 

especially real-time communication and further responsive optimization.

The project is intentionally treated as an ongoing build rather than a finished idea.


18- Credits

Project: Helix Codex

Frontend: React + Vite

Backend: Python + FastAPI

3D: React Three Fiber / Three.js

DNA visualization: Spline

Design: Figma

Built for Hack Club Horizons.