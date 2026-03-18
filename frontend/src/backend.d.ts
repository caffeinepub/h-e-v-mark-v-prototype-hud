import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FeatureSet {
    communication: boolean;
    auxPower: boolean;
    navigationSystem: boolean;
    moduleSync: boolean;
    defibrillator: boolean;
    weaponSystem: boolean;
    hazardProtection: boolean;
    healthMonitoring: boolean;
    advancedMedical: boolean;
    lifeSupportTimeout: boolean;
    vehicleInterface: boolean;
    radiationShield: boolean;
    armorShielding: boolean;
    shieldBoost: boolean;
    longJumpModule: boolean;
    hazardSystem: boolean;
}
export interface DamageResistance {
    armorStrength: bigint;
    resistances: {
        fire: bigint;
        electrical: bigint;
        bioHazards: bigint;
        radiation: bigint;
    };
}
export interface TacticalCapabilities {
    speed: bigint;
    acceleration: bigint;
    durability: bigint;
    handling: string;
}
export interface SupportSystems {
    communication: string;
    navigation: string;
    sensors: string;
    automation: string;
}
export interface ModuleToggles {
    helmet: boolean;
    moduleSync: boolean;
    defibrillator: boolean;
    advancedMedical: boolean;
    respirator: boolean;
    longJump: boolean;
    radiationShield: boolean;
    shieldBoost: boolean;
    hazardSystem: boolean;
    flashlight: boolean;
}
export interface EngineSpecs {
    powerOutput: bigint;
    transmission: string;
    torque: bigint;
    engineType: string;
}
export interface GravityGunStatusView {
    mode: string;
    isActive: boolean;
    chargeLevel: bigint;
}
export interface ComprehensiveVehicleInfo {
    supportSystems: SupportSystems;
    engineSpecs: EngineSpecs;
    tacticalCapabilities: TacticalCapabilities;
    fuel: bigint;
    lore: VehicleLore;
    name: string;
    damageResistance: DamageResistance;
    speed: bigint;
    diagnostics: string;
    integrity: bigint;
}
export interface ModesView {
    halfLife2Active: boolean;
    currentMode: string;
    blackMesaSecurityActive: boolean;
    hecuActive: boolean;
}
export interface settingsView {
    currentMark: bigint;
    availableFeatures: FeatureSet;
}
export interface WeaponView {
    damage: bigint;
    lore: string;
    name: string;
    description: string;
    weaponType: string;
    ammoCapacity: bigint;
    fireRate: bigint;
    accuracy: bigint;
}
export interface VehicleLore {
    historicalUse: string;
    manufacturer: string;
    notableUpgrades: string;
    purpose: string;
}
export interface FactionView {
    defaultWeapons: Array<string>;
    name: string;
    description: string;
    customTab?: string;
}
export interface backendInterface {
    addWarningSensor(id: bigint, location: string): Promise<void>;
    changeMark(markType: bigint): Promise<void>;
    chargeGravityGun(): Promise<void>;
    customizeFactionWeapons(faction: string, weaponList: Array<string>): Promise<void>;
    getAllComprehensiveVehicleInfo(): Promise<Array<ComprehensiveVehicleInfo>>;
    getAllFactions(): Promise<Array<FactionView>>;
    getAllHazardStatuses(): Promise<{
        bio: string;
        gas: string;
        fire: string;
        electrical: string;
        radiation: string;
    }>;
    getAllWeapons(): Promise<Array<WeaponView>>;
    getBioStatus(): Promise<string>;
    getCommunicationInfo(): Promise<[boolean, string, string, boolean]>;
    getComprehensiveVehicleInfo(vehicleName: string): Promise<ComprehensiveVehicleInfo>;
    getCurrentFaction(): Promise<string | null>;
    getCurrentMark(): Promise<settingsView>;
    getCurrentMode(): Promise<ModesView>;
    getCustomTab(tabName: string): Promise<string | null>;
    getElectricalStatus(): Promise<string>;
    getEnvProtectionInfo(): Promise<[boolean, bigint, bigint, string]>;
    getFactionWeapons(faction: string): Promise<Array<string> | null>;
    getFireStatus(): Promise<string>;
    getGasStatus(): Promise<string>;
    getGravityGunStatus(): Promise<GravityGunStatusView>;
    getHazardData(): Promise<[bigint, bigint, bigint, bigint, bigint]>;
    getLifeSupportInfo(): Promise<[boolean, bigint, bigint, bigint, string]>;
    getModuleStates(): Promise<ModuleToggles>;
    getPowerInfo(): Promise<[boolean, bigint, bigint, bigint]>;
    getRadiationStatus(): Promise<string>;
    getStats(): Promise<[bigint, bigint, bigint, bigint, bigint]>;
    getSuitState(): Promise<Array<[string, string]>>;
    getSystemState(): Promise<[boolean, bigint, string]>;
    getSystemStatus(): Promise<string>;
    getWarningSensors(): Promise<Array<[bigint, string]>>;
    getWeapon(name: string): Promise<WeaponView | null>;
    getWeaponsCount(): Promise<bigint>;
    removeWarningSensor(id: bigint): Promise<void>;
    setCustomTab(tabName: string, data: string): Promise<void>;
    setErrorState(errorType: string): Promise<void>;
    setSuitState(key: string, value: string): Promise<void>;
    setTemperature(tempVal: bigint): Promise<void>;
    switchFaction(factionName: string): Promise<void>;
    switchHudDisplay(_mode: string): Promise<void>;
    switchMode(mode: string): Promise<void>;
    toggleGravityGun(): Promise<void>;
    toggleHazard(hazardType: string, level: bigint): Promise<void>;
    toggleLifeSupportSystem(): Promise<void>;
    toggleModule(moduleName: string): Promise<void>;
    updateStats(stat: string, value: bigint): Promise<void>;
}
