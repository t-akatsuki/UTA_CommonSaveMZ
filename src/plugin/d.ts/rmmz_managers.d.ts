//=============================================================================
// rmmz_managers.js v1.0.0
//=============================================================================
/**
 * @class DataManager
 * @classdesc The static class that manages the database and game objects.
 */
declare class DataManager {
    public static setupNewGame(): void;
    public static setupBattleTest(): void;
    public static setupEventTest(): void;

    public static saveGame(savefileId: number): Promise<number>;
    public static loadGame(savefileId: number): Promise<number>;
}

declare var $gameSwitches: Game_Switches;
declare var $gameVariables: Game_Variables;

/**
 * @class StorageManager
 * @classdesc The static class that manages storage for saving game data.
 */
declare class StorageManager {
    public static isLocalMode(): boolean;
    public static saveObject(saveName: string, object: any): Promise<void>;
    public static loadObject(saveName: string): Promise<any>;
    public static objectToJson(object: any): Promise<string>;
    public static jsonToObject(json: string): Promise<any>;
    public static jsontoZip(json: string): Promise<string>;
    public static zipToJson(zip: string): Promise<string>;

    public static exists(saveName: string): boolean;
    public static remove(saveName: string): void;

    public static localFileExists(saveName: string): boolean;
    public static removeLocalFile(saveName: string): void;

    public static forageExists(saveName: string): boolean;
}

/**
 * @class PluginManager
 * @classdesc The static class that manages the plugins.
 */
declare class PluginManager {
    public static parameters(name: string): {[param: string]: any};
    public static registerCommand(pluginName: string, commandName: string, func: Function): void;
}

