//===================================================================
// UTA_CommonSaveMZ
//===================================================================
/// <reference path="./UTA_CommonSaveMZ.d.ts"/>
/// <reference path="./Version.ts"/>
/// <reference path="./Error.ts"/>

namespace utakata.UTA_CommonSaveMZ {
    /**
     * 共有セーブ関連の処理を扱う静的クラス
     */
    export class CommonSave {
        /**
         * プラグイン名称定義
         */
        public static readonly PLUGIN_NAME: string = "UTA_CommonSaveMZ";
        /**
         * プラグインのバージョン定義
         */
        public static readonly VERSION: Version = new Version(1, 0, 0);
        /**
         * セーブファイルのデフォルトファイル名
         */
        private static readonly SAVEFILE_DEFAULT_NAME: string = "uta_common";

        /**
         * 共有対象のスイッチ番号定義
         */
        private static targetSwitches: number[] = [];
        /**
         * 共有対象の変数番号定義
         */
        private static targetVariables: number[] = [];
        /**
         * プラグインパラメータの参照
         */
        private static parameters: CommonSavePluginParameters = {};

        constructor() {
            throw new Error(`${this.constructor.name} is static class`);
        }

        /**
         * 初期化処理
         */
        public static initialize(): void {
            this.targetSwitches = [];
            this.targetVariables = [];
            this.parameters = {};

            this.loadPluginParameters();
            this.registerPluginCommands();
        }

        /**
         * プラグインパラメータを読み込む
         * 
         * @remarks
         * プラグインパラメータに指定された値を適切な型に変換して保持する
         * 意図しない問題に気づきにくいので、読み込み失敗時はフォールバックとせず意図的に例外として制作者に見直しを促す
         * 
         * @throws {@link UTA_CommonSaveError} プラグインパラメータ読み込み失敗時に送出される
         */
        private static loadPluginParameters(): void {
            const pluginParameters = <PluginParameters>PluginManager.parameters(this.PLUGIN_NAME);

            try {
                /**
                 * targetSwitches: string[]
                 */
                this.parameters.targetSwitches = pluginParameters?.targetSwitches ? 
                    <string[]>JsonEx.parse(pluginParameters.targetSwitches) : 
                    [];
                /**
                 * targetVariables: string[]
                 */
                this.parameters.targetVariables = pluginParameters?.targetVariables ? 
                    <string[]>JsonEx.parse(pluginParameters.targetVariables) : 
                    [];
                /**
                 * applyOnLoad: boolean
                 */
                this.parameters.applyOnLoad = pluginParameters?.applyOnLoad ? 
                    <boolean>JsonEx.parse(pluginParameters.applyOnLoad) : 
                    true;
                /**
                 * applyOnSave: boolean
                 */
                this.parameters.applyOnSave = pluginParameters?.applyOnSave ? 
                    <boolean>JsonEx.parse(pluginParameters.applyOnSave) : 
                    true;
                /**
                 * applyOnNewGame: boolean
                 */
                this.parameters.applyOnNewGame = pluginParameters?.applyOnNewGame ? 
                    <boolean>JsonEx.parse(pluginParameters.applyOnNewGame) : 
                    true;
                /**
                 * applyOnAutoSave: boolean
                 */
                this.parameters.applyOnAutoSave = pluginParameters?.applyOnAutoSave ? 
                    <boolean>JsonEx.parse(pluginParameters.applyOnAutoSave) : 
                    false;
                /**
                 * applyOnGameover: boolean
                 */
                this.parameters.applyOnGameover = pluginParameters?.applyOnGameover ? 
                    <boolean>JsonEx.parse(pluginParameters.applyOnGameover) : 
                    true;
                /**
                 * saveFileName: string
                 */
                this.parameters.saveFileName = pluginParameters?.saveFileName ? 
                    pluginParameters.saveFileName : 
                    this.SAVEFILE_DEFAULT_NAME;

                /**
                 * 対象となるスイッチ/変数番号リストを取得
                 */
                this.loadTargetSwitchesNumber(this.parameters.targetSwitches);
                this.loadTargetVariablesNumber(this.parameters.targetVariables);
            } catch (e) {
                let errMessage = "";
                let errStack = "";
                if (e instanceof Error) {
                    errMessage = e.message ?? "";
                    errStack = e.stack ?? "";
                }
                const pluginParametersJsonStr = JSON.stringify(this.parameters);
                console.error(`[${this.PLUGIN_NAME}] ${this.constructor.name}.loadPluginParameters: Failed to parse plugin parameters.`);
                console.error(`[${this.PLUGIN_NAME}] Plugin parameters: \n${pluginParametersJsonStr}`);
                console.error(`[${this.PLUGIN_NAME}] Error message: \n${errMessage}`);
                console.error(`[${this.PLUGIN_NAME}] Error stack: \n${errStack}`);
                throw new UTA_CommonSaveError(`[${this.PLUGIN_NAME}] Plugin parameter parse error (${errMessage})`);
            }
        }

