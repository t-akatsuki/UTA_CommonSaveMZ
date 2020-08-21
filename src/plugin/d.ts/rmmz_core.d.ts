//=============================================================================
// rmmz_core.js v1.0.0
//=============================================================================
/**
 * @namespace JsonEx
 * @classdesc The static class that handles JSON with object information.
 */
declare namespace JsonEx {
    function stringify(object: any): string;
    function parse(json: string): any;
    function makeDeepCopy(object: any): any;
}
