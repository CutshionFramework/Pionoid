/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import { getIOStatus, setIO } from '../../apis/apis';

const statusStyle = (isActive) => css`
  padding: 10px;
  border-radius: 5px;
  background-color: ${isActive ? '#71f49a' : '#efedec'};
  color: black;
  text-align: center;
`;

function IODialog({ open, onClose }) {
  const [activeButtons, setActiveButtons] = useState({
    Cabinet: { DO: [], DI: [], AO: [], AI: [] },
    Tool: { DO: [], DI: [], AI: [] },
    Extend: { extio: [], out: [], in: [] },
  });
  const [currentTab, setCurrentTab] = useState(0);
  const buttons = Array.from({ length: 16 }, (_, i) => i + 1); // 고정된 버튼 배열
  const tabNames = ['Cabinet', 'Tool', 'Extend'];
  const title = tabNames[currentTab];

  useEffect(() => {
    if (open) {
      fetchIOStatus();
    }
  }, [open, currentTab]);

  const fetchIOStatus = async () => {
    try {
      const response = await getIOStatus();
      console.log(response);
      updateButtonStates(response);
    } catch (error) {
      console.error('Failed to fetch IO status:', error);
    }
  };

  const updateButtonStates = (data) => {
    const updatedButtons = { ...activeButtons };
    // Cabinet
    updatedButtons.Cabinet = {
      DO: data.CABINET.dout[0].slice(0, 16).map((val) => val === 1),
      DI: data.CABINET.din[0].slice(0, 16).map((val) => val === 1),
      AO: data.CABINET.aout[0].slice(0, 16).map((val) => val === 1),
      AI: data.CABINET.ain[0].slice(0, 16).map((val) => val === 1),
    };
    // Tool
    updatedButtons.Tool = {
      DO: data.TOOL.tio_dout[0].slice(0, 2).map((val) => val === 1),
      DI: data.TOOL.tio_din[0].slice(0, 2).map((val) => val === 1),
      AI: data.TOOL.tio_ain[0].slice(0, 2).map((val) => val === 1),
    };
    // Extend
    updatedButtons.Extend = {
      extio: data.EXTEND.extio.length ? [data.EXTEND.extio[0] === 'extio'] : [],
      out: data.EXTEND.out.slice(0, 16).map((val) => val === 1),
      in: data.EXTEND.in.slice(0, 16).map((val) => val === 1),
    };
    setActiveButtons(updatedButtons);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleButtonClick = async (button, type) => {
    const tabName = tabNames[currentTab];
    const buttonIndex = button - 1; // Convert to zero-based index
    const updatedButtons = { ...activeButtons };
    const isActive = updatedButtons[tabName][type].includes(buttonIndex);

    // Toggle the button state
    if (isActive) {
      updatedButtons[tabName][type] = updatedButtons[tabName][type].filter(
        (b) => b !== buttonIndex
      );
    } else {
      updatedButtons[tabName][type] = [
        ...updatedButtons[tabName][type],
        buttonIndex,
      ];
    }

    // Set the new state
    setActiveButtons(updatedButtons);

    // Determine the value to send ('on' or 'off')
    const value = isActive ? 0 : 1;

    // Send the IO status to the server
    try {
      await setIO(tabName, type, buttonIndex, value);
    } catch (error) {
      console.error('Failed to update IO status:', error);
    }
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
                activeButtons[tabNames[currentTab]][type]?.includes(button - 1)
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

  const renderStatus = (types) => {
    return types.map((type) => (
      <React.Fragment key={type}>
        <Grid item xs={12}>
          <h3>{type}</h3>
        </Grid>
        {activeButtons[tabNames[currentTab]][type].map((isActive, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <div css={statusStyle(isActive)}>
              {`${type} ${index + 1} : `}
              {isActive ? 'Active' : 'Inactive'}
            </div>
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
          {currentTab === 0 && (
            <>
              {renderButtons(['DO', 'AO'])}
              {renderStatus(['DI', 'AI'])}
            </>
          )}
          {currentTab === 1 && (
            <>
              {renderButtons(['DO'])}
              {renderStatus(['DI', 'AI'])}
            </>
          )}
          {currentTab === 2 && (
            <>
              {renderButtons(['extio', 'out'])}
              {renderStatus(['in'])}
            </>
          )}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default IODialog;
