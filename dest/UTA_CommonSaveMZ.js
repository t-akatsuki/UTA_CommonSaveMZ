//=============================================================================
// UTA_CommonSaveMZ.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc Share state of game switches and variables between each save data.
 *
 * @author t-akatsuki
 * @url https://www.utakata-no-yume.net
 *
 * @param targetSwitches
 * @text Share target switches
 * @desc Set target switches number you want make shared.
 * Using "-", the range can be specified.
 * @default []
 * @type string[]
 *
 * @param targetVariables
 * @text Share target variables
 * @desc Set target variables number you want make shared.
 * Using "-", the range can be specified.
 * @default []
 * @type string[]
 *
 * @param applyOnLoad
 * @text Apply common save on load game
 * @desc Automatically loading common save on load game timing.
 * ON(true): enabled, OFF(false): disabled
 * @default true
 * @type boolean
 *
 * @param applyOnSave
 * @text Save common save on save game
 * @desc Automatically saving common save on save game timing.
 * ON(true): enabled, OFF(false): disabled
 * @default true
 * @type boolean
 *
 * @param applyOnNewGame
 * @text Apply common save on new game
 * @desc Automatically loading common save on start new game.
 * ON(true): enabled, OFF(false): disabled
 * @default true
 * @type boolean
 *
 * @param applyOnAutoSave
 * @text Save common save on auto-save
 * @desc Automatically saving common save on auto-save timing.
 * ON(true): enabled, OFF(false): disabled
 * @default false
 * @type boolean
 *
 * @param applyOnGameover
 * @text Save common save on gameover
 * @desc Automatically saving common save on gameover timing.
 * ON(true): enabled, OFF(false): disabled
 * @default true
 * @type boolean
 *
 * @param saveFileName
 * @text Save file name
 * @desc Definition of common save file name,
 * which not contained extension.
 * @default uta_common
 * @type string
 *
 * @command load
 * @text Load common save
 * @desc Loading shared target switches/variables from common save.
 * This command used when you want to load common save.
 *
 * @command save
 * @text Save common save
 * @desc Saving shared target switches/variables to common save.
 * This command used when you want to save common save.
 *
 * @command remove
 * @text Remove common save
 * @desc Remove common save data.
 * This command used when you want to reset common save.
 *
 * @command check
 * @text Check shared switches/variables number
 * @desc Output shared target switches/variables numbers to console.
 * This command for test.
 *
 * @help # Overview
 * UTA_CommonSaveMZ plugin creates shared save data and shares the state of
 * the specified switches/variables between game save data.
 * You can have it applied automatically at the time of save/load
 * according to your settings.
 *
 * The "common save data" can be manipulated at any time by
 * using plugin commands.
 *
 * This plugin creates shared save data as "common save data" separately
 * from game save datas.
 * In the local version, "common save data" files are created in
 * the save directory.
 * In web version, the "common save data" is saved in LocalStorage.
 *
 * # Plugin Parameters
 * ## Share target switches
 *    Set target switches number you want make shared.
 *    You can specify multiple settings.
 *    Using "-", the range can be specified.
 *    (ex1) 10
 *      => switch of number (10) will be set shared target.
 *    (ex2) 10-15
 *      => switches of number (10,11,12,13,14,15) will be set shared targets.
 *
 * ## Share target variables
 *    Set target variables number you want make shared.
 *    You can specify multiple settings.
 *    Using "-", the range can be specified.
 *    The rules for specifiying the number is the same as for
 *    "Share target switches".
 *
 * ## Apply common save on load game
 *    Automatically loading common save on load game timing.
 *    ON(true)   : enabled(default)
 *    OFF(false): disabled
 *
 * ## Save common save on save game
 *    Automatically saving common save on save game timing.
 *    ON(true)  : enabled(default)
 *    OFF(false): disabled
 *
 * ## Apply common save on new game
 *    Automatically loading common save on start new game.
 *    ON(true)  : enabled(default)
 *    OFF(false): disabled
 *
 * ## Save common save on auto-save
 *    Automatically saving common save on auto-save timing.
 *    ON(true)  : enabled
 *    OFF(false): disabled(default)
 *
 * ## Save common save on gameover
 *    Automatically saving common save on gameover timing.
 *    ON(true)  : enabled(default)
 *    OFF(false): disabled
 *
 * ## Save file name
 *    Definition of common save file name,
 *    which not contained extension.
 *    Do not use the same name as the existing save data
 *    (file0, global, confid, etc...).
 *    (default: uta_common)
 *
 * # Plugin Commands
 * ## Load common save
 *    Loading shared target switches/variables from common save.
 *    This command used when you want to load common save.
 *
 * ## Save common save
 *    Saving shared target switches/variables to common save.
 *    This command used when you want to save common save.
 *
 * ## Remove common save
 *    Remove common save data.
 *    This command used when you want to reset common save.
 *
 * ## Check shared switches/variables number
 *    Output shared target switches/variables numbers to console.
 *    This command for test.
 *
 * # Plugin Informations
 * Version      : 0.9.1
 * Last Updated : 2020/11/11
 * Author       : t-akatsuki
 * Web Site     : https://www.utakata-no-yume.net
 * GitHub       : https://github.com/t-akatsuki
 * Twitter      : https://twitter.com/T_Akatsuki
 * License      : MIT License
 *
 * # Changelog
 * ## 0.9.1 (2020/11/11)
 *   Fixed a bug that it doesn't work when the plugin parameter
 *   "Share target switches" or "Share target variables" is not specified.
 *   Added English annotation and README_EN.txt.
 *
 * ## 0.9.0 (2020/08/22)
 *   Beta version.
 *   Remake for RPG Maker MV based on UTA_CommonSave plugin for RPG Maker MV.
 *   Supports auto-save function.
 */
