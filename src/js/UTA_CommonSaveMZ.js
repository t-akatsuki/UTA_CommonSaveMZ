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
    class UTA_CommonSaveError extends Error {
        constructor(...args) {
            super(...args);
        }
    }

    /**
     * @extends UTA_CommonSaveError
     * @class UTA_CommonSavePluginParameterError
     * @classdesc UTA_CommonSaveプラグインパラメータ関連エラークラス。
     */
    class UTA_CommonSavePluginParameterError extends UTA_CommonSaveError {
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
         * @static
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
    const CommonSavePluginParameter = (function() {
        const _logger = Logger.getLogger("CommonSavePluginParameter");

        /**
         * @constructor
         * @param {Object.<string, string>} parameters プラグインパラメータデータ。
         */
        function CommonSavePluginParameter(parameters) {
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
            this._parse(parameters);
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
         * @private
         * @param {Object.<string, string>} parameters プラグインパラメータデータ。
         */
        CommonSavePluginParameter.prototype._parse = function(parameters) {
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
         * @private
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
                throw new UTA_CommonSavePluginParameterError(`Target switches specified out of range. (${outOfRangeSwitchesStr})`);
            }

            return targetSwitchesNumberList;
        };

        /**
         * プラグインパラメータで指定された対象番号リスト文字列から、共有対象変数番号の数値リストを得る。
         * @private
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
                throw new UTA_CommonSavePluginParameterError(`Target variables specified out of range. (${outOfRangeVariablesStr})`);
            }

            return targetVariablesNumberList;
        };

        /**
         * 対象番号配列json文字列から対象番号の数値配列を取得する。  
         * 重複する番号が含まれていた場合はuniqueな状態にして返す。
         * 
         * 対象番号は数値配列文字列になっている為、parseの必要がある。  
         * 個別の番号指定だけでなく、範囲指定の場合がある。
         * @private
         * @param {string} targetListStr parse対象の対象番号配列json文字列。
         * @return {number[]} 対象番号配列。
         */
        CommonSavePluginParameter.prototype._getTargetNumberList = function(targetListStr) {
            let ret = [];
            let targetList = null;

            try {
                targetList = JSON.parse(targetListStr);
            } catch (e) {
                _logger(Logger.ERROR, `_getTargetNumberList: Failed to parse target number json string. (${targetListStr})`);
                _logger(Logger.ERROR, e);
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
         * @private
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
                _logger(Logger.ERROR, `_parseTargetNumber: Failed to parse target number. (${targetStr})`);
                _logger(Logger.ERROR, e);
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
     * @static
     * @class CommonSaveManager
     * @classdesc 共有セーブ関連の処理を扱う静的クラス。
     */
    const CommonSaveManager = (function() {
        const _logger = Logger.getLogger("CommonSaveManager");

        /**
         * @constructor
         */
        function CommonSaveManager() {
            throw new Error(`${this.constructor.name} is static class.`);
        }

        /**
         * プラグインパラメータのデータ。
         * @type {CommonSavePluginParameter | null}
         */
        CommonSaveManager._parameters = null;

        /**
         * 初期化処理。
         * @static
         */
        CommonSaveManager.initialize = function() {
            // プラグインパラメータを取得
            const parameters = PluginManager.parameters(PLUGIN_NAME);
            this._parameters = new CommonSavePluginParameter(parameters);

            _logger(Logger.DEBUG, "Initialized.");
        };

        return CommonSaveManager;
    })();

    // 名前空間越しにアクセス可能なプロパティの定義
    const exports = {
        VERSION: VERSION,
        CommonSaveManager: CommonSaveManager,
        UTA_CommonSaveError: UTA_CommonSaveError
    };

    return exports;
})();

// ------------------------------------------------------------------
// コアスクリプト各種メソッドの拡張
// ------------------------------------------------------------------
(function() {
    /**
     * Scene_Boot
     */
    // ゲームの初期化タイミングでデータベース読み込みに合わせて初期化を行う
    const Scene_Boot__prototype__onDatabaseLoaded = Scene_Boot.prototype.onDatabaseLoaded;
    Scene_Boot.prototype.onDatabaseLoaded = function() {
        Scene_Boot__prototype__onDatabaseLoaded.call(this);

        utakata.UTA_CommonSaveMZ.CommonSaveManager.initialize();
    };
})();
