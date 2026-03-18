import { Shield, Target, Users, Radio } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export function CommandBriefingTab() {
  return (
    <div className="space-y-6 p-6">
      <div className="bg-black/40 border-2 border-primary/30 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-primary">COMMAND BRIEFING</h2>
        </div>
        <p className="text-sm text-muted-foreground">HECU Military Operations - CLASSIFIED</p>
      </div>

      {/* Chain of Command */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary">CHAIN OF COMMAND</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-black/20 border border-primary/20">
            <div>
              <div className="font-bold text-primary">Commander Harrington</div>
              <div className="text-xs text-muted-foreground">Operation Commander</div>
            </div>
            <Badge>ACTIVE</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-black/20 border border-primary/20">
            <div>
              <div className="font-bold text-primary">Captain Mitchell</div>
              <div className="text-xs text-muted-foreground">Field Commander</div>
            </div>
            <Badge>ACTIVE</Badge>
          </div>
          <div className="flex items-center justify-between p-3 bg-black/20 border border-primary/20">
            <div>
              <div className="font-bold text-primary">Sergeant Reyes</div>
              <div className="text-xs text-muted-foreground">Squad Leader</div>
            </div>
            <Badge>ACTIVE</Badge>
          </div>
        </div>
      </div>

      {/* Operation Orders */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary">OPERATION ORDERS</h3>
        </div>
        <div className="space-y-4">
          <div className="p-4 bg-red-500/10 border border-red-500/30">
            <Badge variant="destructive" className="mb-2">
              PRIORITY ALPHA
            </Badge>
            <h4 className="font-bold text-red-500 mb-2">Containment Protocol</h4>
            <p className="text-sm text-muted-foreground">
              Secure all sectors of Black Mesa Research Facility. Eliminate hostile entities.
              Prevent information leak regarding incident. Use of lethal force authorized.
            </p>
          </div>

          <div className="p-4 bg-orange-500/10 border border-orange-500/30">
            <Badge className="bg-orange-500/20 text-orange-500 border-orange-500 mb-2">
              PRIORITY BRAVO
            </Badge>
            <h4 className="font-bold text-orange-500 mb-2">Witness Elimination</h4>
            <p className="text-sm text-muted-foreground">
              Neutralize all civilian personnel with knowledge of the incident. No survivors. This
              is a direct order from command.
            </p>
          </div>

          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30">
            <Badge className="bg-yellow-500/20 text-yellow-500 border-yellow-500 mb-2">
              PRIORITY CHARLIE
            </Badge>
            <h4 className="font-bold text-yellow-500 mb-2">Asset Recovery</h4>
            <p className="text-sm text-muted-foreground">
              Secure all research materials and anomalous samples. Transport to designated
              extraction point for analysis.
            </p>
          </div>
        </div>
      </div>

      {/* Rules of Engagement */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Radio className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-bold text-primary">RULES OF ENGAGEMENT</h3>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">1.</span>
            <span>Lethal force authorized against all hostile entities</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">2.</span>
            <span>Civilian casualties acceptable if necessary for mission success</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">3.</span>
            <span>Maintain radio silence except for priority communications</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">4.</span>
            <span>No quarter given to armed resistance</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary font-bold">5.</span>
            <span>Extraction available at designated LZ upon mission completion</span>
          </li>
        </ul>
      </div>

      {/* Tactical Situation Report */}
      <div className="bg-black/40 border-2 border-primary/30 p-6">
        <h3 className="text-lg font-bold text-primary mb-4">TACTICAL SITREP</h3>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Hostile Contacts:</span>
            <span className="ml-2 text-red-500 font-bold">NUMEROUS</span>
          </div>
          <div>
            <span className="text-muted-foreground">Civilian Status:</span>
            <span className="ml-2 text-orange-500 font-bold">COMPROMISED</span>
          </div>
          <div>
            <span className="text-muted-foreground">Facility Status:</span>
            <span className="ml-2 text-yellow-500 font-bold">CRITICAL</span>
          </div>
          <div>
            <span className="text-muted-foreground">Mission Status:</span>
            <span className="ml-2 text-primary font-bold">IN PROGRESS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
