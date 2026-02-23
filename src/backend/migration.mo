import Map "mo:core/Map";
import Text "mo:core/Text";
import Array "mo:core/Array";

module {
  // Types & structs reused/copied from main.mo
  type Stats = {
    var health : Nat;
    var armor : Nat;
    var aux : Nat;
    var ammo : Nat;
    var hazard : Nat;
  };

  type ModuleToggles = {
    helmet : Bool;
    respirator : Bool;
    longJump : Bool;
    flashlight : Bool;
    advancedMedical : Bool;
    radiationShield : Bool;
    defibrillator : Bool;
    shieldBoost : Bool;
    hazardSystem : Bool;
    moduleSync : Bool;
  };

  type FireHazard = {
    var temp : Nat;
    var status : Text;
  };

  type BioHazard = {
    var hazardLevel : Nat;
    var status : Text;
  };

  type RadiationHazard = {
    var radLevel : Nat;
    var status : Text;
  };

  type ElectricalHazard = {
    var voltage : Nat;
    var status : Text;
  };

  type GasHazard = {
    var gasLevel : Nat;
    var status : Text;
  };

  type EnvironmentHazardLevels = {
    var fire : Nat;
    var bio : Nat;
    var radiation : Nat;
    var electrical : Nat;
    var gas : Nat;
  };

  type EnvironmentalHazards = {
    var levels : EnvironmentHazardLevels;
    fire : FireHazard;
    bio : BioHazard;
    radiation : RadiationHazard;
    electrical : ElectricalHazard;
    gas : GasHazard;
  };

  type LifeSupportSystem = {
    var systemActive : Bool;
    var oxygenLevel : Nat;
    var co2Level : Nat;
    var temperature : Nat;
    var batteryLevel : Nat;
    var airPurificationStatus : Text;
  };

  type EnvProtectionSystem = {
    var systemActive : Bool;
    var radiationLevel : Nat;
    var polarisationLevel : Nat;
    var shieldStatus : Text;
  };

  type SystemStatus = {
    var state : Text;
    var error : Text;
    var recoveryAttempts : Nat;
    var pendingTimeout : Nat;
  };

  type PowerManagementSystem = {
    var systemActive : Bool;
    var batteryLevel : Nat;
    var powerOutput : Nat;
    var auxPowerOutput : Nat;
  };

  type AICommunicationModule = {
    var moduleActive : Bool;
    var communicationStatus : Text;
    var lastCommand : Text;
    var videoFeedback : Bool;
  };

  type AugmentedRealityDisplay = {
    var hudActive : Bool;
    var displayMode : Text;
    var resolution : Text;
    var warningLevel : Nat;
  };

  type GravityGunStatus = {
    var mode : Text;
    var chargeLevel : Nat;
    var isActive : Bool;
  };

  // Vehicles
  type EngineSpecs = {
    engineType : Text;
    powerOutput : Nat;
    torque : Nat;
    transmission : Text;
  };

  type TacticalCapabilities = {
    speed : Nat;
    acceleration : Nat;
    handling : Text;
    durability : Nat;
  };

  type DamageResistance = {
    armorStrength : Nat;
    resistances : {
      fire : Nat;
      bioHazards : Nat;
      radiation : Nat;
      electrical : Nat;
    };
  };

  type SupportSystems = {
    navigation : Text;
    communication : Text;
    sensors : Text;
    automation : Text;
  };

  type VehicleLore = {
    manufacturer : Text;
    purpose : Text;
    historicalUse : Text;
    notableUpgrades : Text;
  };

  type ComprehensiveVehicleInfo = {
    name : Text;
    engineSpecs : EngineSpecs;
    tacticalCapabilities : TacticalCapabilities;
    damageResistance : DamageResistance;
    supportSystems : SupportSystems;
    lore : VehicleLore;
    fuel : Nat;
    integrity : Nat;
    speed : Nat;
    diagnostics : Text;
  };

  type Modes = {
    var currentMode : Text;
    var hecuActive : Bool;
    var blackMesaSecurityActive : Bool;
    var halfLife2Active : Bool;
  };

  type Weapon = {
    name : Text;
    weaponType : Text;
    damage : Nat;
    ammoCapacity : Nat;
    fireRate : Nat;
    accuracy : Nat;
    description : Text;
    lore : Text;
  };

  type FeatureSet = {
    healthMonitoring : Bool;
    armorShielding : Bool;
    auxPower : Bool;
    longJumpModule : Bool;
    hazardProtection : Bool;
    lifeSupportTimeout : Bool;
    communication : Bool;
    vehicleInterface : Bool;
    weaponSystem : Bool;
    navigationSystem : Bool;
    advancedMedical : Bool;
    radiationShield : Bool;
    defibrillator : Bool;
    shieldBoost : Bool;
    hazardSystem : Bool;
    moduleSync : Bool;
  };

  type Faction = {
    name : Text;
    description : Text;
    defaultWeapons : [Text];
  };

  // Schemas for migration
  type OldActor = {
    stats : Stats;
    modules : ModuleToggles;
    lss : LifeSupportSystem;
    envHazards : EnvironmentalHazards;
    eps : EnvProtectionSystem;
    sysStatus : SystemStatus;
    currentMark : Nat;
    markFeatures : Map.Map<Nat, FeatureSet>;
    vehicleInfo : [var ComprehensiveVehicleInfo];
    weaponData : Map.Map<Text, Weapon>;
    suitState : Map.Map<Text, Text>;
    warningSensors : Map.Map<Nat, Text>;
    currentMode : Modes;
    pms : PowerManagementSystem;
    comms : AICommunicationModule;
    ard : AugmentedRealityDisplay;
    gravityGun : GravityGunStatus;
  };

  type NewActor = {
    stats : Stats;
    modules : ModuleToggles;
    lss : LifeSupportSystem;
    envHazards : EnvironmentalHazards;
    eps : EnvProtectionSystem;
    sysStatus : SystemStatus;
    currentMark : Nat;
    markFeatures : Map.Map<Nat, FeatureSet>;
    vehicleInfo : [var ComprehensiveVehicleInfo];
    weaponData : Map.Map<Text, Weapon>;
    suitState : Map.Map<Text, Text>;
    warningSensors : Map.Map<Nat, Text>;
    currentMode : Modes;
    pms : PowerManagementSystem;
    comms : AICommunicationModule;
    ard : AugmentedRealityDisplay;
    gravityGun : GravityGunStatus;
    factions : Map.Map<Text, Faction>;
    currentFaction : Text;
    factionWeapons : Map.Map<Text, [Text]>;
  };

  // Migration code
  public func run(old : OldActor) : NewActor {
    let factions = Map.empty<Text, Faction>();
    let factionWeapons = Map.empty<Text, [Text]>();

    let hecuFaction : Faction = {
      name = "hecu";
      description = "Highly trained military force specializing in hazardous environment combat.";
      defaultWeapons = ["MP5", "Shotgun", "Desert Eagle", "M249 SAW", "Sniper Rifle", "Grenade Launcher"];
    };
    let blackMesaFaction : Faction = {
      name = "blackMesaSecurity";
      description = "Black Mesa's security personnel equipped to handle internal threats.";
      defaultWeapons = ["Glock", "MP5 (BMS)", "Shotgun (BMS)", "Crowbar"];
    };
    let halfLife2Faction : Faction = {
      name = "halfLife2";
      description = "Resistance fighters and Combine forces in post-apocalyptic world.";
      defaultWeapons = ["Pulse Rifle", "Gravity Gun"];
    };
    let defaultFaction : Faction = {
      name = "default";
      description = "Default faction with basic equipment.";
      defaultWeapons = [];
    };

    factions.add("hecu", hecuFaction);
    factions.add("blackMesaSecurity", blackMesaFaction);
    factions.add("halfLife2", halfLife2Faction);
    factions.add("default", defaultFaction);

    factionWeapons.add("hecu", hecuFaction.defaultWeapons);
    factionWeapons.add("blackMesaSecurity", blackMesaFaction.defaultWeapons);
    factionWeapons.add("halfLife2", halfLife2Faction.defaultWeapons);
    factionWeapons.add("default", defaultFaction.defaultWeapons);

    { old with factions; currentFaction = "default"; factionWeapons };
  };
};
