import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { markThemes } from '@/lib/markThemes';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { HudSwitch } from '@/components/common/HudSwitch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Shield, Zap, Wrench, Hammer, Cog, FlaskConical } from 'lucide-react';
import { uiSfx } from '@/audio/uiSfx';

export function HevMarkSelector() {
  const {
    hevMark,
    setHevMark,
    separateMarkStyleFromFunction,
    setSeparateMarkStyleFromFunction,
    functionalMark,
    setFunctionalMark,
  } = useInfoSettingsStore();

  const handleMarkChange = (value: string) => {
    setHevMark(value as any);
    uiSfx.toggle();
  };

  const handleFunctionalMarkChange = (value: string) => {
    setFunctionalMark(value as any);
    uiSfx.toggle();
  };

  const handleToggleSeparate = () => {
    setSeparateMarkStyleFromFunction();
    uiSfx.toggle();
  };

  const getMarkIcon = (mark: string) => {
    switch (mark) {
      case 'prototype':
        return <FlaskConical className="w-5 h-5" />;
      case 'mark-i':
        return <Hammer className="w-5 h-5" />;
      case 'mark-ii':
        return <Wrench className="w-5 h-5" />;
      case 'mark-iii':
        return <Cog className="w-5 h-5" />;
      case 'mark-iv':
        return <Shield className="w-5 h-5" />;
      case 'mark-v':
        return <Zap className="w-5 h-5" />;
      default:
        return <Shield className="w-5 h-5" />;
    }
  };

  const getMarkBadge = (mark: string) => {
    const theme = markThemes[mark];
    if (!theme) return 'UNKNOWN';
    
    switch (theme.visualStyle) {
      case 'industrial':
        return 'HAZMAT';
      case 'combat':
        return 'COMBAT';
      case 'hybrid':
        return 'HYBRID';
      default:
        return 'STANDARD';
    }
  };

  const markOrder = ['prototype', 'mark-i', 'mark-ii', 'mark-iii', 'mark-iv', 'mark-v'];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">Style Only Mode</div>
          <div className="text-xs opacity-70">Separate visual style from functional profile</div>
        </div>
        <HudSwitch checked={separateMarkStyleFromFunction} onCheckedChange={handleToggleSeparate} />
      </div>

      {!separateMarkStyleFromFunction ? (
        <div>
          <h4 className="text-sm font-semibold mb-3">H.E.V. MARK SELECTION</h4>
          <RadioGroup value={hevMark} onValueChange={handleMarkChange}>
            <div className="space-y-3">
              {markOrder.map((key) => {
                const theme = markThemes[key];
                if (!theme) return null;
                
                return (
                  <div
                    key={key}
                    className={`mark-selector-card ${hevMark === key ? 'mark-selector-active' : ''}`}
                  >
                    <RadioGroupItem value={key} id={`mark-${key}`} className="mark-radio" />
                    <Label htmlFor={`mark-${key}`} className="mark-selector-label">
                      <div className="flex items-start gap-3">
                        <div className="mark-icon">{getMarkIcon(key)}</div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-semibold">{theme.name}</span>
                            <Badge variant="outline" className="text-xs">
                              {getMarkBadge(key)}
                            </Badge>
                          </div>
                          <p className="text-xs opacity-80 mb-2">{theme.description}</p>
                          <div className="text-xs opacity-70">
                            <strong>Characteristics:</strong>
                            <ul className="list-disc list-inside mt-1 space-y-0.5">
                              {theme.characteristics.map((char, index) => (
                                <li key={index}>{char}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold mb-3">VISUAL STYLE</h4>
            <RadioGroup value={hevMark} onValueChange={handleMarkChange}>
              <div className="space-y-2">
                {markOrder.map((key) => {
                  const theme = markThemes[key];
                  if (!theme) return null;
                  
                  return (
                    <div key={key} className="flex items-center gap-2 p-2 border border-border hover:border-primary transition-colors">
                      <RadioGroupItem value={key} id={`visual-${key}`} />
                      <Label htmlFor={`visual-${key}`} className="flex items-center gap-2 cursor-pointer flex-1">
                        {getMarkIcon(key)}
                        <span className="font-semibold">{theme.name}</span>
                        <Badge variant="outline" className="text-xs ml-auto">
                          {getMarkBadge(key)}
                        </Badge>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-3">FUNCTIONAL PROFILE</h4>
            <RadioGroup value={functionalMark} onValueChange={handleFunctionalMarkChange}>
              <div className="space-y-2">
                {markOrder.map((key) => {
                  const theme = markThemes[key];
                  if (!theme) return null;
                  
                  return (
                    <div key={key} className="flex items-center gap-2 p-2 border border-border hover:border-primary transition-colors">
                      <RadioGroupItem value={key} id={`functional-${key}`} />
                      <Label htmlFor={`functional-${key}`} className="flex items-center gap-2 cursor-pointer flex-1">
                        {getMarkIcon(key)}
                        <span className="font-semibold">{theme.name}</span>
                        <Badge variant="outline" className="text-xs ml-auto">
                          {getMarkBadge(key)}
                        </Badge>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>
        </div>
      )}
    </div>
  );
}
