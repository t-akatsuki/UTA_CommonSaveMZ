# UTA_CommonSaveMZプラグイン
## 概要
セーブデータ間で共有のセーブデータを作成し、指定したスイッチ・変数の状態をセーブデータ間で共有するRPGツクールMZ用プラグインです。

設定に応じてセーブ・ロード時に自動的に反映を行わせる事ができます。  
プラグインコマンドを利用すると、任意のタイミングで共有セーブデータの操作が可能です。

ゲームクリア情報やCGの閲覧情報などをスイッチや変数で管理したい場合に有効です。  
スクリプトの知識を必要とせず、従来のスイッチ・変数操作での制作に注力する事ができます。  
また、独自のセーブファイルを利用している為、他のプラグインとの競合が起こりにくいのが特徴です。

本プラグインでは通常のセーブデータとは別に共有セーブデータを作成します。  
local版ではsaveディレクトリ以下に共有セーブデータファイルが作成されます。  
web版ではLocalStorageに共有セーブデータが保存されます。  

本プラグインはRPGツクールMZ用の為、RPGツクールMVでは動作しません。  
RPGツクールMVで利用したい場合は以下のプラグインを利用してください。

- https://github.com/t-akatsuki/UTA_CommonSaveMV

## 利用方法
ご自身のプロジェクトに`UTA_CommonSaveMZ.js`を配置し、プラグインの有効化、共有対象とするスイッチ、変数をプラグインパラメータに指定してください。

セーブ・ロード時に設定に応じて自動的に処理してくれます。  
プラグインコマンドを利用すると、任意のタイミングで共有セーブデータの操作を行う事ができます。  

詳しい利用方法はプラグインのヘルプを参照してください。

RPGツクールMZのプラグインの導入方法については以下の公式ページに情報がまとまっています。
- [RPGツクールMZ プラグイン講座](https://tkool.jp/mz/plugin/)

## 更新履歴
### 0.9.1 (2020/11/11)
プラグインパラメータ「共有対象スイッチ番号」もしくは「共有対象変数番号」を指定していないと正常動作しない不具合の修正。  
英語版アノテーション, README_EN.txtの追加。

### 0.9.0 (2020/08/22)
β版。  
RPGツクールMV用UTA_CommonSaveをベースにRPGツクールMZ用に移植。  
オートセーブ機能への対応。

## ライセンス
本プラグインは[MIT License](LICENSE)です。

配布、変更、商用利用は可能でありますが、ソフトウェアの著作権表示と、MIT Licenseの全文もしくは全文を掲載したWebページのURLを、ソースコードの中や、ソースコードに同梱したライセンス表示用の別ファイルなどに掲載して下さい。

これらソフトウェアには何の保障もありません。  
例え、これらのソフトウェアを利用した事で何か問題が起こったとしても、作者は何の責任も負いません。

- 商用/非商用問わずにご利用いただけます。
- また年齢制限のあるコンテンツのご利用も制限しておりません。
- 作品のリリースの際にはご報告いただけると作者が喜びます。(任意です)

## 連絡先

|  |  |
|:---:|:---|
| Author | 赤月 智平(t-akatsuki) |
| WebSite | www.utakata-no-yume.net |
| GitHub | https://github.com/t-akatsuki |
| Twitter | [@T_Akatsuki](https://twitter.com/t_akatsuki) |