        /**
         * 文字列配列から対象番号配列をロードする
         * 
         * @remarks
         * 対象番号は個々の指定の他に範囲指定がある
         * 重複する番号が含まれていた場合はuniqueな状態になる
         * 
         * @param targetList - 読み込み対象番号文字配列
         * @returns 対象番号配列
         */
        private static loadTargetCoreNumber(targetList: string[]): number[] {
            let ret: number[] = [];
            for (const targetStr of targetList) {
                const targetList = this.parseTargetNumber(targetStr);
                Array.prototype.push.apply(ret, targetList);
            }
            // unique
            ret = ret.filter((x: number, i: number, self: number[]) => {
                return self.indexOf(x) === i;
            });
            return ret;
        }

        /**
         * 共有対象スイッチ番号を読み込む
         * 
         * @param targetSwitches - 読み込み対象のスイッチ番号文字配列
         * プラグインパラメータに設定された配列を渡す
         * @throws {@link UTA_CommonSaveError} プラグインパラメータで指定した対象スイッチ番号のparseに失敗した際に送出される
         */
        private static loadTargetSwitchesNumber(targetSwitches: string[]): void {
            try {
                this.targetSwitches = this.loadTargetCoreNumber(targetSwitches);
            } catch (e) {
                let errMessage = "";
                let errStack = "";
                if (e instanceof Error) {
                    errMessage = e.message ?? "";
                    errStack = e.stack ?? "";
                }
                console.error(`[${this.PLUGIN_NAME}] ${this.constructor.name}.loadTargetSwitchesNumber: Failed to load target switches number.`);
                console.error(`[${this.PLUGIN_NAME}] Error message: \n${errMessage}`);
                console.error(`[${this.PLUGIN_NAME}] Error stack: \n${errStack}`);
                throw new UTA_CommonSaveError(`[${this.PLUGIN_NAME}] Loading target switches number error (${errMessage})`);
            }
        }

        /**
         * 共有対象変数番号を読み込む
         * 
         * @param targetVariables - 読み込み対象の変数番号文字配列
         * プラグインパラメータ似設定された配列を渡す
         * @throws {@link UTA_CommonSaveError} プラグインパラメータで指定した対象変数番号のparseに失敗した際に送出される
         */
        private static loadTargetVariablesNumber(targetVariables: string[]): void {
            try {
                this.targetVariables = this.loadTargetCoreNumber(targetVariables);
            } catch (e) {
                let errMessage = "";
                let errStack = "";
                if (e instanceof Error) {
                    errMessage = e.message ?? "";
                    errStack = e.stack ?? "";
                }
                console.error(`[${this.PLUGIN_NAME}] ${this.constructor.name}.loadTargetVariablesNumber: Failed to load target variables number.`);
                console.error(`[${this.PLUGIN_NAME}] Error message: \n${errMessage}`);
                console.error(`[${this.PLUGIN_NAME}] Error stack: \n${errStack}`);
                throw new UTA_CommonSaveError(`[${this.PLUGIN_NAME}] Loading target variables number error (${errMessage})`);
            }
        }

