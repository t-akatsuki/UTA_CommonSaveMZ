// ============================================================================
// UTA_CommonSaveMZ.js
// ============================================================================
/*:
 */
/*:ja
 * @target MZ
 * @plugindesc セーブデータ間で共有のセーブデータを作成し、
 * 指定したスイッチ/変数の状態をセーブデータ間で共有します。
 * 
 * @author 赤月 智平(t-akatsuki)
 * @url https://www.utakata-no-yume.net
 * 
 * @param sharedTarget
 * @text 共通対象設定
 * @desc 共有対象に関する設定グループ。
 * 
 * @param targetSwitches
 * @parent sharedTarget
 * @type switch[]
 * @default []
 * @text 共有対象スイッチ番号
 * @desc セーブデータ間で共有するスイッチ番号の定義。
 * 「-」で範囲指定が可能。
 * 
 * @param targetVariables
 * @parent sharedTarget
 * @type variable[]
 * @default []
 * @text 共有対象変数番号
 * @desc セーブデータ間で共有する変数番号の定義。
 * 「-」で範囲指定が可能。
 * 
 * @param autoApplyLoad
 * @text 自動適用関連設定
 * @desc 共有セーブの自動適用に関する設定グループ。
 * 
 * @param applyOnLoad
 * @parent autoApplyLoad
 * @type boolean
 * @default true
 * @on 自動適用する
 * @off 自動適用しない
 * @text ロード時の共有セーブ自動適用
 * @desc ロード時に共有セーブデータの自動適用を行うか。
 * 
 * @param applyOnNewGame
 * @parent autoApplyLoad
 * @type boolean
 * @default true
 * @on 自動適用する
 * @off 自動適用しない
 * @text ニューゲーム時の共有セーブ自動適用
 * @desc ニューゲーム時に共有セーブの自動適用を行うか。
 * 
 * @param autoApplySave
 * @text 自動保存関連設定
 * @desc 共有セーブの自動保存に関する設定グループ。
 * 
 * @param applyOnSave
 * @parent autoApplySave
 * @type boolean
 * @default true
 * @on 自動保存する
 * @off 自動保存しない
 * @text セーブ時の共有セーブ自動保存
 * @desc セーブ時に共有セーブデータの自動保存を行うか。
 * 
 * @param applyOnAutoSave
 * @parent autoApplySave
 * @type boolean
 * @default false
 * @on 自動保存する
 * @off 自動保存しない
 * @text オートセーブ時の共有セーブ自動保存
 * @desc オートセーブ時に共有セーブの自動保存を行うか。
 * 
 * @param applyOnGameover
 * @parent autoApplySave
 * @type boolean
 * @default true
 * @on 自動保存する
 * @off 自動保存しない
 * @text ゲームオーバー時の共有セーブ自動保存
 * @desc ゲームオーバー時に共有セーブデータの自動保存を行うか。
 * 
 * @param saveFileName
 * @type string
 * @default uta_common
 * @text 共有セーブデータファイル名
 * @desc 共有セーブデータファイル名の定義。
 * 拡張子は自動設定される為含めない。
 * 
 * @param logLevel
 * @type select
 * @default error
 * @option ERROR
 * @value error
 * @option WARN
 * @value warn
 * @option INFO
 * @value info
 * @option LOG
 * @value log
 * @option DEBUG
 * @value debug
 * @text ログレベル
 * @desc デバッグ用ログの出力レベル。
 * 設定したログレベル以上のログのみ出力する。
 * 
 * @command load
 * @text 共有セーブデータのロード
 * @desc 共有セーブデータからスイッチ/変数を読み込み反映させます。
 * 任意のタイミングで共有セーブデータをロードする際に使用します。
 * 
 * @command save
 * @text 共有セーブデータのセーブ
 * @desc 共有セーブデータに対象のスイッチ/変数の状態を記録します。
 * 任意のタイミングで共有セーブデータをセーブする際に使用します。
 * 
 * @command remove
 * @text 共有セーブデータの削除
 * @desc 共有セーブデータファイルを削除します。
 * 共有セーブデータをリセットしたい場合に使用します。
 * 
 * @command check
 * @text 共有対象スイッチ/変数の確認
 * @desc 共有対象のスイッチ/変数番号をコンソールに表示します。
 * 動作確認用のプラグインコマンドです。
 * 
 * @help # 概要
 * セーブデータ間で共有のセーブデータを作成し、
 * 指定したスイッチ/変数の状態をセーブデータ間で共有するプラグインです。
 * 設定に応じてセーブ・ロード時に自動的に反映を行わせる事ができます。
 * プラグインコマンドを利用すると、任意のタイミングで共有セーブデータの
 * 操作が可能です。
 * 
 * 本プラグインでは通常のセーブデータとは別に共有セーブデータを作成します。
 * local版ではsaveディレクトリ以下に共有セーブデータファイルが作成されます。
 * web版ではLocalStorageに共有セーブデータが保存されます。
 * 
 * # プラグインパラメータ
 * ## 共有対象スイッチ番号
 * セーブデータ間で共有するスイッチ番号の定義です。
 * 複数設定する事ができます。
 * 「-」で範囲指定が可能です。
 * (例1) 10
 *   => 10番のスイッチが対象になります。
 * (例2) 10-15
 *   => 10,11,12,13,14,15番のスイッチが対象になります。
 * 
 * ## 共有対象変数番号
 * セーブデータ間で共有する変数番号の定義です。
 * 複数設定する事ができます。
 * 「-」で範囲指定が可能です。
 * 番号の指定方法及び規則は「共有対象スイッチ番号」と同様です。
 * 
 * ## ロード時の共有セーブ自動適用
 * ロード時に共有セーブデータの自動適用を行うか。
 * (デフォルト: 自動適用する)
 * 
 * ## セーブ時の共有セーブ自動保存
 * セーブ時に共有セーブデータの自動保存を行うか。
 * この設定はオートセーブには適用されません。
 * (デフォルト: 自動適用する)
 * 
 * ## ニューゲーム時の共有セーブ自動適用
 * ニューゲーム時に共有セーブの自動適用を行うか。
 * (デフォルト: 自動適用する)
 * 
 * ## オートセーブ時の共有セーブ自動保存
 * オートセーブ時に共有セーブの自動保存を行うか。
 * (デフォルト: 自動適用しない)
 * 
 * ## ゲームオーバー時の共有セーブ自動保存
 * ゲームオーバー時に共有セーブデータの自動保存を行うか。
 * (デフォルト: 自動保存する)
 * 
 * ## 共有セーブデータファイル名
 * 共有セーブデータファイル名の定義です。
 * 拡張子は自動設定される為含めません。
 * 既存セーブデータと重複する名前(file0, global, config等)は
 * 利用しないで下さい。
 * (デフォルト: uta_common)
 * 
 * ## 同一ゲームチェック機能
 * 共有セーブデータロード時に現在起動中のゲームで記録されたものかを
 * 確認する機能の有効設定です。
 * 他のゲームの共有セーブデータを利用される等のトラブルを防止します。
 * (デフォルト: 有効にする)
 * 
 * # プラグインコマンド
 * ## 共有セーブデータのロード
 * 共有セーブデータからスイッチ/変数を読み込み反映させます。
 * 任意のタイミングで共有セーブデータをロードする際に使用します。
 * 
 * ## 共有セーブデータのセーブ
 * 共有セーブデータに対象のスイッチ/変数の状態を記録します。
 * 任意のタイミングで共有セーブデータをセーブする際に使用します。
 *
 * ## 共有セーブデータの削除
 * 共有セーブデータファイルを削除します。
 * 共有セーブデータをリセットしたい場合に使用します。
 * 
 * ## 共有対象スイッチ/変数の確認
 * 共有対象のスイッチ/変数番号をコンソールに表示します。
 * 動作確認用のプラグインコマンドです。
 * 
 * # プラグインの情報
 * バージョン : 1.0.0
 * 最終更新日 : 2022/MM/DD
 * 制作者     : 赤月 智平(t-akatsuki)
 * Webサイト  : https://www.utakata-no-yume.net
 * GitHub     : https://github.com/t-akatsuki
 * Twitter    : https://twitter.com/T_Akatsuki
 * ライセンス : MIT License
 * 
 * # 更新履歴
 * ## v1.0.0 (2022/MM/DD)
 * 後から共有対象を減らした場合に意図しない反映が行われる事ある問題を対処。
 * 同一ゲームチェック機能を追加。
 * 配布対象ファイルを調整。
 * 配布対象に取扱説明書を同梱するように。
 * 
 * ## v0.9.1 (2020/11/11)
 * プラグインパラメータ「共有対象スイッチ番号」もしくは「共有対象変数番号」を
 * 指定していないと正常動作しない不具合の修正。
 * 英語版アノテーション, README_EN.txtの追加。
 * 
 * ## v0.9.0 (2020/08/22)
 * β版。
 * RPGツクールMV用UTA_CommonSaveをベースにRPGツクールMZ用に移植。
 * オートセーブ機能への対応。
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
 * @property {UTA_CommonSavePluginParameterError} UTA_CommonSavePluginParameterError
 */
