## Helix Codex

 Helix Codex isn't just biology platform you scroll through it's one you actually play with.

 I built it with a simple idea: you can't really understand life by just reading about it.

 So I created two worlds in one place. In the first, you dive into Dr. Selya's world interactive modules, real research scenarios, and 3D models you can pull apart and explore on your own. (STAY TUNED)

 In the second, you leave the screen. Through our Dashboard, you take live control of robot. What you do digitally happens physically, in real-time.

 Behind it all is a fast Python backend and a 3D twin built with React Three Fiber, but for U, it just feels like one thing "biology finally becoming hands-on".


![Helix Codex Preview](https://github.com/mohamadali30907m-source/helix-codex-main/blob/d106a53e1d945e60d6368bef9008cb35d75d3e23/Screenshot%20(450).png) [Web Demo](https://youtu.be/LN_3-osQtGM?si=I5QNA1-ZapzTb_FZ)


Website: [Helix Codex](https://helix-codex1.vercel.app)  
Frontend: [GitHub](https://github.com/mohamadali30907m-source/helix-codex-main)  
Backend: [GitHub](https://github.com/mohamadali30907m-source/helix-codex-backend)  
Screenshots & docs: [Google Drive](https://drive.google.com/drive/folders/1gwiHyRosJrpIGGCNq3po-vV_tVlA5K9T?usp=sharing)  
Videos: [Youtube](https://youtu.be/FhJd8ZqvivE) [Youtube](https://youtu.be/LN_3-osQtGM?si=I5QNA1-ZapzTb_FZ)

## How the Website & Robot Work Together

To clarify how the platform is structured and why the robot exists:

The website is designed to support two main ways of learning:

1. Digital Self-Study Mode (Currently Live): 
   The main landing page and modules are built for students who want to study biology online on their own. They can go through Dr. Selya's interactive research lessons, explore the 3D models, and learn the concepts step-by-step without needing any physical hardware.

2. Hardware & Robot Mode (3D Digital Twin & Hardware Preview): 
   The Teleop and Dashboard pages feature a 3D digital twin of a 4-joint robot i built with React Three Fiber to demonstrate control protocols and live status metrics. 
   Note: The physical robot arm and direct hardware integration are currently under active development, so these pages act as the interactive control simulation ready for future hardware.

3. Mimo AI Assistant: 
   Mimo is a virtual companion robot I'm building to act as a bridge between the student, the lessons, and the robot hardware. Mimo helps explain biology concepts during the lessons and will eventually help send interactive commands to the robot.

## Biology Modules & Learning Strategy

To give a clear update on where the learning content currently stands:

- Module 1 (Foundations of Human Biology): I have officially launched the initial working version of Module 1. It is a very basic first version designed to get the core interactive structure, Dr. Selya's lesson flow, and 3D models running. I'm actively refining it to make the experience richer and smoother.

- Upcoming Modules (In Progress): I am already working on the rest of the modules. Right now, I'm analyzing the curriculum data and mapping out better educational strategies to make complex biology concepts easier and more engaging for students. `Stay tuned` for the upcoming updates!

## How to Explore the Platform [vedio guide](https://youtu.be/LN_3-osQtGM?si=I5QNA1-ZapzTb_FZ)

Here is a quick guide on how to try out the main parts of the site:

1. Exploring Module 1:
   - Go to the "Modules" page from the menu at the top or Express button.
   - Click on any of Dr. Selya's lesson cards (like Chapter 1) to open the lesson.
   - You can use your mouse or touch screen to rotate, zoom, to interact.

2. Mimo Assistant Modal:
   - Click the "Ask Mimo" button to open the Mimo modal.
   - This shows how Mimo will work as a companion to explain biology concepts and help during lessons (`under development`).

3. Exploring Terminal & Dashboard:
   - Head over to the "Terminal" page to play with the virtual 3D 4-joint robot model.
   - Check out the "Dashboard" page to see the layout for real-time joint angles, system metrics, and the emergency stop feature.

## Features

Virtual 3D Robot Teleop: Control a robot built with React Three Fiber.  
3D models Viewer: Interactive 3D models.  
Interactive Lessons: Dr. Selya's scenario modules with interactive chapter cards and concept tags.  
Ask Mimo Companion: Modal interface showing the upcoming features for Mimo, the AI study assistant.  
Safety Sync: Real-time emergency stop button that hard-locks controls on both client and server.  
Telemetry Dashboard: Live status metrics for battery, connection, and joint angles.  


![Telemetry Dashboard](https://github.com/mohamadali30907m-source/helix-codex-main/blob/83f53635b45e78765681d7185790e6d631ab5650/Screenshot%20(447).png)

![Dr. Selya's scenario modules](https://github.com/mohamadali30907m-source/helix-codex-main/blob/4ce32a32f32d146a174d949aed2b10d76e503b53/Screenshot%20(572).png)

## Architecture 

The project uses a two-repo setup connected via HTTP APIs:

Frontend: React, Vite, React Three Fiber (Three.js), Spline, React Router, CSS Grid/Tokens.  
Backend: Python + FastAPI running on 127.0.0.1:8000.  

Note: Helix Codex project, I built it in two parts: a frontend and a backend. The frontend is in HTML Projects folder in GitHub main Repo, while the backend is in Python Projects folder in GitHub backend Repo. I built it with Python and FastAPI to connect with the Web. Hackatime tracks the time under these folder names separately, but both are part of the same Helix Codex project and work together through the FastAPI backend.

Repository Update: The Python FastAPI backend files (originally developed in helix-codex-backend) have now been moved directly into the Frontend directory of this main repository so that all codebase files are together in one place.

```text
React Frontend (Vite + 3D) ... HTTP ... FastAPI Backend (Robot State)

```

## Problems & How I Fixed Them

Vercel Case Sensitivity: Build succeeded locally on Windows but failed on Vercel's Linux server due to casing mismatches in file imports (like `dashboard.jsx` vs `Dashboard`). Fix: Fixed all file imports across the app to match exact file name casing.

State Sync Bug: clicking the gripper updated the UI instantly before the server responded. If the backend failed, the UI showed a false state. Fix: Rewrote it so the UI only updates after backend API confirmation.

3D Animation Stutter: Updating React state inside the Three.js render loop caused constant re-renders and lag. Fix: Switched to React refs for values that update every frame.

Vite Port Conflicts & CORS: Vite jumped to port 5175 when 5174 was busy, causing the backend to reject requests. Fix: Updated FastAPI CORS to accept dynamic local origins instead of a hardcoded port.

Dashboard UI Mismatch: Early dashboard mockups showed 6 joints, but the actual robot model only had 4. Fix: Updated the dashboard grid and recalculated progress bar angles to accurately match the 4-joint system.

DNA 3D Axis Rotation: Rotating the Spline DNA helix via standard CSS made it spin flat like a 2D clock hand. Fix: Moved the rotation logic directly into the Spline 3D runtime environment.

## Quick Start / Local Setup

### 1. Frontend

```bash
git clone [https://github.com/mohamadali30907m-source/helix-codex-main.git](https://github.com/mohamadali30907m-source/helix-codex-main.git)
cd helix-codex-main
npm install
npm run dev

```

### 2. Backend

```bash
git clone [https://github.com/mohamadali30907m-source/helix-codex-backend.git](https://github.com/mohamadali30907m-source/helix-codex-backend.git)
cd helix-codex-backend
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn server.main:app --reload --port 8000

```

## Built For

Built for Hack Club Horizons. (including a full design rebuild from scratch using custom design tokens).

## My Hack Club Journey

For a long time, I had this dream of learning programming and electronics. I would think about it almost every day, and the more I learned, the more curious I became. But there was always another question in my mind: How can I use what I learn to help other people?

At school, I noticed that some of my classmates did not really enjoy biology the way it is taught. They found some of the concepts difficult or simply not interesting enough. That is when I started thinking about Helix Codex. I thought, why not try to create a different and more enjoyable way of learning biology, while also helping students understand and remember the information better?

So I started learning the basics of web development because I wanted to become a web developer. I started from the beginning and kept experimenting. I would learn something, try it, make mistakes, fix things, and then learn something else. This became my normal routine.

Then I discovered Hack Club almost by accident.

I came across a video about a Hack Club hackathon on social media. I did not know much about Hack Club at first, so I started searching and reading about it. The more I learned, the more interested I became. Later, I found out that there would be an event called EquinoX in Cairo, and I became really excited about the idea of actually being there.

For me, Hack Club became more than just a place where I heard about hackathons. It pushed me to keep learning and actually build things. Every day I worked on Helix Codex, I found myself learning something new.

You can actually see part of that process in the images folder of this project. I started with Figma, working on the background, colors, dimensions, typography, the logo, and the overall look of the website.

Even the name Helix Codex has a meaning behind it. “Helix” refers to the DNA double helix, while “Codex” represents code, coding, and the idea of decoding information. I wanted the website to feel like a kind of “code of life” that takes complex biological concepts and breaks them down into information that students can understand more easily.

Then I started building the actual project.

It was not always easy. Every time the project was rejected, I felt frustrated. Sometimes I started questioning whether I was doing something right or whether I would actually be able to finish what I had started.

At the same time, I started thinking more about how students learn in general. AI is becoming part of almost everything now, and I noticed that many students use it even for very simple problems. Instead of trying to think about the problem themselves first, they immediately ask AI for the answer.

That made me look at the idea from another side. I started becoming interested in neuroscience and in understanding how the brain actually works, how we think, and how we store information. I want to understand these things better because I want the projects I build to help people learn, not simply give them answers without making them think.

While I was thinking about all of this, the project kept getting rejected.

And honestly, that became difficult for me.

I really wanted to attend EquinoX. Eventually, I actually made it to the event, but my hours were still under review. Then, on the last day of the event, I received the rejection.

I was really disappointed.

But after thinking about it, I realized that being disappointed would not change anything. I still wanted to continue working on my project, and I still wanted to prove to myself that I could keep going even when things did not work out the way I wanted.

There was another challenge that made everything harder. I live in Minya, while the event was in Cairo. It was my first time traveling to Cairo, and after arriving, I was already very tired. During that period, I had also been going through many programs, applications, tests, and other things, and all of that started to catch up with me.

I felt exhausted and burned out, and because of that, I could not develop Helix Codex as much as I originally wanted.

I still made some changes to it, but I know that the current version is not the final version I have in mind. I already have clear ideas for how I want to improve it, and I want to keep working on it in the future until it becomes much closer to what I originally imagined.

Recently, I also found out that if my Hack Club hours are not approved, I may have to make up those hours before being able to attend some future events. This could also mean having to cover the EquinoX ticket before I can move forward.

That news honestly added more pressure, especially because I was already exhausted.

But I am still trying to work on the project.

Not because everything went perfectly. It definitely did not.

I am continuing because I started this project for a reason. I wanted to learn programming, I wanted to build something useful for other students, and I wanted to see how far I could take an idea that started with a simple question:

How can I help someone learn?

Helix Codex is still a work in progress, and I know there is a lot more I want to learn before I can build the version I have in head.

But every time I open the project and work on it, I remember how it started: with me simply wanting to learn how to code and finding a way to use that learning for something that could help someone else.
