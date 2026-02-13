# Specification

## Summary
**Goal:** Make utility module toggles persist correctly so backend module states update and the Utilities UI stays in sync after refetches.

**Planned changes:**
- Fix backend `toggleModule(moduleName : Text)` to update the persistent `modules` state so `getModuleStates()` returns the new stored values after toggling.
- Ensure frontend Utilities switches rely on the backend-refetched `modules` (React Query) state after mutation settle/invalidate, and only roll back visually when a toggle fails.

**User-visible outcome:** Toggling any Utilities module switch stays enabled/disabled correctly, remains consistent after refetch or navigation, and only reverts if the toggle request fails.
