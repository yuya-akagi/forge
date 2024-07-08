import React, { useState } from 'react';
import { AppBar, Toolbar, Tabs, Tab, Typography, Box } from '@mui/material';
import './App.css';
import ModelCreate from './ModelCreate';
import ModelAdjust from './ModelAdjust';

function MainTabs() {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setSelectedTab(newValue); // タブのインデックスで更新
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FORGE
            </Typography>
        </Toolbar>
      </AppBar>
      <Tabs value={selectedTab} onChange={handleChangeTab} aria-label="simple tabs example" sx={{ marginLeft: 4, marginTop: 2 }}>
            <Tab label="モデル作成" className="tab"/>
            <Tab label="モデル調整" className="tab"/>
      </Tabs>
      {selectedTab == 0 && <ModelCreate />}
      {selectedTab === 1 && <ModelAdjust />}
    </>
  );
}

export default MainTabs;