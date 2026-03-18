interface MedicalDiagramProps {
  health: number;
  armor: number;
}

export function MedicalDiagram({ health, armor }: MedicalDiagramProps) {
  const getStatusColor = (value: number) => {
    if (value >= 70) return 'oklch(0.75 0.20 35)';
    if (value >= 40) return 'oklch(0.75 0.18 50)';
    return 'oklch(0.70 0.22 25)';
  };

  return (
    <div className="medical-diagram-container">
      <img 
        src="/assets/generated/hev-medical-diagram-schematic.dim_1200x1600.png" 
        alt="H.E.V Suit Schematic Diagram"
        className="medical-diagram-image"
      />
      <div className="medical-overlays">
        <div 
          className="medical-overlay medical-overlay-head"
          style={{ backgroundColor: getStatusColor(health) }}
        >
          <span className="overlay-label">HEAD: {health}%</span>
        </div>
        <div 
          className="medical-overlay medical-overlay-torso"
          style={{ backgroundColor: getStatusColor(armor) }}
        >
          <span className="overlay-label">TORSO: {armor}%</span>
        </div>
        <div 
          className="medical-overlay medical-overlay-arms"
          style={{ backgroundColor: getStatusColor((health + armor) / 2) }}
        >
          <span className="overlay-label">ARMS: {Math.round((health + armor) / 2)}%</span>
        </div>
      </div>
    </div>
  );
}
