import React from 'react';
import './Modules.css';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import VirtualRobot from '../components/VirtualRobot/VirtualRobot';

export default function Modules() {
  const modulesList = [
    {
      id: 1,
      title: "Foundations of Human Biology",
      category: "Human Biology",
      units: "8 Units",
      level: "Beginner",
      progress: "100%",
      status: "completed"
    },
    {
      id: 2,
      title: "Human Anatomy & Organ Systems",
      category: "Human Anatomy",
      units: "10 Units",
      level: "Intermediate",
      progress: "60%",
      status: "active"
    },
    {
      id: 3,
      title: "Fundamentals of Neuroscience",
      category: "Neuroscience",
      units: "12 Units",
      level: "Intermediate",
      progress: "15%",
      status: "active"
    }
  ];

  return (
    <div className="modules-page">
      <header className="modules-header">
        <h1>CURRICULUM MATRIX</h1>
        <p>Select a learning pathway to begin your interactive study session.</p>
      </header>

      <div className="modules-layout">
        <div className="modules-grid">
          {modulesList.map((mod) => (
            <div key={mod.id} className={`module-card ${mod.level.toLowerCase()}`}>
              <div>
                <span className="module-badge">{mod.level} // {mod.units}</span>
                <h2>{mod.title}</h2>
                <p className="module-cat">{mod.category}</p>
              </div>
              <div className="module-footer">
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: mod.progress }}></div>
                </div>
                <span className="progress-text">{mod.progress}</span>
                <button className="enter-lesson-btn">→ Enter Module</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="mimo-side-panel">
          <div className="mimo-header">
            <span className="status-dot online"></span>
            <h3>MIMO COMPANION</h3>
          </div>
          <p className="mimo-desc">
            Virtual assistant ready to assist with 3D visualizations and module queries.
          </p>

          <div className="mimo-preview" style={{ height: '380px', borderRadius: '12px', overflow: 'hidden', background: 'rgba(11, 14, 20, 0.6)' }}>
            <Canvas camera={{ position: [0, 0.5, 5.5], fov: 45 }}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[5, 5, 5]} intensity={1.2} />
              <VirtualRobot />
              <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Canvas>
          </div>

          <button className="mimo-action-btn">Ask Mimo</button>
        </aside>
      </div>
    </div>
  );
}