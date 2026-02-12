# Specification

## Summary
**Goal:** Expand the Weapons tab to show categorized static weapon lists (melee, ranged, magic) with selectable entries and richer weapon details including images.

**Planned changes:**
- Update `frontend/src/tabs/WeaponsTab.tsx` to render three clearly labeled sections: MELEE, RANGED, and MAGIC, each with multiple clickable weapon entries.
- Replace/extend the local static weapon data in `WeaponsTab.tsx` to be categorized and to include per-weapon: name, description, damage, stats, and an image path referencing a frontend static asset.
- Enhance the Weapon Details panel to display the selected weapon’s image, description, damage, and stats, while keeping ammo type and fire rate controls working where applicable and hiding/disabling them for weapons that don’t use them.
- Add new weapon illustration images under `frontend/public/assets/generated/` and reference them from the weapon data so entries can render thumbnails/previews without broken links.

**User-visible outcome:** Users can browse MELEE, RANGED, and MAGIC weapon sections, click a weapon to select it, and see its image and full static details in the details panel with appropriate ammo/fire-rate controls shown only when relevant.
