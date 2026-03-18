import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface RadarContact {
  id: string;
  x: number;
  y: number;
  type: 'friendly' | 'hostile' | 'unknown';
  label?: string;
}

export function RadarPanel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const sweepAngleRef = useRef(0);
  const timeRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();

  // Generate deterministic contacts with animated properties
  const [contacts] = useState<RadarContact[]>([
    { id: 'f1', x: 0.3, y: 0.4, type: 'friendly', label: 'ALPHA' },
    { id: 'f2', x: 0.6, y: 0.3, type: 'friendly', label: 'BRAVO' },
    { id: 'h1', x: 0.7, y: 0.7, type: 'hostile', label: 'TANGO' },
    { id: 'u1', x: 0.2, y: 0.8, type: 'unknown', label: 'ECHO' },
    { id: 'u2', x: 0.5, y: 0.6, type: 'unknown', label: 'DELTA' },
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const render = (timestamp: number) => {
      const deltaTime = timestamp - timeRef.current;
      timeRef.current = timestamp;

      // Update sweep angle
      if (!prefersReducedMotion) {
        sweepAngleRef.current += (deltaTime / 2000) * Math.PI * 2;
        if (sweepAngleRef.current > Math.PI * 2) {
          sweepAngleRef.current -= Math.PI * 2;
        }
      }

      const width = canvas.width;
      const height = canvas.height;
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2 - 20;

      // Clear canvas
      ctx.fillStyle = 'oklch(0.10 0.02 45)';
      ctx.fillRect(0, 0, width, height);

      // Draw concentric circles
      ctx.strokeStyle = 'oklch(0.36 0.12 45 / 0.3)';
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

      // Draw sweep line
      if (!prefersReducedMotion) {
        const sweepGradient = ctx.createLinearGradient(
          centerX,
          centerY,
          centerX + Math.cos(sweepAngleRef.current) * radius,
          centerY + Math.sin(sweepAngleRef.current) * radius
        );
        sweepGradient.addColorStop(0, 'oklch(0.72 0.24 45 / 0.8)');
        sweepGradient.addColorStop(1, 'oklch(0.72 0.24 45 / 0)');

        ctx.strokeStyle = sweepGradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(
          centerX + Math.cos(sweepAngleRef.current) * radius,
          centerY + Math.sin(sweepAngleRef.current) * radius
        );
        ctx.stroke();
      }

      // Draw animated contacts
      contacts.forEach((contact, index) => {
        const contactX = centerX + (contact.x - 0.5) * radius * 2;
        const contactY = centerY + (contact.y - 0.5) * radius * 2;

        // Animate contact properties
        const pulsePhase = (timestamp / 1000 + index * 0.5) % 2;
        const pulse = Math.sin(pulsePhase * Math.PI);
        const baseSize = 4;
        const size = baseSize + pulse * 2;
        const opacity = 0.6 + pulse * 0.4;

        // Subtle position drift
        const driftX = Math.sin(timestamp / 2000 + index) * 2;
        const driftY = Math.cos(timestamp / 2000 + index) * 2;

        // Color based on type
        let color = 'oklch(0.72 0.24 45)'; // default/unknown
        if (contact.type === 'friendly') {
          color = 'oklch(0.65 0.20 140)'; // green
        } else if (contact.type === 'hostile') {
          color = 'oklch(0.50 0.28 20)'; // red
        }

        // Draw contact blip with glow
        ctx.shadowBlur = 10;
        ctx.shadowColor = color;
        ctx.fillStyle = color.replace(')', ` / ${opacity})`);
        ctx.beginPath();
        ctx.arc(contactX + driftX, contactY + driftY, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw pulsing ring around contact
        if (!prefersReducedMotion) {
          ctx.strokeStyle = color.replace(')', ` / ${opacity * 0.5})`);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(contactX + driftX, contactY + driftY, size + pulse * 4, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Draw label
        if (contact.label) {
          ctx.fillStyle = color.replace(')', ` / ${opacity})`);
          ctx.font = '8px monospace';
          ctx.textAlign = 'center';
          ctx.fillText(contact.label, contactX + driftX, contactY + driftY - size - 4);
        }
      });

      // Draw radar info
      ctx.fillStyle = 'oklch(0.62 0.14 45)';
      ctx.font = '10px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`RANGE: ${radius.toFixed(0)}m`, 10, height - 30);
      ctx.fillText(`CONTACTS: ${contacts.length}`, 10, height - 15);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [contacts, prefersReducedMotion]);

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      if (container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="hud-panel-compact">
      <div className="hud-panel-title">Tactical Radar</div>
      <div className="relative w-full" style={{ height: '300px' }}>
        <canvas
          ref={canvasRef}
          className="w-full h-full"
          style={{ imageRendering: 'crisp-edges' }}
        />
      </div>
    </div>
  );
}
