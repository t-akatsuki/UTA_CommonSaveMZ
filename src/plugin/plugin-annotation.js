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
 * @type string[]
 * @default []
 * @text Share target switches
 * @desc Set target switches number you want make shared.
 * Using "-", the range can be specified.
 * 
 * @param targetVariables
 * @type string[]
 * @default []
 * @text Share target variables
 * @desc Set target variables number you want make shared.
 * Using "-", the range can be specified.
 * 
 * @param applyOnLoad
 * @type boolean
 * @default true
 * @text Apply common save on load game
 * @desc Automatically loading common save on load game timing.
 * ON(true): enabled, OFF(false): disabled
 * 
 * @param applyOnSave
 * @type boolean
 * @default true
 * @text Save common save on save game
 * @desc Automatically saving common save on save game timing.
 * ON(true): enabled, OFF(false): disabled
 * 
 * @param applyOnNewGame
 * @type boolean
 * @default true
 * @text Apply common save on new game
 * @desc Automatically loading common save on start new game.
 * ON(true): enabled, OFF(false): disabled
 * 
 * @param applyOnAutoSave
 * @type boolean
 * @default false
 * @text Save common save on auto-save
 * @desc Automatically saving common save on auto-save timing.
 * ON(true): enabled, OFF(false): disabled
 * 
 * @param applyOnGameover
 * @type boolean
 * @default true
 * @text Save common save on gameover
 * @desc Automatically saving common save on gameover timing.
 * ON(true): enabled, OFF(false): disabled
 * 
 * @param saveFileName
 * @type string
 * @default uta_common
 * @text Save file name
 * @desc Definition of common save file name,
 * which not contained extension.
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
 * Set target switches number you want make shared.
 * You can specify multiple settings.
 * Using "-", the range can be specified.
 * (ex1) 10
 *   => switch of number (10) will be set shared target.
 * (ex2) 10-15
 *   => switches of number (10,11,12,13,14,15) will be set shared targets.
 * 
 * ## Share target variables
 * Set target variables number you want make shared.
 * You can specify multiple settings.
 * Using "-", the range can be specified.
 * The rules for specifiying the number is the same as for
 * "Share target switches".
 * 
 * ## Apply common save on load game
 * Automatically loading common save on load game timing.
 *   ON(true)   : enabled(default)
 *   OFF(false): disabled
 * 
 * ## Save common save on save game
 * Automatically saving common save on save game timing.
 *   ON(true)  : enabled(default)
 *   OFF(false): disabled
 * 
 * ## Apply common save on new game
 * Automatically loading common save on start new game.
 *   ON(true)  : enabled(default)
 *   OFF(false): disabled
 * 
 * ## Save common save on auto-save
 * Automatically saving common save on auto-save timing.
 *   ON(true)  : enabled
 *   OFF(false): disabled(default)
 * 
 * ## Save common save on gameover
 * Automatically saving common save on gameover timing.
 *   ON(true)  : enabled(default)
 *   OFF(false): disabled
 * 
 * ## Save file name
 * Definition of common save file name,
 * which not contained extension.
 * Do not use the same name as the existing save data
 * (file0, global, confid, etc...).
 *   (default: uta_common)
 * 
 * # Plugin Commands
 * ## Load common save
 * Loading shared target switches/variables from common save.
 * This command used when you want to load common save.
 * 
 * ## Save common save
 * Saving shared target switches/variables to common save.
 * This command used when you want to save common save.
 * 
 * ## Remove common save
 * Remove common save data.
 * This command used when you want to reset common save.
 * 
 * ## Check shared switches/variables number
 * Output shared target switches/variables numbers to console.
 * This command for test.
 * 
 * # Plugin Informations
 * Version      : 1.0.0
 * Last Updated : 2022/MM/DD
 * Author       : t-akatsuki
 * Web Site     : https://www.utakata-no-yume.net
 * GitHub       : https://github.com/t-akatsuki
 * Twitter      : https://twitter.com/T_Akatsuki
 * License      : MIT License
 * 
 * # Changelog
 * ## v1.0.0 (2022/MM/DD)
 * Fixed the problem that unintended loading when the sharing target is 
 * reduced later.
 * Adjusted files for distribution.
 * Included an instruction manual in distribution.
 * 
 * ## v0.9.1 (2020/11/11)
 * Fixed a bug that it doesn't work when the plugin parameter
 * "Share target switches" or "Share target variables" is not specified.
 * Added English annotation and README_EN.txt.
 * 
 * ## v0.9.0 (2020/08/22)
 * Beta version.
 * Remake for RPG Maker MV based on UTA_CommonSave plugin for RPG Maker MV.
 * Supports auto-save function.
 */
