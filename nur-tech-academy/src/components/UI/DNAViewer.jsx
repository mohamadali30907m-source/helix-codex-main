import { useRef } from "react";
import Spline from '@splinetool/react-spline';
import "./DNAViewer.css";

function DNAViewer({ status = "ACTIVE" }) {
  const splineRef = useRef(null);

  const onLoad = (spline) => {
    
    const possibleNames = ['DNA', 'Helix', 'Group', 'Object', 'Scene'];
    let target = null;
    
    for (const name of possibleNames) {
      try {
        target = spline.findObjectByName(name);
        if (target) break;
      } catch (e) {
      
      }
    }

    if (target && target.rotation) {
      const animate = () => {
        target.rotation.y += 0.008;
        requestAnimationFrame(animate);
      };
      animate();
    }
  };

  return (
    <div className="dna-wrapper">
      <div className="dna-inner">
        <Spline 
          ref={splineRef}
          scene="https://prod.spline.design/HhPetSmCrYYuQPgD/scene.splinecode"
          onLoad={onLoad}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <div className="dna-hud">CORE_STATUS // {status}</div>
    </div>
  );
}

export default DNAViewer;