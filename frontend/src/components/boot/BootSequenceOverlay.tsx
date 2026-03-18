import { useEffect, useRef, useState } from "react";
import { useInfoSettingsStore } from "@/state/infoSettingsStore";

interface BootSequenceOverlayProps {
  onComplete: () => void;
}

const BOOT_STAGES = [
  { id: 1, label: "POWER SYSTEMS ONLINE", duration: 400 },
  { id: 2, label: "INITIALIZING NEURAL INTERFACE", duration: 500 },
  { id: 3, label: "LOADING HAZARD DETECTION MATRIX", duration: 450 },
  { id: 4, label: "CALIBRATING ENVIRONMENTAL SENSORS", duration: 400 },
  { id: 5, label: "ESTABLISHING LIFE SUPPORT LINK", duration: 500 },
  { id: 6, label: "ARMOR INTEGRITY CHECK", duration: 350 },
  { id: 7, label: "WEAPON SYSTEMS STANDBY", duration: 400 },
  { id: 8, label: "COMMUNICATIONS MODULE ACTIVE", duration: 350 },
  { id: 9, label: "TACTICAL OVERLAY RENDERING", duration: 450 },
  { id: 10, label: "MEDICAL SUBSYSTEMS NOMINAL", duration: 400 },
  { id: 11, label: "AUGMENTED REALITY DISPLAY READY", duration: 350 },
  { id: 12, label: "H.E.V. MARK V FULLY OPERATIONAL", duration: 600 },
];

const FACTION_LOGOS: Record<string, string> = {
  hev: "/assets/generated/hev-logo.dim_512x512.png",
  hecu: "/assets/generated/hecu-logo.dim_512x512.png",
  security: "/assets/generated/security-logo.dim_512x512.png",
};

export default function BootSequenceOverlay({ onComplete }: BootSequenceOverlayProps) {
  const { systemStyle } = useInfoSettingsStore();
  const [currentStage, setCurrentStage] = useState(0);
  const [completedStages, setCompletedStages] = useState<number[]>([]);
  const [showLogo, setShowLogo] = useState(false);
  const [logoVisible, setLogoVisible] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const completedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const logoSrc = FACTION_LOGOS[systemStyle] ?? FACTION_LOGOS["hev"];

  const handleSkip = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    if (timerRef.current) clearTimeout(timerRef.current);
    onComplete();
  };

  useEffect(() => {
    let cancelled = false;

    const runStages = async () => {
      // Initial glitch
      setGlitchActive(true);
      await delay(300);
      if (cancelled) return;
      setGlitchActive(false);

      // Show logo
      setShowLogo(true);
      await delay(200);
      if (cancelled) return;
      setLogoVisible(true);
      await delay(600);
      if (cancelled) return;

      // Run through each stage
      for (let i = 0; i < BOOT_STAGES.length; i++) {
        if (cancelled) return;
        setCurrentStage(i);
        setProgress(Math.round(((i + 1) / BOOT_STAGES.length) * 100));

        // Occasional glitch
        if (i === 3 || i === 7) {
          setGlitchActive(true);
          await delay(120);
          if (cancelled) return;
          setGlitchActive(false);
        }

        await delay(BOOT_STAGES[i].duration);
        if (cancelled) return;
        setCompletedStages((prev) => [...prev, i]);
      }

      if (cancelled) return;
      setProgress(100);
      await delay(500);
      if (cancelled) return;

      if (!completedRef.current) {
        completedRef.current = true;
        onComplete();
      }
    };

    runStages();

    return () => {
      cancelled = true;
    };
  }, [onComplete]);

  const factionLabel =
    systemStyle === "hecu"
      ? "HECU TACTICAL SYSTEM"
      : systemStyle === "security"
      ? "BLACK MESA SECURITY"
      : "H.E.V. SUIT SYSTEM";

  return (
    <div className="boot-overlay fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background overflow-hidden">
      {/* CRT scanlines */}
      <div className="pointer-events-none absolute inset-0 z-10 boot-scanlines" />

      {/* Glitch overlay */}
      {glitchActive && (
        <div className="pointer-events-none absolute inset-0 z-20 boot-glitch-flash" />
      )}

      {/* Skip button */}
      <button
        onClick={handleSkip}
        className="absolute bottom-8 right-8 z-30 border border-accent text-accent font-mono text-xs tracking-widest px-4 py-2 hover:bg-accent/10 transition-colors uppercase"
        style={{ letterSpacing: "0.2em" }}
      >
        [ SKIP ]
      </button>

      {/* Logo */}
      <div
        className={`mb-8 transition-all duration-700 ${
          logoVisible ? "opacity-100 scale-100" : "opacity-0 scale-75"
        } ${showLogo ? "block" : "hidden"}`}
      >
        <img
          src={logoSrc}
          alt="Faction Logo"
          className="w-24 h-24 object-contain boot-logo-glow"
          draggable={false}
        />
      </div>

      {/* Title */}
      <div className="mb-6 text-center">
        <div className="font-mono text-accent text-xl tracking-[0.3em] uppercase mb-1">
          {factionLabel}
        </div>
        <div className="font-mono text-muted-foreground text-xs tracking-[0.2em] uppercase">
          INITIALIZING SUBSYSTEMS...
        </div>
      </div>

      {/* Stage list */}
      <div className="w-full max-w-md px-6 mb-6 space-y-1">
        {BOOT_STAGES.map((stage, idx) => {
          const isDone = completedStages.includes(idx);
          const isActive = currentStage === idx && !isDone;
          return (
            <div
              key={stage.id}
              className={`flex items-center gap-3 font-mono text-xs transition-all duration-200 ${
                isDone
                  ? "text-accent opacity-80"
                  : isActive
                  ? "text-foreground"
                  : "text-muted-foreground opacity-30"
              }`}
            >
              <span className="w-4 shrink-0">
                {isDone ? "✓" : isActive ? "▶" : "·"}
              </span>
              <span className="tracking-wider uppercase">{stage.label}</span>
              {isActive && (
                <span className="ml-auto animate-pulse text-accent">...</span>
              )}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div className="w-full max-w-md px-6">
        <div className="flex justify-between font-mono text-xs text-muted-foreground mb-1">
          <span className="tracking-widest uppercase">SYSTEM LOAD</span>
          <span className="text-accent">{progress}%</span>
        </div>
        <div className="h-1 bg-muted w-full overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Bottom label */}
      <div className="absolute bottom-8 left-8 font-mono text-xs text-muted-foreground tracking-widest opacity-50 uppercase">
        BLACK MESA RESEARCH FACILITY
      </div>
    </div>
  );
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
