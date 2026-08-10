import { useEffect, useRef } from "react";
import Spline from '@splinetool/react-spline';
import "./DNAViewer.css";

function DNAViewer({ status = "ACTIVE" }) {
  const rotatorRef = useRef(null);
  const angleRef = useRef(0);

  useEffect(() => {
    let animId;
    const rotate = () => {
      angleRef.current = (angleRef.current + 0.4) % 360;
      if (rotatorRef.current) {
        rotatorRef.current.style.transform = `rotate(${angleRef.current}deg)`;
      }
      animId = requestAnimationFrame(rotate);
    };
    animId = requestAnimationFrame(rotate);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div className="dna-wrapper">
      <div ref={rotatorRef} className="dna-rotator">
        <Spline 
          scene="https://prod.spline.design/HhPetSmCrYYuQPgD/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="dna-hud">CORE_STATUS // {status}</div>
    </div>
  );
}

export default DNAViewer;