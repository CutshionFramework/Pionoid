/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import { css } from '@emotion/react';
import { faker } from '@faker-js/faker';
import { useRecoilValue } from 'recoil';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import { shutDown, savePosition, saveIpAddress } from '../../../apis/apis';

import AppTasks from '../app-tasks';
import RobotOperationList from '../robot-operation-list';
import AppOrderTimeline from '../app-order-timeline';
import AppWidgetSummary from '../app-widget-summary';
import RobotMovementList from '../robot-movement-list';
import DigitalIODialog from '../digital_io_dialog';

import { useTranslation } from 'react-i18next';
import '../../../i18n.js';

import { imageState, brandState } from '../../../recoilState';

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
  transition: background-color 0.3s;
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
  const [showList, setShowList] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const currentImage = useRecoilValue(imageState);
  const currentBrand = useRecoilValue(brandState);

  const handleInputChange = (event) => {
    setIpAddress(event.target.value);
  };

  const handleSaveIpAddress = async () => {
    try {
      const response = await saveIpAddress(ipAddress, currentBrand);
      console.log(`${response}: ${ipAddress}, ${currentBrand}`);
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const handleDIOButtonClick = (type) => {
    setDialogType(type);
    setDialogOpen(true);
  };

  const savePositionClicked = async () => {
    try {
      const response = await savePosition();
      console.log('Data saved to server:', response);
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

  const toggleList = () => {
    setShowList(!showList);
  };

  // 번역 함수
  const { t } = useTranslation();

  return (
    <Container
      maxWidth="sm"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Typography variant="h4" sx={{ mb: 5 }}>
        {t('greeting')}
      </Typography>

      <Grid xs={12} md={6} lg={8} css={imgGridStyles}>
        <img src={currentImage} alt="robot arm" />
        <Grid xs={12} md={6} lg={8} css={menuListStyles}>
          <RobotOperationList />
        </Grid>
      </Grid>
      <Grid
        container
        spacing={3}
        style={{ display: 'flex', justifyContent: 'center' }}>
        <Grid css={inputGridStyles} xs={8} sm={9} md={8}>
          <TextField
            css={textFieldStyles}
            label={t('ip address')}
            variant="outlined"
            fullWidth
            value={ipAddress}
            onChange={handleInputChange}
            InputProps={{
              startAdornment: (
                <img
                  alt="icon"
                  src={`${process.env.PUBLIC_URL}/assets/icons/glass/ic_glass_users.png`}
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
            fullWidth>
            {t('save ip')}
          </Button>
        </Grid>

        <Grid xs={14} sm={8} md={6}>
          <ButtonBase style={{ width: '100%' }} onClick={savePositionClicked}>
            <AppWidgetSummary
              css={buttonStyles}
              style={{ width: '100%' }}
              title={t('save position')}
              total={2}
              color="primary"
              icon={
                <img
                  alt="icon"
                  src={`${process.env.PUBLIC_URL}/assets/icons/glass/ic_glass_buy.png`}
                />
              }
            />
          </ButtonBase>
        </Grid>

        <Grid xs={14} sm={8} md={6}>
          <ButtonBase
            style={{ width: '100%' }}
            onClick={() => handleDIOButtonClick('DO')}>
            <AppWidgetSummary
              css={buttonStyles}
              style={{ width: '100%' }}
              title="DO"
              total={3}
              color="primary"
              icon={
                <img
                  alt="icon"
                  src={`${process.env.PUBLIC_URL}/assets/icons/glass/ic_glass_message.png`}
                />
              }
            />
          </ButtonBase>
        </Grid>

        <Grid xs={14} sm={8} md={6}>
          <ButtonBase
            style={{ width: '100%' }}
            onClick={() => handleDIOButtonClick('DI')}>
            <AppWidgetSummary
              css={buttonStyles}
              style={{ width: '100%' }}
              title="DI"
              total={4}
              color="primary"
              icon={
                <img
                  alt="icon"
                  src={`${process.env.PUBLIC_URL}/assets/icons/glass/ic_glass_message.png`}
                />
              }
            />
          </ButtonBase>
        </Grid>

        <DigitalIODialog
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          dialogType={dialogType}
        />

        <Grid xs={14} sm={8} md={6}>
          <ButtonBase style={{ width: '100%' }} onClick={shutDownClicked}>
            <AppWidgetSummary
              css={buttonStyles}
              style={{ width: '100%' }}
              title={t('shut down')}
              total={6}
              color="primary"
              icon={
                <img
                  alt="icon"
                  src={`${process.env.PUBLIC_URL}/assets/icons/glass/ic_glass_users.png`}
                />
              }
            />
          </ButtonBase>
        </Grid>

        <Grid xs={10} md={4} lg={6}>
          <AppTasks
            title={t('task')}
            list={[
              { id: '1', name: t('listValue.name01') },
              { id: '2', name: t('listValue.name02') },
              { id: '3', name: t('listValue.name03') },
              { id: '4', name: t('listValue.name04') },
              { id: '5', name: t('listValue.name05') },
            ]}
          />
        </Grid>

        <Grid xs={13} md={7} lg={6}>
          <AppOrderTimeline
            title="Process"
            list={[...Array(3)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                t('titleValue.01'),
                t('titleValue.02'),
                t('titleValue.03'),
              ][index],
              type: `order${index + 1}`,
              text: [
                [t('requiredTime.01')],
                [t('requiredTime.02')],
                [t('requiredTime.03')],
              ][index],
            }))}
          />
        </Grid>

        <Grid css={formDialogStyles} xs={14} sm={8} md={6}>
          <RobotMovementList showList={showList} toggleList={toggleList} />
        </Grid>
      </Grid>
    </Container>
  );
}