/*:ja
 * @target MZ
 * @plugindesc セーブデータ間で共有のセーブデータを作成し、
 * 指定したスイッチ・変数の状態をセーブデータ間で共有します。
 *
 * @author 赤月 智平(t-akatsuki)
 * @url https://www.utakata-no-yume.net
 *
 * @param targetSwitches
 * @text 共有対象スイッチ番号
 * @desc セーブデータ間で共有するスイッチ番号の定義です。
 * 「-」で範囲指定が可能です。
 * @default []
 * @type string[]
 *
 * @param targetVariables
 * @text 共有対象変数番号
 * @desc セーブデータ間で共有する変数番号の定義です。
 * 「-」で範囲指定が可能です。
 * @default []
 * @type string[]
 *
 * @param applyOnLoad
 * @text ロード時の共有セーブ自動適用
 * @desc ロード時に共有セーブデータの自動適用を行うか。
 * ON(true): 自動適用する, OFF(false): 自動適用しない
 * @default true
 * @type boolean
 *
 * @param applyOnSave
 * @text セーブ時の共有セーブ自動保存
 * @desc セーブ時に共有セーブデータの自動保存を行うか。
 * ON(true): 自動保存する, OFF(false): 自動保存しない
 * @default true
 * @type boolean
 *
 * @param applyOnNewGame
 * @text ニューゲーム時の共有セーブ自動適用
 * @desc ニューゲーム時に共有セーブの自動適用を行うか。
 * ON(true): 自動適用する, OFF(false): 自動適用しない
 * @default true
 * @type boolean
 *
 * @param applyOnAutoSave
 * @text オートセーブ時の共有セーブ自動保存
 * @desc オートセーブ時に共有セーブの自動保存を行うか。
 * ON(true): 自動保存する, OFF(false): 自動保存しない
 * @default false
 * @type boolean
 *
 * @param applyOnGameover
 * @text ゲームオーバー時の共有セーブ自動保存
 * @desc ゲームオーバー時に共有セーブデータの自動保存を行うか。
 * ON(true): 自動保存する, OFF(false): 自動保存しない
 * @default true
 * @type boolean
 *
 * @param saveFileName
 * @text 共有セーブデータファイル名
 * @desc 共有セーブデータファイル名の定義です。
 * 拡張子は自動設定される為含めません。
 * @default uta_common
 * @type string
 *
 * @command load
 * @text 共有セーブデータのロード
 * @desc 共有セーブデータからスイッチ・変数を読み込み反映させます。
 * 任意のタイミングで共有セーブデータをロードする際に使用します。
 *
 * @command save
 * @text 共有セーブデータのセーブ
 * @desc 共有セーブデータに対象のスイッチ・変数の状態を記録します。
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
 * 指定したスイッチ・変数の状態をセーブデータ間で共有するプラグインです。
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
 *    セーブデータ間で共有するスイッチ番号の定義です。
 *    複数設定する事ができます。
 *    「-」で範囲指定が可能です。
 *    (例1) 10
 *      => 10番のスイッチが対象になります。
 *    (例2) 10-15
 *      => 10,11,12,13,14,15番のスイッチが対象になります。
 *
 * ## 共有対象変数番号
 *    セーブデータ間で共有する変数番号の定義です。
 *    複数設定する事ができます。
 *    「-」で範囲指定が可能です。
 *    番号の指定方法及び規則は「共有対象スイッチ番号」と同様です。
 *
 * ## ロード時の共有セーブ自動適用
 *    ロード時に共有セーブデータの自動適用を行うか。
 *    ON(true)  : 自動適用する。(デフォルト値)
 *    OFF(false): 自動適用しない。
 *
 * ## セーブ時の共有セーブ自動保存
 *    セーブ時に共有セーブデータの自動保存を行うか。
 *    この設定はオートセーブには適用されません。
 *    ON(true)  : 自動保存する。(デフォルト値)
 *    OFF(false): 自動保存しない。
 *
 * ## ニューゲーム時の共有セーブ自動適用
 *    ニューゲーム時に共有セーブの自動適用を行うか。
 *    ON(true)  : 自動適用する。(デフォルト値)
 *    OFF(false): 自動適用しない。
 *
 * ## オートセーブ時の共有セーブ自動保存
 *    オートセーブ時に共有セーブの自動保存を行うか。
 *    ON(true)  : 自動保存する。
 *    OFF(false): 自動保存しない。(デフォルト値)
 *
 * ## ゲームオーバー時の共有セーブ自動保存
 *    ゲームオーバー時に共有セーブデータの自動保存を行うか。
 *    ON(true)  : 自動保存する。(デフォルト値)
 *    OFF(false): 自動保存しない。
 *
 * ## 共有セーブデータファイル名
 *    共有セーブデータファイル名の定義です。
 *    拡張子は自動設定される為含めません。
 *    既存セーブデータと重複する名前(file0, global, config等)は
 *    利用しないで下さい。
 *    (デフォルト設定値: uta_common)
 *
 * # プラグインコマンド
 * ## 共有セーブデータのロード
 *    共有セーブデータからスイッチ・変数を読み込み反映させます。
 *    任意のタイミングで共有セーブデータをロードする際に使用します。
 *
 * ## 共有セーブデータのセーブ
 *    共有セーブデータに対象のスイッチ・変数の状態を記録します。
 *    任意のタイミングで共有セーブデータをセーブする際に使用します。
 *
 * ## 共有セーブデータの削除
 *    共有セーブデータファイルを削除します。
 *    共有セーブデータをリセットしたい場合に使用します。
 *
 * ## 共有対象スイッチ/変数の確認
 *    共有対象のスイッチ/変数番号をコンソールに表示します。
 *    動作確認用のプラグインコマンドです。
 *
 * # プラグインの情報
 * バージョン : 0.9.1
 * 最終更新日 : 2020/11/11
 * 制作者     : 赤月 智平(t-akatsuki)
 * Webサイト  : https://www.utakata-no-yume.net
 * GitHub     : https://github.com/t-akatsuki
 * Twitter    : https://twitter.com/T_Akatsuki
 * ライセンス : MIT License
 *
 * # 更新履歴
 * ## 0.9.1 (2020/11/11)
 *   プラグインパラメータ「共有対象スイッチ番号」もしくは「共有対象変数番号」を
 *   指定していないと正常動作しない不具合の修正。
 *   英語版アノテーション, README_EN.txtの追加。
 *
 * ## 0.9.0 (2020/08/22)
 *   β版。
 *   RPGツクールMV用UTA_CommonSaveをベースにRPGツクールMZ用に移植。
 *   オートセーブ機能への対応。
 */