        /**
         * 引数で渡した数字文字列をparseして対象番号のリストを得る
         * 「-]を利用して範囲指定された番号の解釈も行う
         * 
         * @param targetStr - parse対象の文字列
         * @returns 文字列から得た対象番号のリスト
         * @throws {@link UTA_CommonSaveError} parse失敗時に送出する
         */
        private static parseTargetNumber(targetStr: string): number[] {
            const ret: number[] = [];
            const singlePattern = /^[0-9]+$/;
            const regionPattern = /^[0-9]+-[0-9]+$/;

            try {
                targetStr = targetStr.trim();
                if (!targetStr) {
                    // empty
                    // 指定が無い場合もあるので許容する
                    console.info(`[${this.PLUGIN_NAME}] skip parsing because ditected empty string.`);
                } else if (targetStr.match(singlePattern)) {
                    // single number
                    // ex. 10
                    const num = parseInt(targetStr, 10);
                    if (num !== num) {
                        throw new UTA_CommonSaveError(`[${this.PLUGIN_NAME}] parse error: NaN returned (${targetStr})`);
                    }
                    ret.push(num);
                } else if (targetStr.match(regionPattern)) {
                    // region number
                    // ex. 10-15
                    const numStrs = targetStr.split("-");
                    const sNum = parseInt(numStrs[0], 10);
                    const eNum = parseInt(numStrs[1], 10);
                    if (sNum !== sNum || eNum !== eNum) {
                        throw new UTA_CommonSaveError(`[${this.PLUGIN_NAME}] parse error: NaN returned (${targetStr})`);
                    }
                    if (sNum >= eNum) {
                        throw new UTA_CommonSaveError(`[${this.PLUGIN_NAME}] parse error: invalid format (${targetStr})`);
                    }
                    for (let num = sNum; num <= eNum; num++) {
                        ret.push(num);
                    }
                } else {
                    throw new UTA_CommonSaveError(`[${this.PLUGIN_NAME}] parse error: invalid format (${targetStr})`);
                }
            } catch (e) {
                console.error(`[${this.PLUGIN_NAME}] ${this.constructor.name}.parseTargetNumber: Failed to parse target number.`);
                throw e;
            }
            return ret;
        }

        /**
         * プラグインコマンドを登録する
         */
        private static registerPluginCommands(): void {
            /**
             * load
             */
            PluginManager.registerCommand(this.PLUGIN_NAME, "load", () => {
                void this.load();
            });
            /**
             * save
             */
            PluginManager.registerCommand(this.PLUGIN_NAME, "save", () => {
                void this.save();
            });
            /**
             * remove
             */
            PluginManager.registerCommand(this.PLUGIN_NAME, "remove", () => {
                this.remove();
            });
            /**
             * check
             */
            PluginManager.registerCommand(this.PLUGIN_NAME, "check", () => {
                this.check();
            });
        }

        /**
         * 現在の$gameSwitchesのデータから共有セーブ対象としているものを連想配列で取得する
         * 
         * @returns 共有セーブ対象$gameSwitchesの連想配列
         */
        private static makeTargetGameSwitchesJson(): TargetGameSwitchesData {
            const ret: TargetGameSwitchesData = {};
            for (const idx of this.targetSwitches) {
                // $gameSwitchesは触った事が無いと要素が作られないので範囲チェックできない
                if (idx < 1) {
                    console.warn(`[${this.PLUGIN_NAME}] ${this.constructor.name}.getTargetSwitchesJson: Target switch index is out of range. (${idx})`);
                    continue;
                }
                ret[idx] = $gameSwitches.value(idx);
            }
            return ret;
        }

        /**
         * 現在の$gameVariablesのデータから、共有セーブの対象としているものを連想配列で取得する
         * 
         * @returns 共有セーブ対象$gameVariablesの連想配列
         */
        private static makeTargetGameVariablesJson(): TargetGameVariablesData {
            const ret: TargetGameVariablesData = {};
            for (const idx of this.targetVariables) {
                // $gameVariablesは触った事が無いと要素が作られないので範囲チェックできない
                if (idx < 1) {
                    console.warn(`[${this.PLUGIN_NAME}] ${this.constructor.name}.getTargetGameVariablesJson: Target variable index is out of range. (${idx})`);
                    continue;
                }
                ret[idx] = $gameVariables.value(idx);
            }
            return ret;
        }

        /**
         * プラグインの現在バージョンの連想配列を取得する
         * 
         * @returns 現在バージョンの連想配列
         */
        private static getCurrentVersionDict(): CommonSaveDataVersion {
            const ret: CommonSaveDataVersion = {
                major: this.VERSION.major,
                minor: this.VERSION.minor,
                patch: this.VERSION.patch
            };
            return ret;
        }

