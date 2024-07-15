#!/bin/bash

set -e
CURRENT_MONTH=$(date +"%Y-%m")
BASEDIR=$(dirname "$(readlink -f "$0")")
LOGDIR="$BASEDIR/logs"

if [ ! -d "$LOGDIR" ]; then
  mkdir -p "$LOGDIR"
fi

# GUIのセットアップ
cd "$BASEDIR/gui"

# node_modulesフォルダが存在しない場合のみnpm installを実行
if [ ! -d "node_modules" ]; then
  npm install
fi

# GUIサーバーの起動
screen -dmS gui_server bash -c "
cd \"$BASEDIR/gui\" && npm start >> \"$LOGDIR/npm_start_$CURRENT_MONTH.log\" 2>&1
"

# APIサーバーの起動
screen -dmS api_server bash -c "
cd \"$BASEDIR/api\" && uvicorn main:app --reload --port 8000 >> \"$LOGDIR/uvicorn_$CURRENT_MONTH.log\" 2>&1
"
