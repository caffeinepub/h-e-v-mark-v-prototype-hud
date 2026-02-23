import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Migration "migration";

(with migration = Migration.run)
actor {
  /////////////////////////////////////////////////////////////////////////////
  // Type Definitions
  /////////////////////////////////////////////////////////////////////////////
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

  public type ComprehensiveVehicleInfo = {
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

  type Faction = {
    name : Text;
    description : Text;
    defaultWeapons : [Text];
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

  public type WeaponView = {
    name : Text;
    weaponType : Text;
    damage : Nat;
    ammoCapacity : Nat;
    fireRate : Nat;
    accuracy : Nat;
    description : Text;
    lore : Text;
  };

  public type ModesView = {
    currentMode : Text;
    hecuActive : Bool;
    blackMesaSecurityActive : Bool;
    halfLife2Active : Bool;
  };

  public type GravityGunStatusView = {
    mode : Text;
    chargeLevel : Nat;
    isActive : Bool;
  };

  // H.E.V. Mark Types
  type HevMark = {
    mark : Nat;
    features : FeatureSet;
  };

  // Features for each mark
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

  // Map for Mark Selection
  let markFeatures = Map.empty<Nat, FeatureSet>();

  // Current Mark
  var currentMark : Nat = 5;

  let mark1Features : FeatureSet = {
    healthMonitoring = true;
    armorShielding = false;
    auxPower = true;
    longJumpModule = false;
    hazardProtection = false;
    lifeSupportTimeout = false;
    communication = false;
    vehicleInterface = false;
    weaponSystem = false;
    navigationSystem = false;
    advancedMedical = false;
    radiationShield = false;
    defibrillator = false;
    shieldBoost = false;
    hazardSystem = false;
    moduleSync = false;
  };

  let mark2Features : FeatureSet = {
    healthMonitoring = true;
    armorShielding = false;
    auxPower = true;
    longJumpModule = false;
    hazardProtection = true;
    lifeSupportTimeout = false;
    communication = true;
    vehicleInterface = false;
    weaponSystem = false;
    navigationSystem = false;
    advancedMedical = false;
    radiationShield = false;
    defibrillator = false;
    shieldBoost = false;
    hazardSystem = false;
    moduleSync = false;
  };

  let mark3Features : FeatureSet = {
    healthMonitoring = true;
    armorShielding = true;
    auxPower = true;
    longJumpModule = true;
    hazardProtection = true;
    lifeSupportTimeout = true;
    communication = true;
    vehicleInterface = true;
    weaponSystem = false;
    navigationSystem = false;
    advancedMedical = false;
    radiationShield = false;
    defibrillator = false;
    shieldBoost = false;
    hazardSystem = false;
    moduleSync = false;
  };

  let mark4Features : FeatureSet = {
    healthMonitoring = true;
    armorShielding = true;
    auxPower = true;
    longJumpModule = true;
    hazardProtection = true;
    lifeSupportTimeout = true;
    communication = true;
    vehicleInterface = true;
    weaponSystem = true;
    navigationSystem = true;
    advancedMedical = false;
    radiationShield = false;
    defibrillator = false;
    shieldBoost = false;
    hazardSystem = false;
    moduleSync = false;
  };

  let mark5Features : FeatureSet = {
    healthMonitoring = true;
    armorShielding = true;
    auxPower = true;
    longJumpModule = true;
    hazardProtection = true;
    lifeSupportTimeout = true;
    communication = true;
    vehicleInterface = true;
    weaponSystem = true;
    navigationSystem = true;
    advancedMedical = true;
    radiationShield = true;
    defibrillator = true;
    shieldBoost = true;
    hazardSystem = true;
    moduleSync = true;
  };

  public type settingsView = {
    currentMark : Nat;
    availableFeatures : FeatureSet;
  };

  // Initialize feature map with all marks
  markFeatures.add(1, mark1Features);
  markFeatures.add(2, mark2Features);
  markFeatures.add(3, mark3Features);
  markFeatures.add(4, mark4Features);
  markFeatures.add(5, mark5Features);

  /////////////////////////////////////////////////////////////////////////////
  // Vehicle Monitoring with Expanded Data
  /////////////////////////////////////////////////////////////////////////////
  var vehicleInfo : [var ComprehensiveVehicleInfo] = [var {
    name = "Airboat";
    engineSpecs = {
      engineType = "Supercharged Airboat Engine";
      powerOutput = 450;
      torque = 680;
      transmission = "Hydrostatic";
    };
    tacticalCapabilities = {
      speed = 130;
      acceleration = 120;
      handling = "Great offroad/floating";
      durability = 80;
    };
    damageResistance = {
      armorStrength = 70;
      resistances = {
        fire = 90;
        bioHazards = 60;
        radiation = 81;
        electrical = 46;
      };
    };
    supportSystems = {
      navigation = "Ultrasonic mapping";
      communication = "Radio + blue tooth";
      sensors = "Temperature and environmental";
      automation = "Autopilot";
    };
    lore = {
      manufacturer = "Black Mesa Laboratory";
      purpose = "Transport, research, tactical applications";
      historicalUse = "Well-known for use during the Black Mesa incident, crucial in escaping hazardous environments.";
      notableUpgrades = "Enhanced stabilizers, reinforced hull, advanced sensor array";
    };
    fuel = 100;
    integrity = 100;
    speed = 0;
    diagnostics = "operational";
  }, {
    name = "Buggy";
    engineSpecs = {
      engineType = "V8 Custom";
      powerOutput = 620;
      torque = 800; // Nm
      transmission = "7-speed manual";
    };
    tacticalCapabilities = {
      speed = 143;
      acceleration = 100;
      handling = "Exceptional offroad";
      durability = 80;
    };
    damageResistance = {
      armorStrength = 85;
      resistances = {
        fire = 91;
        bioHazards = 70;
        radiation = 61;
        electrical = 40;
      };
    };
    supportSystems = {
      navigation = "GPS and satellite";
      communication = "Encrypted radio";
      sensors = "Threat detection system";
      automation = "Partial self-driving";
    };
    lore = {
      manufacturer = "Black Mesa Laboratory";
      purpose = "Rapid deployment, scouting, combat support";
      historicalUse = "Primarily used by HECU during the Black Mesa incident for swift operations.";
      notableUpgrades = "Reinforced cage, advanced comms, integrated body scanner";
    };
    fuel = 100;
    integrity = 100;
    speed = 0;
    diagnostics = "operational";
  }, {
    name = "Jalopy";
    engineSpecs = {
      engineType = "Retro High-Performance";
      powerOutput = 340;
      torque = 550; // Nm
      transmission = "5-speed manual";
    };
    tacticalCapabilities = {
      speed = 106;
      acceleration = 60;
      handling = "Improved ruggedness";
      durability = 60;
    };
    damageResistance = {
      armorStrength = 64;
      resistances = {
        fire = 41;
        bioHazards = 80;
        radiation = 87;
        electrical = 60;
      };
    };
    supportSystems = {
      navigation = "Classic analog + GPS";
      communication = "EM shielding";
      sensors = "Basic temperature sensors";
      automation = "None";
    };
    lore = {
      manufacturer = "Black Mesa Laboratory";
      purpose = "Endurance missions, long-haul transport";
      historicalUse = "Favored for expeditions and missions requiring durability over speed, especially on rough terrain.";
      notableUpgrades = "Custom suspension, reinforced chassis, advanced comm system";
    };
    fuel = 100;
    integrity = 100;
    speed = 0;
    diagnostics = "operational";
  }];

  public query ({ caller }) func getComprehensiveVehicleInfo(vehicleName : Text) : async ComprehensiveVehicleInfo {
    switch (vehicleInfo.find(func(v) { v.name == vehicleName })) {
      case (?v) { v };
      case (null) { Runtime.trap("Vehicle not found") };
    };
  };

  public query ({ caller }) func getAllComprehensiveVehicleInfo() : async [ComprehensiveVehicleInfo] {
    vehicleInfo.toArray();
  };

  /////////////////////////////////////////////////////////////////////////////
  // Factions System
  /////////////////////////////////////////////////////////////////////////////
  let factions = Map.empty<Text, Faction>();
  var currentFaction : Text = "default";
  let factionWeapons = Map.empty<Text, [Text]>();

  // Add Faction
  func addFaction(faction : Faction) {
    factions.add(faction.name, faction);
  };

  // Initialize Factions
  func initializeFactions() {
    addFaction({
      name = "hecu";
      description = "Highly trained military force specializing in hazardous environment combat.";
      defaultWeapons = ["MP5", "Shotgun", "Desert Eagle", "M249 SAW", "Sniper Rifle", "Grenade Launcher"];
    });
    addFaction({
      name = "blackMesaSecurity";
      description = "Black Mesa's security personnel equipped to handle internal threats.";
      defaultWeapons = ["Glock", "MP5 (BMS)", "Shotgun (BMS)", "Crowbar"];
    });
    addFaction({
      name = "halfLife2";
      description = "Resistance fighters and Combine forces in post-apocalyptic world.";
      defaultWeapons = ["Pulse Rifle", "Gravity Gun"];
    });
    addFaction({
      name = "default";
      description = "Default faction with basic equipment.";
      defaultWeapons = [];
    });
  };

  /////////////////////////////////////////////////////////////////////////////
  // Weapons System
  /////////////////////////////////////////////////////////////////////////////
  let weaponData = Map.empty<Text, Weapon>();

  func addWeapon(weapon : Weapon) {
    weaponData.add(weapon.name, weapon);
  };

  /////////////////////////////////////////////////////////////////////////////
  // HECU Weapons
  func initializeHECUWeapons() {
    addWeapon({
      name = "MP5";
      weaponType = "Submachine Gun";
      damage = 25;
      ammoCapacity = 30;
      fireRate = 800;
      accuracy = 80;
      description = "Classic HECU submachine gun, known for its reliability and compact design.";
      lore = "Standard issue weapon for HECU forces. Widely used during the Black Mesa incident for close-quarters combat.";
    });
    addWeapon({
      name = "Shotgun";
      weaponType = "Shotgun";
      damage = 80;
      ammoCapacity = 8;
      fireRate = 100;
      accuracy = 60;
      description = "Pump-action shotgun, effective at close range.";
      lore = "Favored by HECU troops for high stopping power in close encounters.";
    });
    addWeapon({
      name = "Desert Eagle";
      weaponType = "Handgun";
      damage = 50;
      ammoCapacity = 7;
      fireRate = 200;
      accuracy = 90;
      description = "High-damage semi-automatic handgun.";
      lore = "Selected for its superior accuracy and firepower among HECU operatives.";
    });
    addWeapon({
      name = "M249 SAW";
      weaponType = "Light Machine Gun";
      damage = 30;
      ammoCapacity = 100;
      fireRate = 900;
      accuracy = 75;
      description = "Fully automatic machine gun.";
      lore = "Provides heavy suppressive firepower for HECU squads.";
    });
    addWeapon({
      name = "Sniper Rifle";
      weaponType = "Rifle";
      damage = 120;
      ammoCapacity = 5;
      fireRate = 60;
      accuracy = 98;
      description = "Long-range precision rifle.";
      lore = "Used by HECU marksmen for eliminating distant threats with high accuracy.";
    });
    addWeapon({
      name = "Grenade Launcher";
      weaponType = "Explosive";
      damage = 150;
      ammoCapacity = 6;
      fireRate = 50;
      accuracy = 80;
      description = "Launches explosive grenades.";
      lore = "Essential for clearing heavily armored targets and fortified positions.";
    });
  };

  /////////////////////////////////////////////////////////////////////////////
  // Black Mesa Security Weapons
  func initializeBlackMesaWeapons() {
    addWeapon({
      name = "Glock";
      weaponType = "Handgun";
      damage = 20;
      ammoCapacity = 15;
      fireRate = 400;
      accuracy = 85;
      description = "Reliable semi-automatic pistol.";
      lore = "Standard issue sidearm for Black Mesa security personnel.";
    });
    addWeapon({
      name = "MP5 (BMS)";
      weaponType = "Submachine Gun";
      damage = 25;
      ammoCapacity = 30;
      fireRate = 800;
      accuracy = 80;
      description = "Versatile automatic firearm.";
      lore = "Preferred by security teams for its balance of power and accuracy.";
    });
    addWeapon({
      name = "Shotgun (BMS)";
      weaponType = "Shotgun";
      damage = 80;
      ammoCapacity = 8;
      fireRate = 100;
      accuracy = 60;
      description = "Effective at close range.";
      lore = "Commonly used in Black Mesa for its devastating impact in emergency situations.";
    });
    addWeapon({
      name = "Crowbar";
      weaponType = "Melee";
      damage = 15;
      ammoCapacity = 0;
      fireRate = 1000;
      accuracy = 100;
      description = "Sturdy melee weapon.";
      lore = "Not just for opening crates, but a reliable tool in a pinch.";
    });
  };

  /////////////////////////////////////////////////////////////////////////////
  // Default Half-Life 2 Weapons
  func initializeHalfLife2Weapons() {
    addWeapon({
      name = "Pulse Rifle";
      weaponType = "Rifle";
      damage = 35;
      ammoCapacity = 60;
      fireRate = 700;
      accuracy = 85;
      description = "Energy-based automatic rifle.";
      lore = "A staple for Combine forces, adopted by resistance fighters for its versatility.";
    });
    addWeapon({
      name = "Gravity Gun";
      weaponType = "Special";
      damage = 0;
      ammoCapacity = 0;
      fireRate = 0;
      accuracy = 100;
      description = "Manipulates objects with gravity.";
      lore = "Revolutionary tool for traversing hazardous environments and puzzling situations.";
    });
  };

  /////////////////////////////////////////////////////////////////////////////
  // Initialize All Weapons
  func initializeWeapons() {
    initializeHECUWeapons();
    initializeBlackMesaWeapons();
    initializeHalfLife2Weapons();
  };

  /////////////////////////////////////////////////////////////////////////////
  // Faction Weapons Customization
  /////////////////////////////////////////////////////////////////////////////
  func initializeDefaultFactionWeapons() {
    for ((factionName, faction) in factions.entries()) {
      factionWeapons.add(factionName, faction.defaultWeapons);
    };
  };

  initializeFactions(); // factions first!
  initializeWeapons(); // weapons second!
  initializeDefaultFactionWeapons(); // custom faction sets last!

  /////////////////////////////////////////////////////////////////////////////
  // Existing Core Systems (Unchanged from original)
  /////////////////////////////////////////////////////////////////////////////
  var stats : Stats = {
    var health = 100;
    var armor = 100;
    var aux = 100;
    var ammo = 30;
    var hazard = 0;
  };

  var modules : ModuleToggles = {
    helmet = false;
    respirator = false;
    longJump = false;
    flashlight = false;
    advancedMedical = false;
    radiationShield = false;
    defibrillator = false;
    shieldBoost = false;
    hazardSystem = false;
    moduleSync = false;
  };

  var lss : LifeSupportSystem = {
    var systemActive = false;
    var oxygenLevel = 100;
    var co2Level = 0;
    var temperature = 22;
    var batteryLevel = 100;
    var airPurificationStatus = "operational";
  };

  var envHazards : EnvironmentalHazards = {
    var levels = {
      var fire = 0;
      var bio = 0;
      var radiation = 0;
      var electrical = 0;
      var gas = 0;
    };
    fire = {
      var temp = 21;
      var status = "safe";
    };
    bio = {
      var hazardLevel = 0;
      var status = "minimal";
    };
    radiation = {
      var radLevel = 0;
      var status = "background";
    };
    electrical = {
      var voltage = 0;
      var status = "stable";
    };
    gas = {
      var gasLevel = 0;
      var status = "normal";
    };
  };

  var eps : EnvProtectionSystem = {
    var systemActive = false;
    var radiationLevel = 0;
    var polarisationLevel = 5;
    var shieldStatus = "engaged";
  };

  var sysStatus : SystemStatus = {
    var state = "operational";
    var error = "none";
    var recoveryAttempts = 0;
    var pendingTimeout = 0;
  };

  var pms : PowerManagementSystem = {
    var systemActive = false;
    var batteryLevel = 100;
    var powerOutput = 100;
    var auxPowerOutput = 0;
  };

  var comms : AICommunicationModule = {
    var moduleActive = false;
    var communicationStatus = "stable";
    var lastCommand = "";
    var videoFeedback = true;
  };

  var ard : AugmentedRealityDisplay = {
    var hudActive = false;
    var displayMode = "standard";
    var resolution = "1080p";
    var warningLevel = 0;
  };

  var currentMode : Modes = {
    var currentMode = "default";
    var hecuActive = false;
    var blackMesaSecurityActive = false;
    var halfLife2Active = false;
  };

  var gravityGun : GravityGunStatus = {
    var mode = "normal";
    var chargeLevel = 100;
    var isActive = false;
  };

  let suitState = Map.empty<Text, Text>();
  let warningSensors = Map.empty<Nat, Text>();

  /////////////////////////////////////////////////////////////////////////////
  // Faction Management
  /////////////////////////////////////////////////////////////////////////////
  public query ({ caller }) func getCurrentFaction() : async Text {
    currentFaction;
  };

  public query ({ caller }) func getAllFactions() : async [Faction] {
    let iter = factions.values();
    iter.toArray();
  };

  public shared ({ caller }) func switchFaction(factionName : Text) : async () {
    switch (factions.get(factionName)) {
      case (?_f) {
        currentFaction := factionName;
      };
      case (null) { Runtime.trap("Invalid Faction") };
    };
  };

  public shared ({ caller }) func changeMark(markType : Nat) : async () {
    switch (markType) {
      case (1) {
        currentMark := 1;
      };
      case (2) {
        currentMark := 2;
      };
      case (3) {
        currentMark := 3;
      };
      case (4) {
        currentMark := 4;
      };
      case (5) {
        currentMark := 5;
      };
      case (_) { Runtime.trap("Invalid Mark") };
    };
  };

  public query ({ caller }) func getCurrentMark() : async settingsView {
    {
      currentMark;
      availableFeatures = getCurrentFeatures();
    };
  };

  ////// Helper for Mark Features
  func getCurrentFeatures() : FeatureSet {
    let result = markFeatures.get(currentMark);
    switch (result) {
      case (?features) { features };
      case (null) { mark5Features };
    };
  };

  /////////////////////////////////////////////////////////////////////////////
  // Faction Weapons Management
  /////////////////////////////////////////////////////////////////////////////
  public shared ({ caller }) func customizeFactionWeapons(faction : Text, weaponList : [Text]) : async () {
    // When a faction is selected without a specific custom mapping, fallback to defaultWeapons
    switch (factions.get(faction)) {
      case (?f) {
        factionWeapons.add(faction, weaponList);
      };
      case (null) { Runtime.trap("Faction not found.") };
    };
  };

  public query ({ caller }) func getFactionWeapons(faction : Text) : async ?[Text] {
    factionWeapons.get(faction);
  };

  /////////////////////////////////////////////////////////////////////////////
  // Modes Management
  /////////////////////////////////////////////////////////////////////////////
  public shared ({ caller }) func switchMode(mode : Text) : async () {
    currentMode.currentMode := mode;
    switch (mode) {
      case ("hecu") {
        currentMode.hecuActive := true;
        currentMode.blackMesaSecurityActive := false;
        currentMode.halfLife2Active := false;
      };
      case ("blackMesaSecurity") {
        currentMode.hecuActive := false;
        currentMode.blackMesaSecurityActive := true;
        currentMode.halfLife2Active := false;
      };
      case ("halfLife2") {
        currentMode.hecuActive := false;
        currentMode.blackMesaSecurityActive := false;
        currentMode.halfLife2Active := true;
        modules := {
          helmet = false;
          respirator = false;
          longJump = false;
          flashlight = false;
          advancedMedical = false;
          radiationShield = false;
          defibrillator = false;
          shieldBoost = false;
          hazardSystem = false;
          moduleSync = false;
        };
      };
      case ("default") {
        currentMode.hecuActive := false;
        currentMode.blackMesaSecurityActive := false;
        currentMode.halfLife2Active := false;
        modules := {
          helmet = false;
          respirator = false;
          longJump = false;
          flashlight = false;
          advancedMedical = false;
          radiationShield = false;
          defibrillator = false;
          shieldBoost = false;
          hazardSystem = false;
          moduleSync = false;
        };
      };
      case (_) {};
    };
  };

  public query ({ caller }) func getCurrentMode() : async ModesView {
    {
      currentMode = currentMode.currentMode;
      hecuActive = currentMode.hecuActive;
      blackMesaSecurityActive = currentMode.blackMesaSecurityActive;
      halfLife2Active = currentMode.halfLife2Active;
    };
  };

  /////////////////////////////////////////////////////////////////////////////
  // Gravity Gun Controls
  /////////////////////////////////////////////////////////////////////////////
  public shared ({ caller }) func toggleGravityGun() : async () {
    if (currentMode.halfLife2Active) {
      gravityGun.isActive := not gravityGun.isActive;
      gravityGun.mode := "normal";
      gravityGun.chargeLevel := 100;
    };
  };

  public shared ({ caller }) func chargeGravityGun() : async () {
    if (currentMode.halfLife2Active) {
      gravityGun.mode := "supercharged";
      gravityGun.chargeLevel := 100;
    };
  };

  public query ({ caller }) func getGravityGunStatus() : async GravityGunStatusView {
    {
      mode = gravityGun.mode;
      chargeLevel = gravityGun.chargeLevel;
      isActive = gravityGun.isActive;
    };
  };

  /////////////////////////////////////////////////////////////////////////////
  // Weapons System - Query Functions
  /////////////////////////////////////////////////////////////////////////////
  public query ({ caller }) func getWeapon(name : Text) : async ?WeaponView {
    switch (weaponData.get(name)) {
      case (?weapon) {
        ?{
          name = weapon.name;
          weaponType = weapon.weaponType;
          damage = weapon.damage;
          ammoCapacity = weapon.ammoCapacity;
          fireRate = weapon.fireRate;
          accuracy = weapon.accuracy;
          description = weapon.description;
          lore = weapon.lore;
        };
      };
      case (null) { null };
    };
  };

  public query ({ caller }) func getAllWeapons() : async [WeaponView] {
    weaponData.values().map<Weapon, WeaponView>(
      func(x) {
        {
          name = x.name;
          weaponType = x.weaponType;
          damage = x.damage;
          ammoCapacity = x.ammoCapacity;
          fireRate = x.fireRate;
          accuracy = x.accuracy;
          description = x.description;
          lore = x.lore;
        };
      }
    ).toArray();
  };

  public query ({ caller }) func getWeaponsCount() : async Nat {
    weaponData.size();
  };

  /////////////////////////////////////////////////////////////////////////////
  // Core Systems (Unchanged from original)
  /////////////////////////////////////////////////////////////////////////////
  public shared ({ caller }) func toggleModule(moduleName : Text) : async () {
    modules := switch (moduleName) {
      case ("helmet") {
        { modules with helmet = not modules.helmet };
      };
      case ("respirator") {
        { modules with respirator = not modules.respirator };
      };
      case ("longJump") {
        { modules with longJump = not modules.longJump };
      };
      case ("flashlight") {
        { modules with flashlight = not modules.flashlight };
      };
      case ("advancedMedical") {
        { modules with advancedMedical = not modules.advancedMedical };
      };
      case ("radiationShield") {
        { modules with radiationShield = not modules.radiationShield };
      };
      case ("defibrillator") {
        { modules with defibrillator = not modules.defibrillator };
      };
      case ("shieldBoost") {
        { modules with shieldBoost = not modules.shieldBoost };
      };
      case ("hazardSystem") {
        { modules with hazardSystem = not modules.hazardSystem };
      };
      case ("moduleSync") {
        { modules with moduleSync = not modules.moduleSync };
      };
      case (_) { Runtime.trap("Invalid module") };
    };
  };

  public shared ({ caller }) func updateStats(stat : Text, value : Nat) : async () {
    switch (stat) {
      case ("health") { stats.health := value };
      case ("armor") { stats.armor := value };
      case ("aux") { stats.aux := value };
      case ("ammo") { stats.ammo := value };
      case ("hazard") { stats.hazard := value };
      case (_) { Runtime.trap("Invalid stat") };
    };
  };

  public shared ({ caller }) func toggleLifeSupportSystem() : async () {
    lss.systemActive := not lss.systemActive;
    if (not lss.systemActive) {
      lss.oxygenLevel := 0;
      lss.temperature := 0;
      lss.co2Level := 0;
      lss.airPurificationStatus := "disabled";
    } else {
      lss.oxygenLevel := 100;
      lss.temperature := 20;
      lss.co2Level := 0;
      lss.airPurificationStatus := "operational";
    };
  };

  public query ({ caller }) func getSystemStatus() : async Text {
    if (sysStatus.state == "critical") {
      raiseCriticalAlerts();
    };
    sysStatus.state;
  };

  public shared ({ caller }) func setTemperature(tempVal : Nat) : async () {
    lss.temperature := tempVal;
    envHazards.fire.temp := tempVal;
    if (tempVal > 25) {
      envHazards.fire.status := "overheating";
      lss.airPurificationStatus := "caution";
    } else {
      envHazards.fire.status := "safe";
      lss.airPurificationStatus := "good";
    };
  };

  public shared ({ caller }) func toggleHazard(hazardType : Text, level : Nat) : async () {
    func setHazardStatus(hazardType : Text, newStatus : Text, hazardVar : { var status : Text }) {
      hazardVar.status := hazardType # " hazard: " # newStatus;
    };

    switch (hazardType) {
      case ("fire") {
        envHazards.levels.fire := level;
        setHazardStatus("fire", statusText(level), envHazards.fire);
      };
      case ("bio") {
        envHazards.levels.bio := level;
        setHazardStatus("bio", statusText(level), envHazards.bio);
      };
      case ("radiation") {
        envHazards.levels.radiation := level;
        setHazardStatus("radiation", statusText(level), envHazards.radiation);
      };
      case ("electrical") {
        envHazards.levels.electrical := level;
        setHazardStatus("electrical", statusText(level), envHazards.electrical);
      };
      case ("gas") {
        envHazards.levels.gas := level;
        setHazardStatus("gas", statusText(level), envHazards.gas);
      };
      case (_) {};
    };
  };

  public shared ({ caller }) func getSystemState() : async (Bool, Nat, Text) {
    let isStable = lss.temperature >= 20 and lss.oxygenLevel > 0;
    (isStable, lss.temperature, lss.airPurificationStatus);
  };

  public shared ({ caller }) func getHazardData() : async (Nat, Nat, Nat, Nat, Nat) {
    (lss.temperature, envHazards.levels.fire, envHazards.levels.bio, envHazards.levels.radiation, envHazards.levels.gas);
  };

  public shared ({ caller }) func getFireStatus() : async Text {
    envHazards.fire.status;
  };

  public shared ({ caller }) func getBioStatus() : async Text {
    envHazards.bio.status;
  };

  public shared ({ caller }) func getRadiationStatus() : async Text {
    envHazards.radiation.status;
  };

  public shared ({ caller }) func getElectricalStatus() : async Text {
    envHazards.electrical.status;
  };

  public shared ({ caller }) func getGasStatus() : async Text {
    envHazards.gas.status;
  };

  public shared ({ caller }) func getLifeSupportInfo() : async (Bool, Nat, Nat, Nat, Text) {
    (lss.systemActive, lss.oxygenLevel, lss.co2Level, lss.temperature, lss.airPurificationStatus);
  };

  public shared ({ caller }) func getEnvProtectionInfo() : async (Bool, Nat, Nat, Text) {
    (eps.systemActive, eps.polarisationLevel, eps.radiationLevel, eps.shieldStatus);
  };

  public shared ({ caller }) func getPowerInfo() : async (Bool, Nat, Nat, Nat) {
    (pms.systemActive, pms.batteryLevel, pms.powerOutput, pms.auxPowerOutput);
  };

  public shared ({ caller }) func getCommunicationInfo() : async (Bool, Text, Text, Bool) {
    (comms.moduleActive, comms.communicationStatus, comms.lastCommand, comms.videoFeedback);
  };

  public shared ({ caller }) func switchHudDisplay(_mode : Text) : async () {
    ard.hudActive := not ard.hudActive;
  };

  public shared ({ caller }) func setErrorState(errorType : Text) : async () {
    sysStatus.error := errorType;
    sysStatus.state := "critical";
    if (errorType == "recovered") {
      sysStatus.state := "operational";
      sysStatus.error := "none";
    };
  };

  public query ({ caller }) func getModuleStates() : async ModuleToggles {
    modules;
  };

  public shared ({ caller }) func getAllHazardStatuses() : async {
    fire : Text;
    bio : Text;
    radiation : Text;
    electrical : Text;
    gas : Text;
  } {
    {
      fire = envHazards.fire.status;
      bio = envHazards.bio.status;
      radiation = envHazards.radiation.status;
      electrical = envHazards.electrical.status;
      gas = envHazards.gas.status;
    };
  };

  public query ({ caller }) func getSuitState() : async [(Text, Text)] {
    suitState.entries().toArray();
  };

  public shared ({ caller }) func setSuitState(key : Text, value : Text) : async () {
    suitState.add(key, value);
  };

  public shared ({ caller }) func addWarningSensor(id : Nat, location : Text) : async () {
    warningSensors.add(id, location);
  };

  public shared ({ caller }) func removeWarningSensor(id : Nat) : async () {
    warningSensors.remove(id);
  };

  public query ({ caller }) func getWarningSensors() : async [(Nat, Text)] {
    warningSensors.entries().toArray();
  };

  public shared ({ caller }) func getStats() : async (Nat, Nat, Nat, Nat, Nat) {
    (stats.health, stats.armor, stats.aux, stats.ammo, stats.hazard);
  };

  /////////////////////////////////////////////////////////////////////////////
  // Helpers
  /////////////////////////////////////////////////////////////////////////////
  func statusText(level : Nat) : Text {
    switch (level) {
      case (0) { "inactive" };
      case (1) { "safe" };
      case (2) { "minor" };
      case (3) { "moderate" };
      case (4) { "dangerous" };
      case (5) { "critical" };
      case (_) { "unknown" };
    };
  };

  func raiseCriticalAlerts() {
    let warnings = warningSensors.values().toArray();
    if (warnings.size() > 0) {
      let hasWarning = warnings.any(
        func(sensor) {
          sensor.contains(#text("warning") : Text.Pattern);
        }
      );
      if (hasWarning) {
        sysStatus.state := "critical";
      };
    };
  };
};
