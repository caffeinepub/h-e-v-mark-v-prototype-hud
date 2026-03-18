import { useState } from 'react';
import { useInfoSettingsStore } from '@/state/infoSettingsStore';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { HudSwitch } from '@/components/common/HudSwitch';
import { Label } from '@/components/ui/label';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, Zap, Target, Gauge, Clock, Box, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Weapon {
  name: string;
  type: string;
  damage: number;
  fireRate: number;
  accuracy: number;
  reloadTime: number;
  magazineCapacity: number;
  effectiveRange: number;
  description: string;
  lore: string;
  capabilities: string[];
  fireModes: string[];
  ammoTypes: string[];
  technicalSpecs: {
    velocity: string;
    penetration: string;
    falloff: string;
    weight: string;
    maintenance: string;
  };
}

// Complete Half-Life 1 Weapons Arsenal
const HL1_WEAPONS: Weapon[] = [
  {
    name: 'Crowbar',
    type: 'Melee Weapon',
    damage: 50,
    fireRate: 80,
    accuracy: 100,
    reloadTime: 0,
    magazineCapacity: 0,
    effectiveRange: 2,
    description: 'Iconic melee weapon. Effective for close combat and breaking obstacles.',
    lore: 'The humble crowbar became Gordon Freeman\'s signature weapon during the Black Mesa incident. A symbol of survival and resourcefulness.',
    capabilities: ['Melee', 'Silent', 'Unlimited Use', 'Utility Tool'],
    fireModes: ['Swing'],
    ammoTypes: ['None'],
    technicalSpecs: {
      velocity: 'N/A',
      penetration: 'Medium',
      falloff: 'N/A',
      weight: '2.5 kg',
      maintenance: 'None',
    },
  },
  {
    name: 'Glock 17',
    type: 'Pistol',
    damage: 60,
    fireRate: 70,
    accuracy: 80,
    reloadTime: 1.5,
    magazineCapacity: 17,
    effectiveRange: 50,
    description: 'Standard issue 9mm pistol. Reliable sidearm with decent accuracy.',
    lore: 'The Glock 17 was standard issue for Black Mesa security personnel. Its reliability made it a favorite among survivors.',
    capabilities: ['Semi-Auto', 'High Capacity', 'Reliable', 'Quick Draw'],
    fireModes: ['Semi-Automatic'],
    ammoTypes: ['9mm Parabellum'],
    technicalSpecs: {
      velocity: '375 m/s',
      penetration: 'Low',
      falloff: 'Moderate',
      weight: '0.9 kg',
      maintenance: 'Very Low',
    },
  },
  {
    name: '.357 Magnum',
    type: 'Revolver',
    damage: 90,
    fireRate: 50,
    accuracy: 92,
    reloadTime: 3.0,
    magazineCapacity: 6,
    effectiveRange: 100,
    description: 'Powerful revolver with exceptional stopping power and accuracy.',
    lore: 'The Colt Python is a classic weapon, prized for its reliability and devastating power. One shot, one kill.',
    capabilities: ['High Damage', 'Armor Piercing', 'Long Range', 'Precision'],
    fireModes: ['Single Action'],
    ammoTypes: ['.357 Magnum Rounds'],
    technicalSpecs: {
      velocity: '440 m/s',
      penetration: 'Very High',
      falloff: 'Low',
      weight: '1.2 kg',
      maintenance: 'Low',
    },
  },
  {
    name: 'MP5',
    type: 'Submachine Gun',
    damage: 70,
    fireRate: 85,
    accuracy: 78,
    reloadTime: 2.2,
    magazineCapacity: 50,
    effectiveRange: 75,
    description: 'Versatile submachine gun with grenade launcher attachment.',
    lore: 'The MP5 was used extensively by HECU forces during the Black Mesa incident. Its grenade launcher makes it deadly versatile.',
    capabilities: ['Automatic Fire', 'Grenade Launcher', 'Versatile', 'Compact'],
    fireModes: ['Automatic', 'Grenade'],
    ammoTypes: ['9mm Rounds', 'Contact Grenades'],
    technicalSpecs: {
      velocity: '400 m/s',
      penetration: 'Medium',
      falloff: 'Moderate',
      weight: '2.9 kg',
      maintenance: 'Low',
    },
  },
  {
    name: 'SPAS-12 Shotgun',
    type: 'Combat Shotgun',
    damage: 92,
    fireRate: 40,
    accuracy: 65,
    reloadTime: 3.0,
    magazineCapacity: 8,
    effectiveRange: 25,
    description: 'Pump-action shotgun devastating at close range.',
    lore: 'The SPAS-12 proved invaluable in the tight corridors of Black Mesa. Its stopping power is unmatched at close range.',
    capabilities: ['High Damage', 'Close Range', 'Spread Fire', 'Stopping Power'],
    fireModes: ['Pump Action'],
    ammoTypes: ['12 Gauge Buckshot'],
    technicalSpecs: {
      velocity: '400 m/s',
      penetration: 'High (Close)',
      falloff: 'Severe',
      weight: '4.4 kg',
      maintenance: 'Moderate',
    },
  },
  {
    name: 'Crossbow',
    type: 'Precision Weapon',
    damage: 100,
    fireRate: 30,
    accuracy: 98,
    reloadTime: 2.8,
    magazineCapacity: 1,
    effectiveRange: 200,
    description: 'Silent precision weapon with heated rebar bolts. Features scope for long-range targeting.',
    lore: 'Originally a tool for construction, this crossbow was modified to fire superheated rebar. Silent and deadly.',
    capabilities: ['Silent', 'Scope', 'Pin Enemies', 'One-Hit Kill', 'Underwater'],
    fireModes: ['Single Shot'],
    ammoTypes: ['Heated Rebar'],
    technicalSpecs: {
      velocity: '180 m/s',
      penetration: 'Extreme',
      falloff: 'None',
      weight: '3.2 kg',
      maintenance: 'High',
    },
  },
  {
    name: 'RPG',
    type: 'Rocket Launcher',
    damage: 100,
    fireRate: 20,
    accuracy: 85,
    reloadTime: 4.0,
    magazineCapacity: 1,
    effectiveRange: 300,
    description: 'Shoulder-fired rocket launcher with laser guidance system.',
    lore: 'The RPG became essential for taking down helicopters and heavy armor during the Black Mesa incident.',
    capabilities: ['Laser Guided', 'Explosive', 'Anti-Vehicle', 'Area Damage'],
    fireModes: ['Single Shot'],
    ammoTypes: ['Rocket Propelled Grenades'],
    technicalSpecs: {
      velocity: '115 m/s',
      penetration: 'Explosive',
      falloff: 'Area Effect',
      weight: '7.0 kg',
      maintenance: 'High',
    },
  },
  {
    name: 'Tau Cannon',
    type: 'Experimental Energy Weapon',
    damage: 95,
    fireRate: 60,
    accuracy: 90,
    reloadTime: 0,
    magazineCapacity: 0,
    effectiveRange: 150,
    description: 'Experimental Gauss rifle firing charged particle beams.',
    lore: 'Developed in Black Mesa\'s Anomalous Materials lab, this weapon harnesses the H.E.V. suit\'s power to fire devastating energy beams.',
    capabilities: ['Charge Shot', 'Penetration', 'Ricochet', 'Wall Penetration'],
    fireModes: ['Rapid Fire', 'Charged'],
    ammoTypes: ['Uranium Cells'],
    technicalSpecs: {
      velocity: 'Near Light Speed',
      penetration: 'Extreme',
      falloff: 'None',
      weight: '5.2 kg',
      maintenance: 'High',
    },
  },
  {
    name: 'Gluon Gun',
    type: 'Experimental Particle Weapon',
    damage: 98,
    fireRate: 100,
    accuracy: 95,
    reloadTime: 0,
    magazineCapacity: 0,
    effectiveRange: 100,
    description: 'Experimental particle beam weapon that disintegrates organic matter.',
    lore: 'The Gluon Gun, or "Egon", fires a continuous stream of particles that tears apart molecular bonds. Highly unstable.',
    capabilities: ['Continuous Beam', 'Disintegration', 'Anti-Organic', 'High Power Drain'],
    fireModes: ['Continuous Beam'],
    ammoTypes: ['Uranium Cells'],
    technicalSpecs: {
      velocity: 'Instant',
      penetration: 'Molecular',
      falloff: 'Distance-based',
      weight: '6.8 kg',
      maintenance: 'Very High',
    },
  },
  {
    name: 'Hand Grenade',
    type: 'Explosive',
    damage: 85,
    fireRate: 40,
    accuracy: 70,
    reloadTime: 0,
    magazineCapacity: 0,
    effectiveRange: 40,
    description: 'Standard fragmentation grenade with 3-second fuse.',
    lore: 'Military-grade fragmentation grenades. Pull pin, throw, take cover. Simple and effective.',
    capabilities: ['Area Damage', 'Timed Fuse', 'Throwable', 'Bounces'],
    fireModes: ['Throw'],
    ammoTypes: ['Fragmentation Grenades'],
    technicalSpecs: {
      velocity: 'Thrown',
      penetration: 'Explosive',
      falloff: 'Area Effect',
      weight: '0.4 kg',
      maintenance: 'None',
    },
  },
  {
    name: 'Satchel Charge',
    type: 'Remote Explosive',
    damage: 100,
    fireRate: 30,
    accuracy: 100,
    reloadTime: 0,
    magazineCapacity: 0,
    effectiveRange: 50,
    description: 'Remote-detonated explosive charge. Place and detonate at will.',
    lore: 'C4 explosive charges with remote detonation. Perfect for ambushes and demolition work.',
    capabilities: ['Remote Detonation', 'Placeable', 'High Explosive', 'Multiple Charges'],
    fireModes: ['Place', 'Detonate'],
    ammoTypes: ['Satchel Charges'],
    technicalSpecs: {
      velocity: 'Placed',
      penetration: 'Extreme Explosive',
      falloff: 'Large Area',
      weight: '1.2 kg',
      maintenance: 'Low',
    },
  },
  {
    name: 'Tripmine',
    type: 'Laser Mine',
    damage: 90,
    fireRate: 0,
    accuracy: 100,
    reloadTime: 0,
    magazineCapacity: 0,
    effectiveRange: 10,
    description: 'Laser-triggered mine that attaches to walls. Detonates when beam is broken.',
    lore: 'Laser tripmines were used by Black Mesa security for perimeter defense. Now repurposed for survival.',
    capabilities: ['Laser Trigger', 'Wall Mount', 'Proximity Detonation', 'Defensive'],
    fireModes: ['Place'],
    ammoTypes: ['Tripmines'],
    technicalSpecs: {
      velocity: 'Stationary',
      penetration: 'Explosive',
      falloff: 'Directional Blast',
      weight: '0.8 kg',
      maintenance: 'Low',
    },
  },
  {
    name: 'Snark',
    type: 'Biological Weapon',
    damage: 75,
    fireRate: 50,
    accuracy: 80,
    reloadTime: 0,
    magazineCapacity: 0,
    effectiveRange: 30,
    description: 'Alien parasites that attack the nearest target. Unpredictable but effective.',
    lore: 'Xenian parasites that can be weaponized. They attack anything that moves, including the thrower if not careful.',
    capabilities: ['Homing', 'Biological', 'Multiple Targets', 'Unpredictable'],
    fireModes: ['Release'],
    ammoTypes: ['Snarks'],
    technicalSpecs: {
      velocity: 'Creature Speed',
      penetration: 'Bite Damage',
      falloff: 'Creature Lifespan',
      weight: '0.3 kg',
      maintenance: 'None',
    },
  },
];

