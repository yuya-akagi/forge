import { dividerClasses } from '@mui/material';
import React, { useState,useEffect } from 'react';
import './App.css';

function ModelAdjust() {
    const [models, setModels] = useState([]);
    const [selectedModelId, setSelectedModelId] = useState();

    useEffect(() => {
        //モデルデータの取得
        const fetchModels = async () => {
            const response = await fetch('http://127.0.0.1:8000/models');
            const data = await response.json();
            // setModels関数でmodelsをdataで更新
            setModels(data);
        };
    
        fetchModels();
    }, [])//空の依存配列：コンポーネントの初回レンダリング時に一度だけ実行
    if (models.length === 0) {
        return <div>Loading...</div>;
    }
    const handleRadioChange = (event) => {
        setSelectedModelId(parseInt(event.target.value));
    }
return (
    <div>
        <h1>モデル調整画面</h1>
        <div style={{ marginLeft: "1%" }}>
        <table style={{ width: "40%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th className='headerCell'>ID</th>
                        <th className='headerCell'>Name</th>
                        <th className='headerCell'>Dataset</th>
                        <th className='headerCell'>Epochs</th>
                        <th className='headerCell'>Create Date</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => (
                        <tr key={model.id}>
                            <td className='cell'>
                                <input
                                  type="radio"
                                  name="model"
                                  value={model.id}
                                  checked={selectedModelId === model.id}
                                  onChange={handleRadioChange}
                                  />
                            </td>
                            <td className='cell'>{model.name}</td>
                            <td className='cell'>{model.dataset}</td>
                            <td className='cell'>{model.epochs}</td>
                            <td className='cell'>{model.createDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    );
}

export default ModelAdjust;