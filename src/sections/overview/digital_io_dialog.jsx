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
  Collapse,
  IconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getIOStatus, setIO } from '../../apis/apis';

const statusStyle = (isActive) => css`
  padding: 10px;
  border-radius: 10px;
  background-color: ${isActive ? '#71f49a' : '#efedec'};
  color: black;
  text-align: center;
`;

const buttonStyle = css`
  display: inline-block;
  margin: 4px;
`;

const dialogContentStyle = css`
  min-height: 400px; /* Adjust as needed */
`;

function IODialog({ open, onClose }) {
  const [activeButtons, setActiveButtons] = useState({
    Cabinet: { DO: [], DI: [], AO: [], AI: [] },
    Tool: { DO: [], DI: [], AI: [] },
    Extend: { extio: [], out: [], in: [] },
  });
  const [currentTab, setCurrentTab] = useState(0);
  const [openSections, setOpenSections] = useState({
    DO: false,
    DI: false,
    AO: false,
    AI: false,
    extio: false,
    out: false,
    in: false,
  });
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
    updatedButtons.Cabinet = {
      DO: data.CABINET.dout[0].slice(0, 16).map((val) => val === 1),
      DI: data.CABINET.din[0].slice(0, 16).map((val) => val === 1),
      AO: data.CABINET.aout[0].slice(0, 16).map((val) => val === 1),
      AI: data.CABINET.ain[0].slice(0, 16).map((val) => val === 1),
    };
    updatedButtons.Tool = {
      DO: data.TOOL.tio_dout[0].slice(0, 2).map((val) => val === 1),
      DI: data.TOOL.tio_din[0].slice(0, 2).map((val) => val === 1),
      AI: data.TOOL.tio_ain[0].slice(0, 2).map((val) => val === 1),
    };
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
    const buttonIndex = button - 1;
    const updatedButtons = { ...activeButtons };
    const isActive = updatedButtons[tabName][type].includes(buttonIndex);

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

    setActiveButtons(updatedButtons);

    const value = isActive ? 0 : 1;

    try {
      await setIO(tabName, type, buttonIndex, value);
    } catch (error) {
      console.error('Failed to update IO status:', error);
    }
  };

  const toggleSection = (type) => {
    setOpenSections((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const renderButtons = (types) => {
    return types.map((type) => (
      <React.Fragment key={type}>
        <Grid item xs={12}>
          <h3>
            {type}
            <IconButton onClick={() => toggleSection(type)}>
              <ExpandMoreIcon
                style={{
                  transform: openSections[type]
                    ? 'rotate(0deg)'
                    : 'rotate(180deg)',
                }}
              />
            </IconButton>
          </h3>
        </Grid>
        <Collapse in={openSections[type]} timeout="auto" unmountOnExit>
          <Grid container spacing={1}>
            {buttons.map((button) => (
              <Grid item key={button} css={buttonStyle}>
                <Button
                  variant={
                    activeButtons[tabNames[currentTab]][type]?.includes(
                      button - 1
                    )
                      ? 'contained'
                      : 'outlined'
                  }
                  color="primary"
                  onClick={() => handleButtonClick(button, type)}
                >
                  {`${type} ${button}`}
                </Button>
              </Grid>
            ))}
          </Grid>
        </Collapse>
      </React.Fragment>
    ));
  };

  const renderStatus = (types) => {
    return types.map((type) => (
      <React.Fragment key={type}>
        <Grid item xs={12}>
          <h3>
            {type}
            <IconButton onClick={() => toggleSection(type)}>
              <ExpandMoreIcon
                style={{
                  transform: openSections[type]
                    ? 'rotate(0deg)'
                    : 'rotate(180deg)',
                }}
              />
            </IconButton>
          </h3>
        </Grid>
        <Collapse in={openSections[type]} timeout="auto" unmountOnExit>
          <Grid container spacing={1}>
            {activeButtons[tabNames[currentTab]][type].map(
              (isActive, index) => (
                <Grid item key={index} css={buttonStyle}>
                  <div css={statusStyle(isActive)}>
                    {`${type} ${index + 1} : `}{' '}
                    {isActive ? 'Active' : 'Inactive'}
                  </div>
                </Grid>
              )
            )}
          </Grid>
        </Collapse>
      </React.Fragment>
    ));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>{title}</DialogTitle>
      <Tabs value={currentTab} onChange={handleTabChange} centered>
        <Tab label="Cabinet" />
        <Tab label="Tool" />
        <Tab label="Extend" />
      </Tabs>
      <DialogContent css={dialogContentStyle}>
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