// Complete Half-Life 2 Weapons Arsenal
const HL2_WEAPONS: Weapon[] = [
  {
    name: 'Crowbar',
    type: 'Melee Weapon',
    damage: 50,
    fireRate: 80,
    accuracy: 100,
    reloadTime: 0,
    magazineCapacity: 0,
    effectiveRange: 2,
    description: 'Iconic melee weapon. Effective for close combat and breaking obstacles.',
    lore: 'Gordon Freeman\'s signature weapon returns. A symbol of resistance against the Combine.',
    capabilities: ['Melee', 'Silent', 'Unlimited Use', 'Utility Tool'],
    fireModes: ['Swing'],
    ammoTypes: ['None'],
    technicalSpecs: {
      velocity: 'N/A',
      penetration: 'Medium',
      falloff: 'N/A',
      weight: '2.5 kg',
      maintenance: 'None',
    },
  },
  {
    name: 'Gravity Gun',
    type: 'Manipulation Device',
    damage: 0,
    fireRate: 60,
    accuracy: 100,
    reloadTime: 0,
    magazineCapacity: 0,
    effectiveRange: 50,
    description: 'Zero Point Energy Field Manipulator. Manipulates objects with gravity fields. Can be supercharged.',
    lore: 'Developed by Aperture Science, this revolutionary device can manipulate objects at a distance. When supercharged, it can disintegrate organic matter.',
    capabilities: ['Object Manipulation', 'Punt', 'Supercharge Mode', 'Organic Disintegration (Supercharged)'],
    fireModes: ['Attract', 'Repel', 'Supercharged'],
    ammoTypes: ['Zero-Point Energy'],
    technicalSpecs: {
      velocity: 'Variable',
      penetration: 'N/A (Normal) / Instant Kill (Supercharged)',
      falloff: 'Distance-based',
      weight: '3.8 kg',
      maintenance: 'Moderate',
    },
  },
  {
    name: 'Pulse Rifle (AR2)',
    type: 'Energy Rifle',
    damage: 85,
    fireRate: 90,
    accuracy: 88,
    reloadTime: 2.5,
    magazineCapacity: 60,
    effectiveRange: 150,
    description: 'Combine-manufactured energy weapon with secondary energy ball launcher.',
    lore: 'The AR2 Pulse Rifle is the standard issue weapon for Combine Overwatch soldiers. Its dark energy core allows for devastating firepower.',
    capabilities: ['Primary Fire', 'Energy Ball', 'High Penetration', 'Scope', 'Vaporization'],
    fireModes: ['Automatic', 'Energy Ball'],
    ammoTypes: ['Pulse Ammunition', 'Energy Core'],
    technicalSpecs: {
      velocity: '1200 m/s',
      penetration: 'High',
      falloff: 'Minimal',
      weight: '4.2 kg',
      maintenance: 'Low',
    },
  },
  {
    name: 'SMG',
    type: 'Submachine Gun',
    damage: 65,
    fireRate: 95,
    accuracy: 75,
    reloadTime: 2.0,
    magazineCapacity: 45,
    effectiveRange: 80,
    description: 'Compact automatic weapon with grenade launcher attachment.',
    lore: 'Modified MP7 used by resistance fighters. The grenade launcher makes it versatile in combat.',
    capabilities: ['Rapid Fire', 'Grenade Launcher', 'High Mobility', 'Suppressive Fire'],
    fireModes: ['Automatic', 'Grenade'],
    ammoTypes: ['9mm Rounds', '40mm Grenades'],
    technicalSpecs: {
      velocity: '720 m/s',
      penetration: 'Medium',
      falloff: 'Moderate',
      weight: '2.1 kg',
      maintenance: 'Low',
    },
  },
  {
    name: 'Shotgun',
    type: 'Combat Shotgun',
    damage: 95,
    fireRate: 45,
    accuracy: 60,
    reloadTime: 3.5,
    magazineCapacity: 6,
    effectiveRange: 30,
    description: 'Pump-action shotgun effective at close range. Can fire both barrels simultaneously.',
    lore: 'The SPAS-12 shotgun is a favorite among resistance fighters for close-quarters combat. Double-barrel mode is devastating.',
    capabilities: ['Single Shot', 'Double Barrel', 'High Damage', 'Stopping Power'],
    fireModes: ['Single', 'Double Barrel'],
    ammoTypes: ['12 Gauge Shells'],
    technicalSpecs: {
      velocity: '400 m/s',
      penetration: 'High (Close)',
      falloff: 'Severe',
      weight: '4.4 kg',
      maintenance: 'Moderate',
    },
  },
  {
    name: 'Crossbow',
    type: 'Precision Weapon',
    damage: 100,
    fireRate: 30,
    accuracy: 98,
    reloadTime: 2.8,
    magazineCapacity: 1,
    effectiveRange: 200,
    description: 'Silent precision weapon with heated rebar bolts. Features scope for long-range targeting.',
    lore: 'Improvised by resistance engineers, this crossbow fires superheated rebar with deadly accuracy. Perfect for silent eliminations.',
    capabilities: ['Silent', 'Scope', 'Pin Enemies', 'One-Hit Kill', 'Underwater'],
    fireModes: ['Single Shot'],
    ammoTypes: ['Heated Rebar'],
    technicalSpecs: {
      velocity: '180 m/s',
      penetration: 'Extreme',
      falloff: 'None',
      weight: '3.2 kg',
      maintenance: 'High',
    },
  },
  {
    name: '.357 Magnum',
    type: 'Revolver',
    damage: 90,
    fireRate: 50,
    accuracy: 92,
    reloadTime: 3.0,
    magazineCapacity: 6,
    effectiveRange: 100,
    description: 'Powerful revolver with exceptional stopping power and accuracy.',
    lore: 'The Colt Python returns. A classic weapon, prized for its reliability and devastating power.',
    capabilities: ['High Damage', 'Armor Piercing', 'Scope', 'Precision'],
    fireModes: ['Single Action'],
    ammoTypes: ['.357 Magnum Rounds'],
    technicalSpecs: {
      velocity: '440 m/s',
      penetration: 'Very High',
      falloff: 'Low',
      weight: '1.2 kg',
      maintenance: 'Low',
    },
  },
  {
    name: 'RPG',
    type: 'Rocket Launcher',
    damage: 100,
    fireRate: 20,
    accuracy: 85,
    reloadTime: 4.0,
    magazineCapacity: 1,
    effectiveRange: 300,
    description: 'Shoulder-fired rocket launcher with laser guidance system.',
    lore: 'Essential for taking down Combine gunships and heavy armor. Laser-guided for precision strikes.',
    capabilities: ['Laser Guided', 'Explosive', 'Anti-Vehicle', 'Area Damage', 'Lock-On'],
    fireModes: ['Single Shot'],
    ammoTypes: ['Rocket Propelled Grenades'],
    technicalSpecs: {
      velocity: '115 m/s',
      penetration: 'Explosive',
      falloff: 'Area Effect',
      weight: '7.0 kg',
      maintenance: 'High',
    },
  },
  {
    name: 'Grenade',
    type: 'Explosive',
    damage: 85,
    fireRate: 40,
    accuracy: 70,
    reloadTime: 0,
    magazineCapacity: 0,
    effectiveRange: 40,
    description: 'Standard fragmentation grenade with 3-second fuse.',
    lore: 'Resistance-manufactured fragmentation grenades. Simple, effective, and plentiful.',
    capabilities: ['Area Damage', 'Timed Fuse', 'Throwable', 'Bounces'],
    fireModes: ['Throw'],
    ammoTypes: ['Fragmentation Grenades'],
    technicalSpecs: {
      velocity: 'Thrown',
      penetration: 'Explosive',
      falloff: 'Area Effect',
      weight: '0.4 kg',
      maintenance: 'None',
    },
  },
  {
    name: 'Bugbait',
    type: 'Pheromone Controller',
    damage: 0,
    fireRate: 50,
    accuracy: 100,
    reloadTime: 0,
    magazineCapacity: 0,
    effectiveRange: 100,
    description: 'Antlion pheromone pod. Commands antlions to attack designated targets.',
    lore: 'Extract from an Antlion Guard. Allows you to command antlions, turning them into allies against the Combine.',
    capabilities: ['Command Antlions', 'Squad Control', 'Tactical Support', 'Unlimited Use'],
    fireModes: ['Command', 'Rally'],
    ammoTypes: ['Pheromones'],
    technicalSpecs: {
      velocity: 'N/A',
      penetration: 'N/A',
      falloff: 'Command Range',
      weight: '0.2 kg',
      maintenance: 'None',
    },
  },
];

