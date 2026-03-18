import { Microscope, FlaskConical, Atom, Database } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export function ResearchLabTab() {
  return (
    <div className="space-y-6 p-6">
      <div className="bg-black/40 border-2 border-primary/30 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Microscope className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">RESEARCH LAB ACCESS</h2>
        </div>
        <p className="text-sm text-muted-foreground">Black Mesa Research Database - H.E.V. Clearance</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="experiments" className="bg-black/40 border-2 border-primary/30 p-4">
          <AccordionTrigger className="text-primary font-bold hover:no-underline">
            <div className="flex items-center gap-2">
              <FlaskConical className="w-5 h-5" />
              <span>EXPERIMENT LOGS</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-primary">Anti-Mass Spectrometer Test</h4>
              <p className="text-xs">
                Date: May 16, 200- | Lead: Dr. Gordon Freeman
              </p>
              <p className="text-sm">
                Anomalous materials sample GG-3883 introduced to anti-mass spectrometer. Unexpected
                resonance cascade detected. Dimensional barriers compromised. Immediate evacuation
                protocols initiated.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-primary">Xen Crystal Analysis</h4>
              <p className="text-xs">Date: May 15, 200- | Lead: Dr. Isaac Kleiner</p>
              <p className="text-sm">
                Pure sample exhibits extraordinary properties. Energy readings off the scale.
                Recommend extreme caution in handling. Potential for interdimensional breach if
                mishandled.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="anomalous" className="bg-black/40 border-2 border-primary/30 p-4">
          <AccordionTrigger className="text-primary font-bold hover:no-underline">
            <div className="flex items-center gap-2">
              <Atom className="w-5 h-5" />
              <span>ANOMALOUS MATERIALS DATA</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-primary">Xen Specimen Classifications</h4>
              <ul className="text-sm space-y-1 list-disc list-inside">
                <li>Headcrab (Parasitic) - Threat Level: HIGH</li>
                <li>Vortigaunt (Sentient) - Threat Level: VARIABLE</li>
                <li>Barnacle (Ambush Predator) - Threat Level: MEDIUM</li>
                <li>Houndeye (Pack Hunter) - Threat Level: MEDIUM</li>
                <li>Bullsquid (Aggressive) - Threat Level: HIGH</li>
              </ul>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="teleportation" className="bg-black/40 border-2 border-primary/30 p-4">
          <AccordionTrigger className="text-primary font-bold hover:no-underline">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              <span>TELEPORTATION TECHNOLOGY</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-primary">Lambda Complex Research</h4>
              <p className="text-sm">
                The Lambda Complex houses Black Mesa's most advanced teleportation research.
                Successful short-range teleportation achieved. Long-range and interdimensional
                travel remains theoretical but shows promise.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-primary">Xen Border World</h4>
              <p className="text-sm">
                Dimensional gateway to Xen established. Hostile environment requires H.E.V. suit
                protection. Gravity approximately 60% of Earth normal. Atmosphere breathable but
                toxic compounds present.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="clearance" className="bg-black/40 border-2 border-primary/30 p-4">
          <AccordionTrigger className="text-primary font-bold hover:no-underline">
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5" />
              <span>LAMBDA COMPLEX CLEARANCE</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="text-muted-foreground space-y-4 pt-4">
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-primary">Security Levels</h4>
              <ul className="text-sm space-y-1">
                <li>Level 1: General Access - Public areas</li>
                <li>Level 2: Research Access - Laboratory areas</li>
                <li>Level 3: Senior Staff - Restricted research</li>
                <li>Level 4: Lambda Access - Teleportation labs</li>
                <li>Level 5: Administrator - Full facility access</li>
              </ul>
              <p className="text-sm text-primary font-bold mt-4">
                Current Clearance: Level 4 (Lambda Access)
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
