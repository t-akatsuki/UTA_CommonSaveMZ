// ============================================================================
// UTA_CommonSaveMZ.js
// ============================================================================
/*:
 */
/*:ja
 */
"use strict";

/**
 * @namespace utakata
 */
var utakata = utakata || {};

/**
 * @namespace utakata.UTA_CommonSaveMZ
 * @property {string} VERSION
 * @property {CommonSaveManager} CommonSaveManager 
 * @property {UTA_CommonSaveError} UTA_CommonSaveError
 */
utakata.UTA_CommonSaveMZ = (function() {
    /**
     * プラグインバージョンの定義。
     * @constant
     * @type {string}
     */
    const VERSION = "1.0.0";

    /**
     * @extends Error
     * @class UTA_CommonSaveError
     * @classdesc UTA_CommonSave関連汎用エラークラス。
     */
    class UTA_CommonSaveError extends Error {
        constructor(...args) {
            super(...args);
        }
    }

    // 名前空間越しにアクセス可能なプロパティの定義
    const exports = {
        VERSION: VERSION
    };

    return exports;
})();
