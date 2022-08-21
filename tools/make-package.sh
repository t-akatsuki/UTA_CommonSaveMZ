#!/bin/bash
#==============================================================
# make-package.sh
#==============================================================
# 配布用zipファイルを作成するスクリプト
#==============================================================
set -eu

# 出力ファイルパス(引数で指定)
declare DEST_FILE_PATH=""
# 現在のパス
declare CURRENT_DIR_PATh="$(pwd)"
# distディレクトリのパス
declare DISTRIBUTION_DIR_PATH="$(realpath $(dirname ${0})/../dist)"

function usage() {
    cat << EOL
==============================================================
$(basename ${0})
==============================================================
# Usage
  bash $(basename ${0}) dest_file_path

# Parameters
  dest_file_path
    Specify output packaging file path.
==============================================================
EOL
}

# 引数に渡した出力ファイルパスを変数に取る
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
            DEST_FILE_PATH="$(realpath ${CURRENT_DIR_PATh%/}/${1})"
            ;;
    esac
    shift
done

# 終了時に下のディレクトリに戻る
trap "cd ${CURRENT_DIR_PATh}" EXIT

# ディレクトリを指定してしまうとzip階層が深くなる為、
# 対象のディレクトリに移動してからzip化する
cd ${DISTRIBUTION_DIR_PATH}
# 既にファイルがある場合は削除するか確認
if [ -f ${DEST_FILE_PATH} ]; then
    read -p "${DEST_FILE_PATH} is already existed. remove it ? [y/n]: " input
    case "${input}" in
        "y" | "Y" | "yes" | "Yes" | "YES" )
            rm -f ${DEST_FILE_PATH}
            ;;
        * )
            echo -e "interrupt process."
            exit 0
            ;;
    esac
fi

zip ${DEST_FILE_PATH} ./ -r -x .gitkeep

cat << EOL

Completed to be packaging.
    ${DISTRIBUTION_DIR_PATH} => ${DEST_FILE_PATH}
EOL
