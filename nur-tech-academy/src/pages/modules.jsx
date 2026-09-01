import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import "./Modules.css";

const MODULES_DATA = [
  {
    id: "bio-101",
    title: "Foundations of Human Biology",
    category: "Human Biology",
    level: "Beginner",
    progress: 100,
    accentColor: "#22c55e",
    lessonsCount: 8,
    targetPath: "/dashboard"
  },
  {
    id: "ana-201",
    title: "Human Anatomy & Organ Systems",
    category: "Human Anatomy",
    level: "Intermediate",
    progress: 60,
    accentColor: "#3b82f6",
    lessonsCount: 10,
    targetPath: "/virtual-robot"
  },
  {
    id: "neu-301",
    title: "Fundamentals of Neuroscience",
    category: "Neuroscience",
    level: "Intermediate",
    progress: 15,
    accentColor: "#a855f7",
    lessonsCount: 12,
    targetPath: "/teleop"
  },
  {
    id: "neu-401",
    title: "Cognitive Neuroscience",
    category: "Advanced Neuroscience",
    level: "Advanced",
    progress: 0,
    accentColor: "#ef4444",
    lessonsCount: 14,
    targetPath: "/dashboard"
  },
];

function Modules() {
  return (
    <div className="modules-page">
      <Navbar isOnline={true} version="1.0.0" />

      <main className="main-content">
        <section className="page-header">
          <h1 className="page-title">CURRICULUM MATRIX</h1>
          <p className="page-subtitle">Select a learning pathway</p>
        </section>

        <section className="modules-grid">
          {MODULES_DATA.map((mod) => (
            <div
              key={mod.id}
              className="module-card"
              style={{ borderLeftColor: mod.accentColor }}
            >
              <div className="module-header">
                <span
                  className="module-level"
                  style={{ color: mod.accentColor }}
                >
                  {mod.level}
                </span>
                <span className="module-duration">{mod.lessonsCount} Units</span>
              </div>

              <h3 className="module-title">{mod.title}</h3>
              <p className="module-category">{mod.category}</p>

              <div className="module-progress">
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${mod.progress}%`,
                      background: mod.accentColor,
                    }}
                  />
                </div>
                <span className="progress-text">{mod.progress}%</span>
              </div>

              <Link to={mod.targetPath} className="module-link">
                Enter Module →
              </Link>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Modules;