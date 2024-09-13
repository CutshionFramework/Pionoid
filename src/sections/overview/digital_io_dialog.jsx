import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
  Tabs,
  Tab,
} from '@mui/material';

function IODialog({ open, onClose }) {
  const [activeButtons, setActiveButtons] = useState({
    Cabinet: [],
    Tool: [],
    Extend: [],
  }); // 각 탭의 버튼 상태를 별도로 관리
  const [currentTab, setCurrentTab] = useState(0); // 현재 선택된 탭 인덱스
  const buttons = Array.from({ length: 16 }, (_, i) => i + 1);

  const tabNames = ['Cabinet', 'Tool', 'Extend'];
  const title = tabNames[currentTab];

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleButtonClick = (button, type) => {
    console.log(`Tab: ${title}, Type: ${type}, Button: ${button}`);

    setActiveButtons((prevActiveButtons) => {
      const updatedButtons = { ...prevActiveButtons };
      const tabName = tabNames[currentTab];

      const buttonKey = `${type}_${button}`;
      updatedButtons[tabName] = updatedButtons[tabName].includes(buttonKey)
        ? updatedButtons[tabName].filter((b) => b !== buttonKey)
        : [...updatedButtons[tabName], buttonKey];

      return updatedButtons;
    });
  };

  const renderButtons = (types) => {
    return types.map((type) => (
      <React.Fragment key={type}>
        <Grid item xs={12}>
          <h3>{type}</h3>
        </Grid>
        {buttons.map((button) => (
          <Grid item xs={12} sm={6} md={4} key={button}>
            <Button
              variant={
                activeButtons[tabNames[currentTab]].includes(
                  `${type}_${button}`
                )
                  ? 'contained'
                  : 'outlined'
              }
              color="primary"
              fullWidth
              onClick={() => handleButtonClick(button, type)}
            >
              {`${type} ${button}`}
            </Button>
          </Grid>
        ))}
      </React.Fragment>
    ));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Cabinet" />
        <Tab label="Tool" />
        <Tab label="Extend" />
      </Tabs>
      <DialogContent>
        <Grid container spacing={2}>
          {currentTab === 0 && renderButtons(['DO', 'DI', 'AO', 'AI'])}
          {currentTab === 1 && renderButtons(['DO', 'DI', 'AI'])}
          {currentTab === 2 && renderButtons(['extio', 'out', 'in'])}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default IODialog;