utakata.UTA_CommonSaveMZ = (function() {
    /**
     * プラグインバージョンの定義。
     * @constant
     * @type {string}
     */
    const VERSION = "1.0.0";

    /**
     * プラグイン名称定義。
     * @constant
     * @type {string}
     */
    const PLUGIN_NAME = "UTA_CommonSaveMZ";

    /**
     * @extends Error
     * @class UTA_CommonSaveError
     * @classdesc UTA_CommonSave関連汎用エラークラス。
     */
    var UTA_CommonSaveError = (function() {
        /**
         * @constructor
         * @param  {...any} args 
         */
        function UTA_CommonSaveError(...args) {
            Error.apply(this, args);
            this.message = args.length > 0 ? args[0] : null;
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, UTA_CommonSaveError);
            } else {
                this.stack = (new Error(this.message)).stack;
            }
        }

        // extends Error class
        UTA_CommonSaveError.prototype = Object.create(Error.prototype);
        UTA_CommonSaveError.prototype.name = "UTA_CommonSaveError";
        UTA_CommonSaveError.prototype.constructor = UTA_CommonSaveError;

        return UTA_CommonSaveError;
    })();

    /**
     * @extends UTA_CommonSaveError
     * @class UTA_CommonSavePluginParameterError
     * @classdesc UTA_CommonSaveプラグインパラメータ関連エラークラス。
     */
    var UTA_CommonSavePluginParameterError = (function() {
        /**
         * @constructor
         * @param  {...any} args 
         */
        function UTA_CommonSavePluginParameterError(...args) {
            UTA_CommonSaveError.apply(this, args);
        }

        // extends Error class
        UTA_CommonSavePluginParameterError.prototype = Object.create(UTA_CommonSaveError.prototype);
        UTA_CommonSavePluginParameterError.prototype.name = "UTA_CommonSavePluginParameterError";
        UTA_CommonSavePluginParameterError.prototype.constructor = UTA_CommonSavePluginParameterError;

        return UTA_CommonSavePluginParameterError;
    })();

    /**
     * @extends UTA_CommonSaveError
     * @class UTA_CommonSaveSecurityError
     * @classdesc UTA_CommonSaveセキュリティ関連エラークラス。
     */
    var UTA_CommonSaveSecurityError = (function() {
        /**
         * @constructor
         * @param  {...any} args 
         */
        function UTA_CommonSaveSecurityError(...args) {
            UTA_CommonSaveError.apply(this, args);
        }

        // extends Error class
        UTA_CommonSaveSecurityError.prototype = Object.create(UTA_CommonSaveError.prototype);
        UTA_CommonSaveSecurityError.prototype.name = "UTA_CommonSaveSecurityError";
        UTA_CommonSaveSecurityError.prototype.constructor = UTA_CommonSaveSecurityError;

        return UTA_CommonSaveSecurityError;
    })();

    /**
     * @static
     * @class Logger
     * @classdesc Loggerを扱う静的クラス。
     */
    var Logger = (function() {
        /**
         * @constructor
         */
        function Logger() {
            throw new Error(`${this.constructor.name} is static class`);
        }

        /**
         * @static
         * @readonly
         * @type {string} ERRORログレベル。
         */
        Object.defineProperty(Logger, "ERROR", {
            value: "error",
            writable: false
        });

        /**
         * @static
         * @readonly
         * @type {string} WARNログレベル。
         */
        Object.defineProperty(Logger, "WARN", {
            value: "warn",
            writable: false
        });

        /**
         * @static
         * @readonly
         * @type {string} INFOログレベル。
         */
        Object.defineProperty(Logger, "INFO", {
            value: "info",
            writable: false
        });

        /**
         * @static
         * @readonly
         * @type {string} LOGログレベル。
         */
        Object.defineProperty(Logger, "LOG", {
            value: "log",
            writable: false
        });

        /**
         * @static
         * @readonly
         * @type {string} DEBUGログレベル。
         */
        Object.defineProperty(Logger, "DEBUG", {
            value: "debug",
            writable: false
        });

        /**
         * ログレベルの定義。
         * @static
         * @readonly
         * @type {string[]}
         */
        Object.defineProperty(Logger, "LOG_LEVELS", {
            value: Object.freeze([
                Logger.ERROR, Logger.WARN, Logger.INFO, Logger.LOG, Logger.DEBUG
            ]),
            writable: false
        });

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
                        messages.unshift(`${prefix}:`);
                    }

                    // Chromiumにてconsole.debugは期待する出力を行わないのでconsole.infoで代替する
                    const method = type === _this.DEBUG ? this.INFO : type;
                    console[method](...messages);
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
    var Version = (function() {
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
         * @static
         * @param {string} versionStr バージョン文字列。
         * @return {Version} バージョンインスタンス。
         */
        Version.fromString = function(versionStr) {
            let version = null;
            try {
                const versionStrList = versionStr.split(Version.SEPARATOR).map((s) => { return parseInt(s, 10); });
                if (versionStrList.length !== 3) {
                    throw new TypeError(`Version string invalid format`);
                }
                version = new this(...versionStrList);
            } catch (e) {
                _logger(Logger.ERROR, `fromString: Version string parse error. (versionStr = ${versionStr})`);
                _logger(Logger.ERROR, e);
                throw new UTA_CommonSaveError(`Parse error: Version string parse error`);
            }

            return version;
        };

        /**
         * バージョン値連想配列からバージョンインスタンスを得る。
         * @static
         * @param {Object.<string, number>} versionDict バージョン値連想配列。
         * @return {Version} Versionインスタンス。
         */
        Version.fromDict = function(versionDict) {
            const major = versionDict["major"];
            const minor = versionDict["minor"];

            // v0.9.1以下のバージョンの場合は構造が異なる
            const patchKey = Object.keys(versionDict).indexOf("release") >= 0 ? "release" : "patch";
            const patch = versionDict[patchKey];

            return new this(major, minor, patch);
        };

        return Version;
    })();

    /**
     * @class CommonSavePluginParameter
     * @classdesc UTA_CommonSaveMZプラグインのプラグインパラメータを扱うクラス。
     */
    var CommonSavePluginParameter = (function() {
        const _logger = Logger.getLogger("CommonSavePluginParameter");

        /**
         * @constructor
         * @param {Object.<string, string> | null} parameters プラグインパラメータデータ。
         */
        function CommonSavePluginParameter(parameters = null) {
            /**
             * 共有対象のスイッチ番号。
             * @type {number[]}
             */
            this.targetSwitches = [];

            /**
             * 共有対象の変数番号。
             * @type {number[]}
             */
            this.targetVariables = [];

            /**
             * ロード時に共有セーブを自動適用するか。
             * @type {boolean}
             */
            this.isApplyOnLoad = true;

            /**
             * セーブ時に共有セーブの自動保存を行うか。
             * @type {boolean}
             */
            this.isApplyOnSave = true;

            /**
             * ニューゲーム時に共有セーブの自動適用を行うか。
             * @type {boolean}
             */
            this.isApplyOnNewGame = true;

            /**
             * オートセーブ時の共有セーブの自動保存を行うか。
             * @type {boolean}
             */
            this.isApplyOnAutoSave = false;

            /**
             * ゲームオーバー時に共有セーブの自動保存を行うか。
             * @type {boolean}
             */
            this.isApplyOnGameover = true;

            /**
             * 共有セーブデータファイル名。  
             * 拡張子は自動設定される為含めない。
             * @type {string}
             */
            this.saveFileName = "";

            /**
             * ログレベル。
             * @type {string}
             */
            this.logLevel = Logger.INFO;

            // プラグインパラメータのparse
            if (parameters) {
                this.parse(parameters);
            }
        }

        /**
         * 共有セーブデータファイルのデフォルト名。  
         * Web版の場合はLocalStorageキーのデフォルト名。
         * @static
         * @readonly
         * @type {string}
         */
        Object.defineProperty(CommonSavePluginParameter, "SAVE_DEFAULT_NAME", {
            value: "uta_common",
            writable: false
        });

        /**
         * プラグインパラメータを期待する型のデータにparseしてインスタンス変数に保存する。
         * @param {Object.<string, string>} parameters プラグインパラメータデータ。
         */
        CommonSavePluginParameter.prototype.parse = function(parameters) {
            /**
             * targetSwitches: string[] -> number[]
             */
            if (Object.prototype.hasOwnProperty.call(parameters, "targetSwitches")) {
                this.targetSwitches = this._parseTargetSwitchesNumber(parameters.targetSwitches);
            }

            /**
             * targetVariables: string[] -> number[]
             */
            if (Object.prototype.hasOwnProperty.call(parameters, "targetVariables")) {
                this.targetVariables = this._parseTargetVariabllesNumber(parameters.targetVariables);
            }

            /**
             * applyOnLoad: string -> bool
             */
            if (Object.prototype.hasOwnProperty.call(parameters, "applyOnLoad")) {
                this.isApplyOnLoad = this._parseBoolean(parameters.applyOnLoad);
            }

            /**
             * applyOnSave: string -> bool
             */
            if (Object.prototype.hasOwnProperty.call(parameters, "applyOnSave")) {
                this.isApplyOnSave = this._parseBoolean(parameters.applyOnSave);
            }

            /**
             * applyOnNewGame: string -> bool
             */
            if (Object.prototype.hasOwnProperty.call(parameters, "applyOnNewGame")) {
                this.isApplyOnNewGame = this._parseBoolean(parameters.applyOnNewGame);
            }

            /**
             * applyOnNewGame: string -> bool
             */
            if (Object.prototype.hasOwnProperty.call(parameters, "applyOnAutoSave")) {
                this.isApplyOnAutoSave = this._parseBoolean(parameters.applyOnAutoSave);
            }

            /**
             * applyOnGameover: string -> bool
             */
            if (Object.prototype.hasOwnProperty.call(parameters, "applyOnGameover")) {
                this.isApplyOnGameover = this._parseBoolean(parameters.applyOnGameover);
            }

            /**
             * saveFileName: string
             */
            this.saveFileName = CommonSavePluginParameter.SAVE_DEFAULT_NAME;
            if (Object.prototype.hasOwnProperty.call(parameters, "saveFileName")) {
                this.saveFileName = parameters.saveFileName;
            }

            /**
             * logLevel: string
             */
            if (Object.prototype.hasOwnProperty.call(parameters, "logLevel")) {
                this.logLevel = parameters.logLevel;
            }
        };

        /**
         * プラグインパラメータで指定された対象番号リスト文字列から、共有対象スイッチ番号の数値リストを得る。
         * @param {string} targetSwitches 読み込み対象のスイッチ番号リスト文字列。文字列である事に注意。
         *                                プラグインパラメータで指定したスイッチ番号の配列をjson文字列化したもの。
         * @return {number[]} 共有対象スイッチ番号の数値リスト。
         * @throws {UTA_CommonSavePluginParameterError} parse失敗もしくは不正な範囲が指定された時に送出する。
         */
        CommonSavePluginParameter.prototype._parseTargetSwitchesNumber = function(targetSwitches) {
            let targetSwitchesNumberList = [];
            try {
                targetSwitchesNumberList = this._getTargetNumberList(targetSwitches);
            } catch (e) {
                const errMessage = Object.prototype.hasOwnProperty.call(e, "message") ? e.message : "";
                _logger(Logger.ERROR, `_parseTargetSwitchesNumber: Failed to parse target swiches number.`);
                _logger(Logger.ERROR, `Error message: \n${errMessage}`);
                throw new UTA_CommonSavePluginParameterError(`Parsing target switches number failed (${errMessage})`);
            }

            // 範囲外のスイッチが指定された場合はエラーとする
            let outOfRangeSwitches = [];
            for (const num of targetSwitchesNumberList) {
                if (num < 1 || num > $dataSystem.switches.length - 1) {
                    outOfRangeSwitches.push(num);
                }
            }
            if (outOfRangeSwitches.length > 0) {
                const outOfRangeSwitchesStr = JSON.stringify(outOfRangeSwitches);
                throw new UTA_CommonSavePluginParameterError(`Target switches specified out of range (${outOfRangeSwitchesStr})`);
            }

            return targetSwitchesNumberList;
        };

        /**
         * プラグインパラメータで指定された対象番号リスト文字列から、共有対象変数番号の数値リストを得る。
         * @param {string} targetVariables 読み込み対象の変数番号リスト文字列。文字列である事に注意。
         *                                 プラグインパラメータで指定した変数番号の配列をjson文字列化したもの。
         * @return {number[]} 共有対象変数番号の数値リスト。
         * @throws {UTA_CommonSavePluginParameterError} parse失敗もしくは不正な範囲が指定された時に送出する。
         */
        CommonSavePluginParameter.prototype._parseTargetVariabllesNumber = function(targetVariables) {
            let targetVariablesNumberList = [];
            try {
                targetVariablesNumberList = this._getTargetNumberList(targetVariables);
            } catch (e) {
                const errMessage = Object.prototype.hasOwnProperty.call(e, "message") ? e.message : "";
                _logger(Logger.ERROR, `_parseTargetVariabllesNumber: Failed to parse target variables number.`);
                _logger(Logger.ERROR, `Error message: \n${errMessage}`);
                throw new UTA_CommonSavePluginParameterError(`Parsing target variables number failed (${errMessage})`);
            }

            // 範囲外の変数が指定された場合はエラーとする
            let outOfRangeVariables = [];
            for (const num of outOfRangeVariables) {
                if (num < 1 || num > $dataSystem.variables.length - 1) {
                    outOfRangeVariables.push(num);
                }
            }
            if (outOfRangeVariables.length > 0) {
                const outOfRangeVariablesStr = JSON.stringify(outOfRangeVariables);
                throw new UTA_CommonSavePluginParameterError(`Target variables specified out of range (${outOfRangeVariablesStr})`);
            }

            return targetVariablesNumberList;
        };

        /**
         * 対象番号配列json文字列から対象番号の数値配列を取得する。  
         * 重複する番号が含まれていた場合はuniqueな状態にして返す。
         * 
         * 対象番号は数値配列文字列になっている為、parseの必要がある。  
         * 個別の番号指定だけでなく、範囲指定の場合がある。
         * @param {string} targetListStr parse対象の対象番号配列json文字列。
         * @return {number[]} 対象番号配列。
         */
        CommonSavePluginParameter.prototype._getTargetNumberList = function(targetListStr) {
            let ret = [];
            let targetList = null;

            try {
                targetList = JSON.parse(targetListStr);
            } catch (e) {
                const errMessage = Object.prototype.hasOwnProperty.call(e, "message") ? e.message : "";
                _logger(Logger.ERROR, `_getTargetNumberList: Failed to parse target number json string. (${targetListStr})`);
                _logger(Logger.ERROR, `Error message: \n${errMessage}`);
                throw new UTA_CommonSavePluginParameterError(`Parse error: json parse error`);
            }

            // 対象番号文字リストをparseしてnumberの配列にする
            for (let i = 0; i < targetList.length; i++) {
                const targetStr = targetList[i];
                const parsedNumbers = this._parseTargetNumber(targetStr);
                Array.prototype.push.apply(ret, parsedNumbers);
            }

            // unique
            ret = ret.filter((x, i, self) => {
                return self.indexOf(x) === i;
            });

            return ret;
        };

        /**
         * 引数で渡した数字文字列をparseして対象番号の数値リストを得る。  
         * 「-」を利用して範囲指定された番号の解釈も行う。
         * @param {string} targetStr parse対象の数字文字列。
         * @return {number[]} 文字列から得た対象番号のリスト。
         * @throws {UTA_CommonSavePluginParameterError} 文法ミスなどを起因とするparse失敗時に送出する。
         */
        CommonSavePluginParameter.prototype._parseTargetNumber = function(targetStr) {
            const ret = [];
            const singlePattern = /^[0-9]+$/;
            const regionPattern = /^[0-9]+-[0-9]+/;

            try {
                targetStr = targetStr.trim();
                if (!targetStr) {
                    // empty
                    // 指定無しの場合もあるので許容する
                    _logger(Logger.INFO, `_parseTargetNumber: Skip parsing because empty string.`);
                } else if (targetStr.match(singlePattern)) {
                    // single number (ex. 10)
                    const num = parseInt(targetStr, 10);

                    // NaNチェック
                    if (num !== num) {
                        throw new UTA_CommonSavePluginParameterError(`Parse error: Invalid target number (${targetStr})`);
                    }
                    ret.push(num);
                } else if (targetStr.match(regionPattern)) {
                    // region number (ex. 10-15)
                    const numStrs = targetStr.split("-");
                    const sNum = parseInt(numStrs[0], 10);
                    const eNum = parseInt(numStrs[1], 10);

                    // NaNチェック
                    if (sNum !== sNum || eNum !== eNum) {
                        throw new UTA_CommonSavePluginParameterError(`Parse error: Invalid target number (${targetStr})`);
                    }
                    // 範囲指定がおかしい場合
                    if (sNum > eNum) {
                        throw new UTA_CommonSavePluginParameterError(`Parse error: Invalid range specified (${targetStr})`);
                    }

                    for (let num = sNum; num <= eNum; num++) {
                        ret.push(num);
                    }
                } else {
                    throw new UTA_CommonSavePluginParameterError(`Parse error: Invalid format (${targetStr})`);
                }
            } catch (e) {
                const errMessage = Object.prototype.hasOwnProperty.call(e, "message") ? e.message : "";
                _logger(Logger.ERROR, `_parseTargetNumber: Failed to parse target number. (${targetStr})`);
                _logger(Logger.ERROR, `Error message: \n${errMessage}`);
                throw e;
            }

            return ret;
        };

        /**
         * 引数に渡した文字列をparseしてboolean値を得る。
         * @param {string} targetStr parse対象の文字列。
         * @return {boolean} 文字列から得られたboolean値。
         * @throws {UTA_CommonSavePluginParameterError} 文法ミスを起因とするparse失敗時に送出する。
         */
        CommonSavePluginParameter.prototype._parseBoolean = function(targetStr) {
            let ret = false;
            switch (targetStr.toLowerCase()) {
                case "true":
                    ret = true;
                    break;
                case "false":
                    ret = false;
                    break;
                default:
                    _logger(Logger.ERROR, `_parseBoolean: Failed to parse target boolean string. (${targetStr})`);
                    throw new UTA_CommonSavePluginParameterError(`Parse error: Invalid format (${targetStr})`);
            }
            return ret;
        };

        return CommonSavePluginParameter;
    })();

    /**
     * @class CommonSaveData
     * @classdesc 共有セーブデータを扱うクラス。
     */
    var CommonSaveData = (function() {
        const _logger = Logger.getLogger("CommonSaveData");

        /**
         * @constructor
         * @param {Version} version バージョン。
         * @param {Object.<number, number>} gameSwitches 共有対象スイッチ情報の連想配列。
         * @param {Object.<number, number>} gameVariables 共有対象変数情報の連想配列。
         */
        function CommonSaveData(version, gameSwitches = {}, gameVariables = {}) {
            /**
             * @type {Version} バージョン。
             */
            this.version = version;
            /**
             * @type {Object.<number, number>} 共有対象スイッチ情報。
             */
            this.gameSwitches = Object.assign({}, gameSwitches);
            /**
             * @type {Object.<number, number>} 共有対象変数情報。
             */
            this.gameVariables = Object.assign({}, gameVariables);
        }

        /**
         * セーブデータ格納用の連想配列を作成する。
         * @return {Object<string, any>}
         */
        CommonSaveData.prototype.makeSaveContents = function() {
            const contents = {
                version: this.version.getVersionDict(),
                gameSwitches: this.gameSwitches,
                gameVariables: this.gameVariables
            };
            return contents;
        };

        /**
         * 共有セーブデータ連想配列からCommonSaveDataインスタンスを作成する。
         * @static
         * @param {Object} contents 共有セーブデータ連想配列。
         * @return {CommonSaveData} 共有セーブデータインスタンス。
         */
        CommonSaveData.fromSaveContents = function(contents) {
            // バージョンのβ版データ構造の違いはVersion.fromDict側で吸収される
            const version = Version.fromDict(contents.version);
            return new this(version, contents.gameSwitches, contents.gameVariables);
        };

        /**
         * 現在のゲームデータの状態から共有セーブデータを作成する。
         * @static
         * @param {number[]} targetSwitches 共有対象スイッチ番号の配列。
         * @param {number[]} targetVariables 共有対象変数番号の配列。
         * @return {CommonSaveData} 共有セーブデータインスタンス。
         */
        CommonSaveData.fromCurrentGameData = function(targetSwitches, targetVariables) {
            const version = Version.fromString(VERSION);
            const gameSwitches = this.makeGameSwitchesJson(targetSwitches);
            const gameVariables = this.makeGameVariablesJson(targetVariables);
            return new this(version, gameSwitches, gameVariables);
        };

        /**
         * 現在のゲームデータの状態から引数に渡した対象スイッチの共有セーブデータ格納用連想配列を取得する。
         * @static
         * @param {number[]} targetSwitches 共有対象スイッチ番号の配列。
         * @return {Object.<number, boolean>} 共有セーブデータ格納用のスイッチ情報連想配列。
         */
        CommonSaveData.makeGameSwitchesJson = function(targetSwitches) {
            const ret = {};
            for (const idx of targetSwitches) {
                // 範囲外の場合は無視する
                if (idx < 1 || idx > $dataSystem.switches.length - 1) {
                    _logger(Logger.WARN, `makeGameSwitchesJson: Ignore switch target. Invalid switch id. (${idx})`);
                    continue;
                }
                ret[idx] = $gameSwitches.value(idx);
            }
            return ret;
        };

        /**
         * 現在のゲームデータから引数に渡した対象変数の共有セーブデータ格納用連想配列を取得する。
         * @static
         * @param {number[]} targetVariables 共有対象変数番号の配列。
         * @return {Object.<number, number>} 共有セーブデータ格納用の変数情報連想配列。
         */
        CommonSaveData.makeGameVariablesJson = function(targetVariables) {
            const ret = {};
            for (const idx of targetVariables) {
                // 範囲外の場合は無視する
                if (idx < 1 || idx > $dataSystem.switches.length - 1) {
                    _logger(Logger.WARN, `makeGameVariablesJson: Ignore variable target. Invalid variable id. (${idx})`);
                    continue;
                }
                ret[idx] = $gameVariables.value(idx);
            }
            return ret;
        };

        return CommonSaveData;
    })();

    /**
     * @static
     * @class CommonSaveManager
     * @classdesc 共有セーブ関連の処理を扱う静的クラス。
     */
    var CommonSaveManager = (function() {
        const _logger = Logger.getLogger("CommonSaveManager");

        /**
         * @constructor
         */
        function CommonSaveManager() {
            throw new Error(`${this.constructor.name} is static class`);
        }

        /**
         * プラグインパラメータのデータ。
         * @static
         * @type {CommonSavePluginParameter}
         */
        Object.defineProperty(CommonSaveManager, "_parameters", {
            value: new CommonSavePluginParameter()
        });

        /**
         * 共有セーブデータのセーブ中であるか。
         * @static
         * @type {boolean}
         */
        Object.defineProperty(CommonSaveManager, "_isSaving", {
            writable: true,
            value: false
        });

        /**
         * 初期化処理。
         * @static
         */
        CommonSaveManager.initialize = function() {
            // プラグインパラメータを取得
            const parameters = PluginManager.parameters(PLUGIN_NAME);
            this._parameters.parse(parameters);

            // プラグインパラメータで指定したログレベルをセット
            Logger.setLogLevel(this._parameters.logLevel);

            _logger(Logger.DEBUG, "Initialized.");
        };

        /**
         * 共有セーブデータが存在するかを返す。  
         * 同期的に実行される。
         * @static
         * @return {boolean} 共有セーブデータが存在する場合はtrueを返す。
         */
        CommonSaveManager.exists = function() {
            const saveName = this._parameters.saveFileName;
            return StorageManager.exists(saveName);
        };

        /**
         * 共有セーブデータから$gameSwitchesにデータを反映する。
         * @static
         * @param {CommonSaveData} commonSaveData 共有セーブデータ。
         * @throws {UTA_CommonSaveError} 読み込み・適用失敗時に送出される。
         */
        CommonSaveManager._applyToGameSwitches = function(commonSaveData) {
            const savedGameSwitches = commonSaveData.gameSwitches;
            try {
                Object.keys(savedGameSwitches).forEach((key) => {
                    const idx = parseInt(key, 10);
                    if (idx !== idx) {
                        throw new Error(`switch number has been parsed to NaN (${key})`);
                    }

                    // 後から対象を減らした場合に意図しない反映がなされる可能性がある為、
                    // 現在の共有対象のみを反映する
                    if (this._parameters.targetSwitches.indexOf(idx) < 0) {
                        return;
                    }

                    const value = savedGameSwitches[key];
                    $gameSwitches.setValue(idx, value);
                }, this);
            } catch (e) {
                _logger(Logger.ERROR, `Failed to apply game switches from common save data.`);
                _logger(Logger.ERROR, `${e}`);
                throw new UTA_CommonSaveError(`Common save apply error`);
            }
        };

        /**
         * 共有セーブデータから$gameVariablesにデータを反映する。
         * @static
         * @param {CommonSaveData} commonSaveData 共有セーブデータ。
         * @throws {UTA_CommonSaveError} 読み込み・適用失敗時に送出される。
         */
        CommonSaveManager._applyToGameVariables = function(commonSaveData) {
            const savedGameVariables = commonSaveData.gameVariables;
            try {
                Object.keys(savedGameVariables).forEach((key) => {
                    const idx = parseInt(key, 10);
                    if (idx !== idx) {
                        throw new Error(`variable number has been parsed to NaN (${key})`);
                    }

                    // 後から対象を減らした場合に意図しない反映がなされる可能性がある為、
                    // 現在の共有対象のみを反映する
                    if (this._parameters.targetVariables.indexOf(idx) < 0) {
                        return;
                    }

                    const value = savedGameVariables[key];
                    $gameVariables.setValue(idx, value);
                }, this);
            } catch (e) {
                const errMessage = Object.prototype.hasOwnProperty.call(e, "message") ? e.message : "";
                _logger(Logger.ERROR, `Failed to apply game variables from common save data.`);
                _logger(Logger.ERROR, `Error message: \n${errMessage}`);
                throw new UTA_CommonSaveError(`Common save apply error (${errMessage})`);
            }
        };

        /**
         * 共有セーブデータのロード処理のコア部分。  
         * セーブデータバージョンによる差異の吸収などを担う。
         * @static
         * @param {Object} contents 共有セーブデータからロードした連想配列。
         */
        CommonSaveManager._loadCore = function(contents) {
            const commonSaveData = CommonSaveData.fromSaveContents(contents);

            /**
             * 各種データをゲーム状態に反映する
             */
            this._applyToGameSwitches(commonSaveData);
            this._applyToGameVariables(commonSaveData);
        };

        /**
         * 共有セーブデータをロードする。
         * @static
         * @return {Promise<number>} StorageManager.saveObjectから続くロード処理のPromise。
         */
        CommonSaveManager.load = function() {
            const saveName = this._parameters.saveFileName;
            _logger(Logger.DEBUG, `load: target save name = ${saveName}`);

            // セーブデータが存在しない場合は何もしない
            if (!this.exists()) {
                return new Promise((resolve) => {
                    _logger(Logger.INFO, `load: Common save data is not existed. (${saveName})`);
                    resolve(0);
                });
            }

            return StorageManager.loadObject(saveName).then((contents) => {
                this._loadCore(contents);
                _logger(Logger.INFO, `load: Succeeded to load common save data. (${saveName})`);
                return 0;
            }).catch((e) => {
                const errMessage = Object.prototype.hasOwnProperty.call(e, "message") ? e.message : "";
                _logger(Logger.ERROR, `load: Failed to load common save data. (filename=${saveName})`);
                _logger(Logger.ERROR, `Error message: \n${errMessage}`);
                throw e;
            });
        };

        /**
         * 現在のゲームデータから共有セーブデータを作成して保存する。  
         * セーブ時のバックアップはStorageManager.saveObjectメソッドの流れで行われている為、独自に実装しない。
         * @static
         * @return {Promise<number>} StorageManager.saveObjectから続くPromise。
         */
        CommonSaveManager.save = function() {
            const saveName = this._parameters.saveFileName;
            _logger(Logger.DEBUG, `save: target save name = ${saveName}`);

            const targetSwitches = this._parameters.targetSwitches;
            const targetVariables = this._parameters.targetVariables;

            const commonSaveData = CommonSaveData.fromCurrentGameData(targetSwitches, targetVariables);
            const contents = commonSaveData.makeSaveContents();

            this._isSaving = true;
            const _this = this;
            return StorageManager.saveObject(saveName, contents).then(() => {
                _logger(Logger.INFO, `save: Succeeded to save common save data. (filename=${saveName})`);
                _this._isSaving = false;
                return 0;
            }).catch((e) => {
                _this._isSaving = false;
                const errMessage = Object.prototype.hasOwnProperty.call(e, "message") ? e.message : "";
                _logger(Logger.ERROR, `save: Failed to save common save data. (filename=${saveName})`);
                _logger(Logger.ERROR, `Error message: \n${errMessage}`);
                throw e;
            });
        };

        /**
         * 共有セーブデータを削除する。  
         * 同期的に実行される。  
         * 共有セーブデータが存在しない場合は何もしない。
         * @static
         */
        CommonSaveManager.remove = function() {
            if (!this.exists()) {
                _logger(Logger.INFO, `remove: Common save data is not existed.`);
                return;
            }

            const saveName = this._parameters.saveFileName;
            _logger(Logger.DEBUG, `remove: target save name = ${saveName}`);

            StorageManager.remove(saveName);

            _logger(Logger.INFO, `remove: Succeeded to remove common save data. (filename=${saveName})`);
        };

        /**
         * 現在共有対象としているスイッチ/変数番号をコンソールに表示する。  
         * デバッグ用機能の為、ログレベルがDEBUGの時のみ表示される。
         * @static
         */
        CommonSaveManager.check = function() {
            const targetSwitchesStr = this._parameters.targetSwitches.join(",");
            const targetVariablesStr = this._parameters.targetVariables.join(",");
            _logger(Logger.DEBUG, `Common save target switches number: \n${targetSwitchesStr}`);
            _logger(Logger.DEBUG, `Common save target variables number: \n${targetVariablesStr}`);
        };

        /**
         * プラグインコマンドの実行。
         * @static
         * @param {string} command プラグインコマンド名。
         * @throws {UTA_CommonSaveError} 無効なプラグインコマンドが指定された場合に送出。
         */
        CommonSaveManager.dispatchPluginCommand = function(command) {
            _logger(Logger.DEBUG, `dispatchPluginCommand: Call plugin command "${command}".`);

            switch (command) {
                case "load":
                    this.load();
                    break;
                case "save":
                    this.save();
                    break;
                case "remove":
                    this.remove();
                    break;
                case "check":
                    this.check();
                    break;
                default:
                    throw new UTA_CommonSaveError(`Invalid plugin command (${command})`);
            }
        };

        /**
         * ニューゲーム直後の状態であるかを判定する。
         * 
         * 一度タイトル画面に戻ってからニューゲームを選んだ場合に、何故かオートセーブ処理が実行されてしまい、  
         * 共有セーブが初期状態で上書きされてしまう問題の対処法として利用。  
         * 
         * この問題はオートセーブ時の共有セーブが有効な場合に問題になる。  
         * 「コンティニュー」でも同様の事象が発生する場合があるが、データロード後である為に上記の問題が発生する事は無い。
         * 
         * 対症療法である為、この処理はコアスクリプトの改修に合わせて修正の方針とする。
         * 
         * - コアスクリプトバージョン v1.5.0
         *     - 公式サポート問い合わせの結果「現状仕様」との事。
         * 
         * @return {boolean} ニューゲーム時即セーブと判断した場合はtrueを返す。
         */
        CommonSaveManager.isOnNewGame = function() {
            // 「ニューゲーム」の場合はセーブカウントが必ず0から始まる
            // 事象発生時に開始直後に任意でセーブを行った場合は1以上になるはず
            // 事象発生しない場合はこの条件をすり抜ける可能性があるが、後続の条件分岐で判定可能
            if ($gameSystem.saveCount() > 0) {
                return false;
            }
            // 「ニューゲーム」の場合は必ず初期設定座標にプレイヤーが配置されるはず
            if ($gameMap.mapId() !== $dataSystem.startMapId || $gamePlayer.x !== $dataSystem.startX || $gamePlayer.y !== $dataSystem.startY || $gamePlayer.direction() !== 2) {
                return false;
            }
            // 「ニューゲーム」タイミングでは歩数カウントが0であるはず
            if ($gameParty.steps() > 0) {
                return false;
            }
            // 全ての条件を満たす場合は「ニューゲーム直後の状態」と見なす
            return true;
        };

        /**
         * 共有セーブデータのセーブ中であるか。
         * @static
         * @return {boolean} 共有セーブデータのセーブ中である場合はtrueを返す。
         */
        CommonSaveManager.isSaving = function() {
            return this._isSaving;
        };

        /**
         * セーブデータのロード時に共有セーブデータをロードするか。  
         * プラグインパラメータで設定した状態を返す。
         * @static
         * @return {boolean} 設定を有効にしている場合はtrueを返す。
         */
        CommonSaveManager.isApplyOnLoad = function() {
            return this._parameters.isApplyOnLoad;
        };

        /**
         * セーブデータのセーブ時に共有セーブデータをロードするか。  
         * プラグインパラメータで設定した状態を返す。
         * @static
         * @return {boolean} 設定を有効にしている場合はtrueを返す。
         */
        CommonSaveManager.isApplyOnSave = function() {
            return this._parameters.isApplyOnSave;
        };

        /**
         * オートセーブ時に共有セーブデータをセーブするか。  
         * プラグインパラメータで設定した状態を返す。
         * @static
         * @return {boolean} 設定を有効にしている場合はtrueを返す。
         */
        CommonSaveManager.isApplyOnAutoSave = function() {
            return this._parameters.isApplyOnAutoSave;
        };

        /**
         * ニューゲーム時に共有セーブデータをロードするか。  
         * プラグインパラメータで設定した状態を返す。
         * @static
         * @return {boolean} 設定を有効にしている場合はtrueを返す。
         */
        CommonSaveManager.isApplyOnNewGame = function() {
            return this._parameters.isApplyOnNewGame;
        };

        /**
         * ゲームオーバー時に共有セーブデータをセーブするか。  
         * プラグインパラメータで設定した状態を返す。
         * @static
         * @return {boolean} 設定を有効にしている場合はtrueを返す。
         */
        CommonSaveManager.isApplyOnGameover = function() {
            return this._parameters.isApplyOnGameover;
        };

        return CommonSaveManager;
    })();

    /**
     * プラグインコマンドを登録し、プラグインマネージャーから呼び出せるようにする。
     * @function registerPluginCommands
     */
    function registerPluginCommands() {
        /**
         * UTA_CommonSaveMZ load
         */
        PluginManager.registerCommand(PLUGIN_NAME, "load", () => {
            CommonSaveManager.dispatchPluginCommand("load");
        });

        /**
         * UTA_CommonSaveMZ save
         */
        PluginManager.registerCommand(PLUGIN_NAME, "save", () => {
            CommonSaveManager.dispatchPluginCommand("save");
        });

        /**
         * UTA_CommonSaveMZ remove
         */
        PluginManager.registerCommand(PLUGIN_NAME, "remove", () => {
            CommonSaveManager.dispatchPluginCommand("remove");
        });

        /**
         * UTA_CommonSaveMZ check
         */
        PluginManager.registerCommand(PLUGIN_NAME, "check", () => {
            CommonSaveManager.dispatchPluginCommand("check");
        });
    }

    // プラグインコマンド登録の実行
    registerPluginCommands();

    // 名前空間越しにアクセス可能なプロパティの定義
    const exports = {
        VERSION: VERSION,
        CommonSaveManager: CommonSaveManager,
        UTA_CommonSaveError: UTA_CommonSaveError,
        UTA_CommonSavePluginParameterError: UTA_CommonSavePluginParameterError
    };

    return exports;
})();

