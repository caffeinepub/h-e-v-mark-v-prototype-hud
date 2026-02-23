import { useSuitStore } from '../state/suitState';
import { useHazardsStore } from '../state/hazardsState';
import { useInfoSettingsStore } from '../state/infoSettingsStore';
import { useLogStore } from '../state/systemLog';
import { hevVoice } from '../audio/hevVoice';
import { uiSfx } from '../audio/uiSfx';

export function executeCommand(input: string): string {
  const parts = input.toLowerCase().trim().split(/\s+/);
  const command = parts[0];
  const args = parts.slice(1);

  const suitStore = useSuitStore.getState();
  const hazardsStore = useHazardsStore.getState();
  const infoStore = useInfoSettingsStore.getState();
  const logStore = useLogStore.getState();

  switch (command) {
    case '/help':
      return `Available commands:
/help - Show this help
/status - Show suit status
/health [value] - Set health (0-100)
/armor [value] - Set armor (0-100)
/aux [value] - Set aux power (0-100)
/ammo [value] - Set ammo
/hazard [type] [level] - Set hazard level (fire|bio|radiation|electrical|gas, 0-100)
/module [name] - Toggle module (helmet|respirator|longJump|flashlight|advancedMedical|radiationShield|defibrillator|shieldBoost|hazardSystem|moduleSync)
/voice [on|off] - Toggle AI voice feedback
/display [tactical|standard|minimal] - Change display mode
/system_restart - Restart all H.E.V systems
/reboot - Restart all H.E.V systems (alias)
/clear - Clear console history`;

    case '/status':
      const { stats, modules } = suitStore;
      const activeModules = Object.entries(modules)
        .filter(([_, active]) => active)
        .map(([name]) => name)
        .join(', ');
      return `SUIT STATUS:
Health: ${stats.health}%
Armor: ${stats.armor}%
Aux Power: ${stats.aux}%
Ammo: ${stats.ammo}
Active Modules: ${activeModules || 'None'}`;

    case '/health':
      if (args.length === 0) return 'Usage: /health [value]';
      const health = Math.max(0, Math.min(100, parseInt(args[0])));
      if (isNaN(health)) return 'Invalid health value';
      suitStore.setHealth(health);
      logStore.addEntry('system', `Health set to ${health}%`);
      return `Health set to ${health}%`;

    case '/armor':
      if (args.length === 0) return 'Usage: /armor [value]';
      const armor = Math.max(0, Math.min(100, parseInt(args[0])));
      if (isNaN(armor)) return 'Invalid armor value';
      suitStore.setArmor(armor);
      logStore.addEntry('system', `Armor set to ${armor}%`);
      return `Armor set to ${armor}%`;

    case '/aux':
      if (args.length === 0) return 'Usage: /aux [value]';
      const aux = Math.max(0, Math.min(100, parseInt(args[0])));
      if (isNaN(aux)) return 'Invalid aux power value';
      suitStore.setAux(aux);
      logStore.addEntry('system', `Aux power set to ${aux}%`);
      return `Aux power set to ${aux}%`;

    case '/ammo':
      if (args.length === 0) return 'Usage: /ammo [value]';
      const ammo = Math.max(0, parseInt(args[0]));
      if (isNaN(ammo)) return 'Invalid ammo value';
      suitStore.setAmmo(ammo);
      logStore.addEntry('system', `Ammo set to ${ammo}`);
      return `Ammo set to ${ammo}`;

    case '/hazard':
      if (args.length < 2) return 'Usage: /hazard [type] [level]';
      const hazardType = args[0];
      const level = Math.max(0, Math.min(100, parseInt(args[1])));
      if (isNaN(level)) return 'Invalid hazard level';
      
      const validTypes = ['fire', 'bio', 'radiation', 'electrical', 'gas'];
      if (!validTypes.includes(hazardType)) {
        return `Invalid hazard type. Valid types: ${validTypes.join(', ')}`;
      }

      hazardsStore.setHazardLevel(hazardType as any, level);
      logStore.addEntry('hazard', `${hazardType.toUpperCase()} hazard set to ${level}%`);
      return `${hazardType.toUpperCase()} hazard set to ${level}%`;

    case '/module':
      if (args.length === 0) return 'Usage: /module [name]';
      const moduleName = args[0];
      const validModules = [
        'helmet', 'respirator', 'longJump', 'flashlight', 
        'advancedMedical', 'radiationShield', 'defibrillator', 
        'shieldBoost', 'hazardSystem', 'moduleSync'
      ];
      
      if (!validModules.includes(moduleName)) {
        return `Invalid module. Valid modules: ${validModules.join(', ')}`;
      }

      suitStore.toggleModule(moduleName as any);
      const newState = suitStore.modules[moduleName as keyof typeof suitStore.modules];
      logStore.addEntry('system', `Module ${moduleName}: ${newState ? 'ENABLED' : 'DISABLED'}`);
      
      if (newState) {
        hevVoice.moduleEnabled(moduleName);
      } else {
        hevVoice.moduleDisabled(moduleName);
      }
      
      return `Module ${moduleName}: ${newState ? 'ENABLED' : 'DISABLED'}`;

    case '/voice':
      if (args.length === 0) {
        const currentState = infoStore.voiceEnabled;
        return `Voice feedback is currently ${currentState ? 'ENABLED' : 'DISABLED'}`;
      }
      
      const voiceArg = args[0].toLowerCase();
      if (voiceArg === 'on' || voiceArg === 'enable' || voiceArg === '1') {
        infoStore.setVoiceEnabled(true);
        logStore.addEntry('system', 'AI ASSISTANT / VOICE FEEDBACK: ENABLED');
        uiSfx.toggle();
        hevVoice.voiceSystemEnabled();
        return 'Voice feedback ENABLED';
      } else if (voiceArg === 'off' || voiceArg === 'disable' || voiceArg === '0') {
        infoStore.setVoiceEnabled(false);
        logStore.addEntry('system', 'AI ASSISTANT / VOICE FEEDBACK: DISABLED');
        uiSfx.toggle();
        return 'Voice feedback DISABLED';
      }
      return 'Usage: /voice [on|off]';

    case '/display':
      if (args.length === 0) {
        const currentMode = infoStore.displayMode;
        return `Display mode is currently ${currentMode}`;
      }
      
      const displayArg = args[0].toUpperCase();
      if (displayArg === 'TACTICAL' || displayArg === 'STANDARD' || displayArg === 'MINIMAL') {
        infoStore.setDisplayMode(displayArg as any);
        logStore.addEntry('system', `DISPLAY MODE: ${displayArg}`);
        uiSfx.toggle();
        hevVoice.displayModeChanged(displayArg);
        return `Display mode set to ${displayArg}`;
      }
      return 'Usage: /display [tactical|standard|minimal]';

    case '/system_restart':
    case '/reboot':
      suitStore.reset();
      hazardsStore.reset();
      logStore.addEntry('warning', 'SYSTEM RESTART INITIATED');
      logStore.addEntry('system', 'All systems restored to defaults');
      uiSfx.confirmAccept();
      hevVoice.displayModeChanged('restart');
      return 'System restart complete. All values reset to defaults.';

    case '/clear':
      return '__CLEAR__';

    default:
      return `Unknown command: ${command}. Type /help for available commands.`;
  }
}