// HECU Weapons (Opposing Force)
const HECU_WEAPONS: Weapon[] = [
  {
    name: 'MP5',
    type: 'Submachine Gun',
    damage: 70,
    fireRate: 85,
    accuracy: 80,
    reloadTime: 2.0,
    magazineCapacity: 30,
    effectiveRange: 80,
    description: 'Classic HECU submachine gun, known for its reliability and compact design.',
    lore: 'Standard issue weapon for HECU forces. Widely used during the Black Mesa incident for close-quarters combat.',
    capabilities: ['Automatic Fire', 'Burst Fire', 'Reliable', 'Compact'],
    fireModes: ['Semi-Automatic', 'Automatic', 'Burst'],
    ammoTypes: ['9mm NATO'],
    technicalSpecs: {
      velocity: '400 m/s',
      penetration: 'Medium',
      falloff: 'Moderate',
      weight: '2.5 kg',
      maintenance: 'Low',
    },
  },
  {
    name: 'Shotgun',
    type: 'Combat Shotgun',
    damage: 90,
    fireRate: 45,
    accuracy: 60,
    reloadTime: 3.0,
    magazineCapacity: 8,
    effectiveRange: 30,
    description: 'Pump-action shotgun, effective at close range.',
    lore: 'Favored by HECU troops for high stopping power in close encounters.',
    capabilities: ['High Damage', 'Close Range', 'Spread', 'Breaching'],
    fireModes: ['Pump Action'],
    ammoTypes: ['12 Gauge Buckshot'],
    technicalSpecs: {
      velocity: '400 m/s',
      penetration: 'High (Close)',
      falloff: 'Severe',
      weight: '3.6 kg',
      maintenance: 'Moderate',
    },
  },
  {
    name: 'Desert Eagle',
    type: 'Handgun',
    damage: 85,
    fireRate: 50,
    accuracy: 90,
    reloadTime: 2.0,
    magazineCapacity: 7,
    effectiveRange: 75,
    description: 'High-damage semi-automatic handgun.',
    lore: 'Selected for its superior accuracy and firepower among HECU operatives.',
    capabilities: ['High Damage', 'Accurate', 'Armor Piercing', 'Intimidation'],
    fireModes: ['Semi-Automatic'],
    ammoTypes: ['.50 AE'],
    technicalSpecs: {
      velocity: '470 m/s',
      penetration: 'High',
      falloff: 'Low',
      weight: '1.9 kg',
      maintenance: 'Moderate',
    },
  },
  {
    name: 'M249 SAW',
    type: 'Light Machine Gun',
    damage: 75,
    fireRate: 95,
    accuracy: 75,
    reloadTime: 4.5,
    magazineCapacity: 100,
    effectiveRange: 120,
    description: 'Fully automatic machine gun.',
    lore: 'Provides heavy suppressive firepower for HECU squads. Essential for area denial.',
    capabilities: ['Suppressive Fire', 'High Capacity', 'Sustained Fire', 'Squad Support'],
    fireModes: ['Automatic'],
    ammoTypes: ['5.56mm NATO'],
    technicalSpecs: {
      velocity: '915 m/s',
      penetration: 'Medium',
      falloff: 'Low',
      weight: '7.5 kg',
      maintenance: 'High',
    },
  },
  {
    name: 'Sniper Rifle',
    type: 'Precision Rifle',
    damage: 98,
    fireRate: 25,
    accuracy: 98,
    reloadTime: 3.5,
    magazineCapacity: 5,
    effectiveRange: 300,
    description: 'Long-range precision rifle.',
    lore: 'Used by HECU marksmen for eliminating distant threats with high accuracy. One shot, one kill.',
    capabilities: ['Long Range', 'One-Hit Kill', 'Scope', 'Silent', 'Penetration'],
    fireModes: ['Bolt Action'],
    ammoTypes: ['.308 Winchester'],
    technicalSpecs: {
      velocity: '850 m/s',
      penetration: 'Extreme',
      falloff: 'Minimal',
      weight: '6.2 kg',
      maintenance: 'Moderate',
    },
  },
  {
    name: 'Grenade Launcher',
    type: 'Explosive Weapon',
    damage: 100,
    fireRate: 30,
    accuracy: 80,
    reloadTime: 3.0,
    magazineCapacity: 6,
    effectiveRange: 100,
    description: 'Launches explosive grenades.',
    lore: 'Essential for clearing heavily armored targets and fortified positions. Area denial weapon.',
    capabilities: ['Area Damage', 'Explosive', 'Arc Trajectory', 'Anti-Structure'],
    fireModes: ['Single Shot'],
    ammoTypes: ['40mm HE Grenades'],
    technicalSpecs: {
      velocity: '76 m/s',
      penetration: 'Explosive',
      falloff: 'Area Effect',
      weight: '3.0 kg',
      maintenance: 'Moderate',
    },
  },
];