// ----------------------------------------------------------------------
// コアスクリプト各種メソッドの拡張
// ----------------------------------------------------------------------
(function() {
    // alias
    const CommonSaveManager = utakata.UTA_CommonSaveMZ.CommonSaveManager;

    // ------------------------------------------------------------------
    // DataManager
    // ------------------------------------------------------------------
    /**
     * DataManager.saveGame
     * 
     * セーブ処理に共有セーブデータセーブ処理をフック。  
     * セーブ処理のPromiseチェーンにつなげる事で実現する。
     */
    const DataManager__saveGame = DataManager.saveGame;
    DataManager.saveGame = function(savefileId) {
        return DataManager__saveGame.call(this, savefileId).then((ret) => {
            // セーブが成功した場合は常に0が返される
            // セーブ失敗時は共有セーブを行わない
            if (ret !== 0) {
                return ret;
            }

            // オートセーブの場合はsavefileId = 0
            if (savefileId === 0) {
                /**
                 * 一度タイトル画面に戻ってから「ニューゲーム/コンティニュー」を選んだ場合に何故かオートセーブ処理が実行されてしまう。  
                 * 「ニューゲーム」の場合、共有セーブが初期状態で上書きされてしまう問題がある。  
                 * この事象を回避する為に明らかにゲームスタート直後の場合は共有セーブしないようにする。
                 */
                if (CommonSaveManager.isApplyOnAutoSave() && !CommonSaveManager.checkNewGame()) {
                    // 共有セーブデータのセーブ処理(Promiseを返却)
                    return CommonSaveManager.save();
                }

                return ret;
            }

            // 通常セーブの場合
            if (CommonSaveManager.isApplyOnSave()) {
                // 共有セーブデータのセーブ処理(Promiseを返却)
                return CommonSaveManager.save();
            }

            return ret;
        });
    };

    /**
     * DataManager.loadGame
     * 
     * ロード処理に共有セーブデータロード処理をフック。  
     * ロード処理のPromiseチェーンにつなげる事で実現する。  
     * (ロード後に各種ゲームデータが復元された後に実施する)
     */
    const DataManager__loadGame = DataManager.loadGame;
    DataManager.loadGame = function(savefileId) {
        return DataManager__loadGame.call(this, savefileId).then((ret) => {
            // ロードが成功した場合は常に0が返される
            // ロード失敗時は共有セーブを行わない
            if (ret !== 0) {
                return ret;
            }

            if (CommonSaveManager.isApplyOnLoad()) {
                // 共有セーブデータのロード処理(Promiseを返却)
                return CommonSaveManager.load();
            }

            return ret;
        });
    };

    // ------------------------------------------------------------------
    // Scene_Boot
    // ------------------------------------------------------------------
    /**
     * Scene_Boot.prototype.onDatabaseLoaded
     * 
     * ゲームの初期化タイミングでデータベース読み込みに合わせて初期化を行う。
     */
    const Scene_Boot__prototype__onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        const ret = Scene_Boot__prototype__onDatabaseLoaded.call(this);

        CommonSaveManager.initialize();

        return ret;
    };

    /**
     * Scene_Boot.prototype.start
     * 
     * 「タイトル画面をスキップ」を有効にしてテストプレイした場合にもニューゲーム時の共有セーブデータ適用を行う。  
     * ロード処理は非同期に行われる為、適用までに若干のタイムラグが発生する可能性がある。
     */
    const Scene_Boot__prototype__start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        const ret = Scene_Boot__prototype__start.call(this);

        if (DataManager.isTitleSkip() && CommonSaveManager.isApplyOnNewGame()) {
            void CommonSaveManager.load();
        }

        return ret;
    };

    // ------------------------------------------------------------------
    // Scene_Title
    // ------------------------------------------------------------------
    /**
     * Scene_Title.prototype.commandNewGame
     * 
     * ニューゲーム時に共有セーブデータのセーブ処理をフック。  
     * ゲームデータの初期化後にロードする必要がある。  
     * ロード処理は非同期に行われる為、適用までに若干のタイムラグが発生する可能性がある。
     */
    const Scene_Title__prototype__commandNewGame = Scene_Title.prototype.commandNewGame;
    Scene_Title.prototype.commandNewGame = function() {
        const ret = Scene_Title__prototype__commandNewGame.call(this);

        if (CommonSaveManager.isApplyOnNewGame()) {
            void CommonSaveManager.load();
        }

        return ret;
    };

    // ------------------------------------------------------------------
    // Scene_Gameover
    // ------------------------------------------------------------------
    /**
     * Scene_Gameover.prototype.start
     * 
     * ゲームオーバー時に共有セーブデータのセーブ処理をフック。  
     * ゲームオーバー処理が実行されるとタイトル画面に戻ってしまい、
     * プレイデータが揮発するのでゲームオーバー処理の前に共有セーブデータを保存する。
     */
    const Scene_Gameover__prototype__start = Scene_Gameover.prototype.start;
    Scene_Gameover.prototype.start = function() {
        const ret = Scene_Gameover__prototype__start.call(this);

        if (CommonSaveManager.isApplyOnGameover()) {
            void CommonSaveManager.save();
        }

        return ret;
    };

    /**
     * Scene_Gameover.prototype.gotoTitle
     * 
     * ゲームオーバー時の自動適用有効時は共有セーブ完了までタイトル画面に遷移させない。  
     * プレイデータが揮発するので別シーンへの遷移前に共有セーブデータを保存させる。
     */
    const Scene_Gameover__prototype__gotoTitle = Scene_Gameover.prototype.gotoTitle;
    Scene_Gameover.prototype.gotoTitle = function() {
        if (CommonSaveManager.isApplyOnGameover() && CommonSaveManager.isSaving()) {
            return;
        }

        return Scene_Gameover__prototype__gotoTitle.call(this);
    };

})();
