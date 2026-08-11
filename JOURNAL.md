" Helix Codex — Development Journal "

This is my development journal for Helix Codex.

I am keeping the frontend and backend in separate repositories because they have different responsibilities:

- Frontend: <https://github.com/mohamadali30907m-source/helix-codex-main>
- Backend:  <https://github.com/mohamadali30907m-source/helix-codex-backend>

Hours are tracked through Hackatime.

 Phase 1 — The First Attempt

The first version of Helix Codex was built much faster than I should have built it.

I had the general idea, a Figma direction, and the basic pages, but I focused too much on getting something visible and not enough on making the repository understandable.


 Phase 2 — Backend

I decided to build the backend as a real part of the project instead of treating it as something hidden behind the frontend.

I used FastAPI and Uvicorn to create a local API for the robot.

The backend exposes endpoints for:

- robot status;
- connection;
- disconnection;
- commands;
- joint movement;
- gripper control;
- reset/home position;
- emergency stop.

The status endpoint became especially useful because it gave the frontend a single source of truth for the current robot state.

I also added safety checks around joint movement and emergency-stop behavior.



- The CORS problem

One of the most annoying problems during development was CORS.

I initially allowed a specific Vite development origin.

Then Vite started using another port because the original port was already occupied.

For example:

Expected:
localhost:5174

Actual:
localhost:5175

The frontend was running correctly, and the backend was running correctly, but they could not communicate.

At first this looked like a frontend bug.

It was not.

The actual problem was that the backend did not trust the frontend's new development origin.

I changed the development CORS configuration so it could handle the changing Vite development ports.

That was one of the first times I understood that a local development environment is not always fixed just because I normally start it the same way.



Phase 3 — Building the Virtual Robot

After the API was working, I wanted the frontend to have a visual representation of the robot instead of showing only numbers and sliders.

I built the virtual robot using React Three Fiber.

The model was assembled from primitive geometries rather than relying on an external robot model.

I added:

- the main body;
- arm segments;
- joints;
- forearms;
- a face/display;
- servo components;
- lights;
- materials.

The first version looked much worse than I expected.

The robot was basically a collection of gray shapes.

The geometry existed, but there was no visual hierarchy.

I solved this by working on materials and lighting instead of adding more geometry immediately.

The screen and status elements received emissive materials, and the lighting was adjusted to give the model more depth.

I also learned an important React Three Fiber lesson: constantly updating React state inside the render loop is not the same thing as updating an object in a 3D scene.

Using refs for values that needed to change every frame made the animation much more stable.



Phase 4 — Teleoperation

The Teleoperation page became the main integration point between the frontend and backend.

I wanted the page to answer three questions immediately:

1. Is the robot connected?
2. What is the robot doing?
3. What will happen if I move a control?

The controls were stacked vertically and some buttons occupied the entire available width.

The robot preview also became too constrained.

I rebuilt the page around a CSS Grid layout.

The main structure became:

Connection | 3D Robot | Status
            |
       Joint Controls
            |
         Gripper

The page also received clearer status indicators and more consistent spacing.


Phase 5 — Frontend <> Backend Integration

Once both sides existed, I started testing the complete flow instead of testing each side independently.

I connected the Teleop controls to the backend API.

The frontend began polling the backend periodically so the displayed state could be synchronized.

I tested the main sequence:

Connect
  ↓
Start
  ↓
Joint movement
  ↓
Gripper
  ↓
Stop
  ↓
Emergency Stop
  ↓
Reset


One bug appeared in the gripper logic.

The frontend was changing the local value before the backend state had been synchronized.

That meant the UI could temporarily show something different from the actual backend state.

I changed the update flow so the UI follows the synchronized robot state.

That was a small bug, but it taught me an important lesson:

> In a control interface, local UI state should not automatically be treated as the real device state.


Phase 6 — Dashboard Data Model

During the review of the Dashboard, I noticed that it showed six joints:

J1
J2
J3
J4
J5
J6

The actual robot interface used four joints:

LS
LA
RS
RA


This was not just a CSS problem.

It meant that two parts of the application were using different assumptions about the robot.

I changed the Dashboard to use the same four-joint model.

I also adjusted the progress-bar calculation so the displayed percentage correctly represents the angle range.

This made the Dashboard and Teleoperation interface describe the same robot instead of two different imaginary robots.


Phase 7 — Figma vs Reality

At this point I compared the actual website to the Figma design again.

The difference was obvious.

The website technically worked, but it did not look like the product I had designed.

I stopped adding features for a while and worked on the design system.

The major changes included:

- changing the background from `#030712` to `#0B0F19`;
- replacing the generic monospace typography with Space Grotesk;
- rebuilding the navbar;
- changing the landing-page hierarchy;
- positioning the DNA visualization above the main title;
- rebuilding the main CTA;
- improving card spacing;
- adding consistent glass-card styling;
- applying the same visual language to Dashboard and Modules.

