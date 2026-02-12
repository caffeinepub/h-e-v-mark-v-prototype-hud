import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface backendInterface {
    addWarningSensor(id: bigint, location: string): Promise<void>;
    getAllHazardStatuses(): Promise<{
        bio: string;
        gas: string;
        fire: string;
        electrical: string;
        radiation: string;
    }>;
    getBioStatus(): Promise<string>;
    getCommunicationInfo(): Promise<[boolean, string, string, boolean]>;
    getDetailedHazardSummary(): Promise<{
        radStatus: string;
        fireStatus: string;
        electricalStatus: string;
        gasStatus: string;
        bioStatus: string;
        hazardLevels: {
            bio: bigint;
            gas: bigint;
            rad: bigint;
            fire: bigint;
            electrical: bigint;
        };
    }>;
    getElectricalStatus(): Promise<string>;
    getEnvProtectionInfo(): Promise<[boolean, bigint, bigint, string]>;
    getFireStatus(): Promise<string>;
    getGasStatus(): Promise<string>;
    getHazardData(): Promise<[bigint, bigint, bigint, bigint, bigint]>;
    getLifeSupportInfo(): Promise<[boolean, bigint, bigint, bigint, string]>;
    getModuleStates(): Promise<{
        helmet: boolean;
        moduleSync: boolean;
        defibrillator: boolean;
        respirator: boolean;
        longJump: boolean;
        radiationShield: boolean;
        shieldBoost: boolean;
        hazardSystem: boolean;
        flashlight: boolean;
    }>;
    getPowerInfo(): Promise<[boolean, bigint, bigint, bigint]>;
    getRadiationStatus(): Promise<string>;
    getStats(): Promise<[bigint, bigint, bigint, bigint, bigint]>;
    getSuitState(): Promise<Array<[string, string]>>;
    getSystemState(): Promise<[boolean, bigint, string]>;
    getSystemStatus(): Promise<string>;
    getWarningSensors(): Promise<Array<[bigint, string]>>;
    removeWarningSensor(id: bigint): Promise<void>;
    setErrorState(errorType: string): Promise<void>;
    setSuitState(key: string, value: string): Promise<void>;
    setTemperature(tempVal: bigint): Promise<void>;
    switchHudDisplay(_mode: string): Promise<void>;
    toggleHazard(hazardType: string, level: bigint): Promise<void>;
    toggleLifeSupportSystem(): Promise<void>;
    toggleModule(moduleName: string): Promise<void>;
    updateStats(stat: string, value: bigint): Promise<void>;
}
