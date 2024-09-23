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
  background-color: ${isActive ? '#92bea9' : '#efedec'};
  color: ${isActive ? '#f7edda' : 'black'};
  text-align: center;
`;

const buttonContainerStyle = css`
  display: inline-block;
  margin: 4px;
`;

const buttonStyle = (isActive) => css`
  border-color: ${isActive ? '#4F7670' : '#c5deda'};
  background-color: ${isActive ? '#4F7670' : '#c5deda'};
  color: ${isActive ? '#f7edda' : '#333333'};
  &:hover {
    border-color: ${isActive ? '#c5deda' : '#92bea9'};
    background-color: ${isActive ? '#5a8c6f' : '#92bea9'};
  }
`;

const dialogContentStyle = css`
  min-height: 400px;
`;

const tabContainerContainerStyle = css`
  display: flex;
  justify-content: center;
`;

const tabContainerStyle = css`
  width: 271px;
  border-radius: 23px;
  overflow: hidden;
  background-color: #92bea9;
  margin: 10px;
`;

const tabStyle = css`
  .MuiTab-root {
    color: #f7edda;
    background-color: #92bea9;
    font-size: 15px;
  }

  .MuiTabs-indicator {
    display: none;
  }

  .MuiTab-root.Mui-selected {
    background-color: #4f7670;
    color: #f7edda;
  }
`;

function IODialog({ open, onClose }) {
  const [activeButtons, setActiveButtons] = useState({
    Cabinet: { DO: [], DI: [], AO: [], AI: [] },
    Tool: { DO: [], DI: [], AI: [] },
    Extend: { extio: [], out: [], in: [] },
  });
  const [currentTab, setCurrentTab] = useState(0);
  const [openSections, setOpenSections] = useState({
    Cabinet: { DO: false, DI: false, AO: false, AI: false },
    Tool: { DO: false, DI: false, AI: false },
    Extend: { extio: false, out: false, in: false },
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
    const tabName = tabNames[currentTab]; // 현재 탭 이름
    setOpenSections((prev) => ({
      ...prev,
      [tabName]: { ...prev[tabName], [type]: !prev[tabName][type] },
    }));
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
                  transform: openSections[tabNames[currentTab]][type]
                    ? 'rotate(0deg)'
                    : 'rotate(180deg)',
                }}
              />
            </IconButton>
          </h3>
        </Grid>
        <Collapse
          in={openSections[tabNames[currentTab]][type]}
          timeout="auto"
          unmountOnExit
        >
          <Grid container spacing={1}>
            {buttons.map((button) => (
              <Grid item key={button} css={buttonContainerStyle}>
                <Button
                  css={buttonStyle(
                    activeButtons[tabNames[currentTab]][type]?.includes(
                      button - 1
                    )
                  )}
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
                  transform: openSections[tabNames[currentTab]][type]
                    ? 'rotate(0deg)'
                    : 'rotate(180deg)',
                }}
              />
            </IconButton>
          </h3>
        </Grid>
        <Collapse
          in={openSections[tabNames[currentTab]][type]}
          timeout="auto"
          unmountOnExit
        >
          <Grid container spacing={1}>
            {activeButtons[tabNames[currentTab]][type].map(
              (isActive, index) => (
                <Grid item key={index} css={buttonContainerStyle}>
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
      <div css={tabContainerContainerStyle}>
        <div css={tabContainerStyle}>
          <div css={tabStyle}>
            <Tabs value={currentTab} onChange={handleTabChange} centered>
              <Tab label="Cabinet" />
              <Tab label="Tool" />
              <Tab label="Extend" />
            </Tabs>
          </div>
        </div>
      </div>
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
