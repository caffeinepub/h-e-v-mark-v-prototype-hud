import { suitLore } from '@/lib/suitLoreData';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { BookOpen, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function SuitLorePanel() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  return (
    <div className="tactical-panel">
      <div className="hud-panel-title-compact flex items-center gap-2">
        <BookOpen className="w-4 h-4" />
        <span>H.E.V. SUIT LORE & HISTORY</span>
      </div>
      <div className="hud-panel-content-compact space-y-2">
        {suitLore.map((section) => (
          <Collapsible
            key={section.title}
            open={openSections[section.title]}
            onOpenChange={() => toggleSection(section.title)}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-2 border border-border hover:border-primary transition-colors">
                <span className="text-sm font-semibold">{section.title}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${openSections[section.title] ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 border-x border-b border-border bg-background/50">
                <div className="text-xs opacity-90 leading-relaxed">{section.content}</div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
