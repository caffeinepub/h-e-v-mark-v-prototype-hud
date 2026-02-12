import { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface Contact {
  id: number;
  x: number;
  y: number;
  type: 'friendly' | 'hostile' | 'unknown';
  distance: number;
}

export function RadarPanel() {
  const [sweepAngle, setSweepAngle] = useState(0);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate deterministic contacts
  useEffect(() => {
    const generatedContacts: Contact[] = [
      { id: 1, x: 0.3, y: 0.4, type: 'friendly', distance: 45 },
      { id: 2, x: -0.5, y: 0.2, type: 'unknown', distance: 62 },
      { id: 3, x: 0.6, y: -0.3, type: 'hostile', distance: 78 },
      { id: 4, x: -0.2, y: -0.6, type: 'unknown', distance: 85 },
      { id: 5, x: 0.1, y: 0.7, type: 'friendly', distance: 52 },
    ];
    setContacts(generatedContacts);
  }, []);

  // Animate sweep
  useEffect(() => {
    const interval = setInterval(() => {
      setSweepAngle(prev => (prev + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // Draw radar on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 10;

    // Clear canvas
    ctx.fillStyle = 'oklch(0.12 0.02 50)';
    ctx.fillRect(0, 0, width, height);

    // Draw rings
    ctx.strokeStyle = 'oklch(0.35 0.10 50 / 0.4)';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 3; i++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, (radius / 3) * i, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Draw crosshairs
    ctx.beginPath();
    ctx.moveTo(centerX, centerY - radius);
    ctx.lineTo(centerX, centerY + radius);
    ctx.moveTo(centerX - radius, centerY);
    ctx.lineTo(centerX + radius, centerY);
    ctx.stroke();

    // Draw sweep line with gradient
    const sweepRad = (sweepAngle * Math.PI) / 180;
    const gradient = ctx.createLinearGradient(
      centerX,
      centerY,
      centerX + Math.cos(sweepRad) * radius,
      centerY + Math.sin(sweepRad) * radius
    );
    gradient.addColorStop(0, 'oklch(0.70 0.20 50 / 0.8)');
    gradient.addColorStop(1, 'oklch(0.70 0.20 50 / 0)');
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(
      centerX + Math.cos(sweepRad) * radius,
      centerY + Math.sin(sweepRad) * radius
    );
    ctx.stroke();

    // Draw contacts
    contacts.forEach(contact => {
      const contactX = centerX + contact.x * radius;
      const contactY = centerY + contact.y * radius;
      
      let color = 'oklch(0.70 0.20 50)'; // default
      if (contact.type === 'friendly') color = 'oklch(0.65 0.20 140)';
      if (contact.type === 'hostile') color = 'oklch(0.55 0.25 25)';
      
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(contactX, contactY, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Pulse effect
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.arc(contactX, contactY, 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    });

    // Draw center dot
    ctx.fillStyle = 'oklch(0.70 0.20 50)';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 3, 0, Math.PI * 2);
    ctx.fill();

  }, [sweepAngle, contacts]);

  return (
    <div className="radar-panel">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        className="radar-canvas"
      />
      <div className="radar-info">
        <div className="radar-info-item">
          <span className="radar-info-label">RANGE:</span>
          <span className="radar-info-value">100M</span>
        </div>
        <div className="radar-info-item">
          <span className="radar-info-label">CONTACTS:</span>
          <span className="radar-info-value">{contacts.length}</span>
        </div>
      </div>
    </div>
  );
}
