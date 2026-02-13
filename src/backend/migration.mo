module {
  type OldModuleToggles = {
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

  type OldActor = {
    modules : OldModuleToggles;
  };

  type NewModuleToggles = {
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

  type NewActor = {
    modules : NewModuleToggles;
  };

  public func run(old : OldActor) : NewActor {
    let newModules : NewModuleToggles = {
      helmet = old.modules.helmet;
      respirator = old.modules.respirator;
      longJump = old.modules.longJump;
      flashlight = old.modules.flashlight;
      advancedMedical = old.modules.advancedMedical;
      radiationShield = old.modules.radiationShield;
      defibrillator = old.modules.defibrillator;
      shieldBoost = old.modules.shieldBoost;
      hazardSystem = old.modules.hazardSystem;
      moduleSync = old.modules.moduleSync;
    };
    { modules = newModules };
  };
};
