import { useEffect, useRef, useState } from "react";
import { useSuitStore } from "@/state/suitState";
import { useHazardsStore } from "@/state/hazardsState";
import { useInfoSettingsStore } from "@/state/infoSettingsStore";

const HEV_MESSAGES = [
  "SUIT SYSTEMS NOMINAL",
  "ENVIRONMENTAL MONITORING ACTIVE",
  "LIFE SUPPORT ONLINE",
  "NEURAL INTERFACE STABLE",
  "POWER RESERVES ADEQUATE",
  "HAZARD DETECTION ARMED",
  "COMMUNICATIONS LINK ESTABLISHED",
  "AUGMENTED REALITY DISPLAY ACTIVE",
];

const HECU_MESSAGES = [
  "TACTICAL SYSTEMS ONLINE",
  "COMMS LINK ESTABLISHED",
  "THREAT ASSESSMENT ACTIVE",
  "UNIT TRACKING NOMINAL",
  "FIRE SUPPORT READY",
  "PERIMETER SECURE",
  "COMMAND NET ACTIVE",
  "ENGAGEMENT PROTOCOLS LOADED",
];

const SECURITY_MESSAGES = [
  "SECURITY NET ACTIVE",
  "SECTOR MONITORING ONLINE",
  "ACCESS CONTROL ARMED",
  "PATROL ROUTE LOADED",
  "SURVEILLANCE FEEDS ACTIVE",
  "EMERGENCY PROTOCOLS STANDBY",
  "FACILITY STATUS NOMINAL",
  "CONTAINMENT SYSTEMS READY",
];

const RESISTANCE_MESSAGES = [
  "RESISTANCE NET ACTIVE",
  "COMBINE SCANNER ARMED",
  "SAFE HOUSE LINK ONLINE",
  "SUPPLY CACHE LOCATED",
  "EXTRACTION ROUTE MAPPED",
  "SIGNAL SCRAMBLER ACTIVE",
  "REBEL COMMS ESTABLISHED",
  "FREEDOM PROTOCOLS LOADED",
];

function getMessages(style: string): string[] {
  switch (style) {
    case "hecu": return HECU_MESSAGES;
    case "security":
    case "guard": return SECURITY_MESSAGES;
    case "resistance": return RESISTANCE_MESSAGES;
    default: return HEV_MESSAGES;
  }
}

export function SuitVoiceReadout() {
  const { stats } = useSuitStore();
  const { getAggregateHazard } = useHazardsStore();
  const { systemStyle, voiceEnabled } = useInfoSettingsStore();

  const health = stats.health;
  const armor = stats.armor;

  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(true);
  const msgIndexRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const messages = getMessages(systemStyle);

  const isCriticalHealth = health <= 20;
  const isLowHealth = health <= 40;
  const isLowArmor = armor <= 20;
  const hazardLevel = getAggregateHazard();
  const isHazardCritical = hazardLevel >= 75;

  const getCriticalMessage = (): string | null => {
    if (isCriticalHealth) return "WARNING: HEALTH CRITICAL";
    if (isHazardCritical) return "WARNING: HAZARD LEVEL CRITICAL";
    if (isLowHealth) return "CAUTION: HEALTH LOW";
    if (isLowArmor) return "CAUTION: ARMOR DEPLETED";
    return null;
  };

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    const critMsg = getCriticalMessage();
    if (critMsg) {
      setMessage(critMsg);
      setVisible(true);
      return;
    }

    // Rotate through normal messages
    setMessage(messages[msgIndexRef.current % messages.length]);
    setVisible(true);

    intervalRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        msgIndexRef.current = (msgIndexRef.current + 1) % messages.length;
        setMessage(messages[msgIndexRef.current]);
        setVisible(true);
      }, 400);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [systemStyle, health, armor, hazardLevel]);

  if (!voiceEnabled) return null;

  const isCritical = isCriticalHealth || isHazardCritical;

  return (
    <div
      className={`px-3 py-1 font-mono text-xs tracking-widest uppercase border-b border-border/30 transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
      } ${isCritical ? "text-destructive animate-pulse" : "text-accent/70"}`}
    >
      <span className="mr-2 opacity-50">▶</span>
      {message}
    </div>
  );
}