"use strict";
var utakata;
(function (utakata) {
    "use strict";
    class CommonSave {
        constructor() {
            throw new Error("CommonSave is static class.");
        }
        static initialize() {
            this.targetSwitches = [];
            this.targetVariables = [];
            this.parameters = PluginManager.parameters(this.PLUGIN_NAME);
            try {
                const targetSwitchesList = this.parameters.targetSwitches ? JsonEx.parse(this.parameters.targetSwitches) : [];
                const targetVariablesList = this.parameters.targetVariables ? JsonEx.parse(this.parameters.targetVariables) : [];
                this.loadTargetSwitchesNumber(targetSwitchesList);
                this.loadTargetVariablesNumber(targetVariablesList);
            }
            catch (e) {
                if (e instanceof Error) {
                    throw new Error(this.PLUGIN_NAME + ": plugin parameter parse error: " + e.message);
                }
            }
        }
        static loadTargetCoreNumber(targetList) {
            let ret = [];
            for (const targetStr of targetList) {
                const targetList = this.parseTargetNumber(targetStr);
                Array.prototype.push.apply(ret, targetList);
            }
            ret = ret.filter((x, i, self) => {
                return self.indexOf(x) === i;
            });
            return ret;
        }
        static loadTargetSwitchesNumber(targetSwitches) {
            this.targetSwitches = this.loadTargetCoreNumber(targetSwitches);
        }
        static loadTargetVariablesNumber(targetVariables) {
            this.targetVariables = this.loadTargetCoreNumber(targetVariables);
        }
        static parseTargetNumber(targetStr) {
            const ret = [];
            const emptyPattern = /^$/;
            const singlePattern = /^[0-9]+$/;
            const regionPattern = /^[0-9]+-[0-9]+$/;
            try {
                targetStr = targetStr.trim();
                if (targetStr.match(emptyPattern)) {
                    console.info("CommonSave.parseTargetNumber: skip parsing because ditected empty string.");
                }
                else if (targetStr.match(singlePattern)) {
                    const num = parseInt(targetStr, 10);
                    if (num !== num) {
                        throw new Error(this.PLUGIN_NAME + ": parse error: NaN returned. (" + targetStr + ")");
                    }
                    ret.push(num);
                }
                else if (targetStr.match(regionPattern)) {
                    const numStrs = targetStr.split("-");
                    const sNum = parseInt(numStrs[0], 10);
                    const eNum = parseInt(numStrs[1], 10);
                    if (sNum !== sNum || eNum !== eNum) {
                        throw new Error(this.PLUGIN_NAME + ": parse error: NaN returned. (" + targetStr + ")");
                    }
                    if (sNum >= eNum) {
                        throw new Error(this.PLUGIN_NAME + ": parse error: invaliad format. (" + targetStr + ")");
                    }
                    for (let num = sNum; num <= eNum; num++) {
                        ret.push(num);
                    }
                }
                else {
                    throw new Error(this.PLUGIN_NAME + ": parse error: invaliad format. (" + targetStr + ")");
                }
            }
            catch (e) {
                console.error("CommonSave.parseTargetNumber: Invalid format string has comming. (" + targetStr + ")");
                if (e instanceof Error) {
                    console.error(e.message);
                    console.error(e.stack);
                }
                throw e;
            }
            return ret;
        }
        static makeTargetGameSwitchesJson() {
            const ret = {};
            for (const idx of this.targetSwitches) {
                if (idx < 1) {
                    console.warn(`ComonSave.getTargetSwitchesJson: target switch index is out of range. (${idx})`);
                    continue;
                }
                ret[idx] = $gameSwitches.value(idx);
            }
            return ret;
        }
        static makeTargetGameVariablesJson() {
            const ret = {};
            for (const idx of this.targetVariables) {
                if (idx < 1) {
                    console.warn(`ComonSave.getTargetGameVariablesJson: target variable index is out of range. (${idx})`);
                    continue;
                }
                ret[idx] = $gameVariables.value(idx);
            }
            return ret;
        }
        static makeSaveContents() {
            const contents = {
                "version": this.PLUGIN_VERSION,
                "gameSwitches": this.makeTargetGameSwitchesJson(),
                "gameVariables": this.makeTargetGameVariablesJson()
            };
            return contents;
        }
        static makeSaveName() {
            return this.parameters.saveFileName;
        }
        static exists() {
            const saveName = this.makeSaveName();
            return StorageManager.exists(saveName);
        }
        static loadCommonSaveSwitches(contents) {
            if (!("gameSwitches" in contents)) {
                return;
            }
            for (const key in contents.gameSwitches) {
                const idx = parseInt(key, 10);
                const value = contents.gameSwitches[key];
                $gameSwitches.setValue(idx, value);
            }
            return;
        }
        static loadCommonSaveVariables(contents) {
            if (!("gameVariables" in contents)) {
                return;
            }
            for (const key in contents.gameVariables) {
                const idx = parseInt(key, 10);
                const value = contents.gameVariables[key];
                $gameVariables.setValue(idx, value);
            }
            return;
        }
        static load() {
            if (!this.exists()) {
                return new Promise((resolve) => {
                    console.info("ComonSave.load: common save is not existed.");
                    resolve(0);
                });
            }
            const saveName = this.makeSaveName();
            return StorageManager.loadObject(saveName).then((contents) => {
                this.loadCommonSaveSwitches(contents);
                this.loadCommonSaveVariables(contents);
                console.log("CommonSave.load: completed to load common save.");
                return 0;
            });
        }
        static save() {
            const contents = this.makeSaveContents();
            const saveName = this.makeSaveName();
            return StorageManager.saveObject(saveName, contents).then(() => {
                console.log("CommonSave.save: completed to save common save.");
                return 0;
            });
        }
        static remove() {
            const saveName = this.makeSaveName();
            StorageManager.remove(saveName);
            console.log("CommonSave.remove: remove common save data. (" + saveName + ")");
        }
        static check() {
            console.info("CommonSave.check: current target switches number.");
            console.info(this.targetSwitches.join(","));
            console.info("CommonSave.check: current target variables number.");
            console.info(this.targetVariables.join(","));
        }
        static isApplyOnLoad() {
            return this.parameters.applyOnLoad === "true";
        }
        static isApplyOnSave() {
            return this.parameters.applyOnSave === "true";
        }
        static isApplyOnAutoSave() {
            return this.parameters.applyOnAutoSave === "true";
        }
        static isApplyOnNewGame() {
            return this.parameters.applyOnNewGame === "true";
        }
        static isApplyOnGameover() {
            return this.parameters.applyOnGameover === "true";
        }
        static checkNewGame() {
            if ($gameSystem.saveCount() > 1) {
                return false;
            }
            if ($gameMap.mapId() !== $dataSystem.startMapId || $gamePlayer.x !== $dataSystem.startX || $gamePlayer.y !== $dataSystem.startY || $gamePlayer.direction() !== 2) {
                return false;
            }
            if ($gameParty.steps() > 0) {
                return false;
            }
            return true;
        }
    }
    CommonSave.PLUGIN_NAME = "UTA_CommonSaveMZ";
    CommonSave.PLUGIN_VERSION = {
        major: 0,
        minor: 9,
        release: 1
    };
    CommonSave.targetSwitches = [];
    CommonSave.targetVariables = [];
    utakata.CommonSave = CommonSave;
    CommonSave.initialize();
    PluginManager.registerCommand(CommonSave.PLUGIN_NAME, "load", () => {
        void CommonSave.load();
    });
    PluginManager.registerCommand(CommonSave.PLUGIN_NAME, "save", () => {
        void CommonSave.save();
    });
    PluginManager.registerCommand(CommonSave.PLUGIN_NAME, "remove", () => {
        CommonSave.remove();
    });
    PluginManager.registerCommand(CommonSave.PLUGIN_NAME, "check", () => {
        CommonSave.check();
    });
    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        _DataManager_setupNewGame.call(this);
        if (CommonSave.isApplyOnNewGame()) {
            void CommonSave.load();
        }
    };
    const _DataManager_saveGame = DataManager.saveGame;
    DataManager.saveGame = function (savefileId) {
        return _DataManager_saveGame.call(this, savefileId).then((ret) => {
            if (savefileId === 0) {
                if (CommonSave.isApplyOnAutoSave() && !CommonSave.checkNewGame()) {
                    return CommonSave.save();
                }
                return ret;
            }
            if (CommonSave.isApplyOnSave()) {
                return CommonSave.save();
            }
            return ret;
        });
    };
    const _DataManager_loadGame = DataManager.loadGame;
    DataManager.loadGame = function (savefileId) {
        return _DataManager_loadGame.call(this, savefileId).then((ret) => {
            if (CommonSave.isApplyOnLoad()) {
                return CommonSave.load();
            }
            return ret;
        });
    };
    const _Scene_Gameover_prototype_start = Scene_Gameover.prototype.start;
    Scene_Gameover.prototype.start = function () {
        if (CommonSave.isApplyOnGameover()) {
            void CommonSave.save();
        }
        _Scene_Gameover_prototype_start.call(this);
    };
})(utakata || (utakata = {}));