/*:ja
 * @target MZ
 * @plugindesc セーブデータ間で共有のセーブデータを作成し、
 * 指定したスイッチ/変数の状態をセーブデータ間で共有します。
 * 
 * @author 赤月 智平(t-akatsuki)
 * @url https://www.utakata-no-yume.net
 * 
 * @param targetSwitches
 * @type string[]
 * @default []
 * @text 共有対象スイッチ番号
 * @desc セーブデータ間で共有するスイッチ番号の定義です。
 * 「-」で範囲指定が可能です。
 * 
 * @param targetVariables
 * @type string[]
 * @default []
 * @text 共有対象変数番号
 * @desc セーブデータ間で共有する変数番号の定義です。
 * 「-」で範囲指定が可能です。
 * 
 * @param applyOnLoad
 * @type boolean
 * @default true
 * @on 自動適用する
 * @off 自動適用しない
 * @text ロード時の共有セーブ自動適用
 * @desc ロード時に共有セーブデータの自動適用を行うか。
 * 
 * @param applyOnSave
 * @type boolean
 * @default true
 * @on 自動保存する
 * @off 自動保存しない
 * @text セーブ時の共有セーブ自動保存
 * @desc セーブ時に共有セーブデータの自動保存を行うか。
 * 
 * @param applyOnNewGame
 * @type boolean
 * @default true
 * @on 自動適用する
 * @off 自動適用しない
 * @text ニューゲーム時の共有セーブ自動適用
 * @desc ニューゲーム時に共有セーブの自動適用を行うか。
 * 
 * @param applyOnAutoSave
 * @type boolean
 * @default false
 * @on 自動保存する
 * @off 自動保存しない
 * @text オートセーブ時の共有セーブ自動保存
 * @desc オートセーブ時に共有セーブの自動保存を行うか。
 * 
 * @param applyOnGameover
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
 * @desc 共有セーブデータファイル名の定義です。
 * 拡張子は自動設定される為含めません。
 * 
 * @param checkGameIdentity
 * @type boolean
 * @default true
 * @on 有効にする
 * @off 無効にする
 * @text 同一ゲームチェック機能
 * @desc 共有セーブデータロード時に同一ゲームのものかを確認する。
 * 異なるゲームの共有セーブデータの場合にエラーとします。
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
 *   ON(true)  : 自動適用する(デフォルト値)
 *   OFF(false): 自動適用しない
 * 
 * ## セーブ時の共有セーブ自動保存
 * セーブ時に共有セーブデータの自動保存を行うか。
 * この設定はオートセーブには適用されません。
 *   ON(true)  : 自動保存する(デフォルト値)
 *   OFF(false): 自動保存しない
 * 
 * ## ニューゲーム時の共有セーブ自動適用
 * ニューゲーム時に共有セーブの自動適用を行うか。
 *   ON(true)  : 自動適用する(デフォルト値)
 *   OFF(false): 自動適用しない
 * 
 * ## オートセーブ時の共有セーブ自動保存
 * オートセーブ時に共有セーブの自動保存を行うか。
 *   ON(true)  : 自動保存する
 *   OFF(false): 自動保存しない(デフォルト値)
 * 
 * ## ゲームオーバー時の共有セーブ自動保存
 * ゲームオーバー時に共有セーブデータの自動保存を行うか。
 *   ON(true)  : 自動保存する(デフォルト値)
 *   OFF(false): 自動保存しない
 * 
 * ## 共有セーブデータファイル名
 * 共有セーブデータファイル名の定義です。
 * 拡張子は自動設定される為含めません。
 * 既存セーブデータと重複する名前(file0, global, config等)は
 * 利用しないで下さい。
 *   (デフォルト設定値: uta_common)
 * 
 * ## 同一ゲームチェック機能
 * 共有セーブデータロード時に現在起動中のゲームで記録されたものかを
 * 確認する機能の有効設定です。
 * 他のゲームの共有セーブデータを利用される等のトラブルを防止します。
 *   ON(true)  : 有効にする(デフォルト値)
 *   OFF(false): 無効にする
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