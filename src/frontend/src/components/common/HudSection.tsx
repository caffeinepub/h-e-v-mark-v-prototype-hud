import { ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HudSectionProps {
  title?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultOpen?: boolean;
  className?: string;
}

export function HudSection({ title, children, collapsible = false, defaultOpen = true, className }: HudSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  if (!title) {
    return <div className={cn('hud-section', className)}>{children}</div>;
  }

  return (
    <div className={cn('hud-section', className)}>
      <div
        className={cn('hud-section-header', collapsible && 'hud-section-header-collapsible')}
        onClick={() => collapsible && setIsOpen(!isOpen)}
      >
        <h3 className="hud-section-title">{title}</h3>
        {collapsible && (
          <ChevronDown className={cn('hud-section-chevron', isOpen && 'hud-section-chevron-open')} />
        )}
      </div>
      {(!collapsible || isOpen) && <div className="hud-section-content">{children}</div>}
    </div>
  );
}
