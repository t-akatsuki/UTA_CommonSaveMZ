//=============================================================================
// rmmz_objects.js v1.0.0
//=============================================================================
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
 * @class Game_Interpreter
 * @classdesc The interpreter for running event commands.
 */
declare class Game_Interpreter {
    public pluginCommand(command?: string, args?: any[]): void;
}
