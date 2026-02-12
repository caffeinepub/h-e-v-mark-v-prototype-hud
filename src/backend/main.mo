import Array "mo:core/Array";
import Text "mo:core/Text";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";



actor {
  type Stats = {
    var health : Nat;
    var armor : Nat;
    var aux : Nat;
    var ammo : Nat;
    var hazard : Nat;
  };

  type ModuleToggles = {
    var helmet : Bool;
    var respirator : Bool;
    var longJump : Bool;
    var flashlight : Bool;
    var advancedMedical : Bool;
    var radiationShield : Bool;
    var defibrillator : Bool;
    var shieldBoost : Bool;
    var hazardSystem : Bool;
    var moduleSync : Bool;
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

  let suitState = Map.empty<Text, Text>();
  let warningSensors = Map.empty<Nat, Text>();

  let stats : Stats = {
    var health = 100;
    var armor = 100;
    var aux = 100;
    var ammo = 30;
    var hazard = 0;
  };

  let modules : ModuleToggles = {
    var helmet = false;
    var respirator = false;
    var longJump = false;
    var flashlight = false;
    var advancedMedical = false;
    var radiationShield = false;
    var defibrillator = false;
    var shieldBoost = false;
    var hazardSystem = false;
    var moduleSync = false;
  };

  let lss : LifeSupportSystem = {
    var systemActive = false;
    var oxygenLevel = 100;
    var co2Level = 0;
    var temperature = 22;
    var batteryLevel = 100;
    var airPurificationStatus = "operational";
  };

  // Environmental Hazards
  let envHazards : EnvironmentalHazards = {
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

  let eps : EnvProtectionSystem = {
    var systemActive = false;
    var radiationLevel = 0;
    var polarisationLevel = 5;
    var shieldStatus = "engaged";
  };

  let sysStatus : SystemStatus = {
    var state = "operational";
    var error = "none";
    var recoveryAttempts = 0;
    var pendingTimeout = 0;
  };

  let pms : PowerManagementSystem = {
    var systemActive = false;
    var batteryLevel = 100;
    var powerOutput = 100;
    var auxPowerOutput = 0;
  };

  let comms : AICommunicationModule = {
    var moduleActive = false;
    var communicationStatus = "stable";
    var lastCommand = "";
    var videoFeedback = true;
  };

  let ard : AugmentedRealityDisplay = {
    var hudActive = false;
    var displayMode = "standard";
    var resolution = "1080p";
    var warningLevel = 0;
  };

  //////////////////////////////////////////////////////////////////////////
  ///////////////////////// Health Systems///////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  public shared ({ caller }) func toggleModule(moduleName : Text) : async () {
    func toggleVar(varRef : { var value : Bool }) {
      varRef.value := not varRef.value;
    };

    switch (moduleName) {
      case ("helmet") { toggleVar({ var value = modules.helmet }) };
      case ("respirator") { toggleVar({ var value = modules.respirator }) };
      case ("longJump") { toggleVar({ var value = modules.longJump }) };
      case ("flashlight") { toggleVar({ var value = modules.flashlight }) };
      case ("advancedMedical") { toggleVar({ var value = modules.advancedMedical }) };
      case ("radiationShield") { toggleVar({ var value = modules.radiationShield }) };
      case ("defibrillator") { toggleVar({ var value = modules.defibrillator }) };
      case ("shieldBoost") { toggleVar({ var value = modules.shieldBoost }) };
      case ("hazardSystem") { toggleVar({ var value = modules.hazardSystem }) };
      case ("moduleSync") { toggleVar({ var value = modules.moduleSync }) };
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

  //////////////////////////////////////////////////////////////////////////
  ////////////////////// Deals with Temperature /////////////////////////////
  //////////////////////////////////////////////////////////////////////////
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

  //////////////////////////////////////////////////////////////////////////
  /////////////// Environmental Hazard Toggles /////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  public shared ({ caller }) func toggleHazard(hazardType : Text, level : Nat) : async () {
    func setHazardStatus(hazardType : Text, newStatus : Text, hazardVar : { var status : Text }) : () {
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

  //////////////////////////////////////////////////////////////////////////
  // Retrieve All Stats with Hazard Data
  //////////////////////////////////////////////////////////////////////////
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

  public query ({ caller }) func getModuleStates() : async {
    helmet : Bool;
    respirator : Bool;
    longJump : Bool;
    flashlight : Bool;
    radiationShield : Bool;
    defibrillator : Bool;
    shieldBoost : Bool;
    hazardSystem : Bool;
    moduleSync : Bool;
  } {
    {
      helmet = modules.helmet;
      respirator = modules.respirator;
      longJump = modules.longJump;
      flashlight = modules.flashlight;
      radiationShield = modules.radiationShield;
      defibrillator = modules.defibrillator;
      shieldBoost = modules.shieldBoost;
      hazardSystem = modules.hazardSystem;
      moduleSync = modules.moduleSync;
    };
  };

  //////////////////////////////////////////////////////////////////////////
  /////////////////////// Get All Hazard Statuses //////////////////////////
  //////////////////////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////////////////////
  /////////////////////// Suit Functions ///////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  public query ({ caller }) func getSuitState() : async [(Text, Text)] {
    suitState.entries().toArray();
  };

  public shared ({ caller }) func setSuitState(key : Text, value : Text) : async () {
    suitState.add(key, value);
  };

  //////////////////////////////////////////////////////////////////////////
  // Update Warning Sensors
  //////////////////////////////////////////////////////////////////////////
  public shared ({ caller }) func addWarningSensor(id : Nat, location : Text) : async () {
    warningSensors.add(id, location);
  };

  public shared ({ caller }) func removeWarningSensor(id : Nat) : async () {
    warningSensors.remove(id);
  };

  public query ({ caller }) func getWarningSensors() : async [(Nat, Text)] {
    warningSensors.entries().toArray();
  };

  //////////////////////////////////////////////////////////////////////////
  ///////////////////////// Stats //////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

  public shared ({ caller }) func getStats() : async (Nat, Nat, Nat, Nat, Nat) {
    (stats.health, stats.armor, stats.aux, stats.ammo, stats.hazard);
  };

  //////////////////////////////////////////////////////////////////////////
  ///////////////////////// Helpers ////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////

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
