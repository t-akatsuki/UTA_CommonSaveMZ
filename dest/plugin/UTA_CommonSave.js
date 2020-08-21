"use strict";
//=============================================================================
// UTA_CommonSave.js
//=============================================================================
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
 * @default
 * @type string[]
 *
 * @param targetVariables
 * @text 共有対象変数番号
 * @desc セーブデータ間で共有する変数番号の定義です。
 * 「-」で範囲指定が可能です。
 * @default
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
 * @desc 共有セーブデータを記録するセーブデータファイル名の定義です。
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
 * @help ■概要
 *
 * ■プラグインパラメーター
 *
 * ■プラグインコマンド
 *   [共有セーブデータのロード]
 *   共有セーブデータからスイッチ・変数を読み込み反映させます。
 *   任意のタイミングで共有セーブデータをロードする際に使用します。
 *
 *   [共有セーブデータのセーブ]
 *   共有セーブデータに対象のスイッチ・変数の状態を記録します。
 *   任意のタイミングで共有セーブデータをセーブする際に使用します。
 *
 *   [共有セーブデータの削除]
 *   共有セーブデータファイルを削除します。
 *   共有セーブデータをリセットしたい場合に使用します。
 *
 *   [共有対象スイッチ/変数の確認]
 *   共有対象のスイッチ/変数番号をコンソールに表示します。
 *   動作確認用のプラグインコマンドです。
 *
 * ■プラグインの情報
 *   バージョン : 0.1.0
 *   最終更新日 : 2020.08.21
 *   制作者     : 赤月 智平(t-akatsuki)
 *   Webサイト  : https://www.utakata-no-yume.net
 *   GitHub     : https://github.com/t-akatsuki/RMMZ_UTA_CommonSave
 *   Twitter    : https://twitter.com/T_Akatsuki
 *   ライセンス : MIT License
 *
 * ■更新履歴
 *   0.1.0 (2020/08/21)
 *     ほげほげ
 */
/**
 * @namespace utakata
 */