        /**
         * 共有セーブするデータを作成する
         * 
         * @returns 共有セーブするデータの連想配列
         */
        private static makeSaveContents(): CommonSaveData {
            const contents: CommonSaveData = {
                "version": this.getCurrentVersionDict(),
                "gameSwitches": this.makeTargetGameSwitchesJson(),
                "gameVariables": this.makeTargetGameVariablesJson()
            };
            return contents;
        }

        /**
         * プラグインパラメータで設定された共有セーブデータファイル名を取得する
         * 
         * @remarks
         * セーブデータファイル名には拡張子を含めない
         * 
         * @returns 共有セーブデータファイル名の文字列
         */
        private static makeSaveName(): string {
            return <string>this.parameters.saveFileName;
        }

        /**
         * 共有セーブデータが存在するか
         * 
         * @returns 共有セーブデータが存在する場合trueを返す
         */
        private static exists(): boolean {
            const saveName = this.makeSaveName();
            return StorageManager.exists(saveName);
        }

        /**
         * 共有セーブオブジェクトから$gameSwitchesにデータをロードする
         * 
         * @param contents - ロードした共有セーブデータオブジェクト
         * @throws {@link UTA_CommonSaveError} ロード失敗時に送出される
         */
        private static loadCommonSaveSwitches(contents: CommonSaveData): void {
            if (!("gameSwitches" in contents)) {
                console.warn(`[${this.PLUGIN_NAME}] ${this.constructor.name}.loadCommonSaveSwitches: Ignore process because game switches data are not found in common save data.`);
                return;
            }
            try {
                for (const key in contents.gameSwitches) {
                    const idx = parseInt(key, 10);
                    if (idx !== idx) {
                        throw new Error(`switch number has been parsed to NaN (${key})`);
                    }
                    const value = contents.gameSwitches[key];
                    $gameSwitches.setValue(idx, value);
                }
            } catch (e) {
                let errMessage = "";
                let errStack = "";
                if (e instanceof Error) {
                    errMessage = e.message ?? "";
                    errStack = e.stack ?? "";
                }
                console.error(`[${this.PLUGIN_NAME}] ${this.constructor.name}.loadCommonSaveSwitches: Failed to load game switches from common save data.`);
                console.error(`[${this.PLUGIN_NAME}] Error message: \n${errMessage}`);
                console.error(`[${this.PLUGIN_NAME}] Error stack: \n${errStack}`);
                throw new UTA_CommonSaveError(`[${this.PLUGIN_NAME}] Loading error (${errMessage})`);
            }
        }

        /**
         * 共有セーブオブジェクトから$gameVariablesにデータをロードする
         * 
         * @param contents - ロードした共有セーブデータオブジェクト
         * @throws {@link UTA_CommonSaveError} ロード失敗時に送出される
         */
        private static loadCommonSaveVariables(contents: CommonSaveData): void {
            if (!("gameVariables" in contents)) {
                console.warn(`[${this.PLUGIN_NAME}] ${this.constructor.name}.loadCommonSaveVariables: Ignore process because game variables data are not found in common save data.`);
                return;
            }
            try {
                for (const key in contents.gameVariables) {
                    const idx = parseInt(key, 10);
                    if (idx !== idx) {
                        throw new Error(`variable number has been parsed to NaN (${key})`);
                    }
                    const value = contents.gameVariables[key];
                    $gameVariables.setValue(idx, value);
                }
            } catch (e) {
                let errMessage = "";
                let errStack = "";
                if (e instanceof Error) {
                    errMessage = e.message ?? "";
                    errStack = e.stack ?? "";
                }
                console.error(`[${this.PLUGIN_NAME}] ${this.constructor.name}.loadCommonSaveVariables: Failed to load game variables from common save data.`);
                console.error(`[${this.PLUGIN_NAME}] Error message: \n${errMessage}`);
                console.error(`[${this.PLUGIN_NAME}] Error stack: \n${errStack}`);
                throw new UTA_CommonSaveError(`[${this.PLUGIN_NAME}] Loading error (${errMessage})`);
            }
        }

