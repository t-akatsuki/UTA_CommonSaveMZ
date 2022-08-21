#!/bin/bash
#==============================================================
# apply-plugin-to-project.sh
#==============================================================
# テストプロジェクトのプラグインディレクトリに
# プラグインファイルを適用するスクリプト
#==============================================================
set -eu

# このスクリプトのディレクトリパス
declare SCRIPT_DIR_PATH="$(dirname ${0})"
# ツクールプロジェクトの配置ディレクトリ
declare PROJECT_DIR_PATH="$(realpath ${SCRIPT_DIR_PATH%/}/../rmmz-project)"
# 適用対象のプラグインファイルパス(引数で指定)
declare APPLY_TARGET_PLUGIN_FILE_PATH=""

function usage() {
    cat << EOL
==============================================================
$(basename ${0})
==============================================================
# Usage
  bash $(basename ${0}) apply_target_plugin_file_path

# Parameters
  apply_target_plugin_file_path
    Specify plugin file path.
==============================================================
EOL
}

# 引数で渡した適用対象プラグインファイルパスを変数に取る
if [ ${#} -gt 1 ]; then
    usage
    exit 1
fi
while [ ${#} -gt 0 ];
do
    case "${1}" in
        "-h" | "--help" | "--usage" )
            usage
            exit 0
            ;;
        * )
            APPLY_TARGET_PLUGIN_FILE_PATH="${1}"
            ;;
    esac
    shift
done

# 適用対象のファイルが存在するかチェック
if [ ! -f ${APPLY_TARGET_PLUGIN_FILE_PATH} ]; then
    echo -e "[error] apply target file is not found. (${APPLY_TARGET_PLUGIN_FILE_PATH})"
    exit 1
fi

# 配置先のディレクトリが存在するかをチェックし、
# 配置先が存在する場合にのみファイルコピーを行う
declare TARGET_DIR_GLOB="${PROJECT_DIR_PATH%/}/**/js/plugins"
declare TARGET_DIR_COUNT=$(find ${TARGET_DIR_GLOB} -type d 2> /dev/null | wc -l)
if [ ${TARGET_DIR_COUNT} -ge 1 ]; then
    cp -f ${APPLY_TARGET_PLUGIN_FILE_PATH} ${TARGET_DIR_GLOB}
    echo -e "Apply plugin file to project plugin directory."
else
    echo -e "[info] deploy target project is not existed. nothing to do."
fi
