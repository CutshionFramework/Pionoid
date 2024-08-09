/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { faker } from '@faker-js/faker';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import {
  shutDown,
  savePosition,
  saveIpAddress,
  useDigitalOutput1,
  useDigitalOutput2,
} from '../../../apis/apis';

import AppTasks from '../app-tasks';
import RobotOperationList from '../robot-operation-list';
import AppOrderTimeline from '../app-order-timeline';
import AppWidgetSummary from '../app-widget-summary';
import RobotMovementList from '../robot-movement-list';

// ----------------------------------------------------------------------
const imgGridStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const menuListStyles = css`
  position: absolute;
  z-index: 10;

  @media (min-width: 1024px) {
    margin-top: 260px;
  }

  @media (max-width: 1023px) {
    margin-top: 210px;
  }

  @media (max-width: 767px) {
    margin-top: 120px;
  }
`;

const buttonStyles = css`
  &:hover {
    background-color: #f0f0f0;
  }
`;

const saveButtonStyles = css`
  align-self: center;
  height: 100%;
  background-color: white;
  color: #919eab;
  font-size: 20px;
  &:hover {
    background-color: #f0f0f0;
  }
`;

const activeButtonStyles = (active) => css`
  background-color: ${active ? 'lightblue' : 'white'};
  transition: background-color 0.3s;

  &:hover {
    background-color: ${active ? 'lightblue' : '#f0f0f0'};
  }
`;

const inputGridStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const textFieldStyles = css`
  border-radius: 15px;
  background-color: white;
  padding: 24px;
  box-shadow: 2px 2px 20px 3px rgba(0, 0, 0, 0.03);
  transition:
    background-color 0.3s,
    box-shadow 0.3s;

  label {
    font-size: 1.2rem;
    font-weight: 600;
  }
`;

const formDialogStyles = css`
  position: fixed;
  bottom: 0;
  height: 5%;
  z-index: 1000;

  @media (min-width: 1024px) {
    width: 578px;
  }

  @media (max-width: 1023px) {
    width: 578px;
  }

  @media (max-width: 767px) {
    left: 0;
    width: 100%;
    padding-bottom: 8px;
  }
`;

