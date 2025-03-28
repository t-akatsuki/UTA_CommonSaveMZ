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

    /**
     * @class Logger
     * @classdesc Loggerを扱う静的クラス。
     */
    const Logger = (function() {
        /**
         * @constructor
         */
        function Logger() {
            throw new Error(`${this.constructor.name} is static class`);
        }

        /**
         * @static
         * @readonly
         * @property {string} ERRORログレベル。
         */
        Object.defineProperty(Logger, "ERROR", {
            value: "error",
            writable: false
        });

        /**
         * @static
         * @readonly
         * @property {string} WARNログレベル。
         */
        Object.defineProperty(Logger, "WARN", {
            value: "warn",
            writable: false
        });

        /**
         * @static
         * @readonly
         * @property {string} INFOログレベル。
         */
        Object.defineProperty(Logger, "INFO", {
            value: "info",
            writable: false
        });

        /**
         * @static
         * @readonly
         * @property {string} LOGログレベル。
         */
        Object.defineProperty(Logger, "LOG", {
            value: "log",
            writable: false
        });

        /**
         * @static
         * @readonly
         * @property {string} DEBUGログレベル。
         */
        Object.defineProperty(Logger, "DEBUG", {
            value: "debug",
            writable: false
        });

        /**
         * ログレベルの定義。
         * @static
         * @type {readonly string[]}
         */
        Logger.LOG_LEVELS = Object.freeze([
            Logger.ERROR, Logger.WARN, Logger.INFO, Logger.LOG, Logger.DEBUG
        ]);

        /**
         * デフォルトログレベル。
         * @static
         * @type {string}
         */
        Logger.DEFAULT_LOG_LEVEL = Logger.INFO;

        /**
         * 現在のログレベル。
         * @static
         * @type {string}
         */
        Logger._logLevel = Logger.DEFAULT_LOG_LEVEL;

        /**
         * logger closureの参照。
         * @static
         * @type {Object.<string, function>}
         */
        Logger._logger = {};

        /**
         * ログレベルを設定する。  
         * LOG_LEVELSで定義されるログレベル文字列の何れかを指定する必要がある。
         * @static
         * @param {string} logLevel 設定するログレベル。
         * @throws {UTA_CommonSaveError} 不正なログレベルが指定された場合に送出する。
         */
        Logger.setLogLevel = function(logLevel) {
            if (this.LOG_LEVELS.indexOf(logLevel) < 0) {
                throw new UTA_CommonSaveError("Invalid logLevel specified");
            }
            this._logLevel = logLevel;
        };

        /**
         * loggerを取得する。シングルトン。
         * @static
         * @param {string} [prefix] ログ出力時のprefix名。
         * @return {function} logger関数。
         */
        Logger.getLogger = function(prefix = "utakata") {
            if (Object.keys(this._logger).indexOf(prefix) < 0) {
                const _this = this;

                /**
                 * @param {string} type ログ出力の種類。LOG_LEVELSて定義されるものの何れか。
                 * @param {any[]} messages ログ出力するメッセージ。
                 */
                this._logger[prefix] = (type = "log", ...messages) => {
                    const levelIndex = _this.LOG_LEVELS.indexOf(_this._logLevel);

                    // 現在のログレベル範囲で無い場合は何もしない
                    if (_this.LOG_LEVELS.indexOf(type) > levelIndex) {
                        return;
                    }
                    if (prefix) {
                        messages.unshift(`${prefix}: `);
                    }
                    console[type](...messages);
                };
            }

            return this._logger[prefix];
        };

        return Logger;
    })();

    /**
     * @class Version
     * @classdesc セマンティックバージョニング2.0.0形式のバージョンを扱うクラス。
     */
    const Version = (function() {
        const _logger = Logger.getLogger("Version");

        /**
         * @constructor
         * @param {number} major メジャーバージョン値。
         * @param {number} minor マイナーバージョン値。
         * @param {number} patch パッチバージョン値。
         */
        function Version(major, minor, patch) {
            /**
             * メジャーバージョン。
             * @type {number}
             */
            this.major = major;

            /**
             * マイナーバージョン。
             * @type {number}
             */
            this.minor = minor;

            /**
             * パッチパージョン。
             * @type {number}
             */
            this.patch = patch;
        }

        /**
         * バージョン値の区切り文字の定義。
         * @readonly
         * @type {string}
         */
        Object.defineProperty(Version, "SEPARATOR", {
            value: ".",
            writable: false
        });

        /**
         * バージョンが比較対象と同じであるかを判定する。
         * @param {Version} other 比較対象バージョン。
         * @return {boolean} 比較対象と同じバージョンの場合はtrueを返す。
         */
        Version.prototype.isEqual = function(other) {
            let ret = true;
            for (const target of ["major", "minor", "patch"]) {
                ret &= this[target] === other[target];
            }
            return ret;
        };

        /**
         * バージョンが比較対象より古いかを判定する。
         * @param {Version} other 比較対象バージョン。
         * @return {boolean} 比較対象より古いバージョンの場合はtrueを返す。
         */
        Version.prototype.isOlderThan = function(other) {
            let ret = false;
            for (const target of ["major", "minor", "patch"]) {
                if (this[target] < other[target]) {
                    ret = true;
                    break;
                }
            }
            return ret;
        };

        /**
         * バージョンが比較対象より新しいかを判定する。
         * @param {Version} other 比較対象バージョン。
         * @return {boolean} 比較対象より新しい場合はtrueを返す。
         */
        Version.prototype.isLaterThan = function(other) {
            let ret = false;
            for (const target of ["major", "minor", "patch"]) {
                if (this[target] > other[target]) {
                    ret = true;
                    break;
                }
            }
            return ret;
        };

        /**
         * バージョンが比較対象以前のものかを判定する。
         * @param {Version} other 比較対象バージョン。
         * @return {boolean} 比較対象以前の場合はtrueを返す。
         */
        Version.prototype.isOlderThanEqual = function(other) {
            return this.isOlderThan(other) || this.isEqual(other);
        };

        /**
         * バージョンが比較対象以後のものかを判定する。
         * @param {Version} other 比較対象バージョン。
         * @return {boolean} 比較対象以後の場合はtrueを返す。
         */
        Version.prototype.isLaterThanEqual = function(other) {
            return this.isLaterThan(other) || this.isEqual(other);
        };

        /**
         * バージョン情報を連想配列として取得する。
         * @return {Object.<string, number>} バージョン情報の連想配列。
         */
        Version.prototype.getVersionDict = function() {
            let ret = {};
            const target = ["major", "minor", "patch"];
            for (const prop of target) {
                ret[prop] = this[target];
            }
            return ret;
        };

        /**
         * バージョン文字列に変換する。
         * @return {string} バージョン文字列。
         */
        Version.prototype.toString = function() {
            const versionStr = Array.prototype.join.call([
                this.major, this.minor, this.patch
            ], Version.SEPARATOR);
            return versionStr;
        };

        /**
         * バージョン文字列からバージョンインスタンスを得る。
         * @param {string} versionStr バージョン文字列。
         * @return {Version} バージョンインスタンス。
         */
        Version.fromString = function(versionStr) {
            let version = null;
            try {
                const versionStrList = versionStr.split(Version.SEPARATOR);
                if (versionStrList.length !== 3) {
                    throw new TypeError(`Version string invalid format.`);
                }
                version = this(...versionStrList);
            } catch (e) {
                _logger(Logger.ERROR, `fromString: Version string parse error. (versionStr = ${versionStr})`);
                _logger(Logger.ERROR, e);
                throw UTA_CommonSaveError(`Parse error: Version string parse error.`);
            }

            return version;
        };

        return Version;
    })();

    // 名前空間越しにアクセス可能なプロパティの定義
    const exports = {
        VERSION: VERSION
    };

    return exports;
})();
