# Specification

## Summary
**Goal:** Restore the H.E.V HUD so it renders correctly after the boot sequence, and add a SKIP button to the boot overlay.

**Planned changes:**
- Fix the main HUD view so it becomes visible and fully functional after the boot sequence's `onComplete` fires, restoring all existing features (CRT flicker overlay, faction color-switching, suit voice readout, all HUD tabs and modules)
- Add a SKIP button to `BootSequenceOverlay.tsx` positioned in the bottom-right corner, styled with faction color tokens and monospace font, that immediately calls `onComplete` and dismisses the boot overlay when clicked

**User-visible outcome:** The HUD is fully visible with all features intact after the boot sequence finishes, and users can click SKIP during boot-up to jump straight to the main HUD view.
