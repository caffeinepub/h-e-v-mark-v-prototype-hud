// HUD-safe monochrome glyph symbols for hazards and indicators
// Using Unicode symbols with text presentation to avoid multi-color emoji rendering

export const GLYPHS = {
  // Hazard symbols
  fire: '▲',           // Triangle for fire/temperature
  bio: '☣\uFE0E',      // Biohazard symbol (text variant)
  radiation: '☢\uFE0E', // Radiation symbol (text variant)
  electrical: '⚡\uFE0E', // Lightning bolt (text variant)
  gas: '◆',            // Diamond for gas/vapor
  
  // Status indicators
  warning: '⚠\uFE0E',
  critical: '✖\uFE0E',
  nominal: '●',
  active: '◉',
  
  // Directional
  up: '▲',
  down: '▼',
  left: '◀',
  right: '▶',
} as const;