var utakata;
(function (utakata) {
    "use strict";
    /**
     * @static
     * @class CommonSave
     * @classdesc 共有セーブ関連の処理を扱う静的クラス
     */
    var CommonSave = /** @class */ (function () {
        function CommonSave() {
            throw new Error("CommonSave is static class.");
        }
        /**
         * 初期化処理
         * @static
         */
        CommonSave.initialize = function () {
            this.targetSwitches = [];
            this.targetVariables = [];
            this.parameters = PluginManager.parameters(this.PLUGIN_NAME);
            // プラグインパラメーターに指定された値を読み込む
            var targetSwitchesList = JsonEx.parse(this.parameters.targetSwitches);
            var targetVariablesList = JsonEx.parse(this.parameters.targetVariables);
            this.loadTargetSwitchesNumber(targetSwitchesList);
            this.loadTargetVariablesNumber(targetVariablesList);
        };
        /**
         * 文字列配列から対象番号配列をロードする。
         * 重複する番号が含まれていた場合はuniqueな状態になる。
         * @param {string[]} targetList 読み込み対象番号文字配列。
         * @return {number[]} 対象番号配列。
         */
        CommonSave.loadTargetCoreNumber = function (targetList) {
            var ret = [];
            for (var _i = 0, targetList_1 = targetList; _i < targetList_1.length; _i++) {
                var targetStr = targetList_1[_i];
                var targetList_2 = this.parseTargetNumber(targetStr);
                Array.prototype.push.apply(ret, targetList_2);
            }
            // unique
            ret = ret.filter(function (x, i, self) {
                return self.indexOf(x) === i;
            });
            return ret;
        };
        /**
         * 共有対象スイッチ番号を読み込む。
         * @static
         * @param {string[]} targetSwitches 読み込み対象のスイッチ番号文字配列。
         * プラグインパラメーターに設定された配列を渡す。
         */
        CommonSave.loadTargetSwitchesNumber = function (targetSwitches) {
            this.targetSwitches = this.loadTargetCoreNumber(targetSwitches);
        };
        /**
         * 共有対象変数番号を読み込む。
         * @static
         * @param {string[]} targetVariables 読み込み対象の変数番号文字配列。
         * プラグインパラメーター似設定された配列を渡す。
         */
        CommonSave.loadTargetVariablesNumber = function (targetVariables) {
            this.targetVariables = this.loadTargetCoreNumber(targetVariables);
        };
        /**
         * 引数で渡した数字文字列をparseして対象番号のリストを得る。
         * 「-]を利用して範囲指定された番号の解釈も行う。
         * @static
         * @param {string} targetStr parse対象の文字列。
         * @return {number[]} 文字列から得た対象番号のリスト。
         */
        CommonSave.parseTargetNumber = function (targetStr) {
            var ret = [];
            var singlePattern = /^[0-9]+$/;
            var regionPattern = /^[0-9]+-[0-9]+$/;
            try {
                targetStr = targetStr.trim();
                if (targetStr.match(singlePattern)) {
                    // single number
                    // ex. 10
                    var num = parseInt(targetStr, 10);
                    if (num !== num) {
                        throw new Error(this.PLUGIN_NAME + ": parse error: NaN returned. (" + targetStr + ")");
                    }
                    ret.push(num);
                }
                else if (targetStr.match(regionPattern)) {
                    // region number
                    // ex. 10-15
                    var numStrs = targetStr.split("-");
                    var sNum = parseInt(numStrs[0], 10);
                    var eNum = parseInt(numStrs[1], 10);
                    if (sNum !== sNum || eNum !== eNum) {
                        throw new Error(this.PLUGIN_NAME + ": parse error: NaN returned. (" + targetStr + ")");
                    }
                    if (sNum >= eNum) {
                        throw new Error(this.PLUGIN_NAME + ": parse error: invaliad format. (" + targetStr + ")");
                    }
                    for (var num = sNum; num <= eNum; num++) {
                        ret.push(num);
                    }
                }
                else {
                    throw new Error(this.PLUGIN_NAME + ": parse error: invaliad format. (" + targetStr + ")");
                }
            }
            catch (e) {
                console.error("CommonSave.parseTargetNumber: Invalid format string has comming. (" + targetStr + ")");
                console.error(e.message);
                console.error(e.stack);
                throw e;
            }
            return ret;
        };
        /**
         * 現在の$gameSwitchesのデータから、共有セーブ対象としているものを連想配列で取得する。
         * @static
         * @return {object} 共有セーブ対象$gameSwitchesの連想配列。
         */
        CommonSave.makeTargetGameSwitchesJson = function () {
            var ret = {};
            for (var _i = 0, _a = this.targetSwitches; _i < _a.length; _i++) {
                var idx = _a[_i];
                // $gameSwitchesは触った事が無いと要素が作られないので範囲チェックできない
                if (idx < 1) {
                    console.warn("ComonSave.getTargetSwitchesJson: target switch index is out of range. (" + idx + ")");
                    continue;
                }
                ret[idx] = $gameSwitches.value(idx);
            }
            return ret;
        };
        /**
         * 現在の$gameVariablesのデータから、共有セーブの対象としているものを連想配列で取得する。
         * @static
         * @return {object} 共有セーブ対象$gameVariablesの連想配列。
         */
        CommonSave.makeTargetGameVariablesJson = function () {
            var ret = {};
            for (var _i = 0, _a = this.targetVariables; _i < _a.length; _i++) {
                var idx = _a[_i];
                // $gameVariablesは触った事が無いと要素が作られないので範囲チェックできない
                if (idx < 1) {
                    console.warn("ComonSave.getTargetGameVariablesJson: target variable index is out of range. (" + idx + ")");
                    continue;
                }
                ret[idx] = $gameVariables.value(idx);
            }
            return ret;
        };
        /**
         * 共有セーブするデータを作成する。
         * @static
         * @return {object} 共有セーブするデータの連想配列。
         */
        CommonSave.makeSaveContents = function () {
            var contents = {
                "gameSwitches": this.makeTargetGameSwitchesJson(),
                "gameVariables": this.makeTargetGameVariablesJson()
            };
            return contents;
        };
        /**
         * プラグインパラメーターで設定された共有セーブデータファイル名を取得する。
         * 拡張子は含めない。
         * @static
         * @return {string} 共有セーブデータファイル名の文字列。
         */
        CommonSave.makeSaveName = function () {
            return this.parameters.saveFileName;
        };
        /**
         * 共有セーブデータが存在するか。
         * @static
         * @return {boolean} 共有セーブデータが存在する場合trueを返す。
         */
        CommonSave.exists = function () {
            var saveName = this.makeSaveName();
            return StorageManager.exists(saveName);
        };
        /**
         * 共有セーブオブジェクトから$gameSwitchesにデータをロードする。
         * @static
         * @param {object} contents ロードした共有セーブデータオブジェクト
         */
        CommonSave.loadCommonSaveSwitches = function (contents) {
            if (!("gameSwitches" in contents)) {
                return;
            }
            for (var key in contents.gameSwitches) {
                var idx = parseInt(key, 10);
                var value = contents.gameSwitches[key];
                $gameSwitches.setValue(idx, value);
            }
            return;
        };
        /**
         * 共有セーブオブジェクトから$gameVariablesにデータをロードする。
         * @static
         * @param {object} contents ロードした共有セーブデータオブジェクト
         */
        CommonSave.loadCommonSaveVariables = function (contents) {
            if (!("gameVariables" in contents)) {
                return;
            }
            for (var key in contents.gameVariables) {
                var idx = parseInt(key, 10);
                var value = contents.gameVariables[key];
                $gameVariables.setValue(idx, value);
            }
            return;
        };
        /**
         * 共有セーブデータのロード処理。
         * local版, web版共通。
         * @static
         * @return {Promise<number>}
         */
        CommonSave.load = function () {
            var _this = this;
            // 共有セーブデータが存在しない場合は何もしない
            // 途中から導入した場合を考慮してエラーにしない事
            if (!this.exists()) {
                return new Promise(function (resolve) {
                    console.info("ComonSave.load: common save is not existed.");
                    resolve(0);
                });
            }
            var saveName = this.makeSaveName();
            return StorageManager.loadObject(saveName).then(function (contents) {
                _this.loadCommonSaveSwitches(contents);
                _this.loadCommonSaveVariables(contents);
                console.log("CommonSave.load: completed to load common save.");
                return 0;
            });
        };
        /**
         * 共有セーブデータのセーブ処理。
         * local版, web版共通。
         * @static
         * @return {Promise<number>}
         */
        CommonSave.save = function () {
            var contents = this.makeSaveContents();
            var saveName = this.makeSaveName();
            return StorageManager.saveObject(saveName, contents).then(function () {
                console.log("CommonSave.save: completed to save common save.");
                return 0;
            });
        };
        /**
         * 共有セーブデータを削除する。
         * @static
         */
        CommonSave.remove = function () {
            var saveName = this.makeSaveName();
            StorageManager.remove(saveName);
            console.log("CommonSave.remove: remove common save data. (" + saveName + ")");
        };
        /**
         * 現在共有対象としているスイッチ/変数番号をコンソールに表示する。
         * デバッグ用機能。
         * @static
         */
        CommonSave.check = function () {
            console.info("CommonSave.check: current target switches number.");
            console.info(this.targetSwitches.join(","));
            console.info("CommonSave.check: current target variables number.");
            console.info(this.targetVariables.join(","));
        };
        /**
         * セーブデータロード時に共有セーブデータをロードするか。
         * @static
         * @return {boolean}
         */
        CommonSave.isApplyOnLoad = function () {
            return this.parameters.applyOnLoad === "true";
        };
        /**
         * セーブデータセーブ時に共有セーブデータをセーブするか。
         * @static
         * @return {boolean}
         */
        CommonSave.isApplyOnSave = function () {
            return this.parameters.applyOnSave === "true";
        };
        /**
         * オートセーブ時に共有セーブデータをセーブするか。
         * @static
         * @return {boolean}
         */
        CommonSave.isApplyOnAutoSave = function () {
            return this.parameters.applyOnAutoSave === "true";
        };
        /**
         * ニューゲーム時に共有セーブデータをロードするか。
         * @static
         * @return {boolean}
         */
        CommonSave.isApplyOnNewGame = function () {
            return this.parameters.applyOnNewGame === "true";
        };
        /**
         * ゲームオーバー時に共有セーブデータをセーブするか。
         * @static
         * @return {boolean}
         */
        CommonSave.isApplyOnGameover = function () {
            return this.parameters.applyOnGameover === "true";
        };
        /**
         * 「初めから」即セーブ状態であるかを判定する。
         * 一度タイトル画面に戻ってから「初めから」を選んだ場合に
         * 何故かオートセーブ処理が実行されてしまい共有セーブが初期状態で上書きされてしまう状態を
         * 回避する為の判定処理。
         * 対症療法である為、この処理はコアスクリプトの改修に合わせて修正する。
         * @static
         * @return {boolean} 「初めから」即セーブの場合はtrueを返す。
         */
        CommonSave.checkNewGame = function () {
            // 「初めから」の場合はセーブカウントが必ず0から始まる
            // $gameSystem.onBeforeSaveでインクリメントされる為、
            // StorageManager.saveObjectのタイミングで必ず1以上になる
            // 初めから即セーブ時は必ず1になる
            if ($gameSystem.saveCount() > 1) {
                return false;
            }
            // 「初めから」の場合は必ず初期設定座標にプレイヤーが配置されるはず
            if ($gameMap.mapId() !== $dataSystem.startMapId || $gamePlayer.x !== $dataSystem.startX || $gamePlayer.y !== $dataSystem.startY || $gamePlayer.direction() !== 2) {
                return false;
            }
            // 「初めから」即セーブのタイミングでは歩数カウントが0であるはず
            if ($gameParty.steps() > 0) {
                return false;
            }
            return true;
        };
        /**
         * プラグイン名称定義
         * @type {string}
         */
        CommonSave.PLUGIN_NAME = "UTA_CommonSave";
        /**
         * 共有対象のスイッチ番号定義
         * @type {number[]}
         */
        CommonSave.targetSwitches = [];
        /**
         * 共有対象の変数番号定義
         * @type {number[]}
         */
        CommonSave.targetVariables = [];
        return CommonSave;
    }());
    utakata.CommonSave = CommonSave;
    CommonSave.initialize();
    /**
     * register plugin command
     */
    PluginManager.registerCommand(CommonSave.PLUGIN_NAME, "load", function () {
        CommonSave.load();
    });
    PluginManager.registerCommand(CommonSave.PLUGIN_NAME, "save", function () {
        CommonSave.save();
    });
    PluginManager.registerCommand(CommonSave.PLUGIN_NAME, "remove", function () {
        CommonSave.remove();
    });
    PluginManager.registerCommand(CommonSave.PLUGIN_NAME, "check", function () {
        CommonSave.check();
    });
    /**
     * DataManager
     */
    var _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function () {
        _DataManager_setupNewGame.call(this);
        if (CommonSave.isApplyOnNewGame()) {
            CommonSave.load();
        }
    };
    var _DataManager_saveGame = DataManager.saveGame;
    DataManager.saveGame = function (savefileId) {
        return _DataManager_saveGame.call(this, savefileId).then(function (ret) {
            // savefileId = 0 is auto save
            // v1.0.1:
            // 一度タイトル画面に戻ってから「初めから」を選んだ場合に
            // 何故かオートセーブ処理が実行されてしまい共有セーブが初期状態で上書きされてしまう
            // この現象を回避する為に明らかにゲームスタート直後の場合は共有セーブしないようにする
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
    var _DataManager_loadGame = DataManager.loadGame;
    DataManager.loadGame = function (savefileId) {
        return _DataManager_loadGame.call(this, savefileId).then(function (ret) {
            if (CommonSave.isApplyOnLoad()) {
                return CommonSave.load();
            }
            return ret;
        });
    };
    /**
     * Scene_Gameover
     */
    var _Scene_Gameover_prototype_start = Scene_Gameover.prototype.start;
    Scene_Gameover.prototype.start = function () {
        if (CommonSave.isApplyOnGameover()) {
            CommonSave.save();
        }
        _Scene_Gameover_prototype_start.call(this);
    };
})(utakata || (utakata = {}));