// Black Mesa Security Weapons (Blue Shift)
const SECURITY_WEAPONS: Weapon[] = [
  {
    name: 'Glock',
    type: 'Handgun',
    damage: 60,
    fireRate: 70,
    accuracy: 85,
    reloadTime: 1.5,
    magazineCapacity: 15,
    effectiveRange: 50,
    description: 'Reliable semi-automatic pistol.',
    lore: 'Standard issue sidearm for Black Mesa security personnel. Reliable and easy to maintain.',
    capabilities: ['Semi-Auto', 'Reliable', 'Quick Draw', 'Backup Weapon'],
    fireModes: ['Semi-Automatic'],
    ammoTypes: ['9mm Parabellum'],
    technicalSpecs: {
      velocity: '375 m/s',
      penetration: 'Low',
      falloff: 'Moderate',
      weight: '0.9 kg',
      maintenance: 'Very Low',
    },
  },
  {
    name: 'MP5',
    type: 'Submachine Gun',
    damage: 70,
    fireRate: 85,
    accuracy: 80,
    reloadTime: 2.0,
    magazineCapacity: 30,
    effectiveRange: 75,
    description: 'Versatile automatic firearm.',
    lore: 'Preferred by security teams for its balance of power and accuracy. Standard patrol weapon.',
    capabilities: ['Automatic Fire', 'Versatile', 'Compact', 'Patrol Weapon'],
    fireModes: ['Semi-Automatic', 'Automatic'],
    ammoTypes: ['9mm NATO'],
    technicalSpecs: {
      velocity: '400 m/s',
      penetration: 'Medium',
      falloff: 'Moderate',
      weight: '2.5 kg',
      maintenance: 'Low',
    },
  },
  {
    name: 'Shotgun',
    type: 'Combat Shotgun',
    damage: 90,
    fireRate: 45,
    accuracy: 60,
    reloadTime: 3.0,
    magazineCapacity: 8,
    effectiveRange: 30,
    description: 'Effective at close range.',
    lore: 'Commonly used in Black Mesa for its devastating impact in emergency situations. Riot control weapon.',
    capabilities: ['High Damage', 'Close Range', 'Stopping Power', 'Crowd Control'],
    fireModes: ['Pump Action'],
    ammoTypes: ['12 Gauge Buckshot'],
    technicalSpecs: {
      velocity: '400 m/s',
      penetration: 'High (Close)',
      falloff: 'Severe',
      weight: '3.6 kg',
      maintenance: 'Moderate',
    },
  },
  {
    name: 'Crowbar',
    type: 'Melee Weapon',
    damage: 50,
    fireRate: 80,
    accuracy: 100,
    reloadTime: 0,
    magazineCapacity: 0,
    effectiveRange: 2,
    description: 'Sturdy melee weapon.',
    lore: 'Not just for opening crates, but a reliable tool in a pinch. Every security guard carries one.',
    capabilities: ['Melee', 'Silent', 'Unlimited Use', 'Utility'],
    fireModes: ['Swing'],
    ammoTypes: ['None'],
    technicalSpecs: {
      velocity: 'N/A',
      penetration: 'Medium',
      falloff: 'N/A',
      weight: '2.5 kg',
      maintenance: 'None',
    },
  },
];

