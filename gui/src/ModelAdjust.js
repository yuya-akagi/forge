import { dividerClasses } from '@mui/material';
import React, { useState,useEffect } from 'react';

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
        <table style={{ width: "50%", borderCollapse: "collapse" }}>
                <thead>
                    <tr>
                        <th style={styles.headerCell}>ID</th>
                        <th style={styles.headerCell}>Name</th>
                        <th style={styles.headerCell}>Dataset</th>
                        <th style={styles.headerCell}>Epochs</th>
                        <th style={styles.headerCell}>Create Date</th>
                    </tr>
                </thead>
                <tbody>
                    {models.map(model => (
                        <tr key={model.id}>
                            <td style={styles.cell}>
                                <input
                                  type="radio"
                                  name="model"
                                  value={model.id}
                                  checked={selectedModelId === model.id}
                                  onChange={handleRadioChange}
                                  />
                            </td>
                            <td style={styles.cell}>{model.name}</td>
                            <td style={styles.cell}>{model.dataset}</td>
                            <td style={styles.cell}>{model.epochs}</td>
                            <td style={styles.cell}>{model.createDate}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

const styles = {
    headerCell: {
        border: "1px solid #dddddd",
        textAlign: "left",
        padding: "8px",
        backgroundColor: "#f2f2f2"
    },
    cell: {
        border: "1px solid #dddddd",
        textAlign: "left",
        padding: "8px"
    }
};

export default ModelAdjust;