//=============================================================================
// rmmz_objects.js v1.0.0
//=============================================================================
/**
 * @class Game_System
 * @classdesc The game object class for the system data.
 */
declare class Game_System {
    public saveCount(): number;
}

/**
 * @class Game_Switches
 * @clssdesc The game object class for switches.
 */
declare class Game_Switches {
    constructor();
    private _data: boolean[];
    public initialize(): void;
    public clear(): void;
    public value(switchId: number): boolean;
    public setValue(switchId: number, value: boolean): void;
    public onChange(): void;
}

/**
 * @class Game_Variables
 * @classdesc The game object class for variables.
 */
declare class Game_Variables {
    constructor();
    private _data: number[];
    public initialize(): void;
    public clear(): void;
    public value(variableId: number): number;
    public setValue(variableId: number, value: number): void;
    public onChange(): void;
}

/**
 * @class Game_Unit
 * @classdesc The superclass of Game_Party and Game_Troop.
 */
declare class Game_Unit {
}

/**
 * @class Game_Party
 * @classdesc The game object class for the party. Information such as gold and items is
 * included.
 */
declare class Game_Party extends Game_Unit {
    public steps(): number;
}

/**
 * @class Game_Map
 * @classdesc The game object class for a map. It contains scrolling and passage
 * determination functions.
 */
declare class Game_Map {
    public mapId(): number;
}

/**
 * @class Game_CharacterBase
 * @classdesc The superclass of Game_Character. It handles basic information, such as
 * coordinates and images, shared by all characters.
 */
declare class Game_CharacterBase {
    public x: number;
    public y: number;

    public direction(): number;
}

/**
 * @class Game_Character
 * @classdesc The superclass of Game_Player, Game_Follower, GameVehicle, and Game_Event.
 */
declare class Game_Character extends Game_CharacterBase {
}

/**
 * @class Game_Player
 * @classdesc The game object class for the player. It contains event starting
 * determinants and map scrolling functions.
 */
declare class Game_Player extends Game_Character {
}

/**
 * @class Game_Interpreter
 * @classdesc The interpreter for running event commands.
 */
declare class Game_Interpreter {
    public pluginCommand(command?: string, args?: any[]): void;
}
