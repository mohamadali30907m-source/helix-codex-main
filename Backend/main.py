from datetime import datetime, timezone
from typing import Literal

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


app = FastAPI(
    title="Helix Codex Backend",
    version="0.3.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


RobotMode = Literal[
    "idle",
    "running",
    "error",
    "emergency_stop",
]


JointID = Literal[
    "LS",
    "LA",
    "RS",
    "RA",
]


class RobotStatus(BaseModel):
    online: bool
    connected: bool
    mode: RobotMode
    emergency_stop: bool
    battery: float
    temperature: float
    joints: dict[str, float]
    gripper: float
    timestamp: str


class RobotCommand(BaseModel):
    command: Literal["start", "stop"]


class JointCommand(BaseModel):
    joint: JointID
    angle: float = Field(ge=-90, le=90)


class GripperCommand(BaseModel):
    value: float = Field(ge=0, le=100)


robot = RobotStatus(
    online=True,
    connected=False,
    mode="idle",
    emergency_stop=False,
    battery=100.0,
    temperature=25.0,
    joints={
        "LS": 0.0,
        "LA": 0.0,
        "RS": 0.0,
        "RA": 0.0,
    },
    gripper=0.0,
    timestamp=datetime.now(timezone.utc).isoformat(),
)


def update_timestamp():
    robot.timestamp = datetime.now(timezone.utc).isoformat()


@app.get("/")
async def root():
    return {
        "status": "online",
        "project": "Helix Codex Backend",
        "version": "0.3.0",
    }


@app.get("/health")
async def health():
    return {
        "status": "healthy",
    }


@app.get("/api/robot/status", response_model=RobotStatus)
async def get_robot_status():
    update_timestamp()
    return robot


@app.post("/api/robot/connect", response_model=RobotStatus)
async def connect_robot():
    if robot.emergency_stop:
        return robot

    robot.connected = True
    robot.online = True
    robot.mode = "idle"

    update_timestamp()

    return robot


@app.post("/api/robot/disconnect", response_model=RobotStatus)
async def disconnect_robot():
    robot.connected = False

    if not robot.emergency_stop:
        robot.mode = "idle"

    update_timestamp()

    return robot


@app.post("/api/robot/emergency-stop", response_model=RobotStatus)
async def emergency_stop():
    robot.emergency_stop = True
    robot.connected = False
    robot.mode = "emergency_stop"

    update_timestamp()

    return robot


@app.post("/api/robot/reset", response_model=RobotStatus)
async def reset_robot():
    robot.emergency_stop = False
    robot.connected = False
    robot.mode = "idle"

    robot.joints = {
        "LS": 0.0,
        "LA": 0.0,
        "RS": 0.0,
        "RA": 0.0,
    }

    robot.gripper = 0.0

    update_timestamp()

    return robot


@app.post("/api/robot/command", response_model=RobotStatus)
async def robot_command(payload: RobotCommand):
    if robot.emergency_stop:
        return robot

    if not robot.connected:
        return robot

    if payload.command == "start":
        robot.mode = "running"

    elif payload.command == "stop":
        robot.mode = "idle"

    update_timestamp()

    return robot


@app.post("/api/robot/joint", response_model=RobotStatus)
async def move_joint(payload: JointCommand):
    if robot.emergency_stop:
        return robot

    if not robot.connected:
        return robot

    robot.joints[payload.joint] = payload.angle
    robot.mode = "running"

    update_timestamp()

    return robot


@app.post("/api/robot/gripper", response_model=RobotStatus)
async def move_gripper(payload: GripperCommand):
    if robot.emergency_stop:
        return robot

    if not robot.connected:
        return robot

    robot.gripper = payload.value
    robot.mode = "running"

    update_timestamp()

    return robot