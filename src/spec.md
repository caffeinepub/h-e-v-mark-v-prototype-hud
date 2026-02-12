# Specification

## Summary
**Goal:** Apply the Tactical tab’s visual styling, interaction polish, and layout/scroll conventions across all other tabs for a consistent HUD look and feel.

**Planned changes:**
- Update BASICS, MEDICAL, INFO, UTILITIES, WEAPONS, and SETTINGS tab primary panels/sections to reuse Tactical tab styling patterns (panel borders/inset-glow, textured backgrounds, dense HUD typography).
- Apply Tactical-style hover/focus/active feedback and subtle transitions (including any existing Tactical pulse/glow emphasis patterns where appropriate) to comparable interactive elements in non-tactical tabs, without changing behavior.
- Standardize spacing and overflow/scrolling to match Tactical tab container conventions (padding scaled by `--hud-scale`, consistent gaps, predictable scrolling) across STANDARD and TACTICAL display modes, while keeping Tactical tab visibility/behavior unchanged.

**User-visible outcome:** All tabs (not just TACTICAL) present content in cohesive Tactical-style HUD panels with consistent hover/transition feedback and reliable spacing/scrolling across display modes.
