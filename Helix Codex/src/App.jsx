import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './pages/Landing';
import Modules from './pages/modules';
import Dashboard from './pages/Dashboard';
import Teleop from './pages/Teleop';
import LessonView from './pages/LessonView';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/modules" element={<Modules />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/teleop" element={<Teleop />} />
        <Route path="/lesson/:id" element={<LessonView />} />
      </Routes>
    </div>
  );
}

export default App;