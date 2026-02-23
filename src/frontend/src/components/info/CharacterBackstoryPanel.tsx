import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { getCharacterBackstory } from '@/lib/characterBackstories';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function CharacterBackstoryPanel() {
  const { operatorName } = useInfoSettingsStore();
  const backstory = getCharacterBackstory(operatorName);
  const [isOpen, setIsOpen] = useState(true);

  if (!backstory) {
    return null;
  }

  return (
    <div className="tactical-panel">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="hud-panel-title-compact flex items-center justify-between">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>OPERATOR PROFILE: {backstory.name}</span>
              <Badge variant="outline" className="text-xs">CLASSIFIED</Badge>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="hud-panel-content-compact space-y-3">
            <div>
              <div className="text-xs font-semibold text-primary mb-1">BIOGRAPHY</div>
              <div className="text-sm opacity-90">{backstory.biography}</div>
            </div>

            <div>
              <div className="text-xs font-semibold text-primary mb-1">ROLE</div>
              <div className="text-sm opacity-90">{backstory.role}</div>
            </div>

            <div>
              <div className="text-xs font-semibold text-primary mb-1">ACHIEVEMENTS</div>
              <ul className="text-sm opacity-90 space-y-1">
                {backstory.achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-primary mt-1">▸</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-semibold text-primary mb-1">CONTEXT</div>
              <div className="text-sm opacity-90">{backstory.context}</div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