export default function AppView() {
  const [ipAddress, setIpAddress] = useState('');
  const [tool1Active, setTool1Active] = useState(false);
  const [tool2Active, setTool2Active] = useState(false);

  const [showList, setShowList] = useState(false);

  const handleInputChange = (event) => {
    setIpAddress(event.target.value);
  };

  const handleSaveIpAddress = async () => {
    try {
      const response = await saveIpAddress(ipAddress);
      console.log(`${response}: ${ipAddress}`);
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const handleToolClick = (tool) => {
    if (tool === 'tool1') {
      setTool1Active(!tool1Active);
      Tool1Clicked();
      console.log(tool1Active ? 'Tool 1 deactivated' : 'Tool 1 activated');
    } else if (tool === 'tool2') {
      setTool2Active(!tool2Active);
      Tool2Clicked();
      console.log(tool2Active ? 'Tool 2 deactivated' : 'Tool 2 activated');
    }
  };

  const savePositionClicked = async () => {
    try {
      const response = await savePosition();
      saveToLocalStorage('positions', response); // 'positions'는 로컬스토리지의 키
      console.log('Data saved to localStorage:', response);
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const shutDownClicked = async () => {
    try {
      const response = await shutDown();
      console.log(response);
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const Tool1Clicked = async () => {
    try {
      const response = await useDigitalOutput1();
      console.log(response);
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const Tool2Clicked = async () => {
    try {
      const response = await useDigitalOutput2();
      console.log(response);
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const toggleList = () => {
    setShowList(!showList);
  };

  const handleItemClick = (item) => {
    console.log(`${item} clicked`);
  };

  // 변환할 데이터 포맷
  const formatData = (data) => ({
    name: data.name,
    x: data.x,
    y: data.y,
    z: data.z,
    rx: data.rx,
    ry: data.ry,
    rz: data.rz,
  });

  // 로컬스토리지에 저장할 함수
  const saveToLocalStorage = (key, data) => {
    const existingData = JSON.parse(localStorage.getItem(key)) || [];
    const formattedData = formatData(data); // 변환 함수 호출
    existingData.push(formattedData);
    localStorage.setItem(key, JSON.stringify(existingData));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Hi, Welcome back 👋
      </Typography>

      <Grid xs={12} md={6} lg={8} css={imgGridStyles}>
        <img src="/assets/images/jaka%20robot%20arm.png" alt="JAKA robot arm" />
        <Grid xs={12} md={6} lg={8} css={menuListStyles}>
          <RobotOperationList />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid css={inputGridStyles} xs={8} sm={9} md={8}>
          <TextField
            css={textFieldStyles}
            label="IP Address"
            variant="outlined"
            fullWidth
            value={ipAddress}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <img
                  alt="icon"
                  src="/assets/icons/glass/ic_glass_users.png"
                  style={{ marginRight: '8px' }}
                />
              ),
            }}
          />
        </Grid>
        <Grid css={inputGridStyles} xs={4} sm={3} md={4}>
          <Button
            css={saveButtonStyles}
            variant="contained"
            color="primary"
            onClick={handleSaveIpAddress}
            fullWidth
          >
            Save IP Address
          </Button>
        </Grid>

        <Grid xs={14} sm={8} md={6}>
          <ButtonBase style={{ width: '100%' }} onClick={savePositionClicked}>
            <AppWidgetSummary
              css={buttonStyles}
              style={{ width: '100%' }}
              title="Save Position"
              total={2}
              color="primary"
              icon={
                <img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />
              }
            />
          </ButtonBase>
        </Grid>

        <Grid xs={14} sm={8} md={6}>
          <ButtonBase style={{ width: '100%' }}>
            <AppWidgetSummary
              onClick={() => handleToolClick('tool1')}
              css={activeButtonStyles(tool1Active)}
              style={{ width: '100%' }}
              title="DO 1"
              total={3}
              color="primary"
              icon={
                <img
                  alt="icon"
                  src="/assets/icons/glass/ic_glass_message.png"
                />
              }
            />
          </ButtonBase>
        </Grid>

        <Grid xs={14} sm={8} md={6}>
          <ButtonBase style={{ width: '100%' }}>
            <AppWidgetSummary
              onClick={() => handleToolClick('tool2')}
              css={activeButtonStyles(tool2Active)}
              style={{ width: '100%' }}
              title="DO 2"
              total={4}
              color="primary"
              icon={
                <img
                  alt="icon"
                  src="/assets/icons/glass/ic_glass_message.png"
                />
              }
            />
          </ButtonBase>
        </Grid>

        <Grid xs={14} sm={8} md={6}>
          <ButtonBase style={{ width: '100%' }} onClick={shutDownClicked}>
            <AppWidgetSummary
              css={buttonStyles}
              style={{ width: '100%' }}
              title="Shut Down"
              total={6}
              color="primary"
              icon={
                <img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />
              }
            />
          </ButtonBase>
        </Grid>

        <Grid xs={10} md={4} lg={6}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Activate robot arm' },
              { id: '2', name: 'Manual move' },
              { id: '3', name: 'Use web tools' },
              { id: '4', name: 'Save positions' },
              { id: '5', name: 'Run project ' },
            ]}
          />
        </Grid>

        <Grid xs={13} md={7} lg={6}>
          <AppOrderTimeline
            title="Process"
            list={[...Array(3)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                'Connect to robot arm',
                'Move and Save different positions',
                'Execute your robot automation project',
              ][index],
              type: `order${index + 1}`,
              text: [['2 min aprox'], ['4 min aprox'], ['1 sec']][index],
            }))}
          />
        </Grid>

        <Grid css={formDialogStyles} xs={14} sm={8} md={6}>
          <RobotMovementList
            showList={showList}
            toggleList={toggleList}
            onItemClick={handleItemClick}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