function WeaponCard({ weapon, isDetailed }: { weapon: Weapon; isDetailed: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="weapon-card">
      <CollapsibleTrigger className="weapon-card-trigger">
        <div className="weapon-card-header">
          <div className="weapon-card-title-section">
            <h3 className="weapon-card-title">{weapon.name}</h3>
            <Badge variant="outline" className="weapon-type-badge">
              {weapon.type}
            </Badge>
          </div>
          <ChevronDown className={cn('weapon-card-chevron', isOpen && 'weapon-card-chevron-open')} />
        </div>
      </CollapsibleTrigger>

      <CollapsibleContent className="weapon-card-content">
        <p className="weapon-description">{weapon.description}</p>

        {/* Fire Modes */}
        <div className="weapon-section">
          <div className="weapon-section-title">
            <Zap className="w-4 h-4" />
            FIRE MODES
          </div>
          <div className="weapon-badges">
            {weapon.fireModes.map((mode) => (
              <Badge key={mode} variant="secondary" className="weapon-badge">
                {mode}
              </Badge>
            ))}
          </div>
        </div>

        {/* Ammo Types */}
        <div className="weapon-section">
          <div className="weapon-section-title">
            <Box className="w-4 h-4" />
            AMMUNITION
          </div>
          <div className="weapon-badges">
            {weapon.ammoTypes.map((ammo) => (
              <Badge key={ammo} variant="secondary" className="weapon-badge">
                {ammo}
              </Badge>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="weapon-stats-grid">
          <div className="weapon-stat">
            <div className="weapon-stat-label">
              <Target className="w-3 h-3" />
              DAMAGE
            </div>
            <Progress value={weapon.damage} className="weapon-stat-bar" />
            <span className="weapon-stat-value">{weapon.damage}</span>
          </div>

          <div className="weapon-stat">
            <div className="weapon-stat-label">
              <Gauge className="w-3 h-3" />
              FIRE RATE
            </div>
            <Progress value={weapon.fireRate} className="weapon-stat-bar" />
            <span className="weapon-stat-value">{weapon.fireRate}</span>
          </div>

          <div className="weapon-stat">
            <div className="weapon-stat-label">
              <Crosshair className="w-3 h-3" />
              ACCURACY
            </div>
            <Progress value={weapon.accuracy} className="weapon-stat-bar" />
            <span className="weapon-stat-value">{weapon.accuracy}</span>
          </div>

          <div className="weapon-stat">
            <div className="weapon-stat-label">
              <Clock className="w-3 h-3" />
              RELOAD
            </div>
            <Progress value={100 - (weapon.reloadTime * 10)} className="weapon-stat-bar" />
            <span className="weapon-stat-value">{weapon.reloadTime}s</span>
          </div>
        </div>

        {/* Capabilities */}
        <div className="weapon-section">
          <div className="weapon-section-title">CAPABILITIES</div>
          <div className="weapon-badges">
            {weapon.capabilities.map((cap) => (
              <Badge key={cap} className="weapon-capability-badge">
                {cap}
              </Badge>
            ))}
          </div>
        </div>

        {/* Lore */}
        {isDetailed && (
          <div className="weapon-lore-section">
            <div className="weapon-section-title">LORE</div>
            <p className="weapon-lore-text">{weapon.lore}</p>
          </div>
        )}

        {/* Technical Specs */}
        {isDetailed && (
          <div className="weapon-tech-specs">
            <div className="weapon-section-title">TECHNICAL SPECIFICATIONS</div>
            <div className="weapon-tech-grid">
              <div className="weapon-tech-item">
                <span className="weapon-tech-label">Velocity:</span>
                <span className="weapon-tech-value">{weapon.technicalSpecs.velocity}</span>
              </div>
              <div className="weapon-tech-item">
                <span className="weapon-tech-label">Penetration:</span>
                <span className="weapon-tech-value">{weapon.technicalSpecs.penetration}</span>
              </div>
              <div className="weapon-tech-item">
                <span className="weapon-tech-label">Falloff:</span>
                <span className="weapon-tech-value">{weapon.technicalSpecs.falloff}</span>
              </div>
              <div className="weapon-tech-item">
                <span className="weapon-tech-label">Weight:</span>
                <span className="weapon-tech-value">{weapon.technicalSpecs.weight}</span>
              </div>
              <div className="weapon-tech-item">
                <span className="weapon-tech-label">Maintenance:</span>
                <span className="weapon-tech-value">{weapon.technicalSpecs.maintenance}</span>
              </div>
              <div className="weapon-tech-item">
                <span className="weapon-tech-label">Magazine:</span>
                <span className="weapon-tech-value">
                  {weapon.magazineCapacity > 0 ? weapon.magazineCapacity : 'N/A'}
                </span>
              </div>
              <div className="weapon-tech-item">
                <span className="weapon-tech-label">Range:</span>
                <span className="weapon-tech-value">{weapon.effectiveRange}m</span>
              </div>
            </div>
          </div>
        )}
      </CollapsibleContent>
    </Collapsible>
  );
}

export function WeaponsTab() {
  const { systemStyle, useHl1Weapons, toggleUseHl1Weapons, detailedMode } = useInfoSettingsStore();

  // Determine which weapons to show based on faction
  const getWeaponsByFaction = () => {
    switch (systemStyle) {
      case 'hecu':
        return HECU_WEAPONS;
      case 'security':
      case 'guard':
        return SECURITY_WEAPONS;
      case 'hev':
        return useHl1Weapons ? HL1_WEAPONS : HL2_WEAPONS;
      case 'resistance':
        return HL2_WEAPONS;
      default:
        return HL2_WEAPONS;
    }
  };

  const weapons = getWeaponsByFaction();
  const showHl1Toggle = systemStyle === 'hev';

  return (
    <div className="tab-content">
      <div className="weapons-tab-header">
        <div>
          <h2 className="hud-panel-title">WEAPONS ARSENAL</h2>
          <p className="text-xs opacity-70">
            {systemStyle === 'hecu' && 'HECU Military Weapons'}
            {(systemStyle === 'security' || systemStyle === 'guard') && 'Black Mesa Security Weapons'}
            {systemStyle === 'hev' && (useHl1Weapons ? 'Half-Life 1 Weapons' : 'Half-Life 2 Weapons')}
            {systemStyle === 'resistance' && 'Resistance Weapons'}
          </p>
        </div>
        {showHl1Toggle && (
          <div className="weapons-toggle-control">
            <Label htmlFor="hl1-toggle" className="text-xs">
              {useHl1Weapons ? 'HL1 MODE' : 'HL2 MODE'}
            </Label>
            <HudSwitch
              id="hl1-toggle"
              checked={useHl1Weapons}
              onCheckedChange={toggleUseHl1Weapons}
            />
          </div>
        )}
      </div>

      <Separator className="my-4" />

      <div className="weapons-grid">
        {weapons.map((weapon) => (
          <WeaponCard key={weapon.name} weapon={weapon} isDetailed={detailedMode} />
        ))}
      </div>
    </div>
  );
}
