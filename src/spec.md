# Specification

## Summary
**Goal:** Make the HUD tab bar usable on small screens so all tabs (including Settings) remain reachable.

**Planned changes:**
- Update `HudTabsBar` layout to reduce tab visual width and support horizontal overflow scrolling on narrow/mobile viewports.
- Add a compact rendering mode for small widths that shows only the primary tab label and removes/reduces secondary micro-text/indicator line.
- Ensure desktop behavior remains unchanged (no unnecessary scrolling when space permits) while keeping tab switching and active styling consistent.

**User-visible outcome:** On small screens, users can horizontally scroll/drag the HUD tabs and reliably reach the Settings tab; on larger screens, tabs remain fully visible and work as before.
