//===================================================================
// UTA_CommonSaveMZ 型定義
//===================================================================
/**
 * 共通セーブデータファイルに埋め込んだバージョン
 * v1.0.0未満(β版)のもの
 */
 interface OldCommonSaveDataVersion {
    major: number;
    minor: number;
    release: number;
}

/**
 * 共通セーブデータファイルに埋め込んだバージョン
 * v1.0.0から利用
 * v1.0.0未満(β版)と互換性無し
 */
interface CommonSaveDataVersion {
    major: number;
    minor: number;
    patch: number;
}

/**
 * 共有セーブデータファイル内データ
 */
interface CommonSaveData {
    /**
     * 共有セーブデータのバージョン
     */
    version: CommonSaveDataVersion | OldCommonSaveDataVersion;
    /**
     * ゲーム同一チェック用ハッシュ
     * v1.0.0から追加
     */
    gameIdentity?: string;
    /**
     * 共有対象スイッチデータ
     */
    gameSwitches: { [idx: number]: boolean };
    /**
     * 共有対象変数データ
     */
    gameVariables: { [idx: number]: number };
}

/**
 * PluginManagerから得られるプラグインパラメータデータ
 */
interface PluginParameters {
    [key: string]: string;
}

/**
 * プラグインパラメータデータ
 */
interface CommonSavePluginParameters {
    /**
     * 共有対象スイッチ番号
     * json文字列形式で与えられる文字列配列
     */
    targetSwitches?: string[];
    /**
     * 共有対象変数番号
     * json文字列形式で与えられる文字列配列
     */
    targetVariables?: string[];
    /**
     * ロード時の共有セーブ自動適用
     * json文字列形式で与えられる論理値
     */
    applyOnLoad?: boolean;
    /**
     * セーブ時の共有セーブ自動保存
     * json文字列形式で与えられる論理値
     */
    applyOnSave?: boolean;
    /**
     * ニューゲーム時の共有セーブ自動適用
     * json文字列形式で与えられる論理値
     */
    applyOnNewGame?: boolean;
    /**
     * オートセーブ時の共有セーブ自動保存
     * json文字列形式で与えられる論理値
     */
    applyOnAutoSave?: boolean;
    /**
     * ゲームオーバー時の共有セーブ自動保存
     * json文字列形式で与えられる論理値
     */
    applyOnGameover?: boolean;
    /**
     * 共有セーブデータファイル名
     */
    saveFileName?: string;
    /**
     * 同一ゲームチェック
     * v1.0.0から追加
     * json文字列形式で与えられる論理値
     */
    checkGameIdentity?: boolean
}

/**
 * 共有セーブ対象スイッチデータ
 */
declare interface TargetGameSwitchesData {
    [idx: number]: boolean;
}

/**
 * 共有セーブ対象変数データ
 */
declare interface TargetGameVariablesData {
    [idx: number]: number;
}
