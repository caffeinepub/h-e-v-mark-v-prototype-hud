# Specification

## Summary
**Goal:** Default the app to STANDARD display mode, make it installable as an Android PWA, and improve mobile readability and touch usability.

**Planned changes:**
- Set STANDARD as the default display mode on first load and after the existing SYSTEM RESTART/settings reset flow.
- Add PWA support: web app manifest, appropriate icon set, and a service worker to cache the app shell for offline-capable startup.
- Improve mobile responsive scaling and layout so HUD and core UI elements remain readable/usable on common phone sizes (portrait and landscape), including safe-area handling.
- Make controls touch-friendly across the app (larger tap targets, remove hover-only interactions, ensure reliable tab switching and scrolling on touch) without regressing desktop mouse/keyboard behavior.

**User-visible outcome:** On a fresh load (and after SYSTEM RESTART) the app opens in STANDARD mode, can be installed to an Android home screen and run standalone, and is easier to read and operate on phones with improved scaling and touch controls.
