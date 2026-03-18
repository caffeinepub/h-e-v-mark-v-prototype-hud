// HUD-safe monochrome glyph symbols for hazards and indicators
// Using simple ASCII and Unicode symbols with text presentation to avoid multi-color emoji rendering

export const GLYPHS = {
  // Hazard symbols - monochrome flat
  fire: '▲',           // Triangle for fire/temperature
  bio: '☣',            // Biohazard symbol
  radiation: '☢',      // Radiation symbol
  electrical: '⚡',    // Lightning bolt
  gas: '◆',            // Diamond for gas/vapor
  
  // Status indicators
  warning: '⚠',
  critical: '✖',
  nominal: '●',
  active: '◉',
  
  // Directional
  up: '▲',
  down: '▼',
  left: '◀',
  right: '▶',
} as const;
