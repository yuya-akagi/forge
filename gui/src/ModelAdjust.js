import React, { useState,useEffect } from 'react';

function ModelAdjust() {
    const [models, setModels] = useState([]);
    useEffect(() => {
        //モデルデータの取得
        const fetchModels = async () => {
            const response = await fetch('http://example.com/api/models');
            const data = await response.json();
            setModels(data);
        };
    
        fetchModels();
    }, [])

return (
    <div>
        <h1>モデル調整画面</h1>
    </div>
);

}

export default ModelAdjust;