This was probably the most important visual stage of the project.

I learned that a design system is not something I should add after the application is finished.

It should guide the implementation from the beginning.



Phase 8 — DNA Animation

The DNA visualization created another small but interesting problem.

A normal CSS rotation did not produce the 3D rotation I wanted.

It looked more like a flat object rotating like a clock hand.

I switched the animation to the Spline runtime so the object could rotate around the intended 3D axis.

Another problem was the Spline badge.

It was not behaving like a normal DOM element, so normal CSS selectors were not enough to reliably control it.

I experimented with different approaches and eventually used an overlay approach while continuing to investigate the runtime behavior.



Phase 9 — Git Cleanup

The repository history was also something I needed to improve.

During development I created several backup files while experimenting with the backend.

Those files were not part of the actual application.

I cleaned up the repository and added patterns to `.gitignore` for backup files and temporary scripts.

Examples included:

server/*.backup
server/*.before-joint
server/*.full-backup

I also started making commits around logical changes instead of leaving everything as one giant untracked development state.



Phase 10 — Production Build

Before deployment, I started treating the production build as a separate test.

I ran:

npm run build


The local Vite build completed successfully.

There were warnings about empty design-token CSS files and large JavaScript chunks.

Those warnings did not stop the local build.

However, when deploying to Vercel, the first production build failed because Vercel could not resolve imports such as:

./pages/Modules
./pages/Dashboard
./pages/Teleop

The local Windows filesystem was not exposing the same case-sensitivity behavior as the Linux build environment used by Vercel.

The actual files were:

dashboard.jsx
modules.jsx
teleop.jsx


while the imports used capitalized names.

This was a very useful deployment bug because the application worked locally but failed in the actual production environment.

I corrected the import paths to match the real filenames exactly.


Phase 11 — Deployment Testing

After fixing the production build issue, I verified the frontend build again locally.

The build produced the Vite `dist/` directory.

The important thing I learned here is that `dist/` is an output artifact.

It is generated by:

npm run build


It is not the source code of the application.

The source remains in `src/`.

For deployment, Vercel runs the build process itself and serves the resulting production output.


Phase 12 — Final Backend Integration Test

I tested the backend directly from the browser console.

First I requested:

GET /api/robot/status


The server returned HTTP `200`.

The response included the robot state:

online: true
connected: false
mode: idle
emergency_stop: false
battery: 100

Then I called:

POST /api/robot/connect

The response changed to:

online: true
connected: true
mode: idle
emergency_stop: false
battery: 100

I then requested the status endpoint again and confirmed that the connection state remained synchronized.

This gave me confidence that the frontend was not simply displaying fake UI feedback: it was actually communicating with the running backend during local testing.


- What changed compared with the first attempt

The biggest changes were not one feature.

They were changes in how I approached the project.

- Before

- rushed implementation;
- weak documentation;
- backend work was not visible enough;
- frontend did not match Figma;
- inconsistent robot data;
- messy CSS;
- development assumptions were too rigid;
- production environment was not tested enough.

-  Now

- frontend and backend are separate and documented;
- backend contains actual robot-control API work;
- frontend and backend have been tested together;
- robot state has a defined model;
- Teleoperation has a proper layout;
- Dashboard uses the same four-joint model;
- the UI follows a defined Figma design system;
- Git contains meaningful development history;
- temporary files are ignored;
- local production builds are tested;
- Vercel deployment problems were investigated rather than ignored.



-   Reflection

The biggest lesson from this project was that getting a page to work is only one part of building software.

The first version taught me what happens when I focus on the result that is visible on my screen and forget that someone else has to understand the repository.

The second version forced me to think about the whole system:

Design
  ↓
Frontend
  ↓
API
  ↓
Robot State
  ↓
Testing
  ↓
Documentation
  ↓
Deployment

I also learned that bugs are not always where they first appear.

The CORS problem looked like a frontend problem.

The Dashboard problem looked like a design problem.

The Vercel problem looked like a deployment problem.

In each case, the actual cause was somewhere else in the system.

That changed the way I debug.

Instead of immediately changing the visible part, I try to trace the complete flow and find where the assumption actually breaks.


-   Next Steps

The project is working, but there are still improvements I want to make.

Some of the next ideas are:

- replace polling with WebSockets for real-time state updates;
- improve mobile Teleoperation layout;
- improve production deployment reliability;
- continue improving the virtual robot;
- add richer telemetry;
- eventually explore inverse kinematics.

The current version is not the end of Helix Codex.

It is the version where the architecture, interface, backend, and documentation finally started to feel like one project.