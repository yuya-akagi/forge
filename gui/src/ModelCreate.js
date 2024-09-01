import React, { useState } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, AppBar, Toolbar, Typography } from '@mui/material';

// Modelコンポーネントの作成
const ModelCreate = () => {
  const [model, setModel] = useState({
    modelName: '',
    // baseModel: '',
    // dataset: '',
    // epochs: '',
  });

  // フォームの入力フィールドが変更された際に呼び出される関数
  const handleChange = (event) => {
    const { name, value } = event.target; // イベント発生源のフィールドからnameとvalueを取得
    setModel(prevModel => ({
      ...prevModel, // 現在の状態を保持
      [name]: value // name属性に基づいて、対応する状態のプロパティを更新,nameは変数展開
    }));
  };

  // フォームの送信を処理
  const handleSubmit = async (event) => {
    event.preventDefault(); // デフォルトのフォーム送信を防ぐ
    console.log(model); // ここでフォームのデータをコンソールに出力

    try {
      // APIの送信処理
      // awaitを使わないと送信処理後に画面が動かなくなる
      const response = await fetch('http://localhost:8000/submit-form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(model),
      });
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const responseData = await response.json();
      console.log(responseData); // サーバーからのレスポンスをコンソールに出力
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // フォームのレンダリング
  return (
    <>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <TextField
            name="modelName"
            label="モデル名入力"
            value={model.modelName}
            onChange={handleChange}
            fullWidth
            sx={{ marginBottom: 2}}
          />

          {/* <FormControl fullWidth>
          <InputLabel id="base-model-label">ベースモデル選択</InputLabel>
            <Select
              labelId="base-model-label"
              id="baseModel"
              name="baseModel"
              value={model.baseModel}
              label="ベースモデル選択"
              onChange={handleChange}
              sx={{ marginBottom: 2}}
            >
              <MenuItem value="GoogLeNet">GoogLeNet</MenuItem>
            </Select>
          </FormControl> */}
          {/* データセット, Epoch数のフィールドを同様に追加 */}
          <Button type="submit" variant="contained">モデル作成</Button>
        </form>
      </div>
    </>
  );
};

export default ModelCreate;
