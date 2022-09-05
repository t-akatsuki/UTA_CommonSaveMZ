/**
 * ESLint設定ファイル
 * 
 * ESLint
 * https://eslint.org/
 * TypeScript ESLint
 * https://typescript-eslint.io/
 * Prettier
 * https://prettier.io/docs/en/integrating-with-linters.html
 */
 module.exports = {
    "root": true,
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "6",
        "sourceType": "script",
        "tsconfigRootDir": __dirname,
        "project": [
            "./tsconfig.json"
        ]
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking",
        "prettier"
    ],
    "rules": {
        /**
         * ESLint rules
         * https://eslint.org/docs/rules/
         */
        // TypeScript側で未定義のチェックをする為、no-undefルールは外す
        "no-undef": "off",
        // 名前空間定義と相性が悪い為、未使用の変数を許容する
        "no-unused-vars": "off",
        // 行末のセミコロンの付与を必須とする(typescript-eslintで設定)
        "semi": "off",
        // ブロックステートメントの括弧の前にスペースを強要しない(typescript-eslintで設定)
        "space-before-blocks": "off",
        // 関数定義の引数括弧の前にスペースを強要しない(typescript-eslintで設定)
        "space-before-function-paren": "off",
        // 括弧内のスペースを強要しない
        "space-in-parens": "off",
        /**
         * typescript-eslint rules
         * https://typescript-eslint.io/rules/
         */
        // 名前空間を許容する
        // non moduleでは名前空間汚染が問題になるので利用必須
        "@typescript-eslint/no-namespace": 0,
        // thisのaliasを許可
        // ただし特定の名前でしか許可しない
        "@typescript-eslint/no-this-alias": [
            "error",
            {
                "allowDestructuring": false,
                "allowedNames": [
                    "self",
                    "_this",
                    "thiz"
                ]
            }
        ],
        // 名前空間定義と相性が悪い為、未使用の変数を許容する
        "@typescript-eslint/no-unused-vars": "off",
        // 行末のセミコロンの付与を必須とする
        "@typescript-eslint/semi": ["error"],
        // ブロックステートメントの括弧の前にスペースを入れる
        "@typescript-eslint/space-before-blocks": ["error"],
        // 関数定義の引数括弧の前にスペースを強要しない
        "@typescript-eslint/space-before-function-paren": "off",
        // non moduleではimport等が利用できない為、トリプルスラッシュ参照を許容する
        "@typescript-eslint/triple-slash-reference": [
            "error",
            {
                "path": "always",
                "types": "always",
                "lib": "always"
            }
        ],
        // コアスクリプトのメソッドのオーバーライド時にエラーとなるのでオフ
        "@typescript-eslint/unbound-method": "off"
    }
};