        /**
         * 共有セーブデータ内に記録されたバージョンを得る
         * 
         * @param contents - 共有セーブデータjsonオブジェクト
         * @returns {@link Version} 引数の共有セーブデータから得られたバージョンオブジェクト
         * @throws {@link UTA_CommonSaveError} バージョンデータの読み込みに失敗した場合に送出される
         */
        private static getCommonSaveDataVersion(contents: CommonSaveData): Version {
            if (!("version" in contents)) {
                console.error(`[${this.PLUGIN_NAME}] ${this.constructor.name}.getCommonSaveDataVersion: Version data is not found in common save data.`);
                throw new UTA_CommonSaveError(`[${this.PLUGIN_NAME}] Common save data is invalid format`);
            }
            // v0.9.1以前はキー名が異なるが、互換性を担保する
            try {
                const major = contents.version.major;
                const minor = contents.version.minor;
                const patch = "patch" in contents.version ? 
                    contents.version.patch : 
                    contents.version.release;
                return new Version(major, minor, patch);
            } catch (e) {
                let errMessage = "";
                let errStack = "";
                if (e instanceof Error) {
                    errMessage = e.message ?? "";
                    errStack = e.stack ?? "";
                }
                const versionJsonStr = JSON.stringify(contents.version);
                console.error(`[${this.PLUGIN_NAME}] ${this.constructor.name}.getCommonSaveDataVersion: Failed to get version.`);
                console.error(`[${this.PLUGIN_NAME}] Version data: \n${versionJsonStr}`);
                console.error(`[${this.PLUGIN_NAME}] Error message: \n${errMessage}`);
                console.error(`[${this.PLUGIN_NAME}] Error stack: \n${errStack}`);
                throw new UTA_CommonSaveError(`[${this.PLUGIN_NAME}] Common save data is invalid format (${errMessage})`);
            }
        }

        /**
         * 共有セーブデータのロードコア処理
         * 
         * @param contents - ロードした共有セーブデータ
         */
        private static loadCore(contents: CommonSaveData): void {
            /**
             * バージョンに応じた特殊処理を行う場合はここに処理を追加する
             */
            // 共有セーブデータ内に記録したバージョンを取得
            const version = this.getCommonSaveDataVersion(contents);
            switch (version?.toString()) {
                default:
                    break;
            }

            /**
             * 各種データのロード処理
             */
            this.loadCommonSaveSwitches(contents);
            this.loadCommonSaveVariables(contents);
        }

        /**
         * 共有セーブデータのロード処理
         * local版/web版共通
         * 
         * @remarks
         * 共有セーブデータが存在しない場合は何もしない
         * 途中から導入した場合を考慮してエラーにしない事
         * 
         * @returns ロード処理のpromiseオブジェクト
         */
        public static load(): Promise<number> {
            if (!this.exists()) {
                return new Promise((resolve) => {
                    console.info(`[${this.PLUGIN_NAME}] ${this.constructor.name}.load: Common save data is not existed.`);
                    resolve(0);
                });
            }
            const saveName = this.makeSaveName();
            return StorageManager.loadObject(saveName).then((contents: CommonSaveData) => {
                this.loadCore(contents);
                console.info(`[${this.PLUGIN_NAME}] ${this.constructor.name}.load: Loading common save data succeeded. (save filename=${saveName})`);
                return 0;
            });
        }

        /**
         * 共有セーブデータのセーブ処理
         * local版/web版共通
         * 
         * @returns セーブ処理のpromiseオブジェクト
         */
        public static save(): Promise<number> {
            const contents = this.makeSaveContents();
            const saveName = this.makeSaveName();
            return StorageManager.saveObject(saveName, contents).then(() => {
                console.info(`[${this.PLUGIN_NAME}] ${this.constructor.name}.load: Saving common save data succeeded. (save filename=${saveName})`);
                return 0;
            });
        }

        /**
         * 共有セーブデータを削除する
         * 
         * @remarks
         * 共有セーブデータが存在しない場合は何もしない
         */
        public static remove(): void {
            if (!this.exists()) {
                console.info(`[${this.PLUGIN_NAME}] ${this.constructor.name}.remove: Common save data is not existed.`);
                return;
            }
            const saveName = this.makeSaveName();
            StorageManager.remove(saveName);
            console.info(`[${this.PLUGIN_NAME}] ${this.constructor.name}.remove: Remove common save data. (save filename=${saveName})`);
        }

