export interface MarkTheme {
  name: string;
  description: string;
  colors: {
    primary: string;
    accent: string;
    border: string;
    background: string;
    foreground: string;
  };
  characteristics: string[];
  visualStyle: 'industrial' | 'combat' | 'hybrid';
}

export const markThemes: Record<string, MarkTheme> = {
  'prototype': {
    name: 'Prototype',
    description: 'Experimental hybrid design combining Mark VI industrial hazmat construction with Mark V sleek combat features.',
    colors: {
      primary: '0.70 0.20 45',
      accent: '0.65 0.25 210',
      border: '0.40 0.15 45',
      background: '0.15 0.04 42',
      foreground: '0.88 0.18 45',
    },
    characteristics: [
      'Heavy-duty industrial panel construction',
      'Sleek tactical combat overlays',
      'Hazmat yellow with tactical blue accents',
      'Riveted panel textures with modern gradients',
      'Experimental hybrid systems',
    ],
    visualStyle: 'hybrid',
  },
  'mark-i': {
    name: 'Mark I',
    description: 'Early prototype with basic life support. Minimal features, prone to system instabilities and visual glitches.',
    colors: {
      primary: '0.60 0.18 35',
      accent: '0.65 0.20 30',
      border: '0.30 0.12 35',
      background: '0.10 0.02 35',
      foreground: '0.75 0.16 35',
    },
    characteristics: [
      'Basic health monitoring only',
      'Unstable display systems',
      'Frequent visual glitches',
      'Limited sensor array',
      'Prototype-era construction',
    ],
    visualStyle: 'industrial',
  },
  'mark-ii': {
    name: 'Mark II',
    description: 'Improved stability with armor monitoring and basic hazard detection. Still limited compared to later models.',
    colors: {
      primary: '0.65 0.20 38',
      accent: '0.68 0.22 36',
      border: '0.32 0.13 38',
      background: '0.11 0.03 38',
      foreground: '0.80 0.18 38',
    },
    characteristics: [
      'Health and armor monitoring',
      'Basic hazard detection',
      'Improved display stability',
      'Limited module support',
      'Enhanced durability',
    ],
    visualStyle: 'industrial',
  },
  'mark-iii': {
    name: 'Mark III',
    description: 'Significant upgrade with auxiliary power systems, partial module controls, and tactical capabilities.',
    colors: {
      primary: '0.68 0.21 40',
      accent: '0.70 0.23 38',
      border: '0.34 0.14 40',
      background: '0.12 0.03 40',
      foreground: '0.83 0.19 40',
    },
    characteristics: [
      'Full vital signs monitoring',
      'Auxiliary power management',
      'Partial module control',
      'Basic tactical systems',
      'Enhanced environmental protection',
    ],
    visualStyle: 'industrial',
  },
  'mark-iv': {
    name: 'Mark IV',
    description: 'Rugged hazmat-focused design. Industrial aesthetic with heavy environmental protection emphasis.',
    colors: {
      primary: '0.68 0.22 42',
      accent: '0.72 0.24 38',
      border: '0.35 0.14 42',
      background: '0.12 0.03 40',
      foreground: '0.85 0.20 42',
    },
    characteristics: [
      'Heavy industrial styling',
      'Hazmat-focused interface',
      'Rugged panel borders',
      'Earthy orange tones',
      'Maximum environmental protection',
    ],
    visualStyle: 'industrial',
  },
  'mark-v': {
    name: 'Mark V',
    description: 'Advanced combat-optimized suit. Sleek modern design with full tactical integration and all systems operational.',
    colors: {
      primary: '0.72 0.24 25',
      accent: '0.68 0.26 15',
      border: '0.38 0.16 25',
      background: '0.14 0.04 25',
      foreground: '0.90 0.22 25',
    },
    characteristics: [
      'Sleek combat-ready design',
      'Full tactical integration',
      'Advanced neural interface',
      'Vibrant orange-red palette',
      'All systems operational',
    ],
    visualStyle: 'combat',
  },
};

export function getMarkTheme(mark: string): MarkTheme {
  return markThemes[mark] || markThemes['mark-v'];
}
