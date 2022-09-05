//===================================================================
// UTA_CommonSaveMZ用カスタムエラー
//===================================================================
namespace utakata.UTA_CommonSaveMZ {
    /**
     * カスタムエラー用抽象クラス
     */
    abstract class UtaPluginError extends Error {
        constructor(message = "") {
            super(message);
            Object.setPrototypeOf(this, new.target.prototype);
        }
    }

    /**
     * UTA_CommonSave汎用エラークラス
     */
    export class UTA_CommonSaveError extends UtaPluginError {
        constructor(message = "") {
            super(message);
        }
    }

    /**
     * UTA_CommonSave セーブファイル関連エラークラス
     */
    export class UTA_CommonSaveFileError extends UTA_CommonSaveError {
        constructor(message = "") {
            super(message);
        }
    }

    /**
     * UTA_CommonSave セキュリティ関連エラークラス
     */
    export class UTA_CommonSaveSecurrityError extends UTA_CommonSaveError {
        constructor(mesasge = "") {
            super(mesasge);
        }
    }
}
