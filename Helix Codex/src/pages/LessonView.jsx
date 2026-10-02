import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SELYA_LESSON } from '../data/lessonsData';
import './LessonView.css';

export default function LessonView() {
  const navigate = useNavigate();
  const [currentChapter, setCurrentChapter] = useState(0);

  const chapter = SELYA_LESSON.chapters[currentChapter];
  const totalChapters = SELYA_LESSON.chapters.length;

  const handleNext = () => {
    if (currentChapter < totalChapters - 1) {
      setCurrentChapter(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentChapter > 0) {
      setCurrentChapter(prev => prev - 1);
    }
  };

  return (
    <div className="lesson-container">
      <header className="lesson-header">
        <button className="back-btn" onClick={() => navigate('/modules')}>
          ← Back to Modules
        </button>
        <div className="lesson-progress-badge">
          CHAPTER {currentChapter + 1} OF {totalChapters}
        </div>
      </header>

      <main className="lesson-content">
        <div className="story-card image-card">
          <div className="image-wrapper">
            <img 
              src={chapter.image} 
              alt={chapter.title} 
              className="selya-img"
              onError={(e) => {
                
                e.target.style.display = 'none';
              }}
            />
            <div className="chapter-tag">{chapter.chapterTitle}</div>
          </div>
        </div>

        <div className="story-card text-card">
          <div className="concept-badge">{chapter.concept}</div>
          <h2>{chapter.title}</h2>
          <p className="story-text">{chapter.storyText}</p>

          <div className="key-takeaway">
            <h4> Key Scientific Concept</h4>
            <p>{chapter.takeaway}</p>
          </div>

          <div className="formula-box">
            <code>{chapter.formula}</code>
          </div>
        </div>
      </main>

      <footer className="lesson-controls">
        <button 
          className="nav-btn prev-btn" 
          onClick={handlePrev}
          disabled={currentChapter === 0}
        >
          ← Previous
        </button>

        <div className="step-dots">
          {SELYA_LESSON.chapters.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentChapter ? 'active' : ''}`}
              onClick={() => setCurrentChapter(index)}
            />
          ))}
        </div>

        <button 
          className="nav-btn next-btn" 
          onClick={handleNext}
          disabled={currentChapter === totalChapters - 1}
        >
          Next Chapter →
        </button>
      </footer>
    </div>
  );
}