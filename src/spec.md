# Specification

## Summary
**Goal:** Add a dedicated HAZARD tab that consolidates all hazard categories, environmental status readouts, and live simulated hazard statistics in both STANDARD and TACTICAL modes.

**Planned changes:**
- Add a new main navigation tab trigger labeled “HAZARD” and corresponding tab content, preserving existing tab-switch SFX behavior.
- Create a new Hazard tab component (under `frontend/src/tabs`) that renders an “ALL HAZARDS” section (fire/temperature, biohazard, radiation, electrical, toxic gas) and an “ENVIRONMENTAL STATUS” section with multiple labeled indicators styled consistently with existing HUD panels.
- Implement live-updating simulated hazard statistics on the Hazard tab, including an aggregate severity value and per-hazard trend indicators derived from recent simulated history, while keeping compatibility with existing hazard alert monitoring/threshold behaviors.
- Expand hazard data plumbing so a single backend method returns all five hazard levels in one response (including electrical) and add a frontend React Query hook to fetch and render backend-provided status text per hazard when available.

**User-visible outcome:** Users can open a new HAZARD tab (in both display modes) to view all hazard categories, detailed environmental status indicators, and automatically updating simulated hazard levels with aggregate and trend statistics, with existing critical alert behaviors still functioning.
