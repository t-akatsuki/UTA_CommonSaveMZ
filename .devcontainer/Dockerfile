#=====================================================================================
# RPGツクールMZ TypeScript開発環境用Dockerfile
#=====================================================================================
# Ubuntu LTSベースの環境とする
# https://hub.docker.com/_/ubuntu
FROM ubuntu:focal

# デフォルトシェルをbashに変更
SHELL ["/bin/bash", "-c"]

# 環境変数の設定
ENV \
    # 言語設定
    LOCALE_LANG="ja_JP.UTF-8" \
    # ダウンロードするnvmのURL
    # https://github.com/nvm-sh/nvm
    NVM_DOWNLOAD_URL="https://github.com/nvm-sh/nvm/archive/refs/tags/v0.39.1.tar.gz"

# ワークディレクトリを/rootに
WORKDIR /root

RUN set -eu && \
    # 各種パッケージのインストール
    apt-get update && \
    apt-get install -y locales curl zip git git-lfs tig && \
    # 言語設定
    locale-gen ${LOCALE_LANG} && \
    # nvmからnode.js 最新LTSをインストール
    # マニュアルインストールする事で複数ユーザーが利用できるように
    mkdir -p /usr/local/nvm && \
    curl -L ${NVM_DOWNLOAD_URL} -o- | tar zxf - -C /usr/local/nvm/ --strip=1 && \
    echo "source /usr/local/nvm/nvm.sh" >> ~/.bash_profile && \
    source ~/.bash_profile && \
    nvm install --lts && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# 言語関連環境変数
# locale-gen後で無いとエラーが出るので後に実施
ENV \
    LANG="${LOCALE_LANG}" \
    LANGUAGE="${LOCALE_LANG}" \
    LC_ALL="${LOCALE_LANG}"

# 実際の作業は/usr/local/workで行う
WORKDIR /usr/local/work

# 作業ディレクトリをvolumeとして公開
VOLUME ["/usr/local/work"]
