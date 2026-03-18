import { ReactNode } from 'react';
import { useInfoSettingsStore } from '../../state/infoSettingsStore';
import { cn } from '@/lib/utils';

interface FactionLayoutWrapperProps {
  children: ReactNode;
}

export function FactionLayoutWrapper({ children }: FactionLayoutWrapperProps) {
  const { systemStyle, resistanceThemeActive } = useInfoSettingsStore();

  const layoutClass = resistanceThemeActive 
    ? 'faction-layout-resistance'
    : systemStyle === 'hecu'
    ? 'faction-layout-hecu'
    : systemStyle === 'guard'
    ? 'faction-layout-guard'
    : 'faction-layout-hev';

  return (
    <div className={cn('faction-layout-wrapper', layoutClass)}>
      {children}
    </div>
  );
}
