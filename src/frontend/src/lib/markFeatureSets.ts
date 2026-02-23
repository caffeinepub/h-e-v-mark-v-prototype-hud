// Feature set definitions for each H.E.V Mark
export interface MarkFeatureSet {
  // Stats visibility
  stats: {
    health: boolean;
    armor: boolean;
    aux: boolean;
    ammo: boolean;
  };
  // Panels availability
  panels: {
    hazards: boolean;
    medical: boolean;
    tactical: boolean;
    utilities: boolean;
    weapons: boolean;
    vehicles: boolean;
  };
  // Tabs accessibility
  tabs: {
    basics: boolean;
    medical: boolean;
    info: boolean;
    utilities: boolean;
    weapons: boolean;
    hazards: boolean;
    tactical: boolean;
    vehicles: boolean;
    settings: boolean;
  };
  // Module toggles
  modules: {
    helmet: boolean;
    respirator: boolean;
    longJump: boolean;
    flashlight: boolean;
    advancedMedical: boolean;
    radiationShield: boolean;
    defibrillator: boolean;
    shieldBoost: boolean;
    hazardSystem: boolean;
    moduleSync: boolean;
  };
  // Advanced features
  advanced: {
    tacticalRadar: boolean;
    threatAssessment: boolean;
    missionBriefing: boolean;
    neuralInterface: boolean;
    bioMonitoring: boolean;
    nanoRepair: boolean;
    environmentalAnalysis: boolean;
    trendAnalysis: boolean;
  };
}

export const markFeatureSets: Record<string, MarkFeatureSet> = {
  'mark-i': {
    stats: {
      health: true,
      armor: false,
      aux: false,
      ammo: false,
    },
    panels: {
      hazards: false,
      medical: false,
      tactical: false,
      utilities: false,
      weapons: false,
      vehicles: false,
    },
    tabs: {
      basics: true,
      medical: false,
      info: true,
      utilities: false,
      weapons: false,
      hazards: false,
      tactical: false,
      vehicles: false,
      settings: true,
    },
    modules: {
      helmet: false,
      respirator: false,
      longJump: false,
      flashlight: false,
      advancedMedical: false,
      radiationShield: false,
      defibrillator: false,
      shieldBoost: false,
      hazardSystem: false,
      moduleSync: false,
    },
    advanced: {
      tacticalRadar: false,
      threatAssessment: false,
      missionBriefing: false,
      neuralInterface: false,
      bioMonitoring: false,
      nanoRepair: false,
      environmentalAnalysis: false,
      trendAnalysis: false,
    },
  },
  'mark-ii': {
    stats: {
      health: true,
      armor: true,
      aux: false,
      ammo: false,
    },
    panels: {
      hazards: true,
      medical: false,
      tactical: false,
      utilities: false,
      weapons: false,
      vehicles: false,
    },
    tabs: {
      basics: true,
      medical: false,
      info: true,
      utilities: false,
      weapons: false,
      hazards: true,
      tactical: false,
      vehicles: false,
      settings: true,
    },
    modules: {
      helmet: false,
      respirator: false,
      longJump: false,
      flashlight: true,
      advancedMedical: false,
      radiationShield: false,
      defibrillator: false,
      shieldBoost: false,
      hazardSystem: false,
      moduleSync: false,
    },
    advanced: {
      tacticalRadar: false,
      threatAssessment: false,
      missionBriefing: false,
      neuralInterface: false,
      bioMonitoring: false,
      nanoRepair: false,
      environmentalAnalysis: false,
      trendAnalysis: false,
    },
  },
  'mark-iii': {
    stats: {
      health: true,
      armor: true,
      aux: true,
      ammo: false,
    },
    panels: {
      hazards: true,
      medical: true,
      tactical: true,
      utilities: true,
      weapons: false,
      vehicles: false,
    },
    tabs: {
      basics: true,
      medical: true,
      info: true,
      utilities: true,
      weapons: false,
      hazards: true,
      tactical: true,
      vehicles: false,
      settings: true,
    },
    modules: {
      helmet: true,
      respirator: true,
      longJump: false,
      flashlight: true,
      advancedMedical: false,
      radiationShield: false,
      defibrillator: false,
      shieldBoost: false,
      hazardSystem: false,
      moduleSync: false,
    },
    advanced: {
      tacticalRadar: true,
      threatAssessment: true,
      missionBriefing: false,
      neuralInterface: false,
      bioMonitoring: false,
      nanoRepair: false,
      environmentalAnalysis: false,
      trendAnalysis: false,
    },
  },
  'mark-iv': {
    stats: {
      health: true,
      armor: true,
      aux: true,
      ammo: true,
    },
    panels: {
      hazards: true,
      medical: true,
      tactical: true,
      utilities: true,
      weapons: true,
      vehicles: true,
    },
    tabs: {
      basics: true,
      medical: true,
      info: true,
      utilities: true,
      weapons: true,
      hazards: true,
      tactical: true,
      vehicles: true,
      settings: true,
    },
    modules: {
      helmet: true,
      respirator: true,
      longJump: true,
      flashlight: true,
      advancedMedical: false,
      radiationShield: true,
      defibrillator: false,
      shieldBoost: false,
      hazardSystem: true,
      moduleSync: false,
    },
    advanced: {
      tacticalRadar: true,
      threatAssessment: true,
      missionBriefing: true,
      neuralInterface: true,
      bioMonitoring: true,
      nanoRepair: false,
      environmentalAnalysis: true,
      trendAnalysis: true,
    },
  },
  'mark-v': {
    stats: {
      health: true,
      armor: true,
      aux: true,
      ammo: true,
    },
    panels: {
      hazards: true,
      medical: true,
      tactical: true,
      utilities: true,
      weapons: true,
      vehicles: true,
    },
    tabs: {
      basics: true,
      medical: true,
      info: true,
      utilities: true,
      weapons: true,
      hazards: true,
      tactical: true,
      vehicles: true,
      settings: true,
    },
    modules: {
      helmet: true,
      respirator: true,
      longJump: true,
      flashlight: true,
      advancedMedical: true,
      radiationShield: true,
      defibrillator: true,
      shieldBoost: true,
      hazardSystem: true,
      moduleSync: true,
    },
    advanced: {
      tacticalRadar: true,
      threatAssessment: true,
      missionBriefing: true,
      neuralInterface: true,
      bioMonitoring: true,
      nanoRepair: true,
      environmentalAnalysis: true,
      trendAnalysis: true,
    },
  },
  'prototype': {
    stats: {
      health: true,
      armor: true,
      aux: true,
      ammo: true,
    },
    panels: {
      hazards: true,
      medical: true,
      tactical: true,
      utilities: true,
      weapons: true,
      vehicles: true,
    },
    tabs: {
      basics: true,
      medical: true,
      info: true,
      utilities: true,
      weapons: true,
      hazards: true,
      tactical: true,
      vehicles: true,
      settings: true,
    },
    modules: {
      helmet: true,
      respirator: true,
      longJump: true,
      flashlight: true,
      advancedMedical: true,
      radiationShield: true,
      defibrillator: true,
      shieldBoost: true,
      hazardSystem: true,
      moduleSync: true,
    },
    advanced: {
      tacticalRadar: true,
      threatAssessment: true,
      missionBriefing: true,
      neuralInterface: true,
      bioMonitoring: true,
      nanoRepair: true,
      environmentalAnalysis: true,
      trendAnalysis: true,
    },
  },
};