        /**
         * 現在共有対象としているスイッチ/変数番号をコンソールに表示する
         * デバッグ用機能
         */
        public static check(): void {
            const targetSwitchesStr = this.targetSwitches.join(",");
            const targetVariablesStr = this.targetVariables.join(",");
            console.info(`[${this.PLUGIN_NAME}] ${this.constructor.name}.check: Current target switches number.\n${targetSwitchesStr}`);
            console.info(`[${this.PLUGIN_NAME}] ${this.constructor.name}.check: Current target variables number.\n${targetVariablesStr}`);
        }

        /**
         * セーブデータロード時に共有セーブデータをロードするか
         * 
         * @return セーブデータロード時に共有セーブデータをロードする場合true
         */
        public static isApplyOnLoad(): boolean {
            return <boolean>this.parameters.applyOnLoad;
        }

        /**
         * セーブデータセーブ時に共有セーブデータをセーブするか
         * 
         * @return セーブデータセーブ時に共有セーブデータをセーブする場合true
         */
        public static isApplyOnSave(): boolean {
            return <boolean>this.parameters.applyOnSave;
        }

        /**
         * オートセーブ時に共有セーブデータをセーブするか
         * 
         * @return オートセーブ時に共有セーブデータをセーブする場合true
         */
        public static isApplyOnAutoSave(): boolean {
            return <boolean>this.parameters.applyOnAutoSave;
        }

        /**
         * ニューゲーム時に共有セーブデータをロードするか
         * 
         * @return ニューゲーム時に共有セーブデータをロードする場合true
         */
        public static isApplyOnNewGame(): boolean {
            return <boolean>this.parameters.applyOnNewGame;
        }

        /**
         * ゲームオーバー時に共有セーブデータをセーブするか
         * 
         * @return ゲームオーバー時に共有セーブデータをセーブする場合true
         */
        public static isApplyOnGameover(): boolean {
            return <boolean>this.parameters.applyOnGameover;
        }

        /**
         * 「初めから」即セーブ状態であるかを判定する
         * 一度タイトル画面に戻ってから「初めから」を選んだ場合に
         * 何故かオートセーブ処理が実行されてしまい共有セーブが初期状態で上書きされてしまう状態を
         * 回避する為の判定処理
         * 対症療法である為、この処理はコアスクリプトの改修に合わせて修正する
         * 
         * @return 「初めから」即セーブの場合はtrueを返す
         */
        public static checkNewGame(): boolean {
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
        }
    }

    /**
     * プラグイン読み込み時に初期化処理を実行
     */
    CommonSave.initialize();

    /**
     * DataManager
     */
    // ニューゲーム処理時に共有セーブデータロード処理をフック
    const _DataManager_setupNewGame = DataManager.setupNewGame;
    DataManager.setupNewGame = function(): void {
        _DataManager_setupNewGame.call(this);
        if (CommonSave.isApplyOnNewGame()) {
            void CommonSave.load();
        }
    };

    // セーブ処理に共有セーブデータセーブ処理をフック
    const _DataManager_saveGame = DataManager.saveGame;
    DataManager.saveGame = function(savefileId: number): Promise<number> {
        return _DataManager_saveGame.call(this, savefileId).then((ret: number) => {
            // savefileId = 0 is auto save
            // RPGMakerMZ v1.0.1:
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

    // ロード処理に共有セーブデータロード処理をフック
    const _DataManager_loadGame = DataManager.loadGame;
    DataManager.loadGame = function(savefileId: number): Promise<number> {
        return _DataManager_loadGame.call(this, savefileId).then((ret: number) => {
            if (CommonSave.isApplyOnLoad()) {
                return CommonSave.load();
            }
            return ret;
        });
    };

    /**
     * Scene_Gameover
     */
    // ゲームオーバー時に共有セーブデータのセーブ処理をフック
    const _Scene_Gameover_prototype_start = Scene_Gameover.prototype.start;
    Scene_Gameover.prototype.start = function(): void {
        if (CommonSave.isApplyOnGameover()) {
            void CommonSave.save();
        }
        _Scene_Gameover_prototype_start.call(this);
    };
}
