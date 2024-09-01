# ベースイメージとしてPythonを使用
FROM python:3.9-slim

# 作業ディレクトリを設定
WORKDIR /app

# 必要なパッケージをインストール
#COPY requirements.txt .
#RUN pip install --no-cache-dir -r requirements.txt

# スクリプトとその他のファイルをコンテナにコピー
COPY . .

# デフォルトのコマンドを設定（必要に応じて）
#CMD ["python3", "main.py"]
