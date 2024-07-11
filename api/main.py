from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

# CORSミドルウェアの設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのオリジンを許可
    allow_credentials=True,
    allow_methods=["*"],  # すべてのHTTPメソッドを許可
    allow_headers=["*"],  # すべてのHTTPヘッダーを許可
)

# デモデータ
models = [
    {"id": 1, "name": "Model A", "dataset": "Dataset 1", "epochs": 10, "createDate": "2021-01-01"},
    {"id": 2, "name": "Model B", "dataset": "Dataset 2", "epochs": 20, "createDate": "2021-02-01"},
]

# @app.get("/models", response_model=List[Model])
# async def get_models():
#     return models


@app.get("/")
async def read_root():
    return {"message": "Hello, World!"}

@app.get("/models",response_model=List[Model])
async def get_models():
    return models

@app.post("/submit-form/")
async def handle_form_submit(request: Request):
    form_data = await request.json()
    model_name = form_data['modelName'] # form_dataからmodelNameの値を取得

    result = subprocess.run(
            ["python", "../cui/main.py", model_name],
            capture_output=True,  # 出力をキャプチャする
    )
    return {"received_modelName": model_name, "script_output": result.stdout}
