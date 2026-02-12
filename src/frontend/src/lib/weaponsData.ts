export interface WeaponStats {
  accuracy?: number;
  recoil?: number;
  range?: number;
  handling?: number;
  speed?: number;
  power?: number;
}

export interface Weapon {
  id: string;
  name: string;
  category: 'melee' | 'ranged' | 'magic';
  description: string;
  damage: string;
  stats: WeaponStats;
  imagePath: string;
  ammoTypes: string[];
  fireRates: string[];
  supportsAmmo: boolean;
  supportsFireRate: boolean;
}

export const WEAPONS_DATA: Weapon[] = [
  // MELEE
  {
    id: 'crowbar',
    name: 'CROWBAR',
    category: 'melee',
    description: 'Standard issue melee weapon. Reliable close-quarters tool for breaching and combat.',
    damage: '25 DMG',
    stats: {
      speed: 85,
      power: 60,
      range: 30,
    },
    imagePath: '/assets/generated/weapon-crowbar.dim_512x512.png',
    ammoTypes: ['NONE'],
    fireRates: ['MELEE'],
    supportsAmmo: false,
    supportsFireRate: false,
  },
  {
    id: 'stunstick',
    name: 'STUN STICK',
    category: 'melee',
    description: 'Electrified baton delivering incapacitating shock on contact. Non-lethal enforcement tool.',
    damage: '40 DMG + STUN',
    stats: {
      speed: 75,
      power: 70,
      range: 35,
    },
    imagePath: '/assets/generated/weapon-crowbar.dim_512x512.png',
    ammoTypes: ['NONE'],
    fireRates: ['MELEE'],
    supportsAmmo: false,
    supportsFireRate: false,
  },
  // RANGED
  {
    id: 'pistol',
    name: 'PISTOL',
    category: 'ranged',
    description: 'Semi-automatic sidearm. Accurate and reliable for medium-range engagements.',
    damage: '15 DMG',
    stats: {
      accuracy: 75,
      recoil: 30,
      range: 60,
      handling: 90,
    },
    imagePath: '/assets/generated/weapon-pistol.dim_512x512.png',
    ammoTypes: ['9MM', '.45 ACP'],
    fireRates: ['SEMI-AUTO'],
    supportsAmmo: true,
    supportsFireRate: true,
  },
  {
    id: 'shotgun',
    name: 'SHOTGUN',
    category: 'ranged',
    description: 'Pump-action combat shotgun. Devastating close-range spread pattern.',
    damage: '80 DMG',
    stats: {
      accuracy: 40,
      recoil: 85,
      range: 35,
      handling: 60,
    },
    imagePath: '/assets/generated/weapon-shotgun.dim_512x512.png',
    ammoTypes: ['12 GAUGE', 'SLUG'],
    fireRates: ['PUMP'],
    supportsAmmo: true,
    supportsFireRate: true,
  },
  {
    id: 'smg',
    name: 'SMG',
    category: 'ranged',
    description: 'Compact submachine gun with high rate of fire. Effective for suppression and close combat.',
    damage: '12 DMG',
    stats: {
      accuracy: 65,
      recoil: 55,
      range: 50,
      handling: 85,
    },
    imagePath: '/assets/generated/weapon-smg.dim_512x512.png',
    ammoTypes: ['9MM', '.45 ACP'],
    fireRates: ['AUTO', 'BURST'],
    supportsAmmo: true,
    supportsFireRate: true,
  },
  {
    id: 'ar2',
    name: 'AR2 PULSE RIFLE',
    category: 'ranged',
    description: 'Advanced energy weapon firing pulse rounds. Secondary fire launches energy orbs.',
    damage: '25 DMG',
    stats: {
      accuracy: 85,
      recoil: 25,
      range: 85,
      handling: 70,
    },
    imagePath: '/assets/generated/weapon-smg.dim_512x512.png',
    ammoTypes: ['PULSE', 'ENERGY'],
    fireRates: ['AUTO', 'BURST'],
    supportsAmmo: true,
    supportsFireRate: true,
  },
  {
    id: 'crossbow',
    name: 'CROSSBOW',
    category: 'ranged',
    description: 'Silent precision weapon. Bolts can pin targets to surfaces.',
    damage: '100 DMG',
    stats: {
      accuracy: 95,
      recoil: 10,
      range: 75,
      handling: 50,
    },
    imagePath: '/assets/generated/weapon-pistol.dim_512x512.png',
    ammoTypes: ['BOLT', 'TRANQ'],
    fireRates: ['SINGLE'],
    supportsAmmo: true,
    supportsFireRate: true,
  },
  // MAGIC
  {
    id: 'gravitygun',
    name: 'GRAVITY DEVICE',
    category: 'magic',
    description: 'Zero-point energy manipulator. Attracts and repels objects with gravitational force.',
    damage: 'VARIABLE',
    stats: {
      power: 95,
      range: 70,
      handling: 80,
    },
    imagePath: '/assets/generated/weapon-gravity-device.dim_512x512.png',
    ammoTypes: ['NONE'],
    fireRates: ['SPECIAL'],
    supportsAmmo: false,
    supportsFireRate: false,
  },
  {
    id: 'arcanestaff',
    name: 'ARCANE STAFF',
    category: 'magic',
    description: 'Mystical energy projector channeling raw arcane power. Charges for devastating blasts.',
    damage: '150 DMG',
    stats: {
      power: 90,
      range: 80,
      handling: 65,
    },
    imagePath: '/assets/generated/weapon-arcane-staff.dim_512x512.png',
    ammoTypes: ['ARCANE', 'VOID'],
    fireRates: ['CHARGE', 'BEAM'],
    supportsAmmo: true,
    supportsFireRate: true,
  },
  {
    id: 'rpg',
    name: 'RPG LAUNCHER',
    category: 'magic',
    description: 'Rocket-propelled grenade launcher. Laser-guided explosive projectiles.',
    damage: '200 DMG',
    stats: {
      power: 100,
      range: 90,
      handling: 40,
    },
    imagePath: '/assets/generated/weapon-gravity-device.dim_512x512.png',
    ammoTypes: ['ROCKET', 'GUIDED'],
    fireRates: ['SINGLE'],
    supportsAmmo: true,
    supportsFireRate: true,
  },
];

export const WEAPONS_BY_CATEGORY = {
  melee: WEAPONS_DATA.filter(w => w.category === 'melee'),
  ranged: WEAPONS_DATA.filter(w => w.category === 'ranged'),
  magic: WEAPONS_DATA.filter(w => w.category === 'magic'),
};
