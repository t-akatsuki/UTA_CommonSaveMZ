//===================================================================
// UTA_CommonSaveMZ 同一ゲームチェック機能
//===================================================================
/// <reference path="./UTA_CommonSaveMZ.d.ts"/>
/// <reference path="./Error.ts"/>

namespace utakata.UTA_CommonSaveMZ {
    /**
     * ゲーム同一チェック関連処理を扱うクラス
     */
    export class GameIdentityManager {
        private static readonly SEPARATOR = "-";
        private static readonly SALTING_AMOUNT = 2;

        constructor() {
            throw new Error(`${this.constructor.name} is static class`);
        }

        /**
         * 現在のゲームを一意に特定する為の識別子を作成する
         * 
         * @returns 作成した識別子文字列
         * @throws {@link UTA_CommonSaveError} 作成失敗時に送出される
         */
        public static getCurrentGameIdentity(): string {
            try {
                const encoder = new TextEncoder();
                const gameId = $dataSystem.advanced.gameId ?? "";
                const salt = Array.prototype.map.call(new Uint8Array(this.SALTING_AMOUNT), (x: number) => { return x.toString(16); });
                const elements = [Utils.RPGMAKER_NAME, CommonSave.PLUGIN_NAME, gameId, salt];
                const encoded = encoder.encode(elements.join(this.SEPARATOR));
                const identity = Array.prototype.map.call(encoded, (x: number) => { return x.toString(16); }).join("");
                return identity;
            } catch (e) {
                let errMessage = "";
                let errStack = "";
                if (e instanceof Error) {
                    errMessage = e.message ?? "";
                    errStack = e.stack ?? "";
                }
                console.error(`[${CommonSave.PLUGIN_NAME}] GameIdentityManager.getCurrentGameIdentity: Failed to crete current game identity.`);
                console.error(`[${CommonSave.PLUGIN_NAME}] Error message: \n${errMessage}`);
                console.error(`[${CommonSave.PLUGIN_NAME}] Error stack: \n${errStack}`);
                throw new UTA_CommonSaveError(`[${CommonSave.PLUGIN_NAME}] Failed to create current game identity (${errMessage})`);
            }
        }

        /**
         * 共有セーブデータから識別子を取得する
         * 
         * @remarks
         * v1.0.0未満で作成された共有セーブデータには取得対象が含まれていない点に注意
         * 
         * @param contents - ロードした共有セーブデータ
         * @returns 共有セーブデータに保存されたゲーム識別子
         * @throws {@link UTA_CommonSaveFileError} 取得対象が存在しない場合に送出される
         */
        public static getCommonSaveIdentity(contents: CommonSaveData): string {
            if (!("gameIdentity" in contents)) {
                console.error(`[${CommonSave.PLUGIN_NAME}] GameIdentityManager.getCommonSaveIdentity: Game identity data is not found in common save data.`);
                throw new UTA_CommonSaveFileError(`[${CommonSave.PLUGIN_NAME}] Common save data is invalid format`);
            }
            return contents.gameIdentity ?? "";
        }

        /**
         * 共有セーブデータと現在起動中のゲームの同一チェックを行う
         * 
         * @remarks
         * 同一で無いと判定された場合はUTA_CommonSaveSecurrityError例外を送出する
         * 
         * @param contents - ロードした共有セーブデータ
         * @return ロードした共有セーブデータが現在起動中ゲームのものである場合true, 異なる場合はfalse
         * @throws {@link UTA_CommonSaveError} 同一チェック用データが読み取り処理時の例外を補足した場合に送出
         * @throws {@link UTA_CommonSaveFileError} 共有セーブデータ読み込みに失敗した場合に送出
         * @throws {@link UTA_CommonSaveSecurrityError} 異なるゲームの共有セーブデータである場合に送出
         */
        public static checkGameIdentity(contents: CommonSaveData): boolean {
            const currentGameIdentity = this.getCurrentGameIdentity();
            const commonSaveGameIdentity = this.getCommonSaveIdentity(contents);
            let isValid = true;

            try {
                const currentGameIdentityBytes = this.getGameIdentityByteArray(currentGameIdentity);
                const commonSaveGameIdentityBytes = this.getGameIdentityByteArray(commonSaveGameIdentity);

                const decoder = new TextDecoder();
                const currentGameIdentityDecoded = decoder.decode(currentGameIdentityBytes);
                const commonSaveGameIdentityDecoded = decoder.decode(commonSaveGameIdentityBytes);
                isValid = this.compare(currentGameIdentityDecoded, commonSaveGameIdentityDecoded);
            } catch (e) {
                let errMessage = "";
                let errStack = "";
                if (e instanceof Error) {
                    errMessage = e.message ?? "";
                    errStack = e.stack ?? "";
                }
                console.error(`[${CommonSave.PLUGIN_NAME}] GameIdentityManager.checkGameIdentity: Failed to check game identity.`);
                console.error(`[${CommonSave.PLUGIN_NAME}] Current game identity: ${currentGameIdentity}`);
                console.error(`[${CommonSave.PLUGIN_NAME}] Common save gameIdentity: ${commonSaveGameIdentity}`);
                console.error(`[${CommonSave.PLUGIN_NAME}] Error message: \n${errMessage}`);
                console.error(`[${CommonSave.PLUGIN_NAME}] Error stack: \n${errStack}`);
                throw new UTA_CommonSaveError(`[${CommonSave.PLUGIN_NAME}] game identity check error`);
            }

            if (!isValid) {
                console.warn(`[${CommonSave.PLUGIN_NAME}] GameIdentityManager.checkGameIdentity: Ditected different game identity.`);
                console.warn(`[${CommonSave.PLUGIN_NAME}] Current game identity: ${currentGameIdentity}`);
                console.warn(`[${CommonSave.PLUGIN_NAME}] Common save gameIdentity: ${commonSaveGameIdentity}`);
            }

            return isValid;
        }

        protected static getGameIdentityByteArray(gameIdentity: string): Uint8Array {
            const hexes = gameIdentity.match(/.{2}/g) ?? [];
            if (hexes.length <= 0) {
                throw new UTA_CommonSaveSecurrityError("Invalid gameIdentity - data broken");
            }
            return Uint8Array.from(hexes.map<number>((x: string) => {
                const ret = parseInt(x, 16);
                if (ret !== ret) {
                    throw new UTA_CommonSaveSecurrityError("Invalid gameIdentity - data broken");
                }
                return ret;
            }));
        }

        protected static compare(currentGameIdentity: string, commonSaveGameIdentity: string): boolean {
            const currentGameIdentityElements = currentGameIdentity.split(this.SEPARATOR);
            const commonSaveGameIdentityElements = commonSaveGameIdentity.split(this.SEPARATOR);
            if (commonSaveGameIdentityElements.length !== 4 || 
                commonSaveGameIdentityElements.length !== currentGameIdentityElements.length) {
                throw new UTA_CommonSaveSecurrityError("invalid format");
            }
            for (let i = 0; i < 4; i++) {
                if (i < 3) {
                    if (currentGameIdentityElements[i] !== commonSaveGameIdentityElements[i]) {
                        return false;
                    }
                }
            }
            return true;
        }
    };
}
