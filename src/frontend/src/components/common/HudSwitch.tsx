import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface HudSwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  defaultChecked?: boolean;
}

export function HudSwitch({ checked, onCheckedChange, disabled, id, className, defaultChecked }: HudSwitchProps) {
  return (
    <Switch
      id={id}
      checked={checked}
      defaultChecked={defaultChecked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={cn('hud-switch', className)}
    />
  );
}
