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

Built for `Hack Club Horizons`. Tracked 54.5 hrs using Hackatime (including a full design rebuild from scratch using custom design tokens).

## My Hack Club Journey

For a long time, I had this dream of learning programming and electronics. I would think about it almost every day, and the more I learned, the more curious I became. But there was always another question in my mind: `How can I use what I learn to help other people?`

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

`How can I help someone learn?`

Helix Codex is still a work in progress, and I know there is a lot more I want to learn before I can build the version I have in my head.

But every time I open the project and work on it, I remember how it started: with me simply wanting to learn how to code and finding a way to use that learning for something that could help someone else.

