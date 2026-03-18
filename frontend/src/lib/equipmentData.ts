export interface EquipmentModule {
  name: string;
  category: string;
  specifications: string;
  capabilities: string[];
  operationalNotes: string;
}

export const equipmentModules: EquipmentModule[] = [
  {
    name: 'Helmet & HUD System',
    category: 'Visual Systems',
    specifications: 'Reinforced polycarbonate with integrated heads-up display. 180° field of view. Night vision capable.',
    capabilities: [
      'Real-time vital signs monitoring',
      'Environmental hazard detection',
      'Weapon status display',
      'Navigation assistance',
      'Threat identification',
    ],
    operationalNotes: 'HUD can be toggled on/off via neural interface. Automatic brightness adjustment based on ambient light.',
  },
  {
    name: 'Respirator System',
    category: 'Life Support',
    specifications: 'Multi-stage filtration with 72-hour autonomous operation. Positive pressure system prevents contamination.',
    capabilities: [
      'Filters biological agents',
      'Neutralizes chemical threats',
      'Provides oxygen in toxic atmospheres',
      'Underwater breathing (limited duration)',
      'Automatic activation on hazard detection',
    ],
    operationalNotes: 'Filter cartridges should be replaced after exposure to extreme contamination. System draws from aux power.',
  },
  {
    name: 'Radiation Shield',
    category: 'Environmental Protection',
    specifications: 'Lead-lined composite armor with active electromagnetic shielding. Protects against alpha, beta, and gamma radiation.',
    capabilities: [
      'Reduces radiation exposure by 95%',
      'Active monitoring of radiation levels',
      'Automatic decontamination protocols',
      'Geiger counter integration',
      'Dosimeter tracking',
    ],
    operationalNotes: 'Shield effectiveness decreases with sustained exposure. Requires periodic recharge from power sources.',
  },
  {
    name: 'Long Jump Module',
    category: 'Mobility Enhancement',
    specifications: 'Experimental propulsion system utilizing compressed gas and electromagnetic acceleration.',
    capabilities: [
      'Extended horizontal jump distance',
      'Reduced fall damage',
      'Rapid tactical repositioning',
      'Obstacle clearance',
      'Emergency evasion',
    ],
    operationalNotes: 'Consumes significant aux power per activation. Requires stable footing for optimal performance. Not recommended in confined spaces.',
  },
  {
    name: 'Advanced Medical System',
    category: 'Medical Support',
    specifications: 'Automated trauma response with morphine auto-injector, coagulant dispenser, and vital sign stabilization.',
    capabilities: [
      'Automatic wound sealing',
      'Pain management',
      'Hemorrhage control',
      'Vital sign stabilization',
      'Toxin neutralization',
    ],
    operationalNotes: 'Limited supply of medical compounds. Refill at medical stations. System prioritizes life-threatening injuries.',
  },
  {
    name: 'Defibrillator',
    category: 'Medical Support',
    specifications: 'Integrated cardiac emergency system with automatic rhythm detection and shock delivery.',
    capabilities: [
      'Cardiac arrest response',
      'Automatic rhythm analysis',
      'Adjustable shock intensity',
      'Post-shock monitoring',
      'Emergency stabilization',
    ],
    operationalNotes: 'Single-use per charge cycle. Requires 30-second recharge period. Not effective on non-cardiac trauma.',
  },
  {
    name: 'Flashlight',
    category: 'Utility',
    specifications: 'High-intensity LED array with 500-meter effective range. Powered by aux battery.',
    capabilities: [
      'Illumination in dark environments',
      'Adjustable beam width',
      'Strobe mode for signaling',
      'Low-power mode for extended use',
      'Automatic activation in darkness',
    ],
    operationalNotes: 'Continuous use drains aux power. Recharges automatically when not in use.',
  },
  {
    name: 'Shield Boost System',
    category: 'Defensive Systems',
    specifications: 'Electromagnetic field generator providing temporary armor enhancement.',
    capabilities: [
      'Temporary armor boost',
      'Deflects projectiles',
      'Reduces impact damage',
      'Energy weapon resistance',
      'Emergency protection',
    ],
    operationalNotes: 'Limited duration per activation. Significant aux power consumption. Cooldown period required between uses.',
  },
  {
    name: 'Hazard Detection System',
    category: 'Environmental Monitoring',
    specifications: 'Multi-spectrum sensor array detecting chemical, biological, radiological, and electrical hazards.',
    capabilities: [
      'Real-time hazard identification',
      'Threat level assessment',
      'Contamination mapping',
      'Exposure tracking',
      'Automatic alert generation',
    ],
    operationalNotes: 'Continuous monitoring mode available. Alerts can be configured for specific threat types.',
  },
];
