import { equipmentModules } from '@/lib/equipmentData';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Badge } from '@/components/ui/badge';
import { Package, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export function EquipmentDescriptionsPanel() {
  const [openModules, setOpenModules] = useState<Record<string, boolean>>({});

  const toggleModule = (moduleName: string) => {
    setOpenModules((prev) => ({
      ...prev,
      [moduleName]: !prev[moduleName],
    }));
  };

  return (
    <div className="tactical-panel">
      <div className="hud-panel-title-compact flex items-center gap-2">
        <Package className="w-4 h-4" />
        <span>H.E.V. EQUIPMENT MODULES</span>
      </div>
      <div className="hud-panel-content-compact space-y-2">
        {equipmentModules.map((module) => (
          <Collapsible
            key={module.name}
            open={openModules[module.name]}
            onOpenChange={() => toggleModule(module.name)}
          >
            <CollapsibleTrigger className="w-full">
              <div className="flex items-center justify-between p-2 border border-border hover:border-primary transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold">{module.name}</span>
                  <Badge variant="outline" className="text-xs">{module.category}</Badge>
                </div>
                <ChevronDown className={`w-4 h-4 transition-transform ${openModules[module.name] ? 'rotate-180' : ''}`} />
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-3 border-x border-b border-border space-y-2 bg-background/50">
                <div>
                  <div className="text-xs font-semibold text-primary mb-1">SPECIFICATIONS</div>
                  <div className="text-xs opacity-90">{module.specifications}</div>
                </div>

                <div>
                  <div className="text-xs font-semibold text-primary mb-1">CAPABILITIES</div>
                  <ul className="text-xs opacity-90 space-y-1">
                    {module.capabilities.map((capability, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-primary mt-0.5">•</span>
                        <span>{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <div className="text-xs font-semibold text-primary mb-1">OPERATIONAL NOTES</div>
                  <div className="text-xs opacity-90 italic">{module.operationalNotes}</div>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
}
