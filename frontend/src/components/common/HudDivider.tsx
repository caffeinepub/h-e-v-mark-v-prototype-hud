import { cn } from '@/lib/utils';

interface HudDividerProps {
  className?: string;
  decorative?: boolean;
}

export function HudDivider({ className, decorative = false }: HudDividerProps) {
  return (
    <div className={cn('hud-divider', decorative && 'hud-divider-decorative', className)}>
      {decorative && (
        <>
          <div className="hud-divider-corner hud-divider-corner-left" />
          <div className="hud-divider-line" />
          <div className="hud-divider-corner hud-divider-corner-right" />
        </>
      )}
    </div>
  );
}
