//===================================================================
// Version v1.0.0
//===================================================================
namespace utakata.UTA_CommonSaveMZ {
    /**
     * バージョン値を扱うクラス
     * 
     * @remarks
     * バージョンはセマンティックバージョニング2.0.0形式で扱う
     */
    export class Version {
        /**
         * セパレーター文字の定義
         */
        protected static readonly SEPARATOR: string = ".";

        /**
         * メジャーバージョン値
         * @defaultValue 0
         */
        protected _major: number;
        /**
         * マイナーバージョン値
         * @defaultValue 0
         */
        protected _minor: number;
        /**
         * パッチバージョン値
         * @defaultValue 0
         */
        protected _patch: number;

        /**
         * @param major - メジャーバージョン
         * @param minor - マイナーバージョン
         * @param patch - パッチバージョン
         */
        constructor(major = 0, minor = 0, patch = 0) {
            this._major = 0;
            this._minor = 0;
            this._patch = 0;
            this.set(major, minor, patch);
        }

        get major(): number {
            return this._major;
        }

        get minor(): number {
            return this._minor;
        }

        get patch(): number {
            return this._patch;
        }

        /**
         * バージョンを文字列として得る
         * 
         * @returns バージョン文字列
         */
        public toString(): string {
            return Array.prototype.join.call([this.major, this.minor, this.patch], Version.SEPARATOR);
        }

        /**
         * バージョンをセットする
         * 
         * @param major - 設定するメジャーバージョン
         * @param minor - 設定するマイナーバージョン
         * @param patch - 設定するパッチバージョン
         */
        public set(major: number, minor: number, patch: number): void {
            this._major = major;
            this._minor = minor;
            this._patch = patch;
        }
        
        /**
         * 比較対象と比べてこのオブジェクトが「同等」のバージョンかを返す
         * 
         * @param target - 比較対象のバージョンオブジェクト
         * @returns 「同等」のバージョンである場合はtrueを返す
         */
        public isEqual(target: Version): boolean {
            return this.major === target.major && 
                    this.minor === target.minor && 
                    this.patch === target.patch;
        }

        /**
         * 比較対象と比べてこのオブジェクトが「未満(より下)」のバージョンかを返す
         * 
         * @param target - 比較対象のバージョンオブジェクト
         * @returns 「未満(より下)」のバージョンである場合はtrueを返す
         */
        public isLessThan(target: Version): boolean {
            if (this.major > target.major) {
                return false;
            }
            if (this.minor > target.minor) {
                return false;
            }
            if (this.patch >= target.patch) {
                return false;
            }
            return true;
        }

        /**
         * 比較対象と比べてこのオブジェクトが「以上」のバージョンかを返す
         * 
         * @param target - 比較対象のバージョンオブジェクト
         * @returns 「以上」のバージョンである場合はtrueを返す
         */
        public isGreaterThanEqual(target: Version): boolean {
            return !this.isLessThan(target);
        }

        /**
         * 比較対象と比べてこのオブジェクトが「以下」のバージョンかを返す
         * 
         * @param target - 比較対象のバージョンオブジェクト
         * @returns 「以下」のバージョンである場合はtrueを返す
         */
        public isLessThanEqual(target: Version): boolean {
            return this.isEqual(target) || this.isLessThan(target);
        }

        /**
         * 比較対象と比べてこのオブジェクトが「より上」のバージョンかを返す
         * 
         * @param target - 比較対象のバージョンオブジェクト
         * @returns 「より上」のバージョンである場合はtrueを返す
         */
        public isGreaterThan(target: Version): boolean {
            return !this.isLessThanEqual(target);
        }

        /**
         * バージョン文字列からバージョンオブジェクトを生成する
         * 
         * @param versionString - バージョン文字列
         * @returns 文字列から生成したバージョンオブジェクト
         * 期待する文字列では無くバージョンが得られない場合はnullを返す
         */
        public static fromString(versionString: string): Version | null {
            const versionNumberList: number[] = [];
            try {
                const versionStrList = versionString.split(this.SEPARATOR);
                if (versionStrList.length !== 3) {
                    return null;
                }
                for (const versionStr of versionStrList) {
                    const versionNumber = parseInt(versionStr, 10);
                    if (typeof versionNumber !== typeof 0 || versionNumber !== versionNumber) {
                        return null;
                    }
                    versionNumberList.push(versionNumber);
                }
            } catch (e: unknown) {
                console.error(`${this.constructor.name}.fromString: failed to parse version string. (arg=${versionString})`);
                if (e instanceof Error) {
                    console.error(`${e.message}`);
                }
                throw e;
            }
            return new this(...versionNumberList);
        }
    }
}
