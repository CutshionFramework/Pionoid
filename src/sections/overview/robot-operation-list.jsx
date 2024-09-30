/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import '../../i18n.js';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';
import { useRecoilValue } from 'recoil';
import { langState } from '../../recoilState.js';

import {
  Grow,
  Stack,
  Paper,
  Button,
  Popper,
  MenuItem,
  MenuList,
  ClickAwayListener,
} from '@mui/material';

import {
  robotLogin,
  robotLogout,
  robotEnable,
  robotDisable,
  robotPowerOn,
  robotPowerOff,
  voiceCommand,
} from '../../apis/apis';

const menuListStyles = css`
  font-size: 1.25rem;
`;

const menuItemStyles = css`
  font-size: 1.25rem;
  font-weight: 600;
  color: rgb(135, 140, 146);
`;

const buttonStyles = css`
  color: white;
  background-color: rgb(178, 204, 255);
  width: 200px;
  height: 57px;
  font-size: 20px;
  box-shadow: 0 0 10px rgba(131, 169, 190, 0.6);
  border-radius: 20px;
  margin-top: 5px;
`;

const micButtonStyles = css`
  height: 57px;
  width: 63px;
  margin-top: 5px;
  margin-left: 10px;
  border-radius: 20px;
`;

const iconStyles = (isRecording) => css`
  color: white;
  background-color: rgb(178, 204, 255);
  width: 63px;
  height: 57px;
  padding: 0 15px 0 15px;
  font-size: 20px;
  box-shadow: ${isRecording
    ? '0 0 15px rgba(255, 0, 0, 0.4)'
    : '0 0 10px rgba(131, 169, 190, 0.6)'};
  border-radius: 20px;
  animation: ${isRecording ? 'pulse 2s infinite' : 'none'};
`;

const popperStyles = (anchorRef) => css`
  width: ${anchorRef.current ? `${anchorRef.current.offsetWidth}px` : 'auto'};
`;

const growStyles = (placement) => css`
  transform-origin: ${placement === 'bottom-start'
    ? 'left top'
    : 'left bottom'};
`;

export default function RobotOperationList() {
  const [open, setOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const anchorRef = useRef(null);
  const prevOpen = useRef(open);
  const language = useRecoilValue(langState);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  };

  const robotLoginClicked = async () => {
    setOpen(false);
    try {
      const response = await robotLogin();
      console.log(response);
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const robotLogoutClicked = async () => {
    setOpen(false);
    try {
      const response = await robotLogout();
      console.log(response);
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const robotPowerOnClicked = async () => {
    setOpen(false);
    try {
      const response = await robotPowerOn();
      console.log(response);
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const robotPowerOffClicked = async () => {
    setOpen(false);
    try {
      const response = await robotPowerOff();
      console.log(response);
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const robotEnableClicked = async () => {
    setOpen(false);
    try {
      const response = await robotEnable();
      console.log(response);
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const robotDisableClicked = async () => {
    setOpen(false);
    try {
      const response = await robotDisable();
      console.log(response);
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const handleVoiceCommand = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const audioChunks = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.start();
      setIsRecording(true);
      console.log('녹음 중...');

      setTimeout(() => {
        mediaRecorder.stop();
        console.log('녹음 종료');
      }, 4000);

      mediaRecorder.onstop = async () => {
        setIsRecording(false);
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('file', audioBlob, 'audio.wav');
        formData.append('language', language);

        const res = await voiceCommand(formData);
        console.log(res);
      };
    } catch (error) {
      console.error('음성 녹음 오류:', error);
      setIsRecording(false);
    }
  };

  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            css={buttonStyles}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            {t('operation menu')}
          </Button>
          <Button css={micButtonStyles}>
            <MicNoneOutlinedIcon
              onClick={handleVoiceCommand}
              css={iconStyles(isRecording)}
            />
          </Button>
        </div>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal={false}
          css={popperStyles(anchorRef)}
        >
          {({ TransitionProps, placement }) => (
            <Grow {...TransitionProps} css={growStyles(placement)}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    css={menuListStyles}
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem css={menuItemStyles} onClick={robotLoginClicked}>
                      {t('login')}
                    </MenuItem>
                    <MenuItem css={menuItemStyles} onClick={robotLogoutClicked}>
                      {t('logout')}
                    </MenuItem>
                    <MenuItem
                      css={menuItemStyles}
                      onClick={robotPowerOnClicked}
                    >
                      {t('power on')}
                    </MenuItem>
                    <MenuItem
                      css={menuItemStyles}
                      onClick={robotPowerOffClicked}
                    >
                      {t('power off')}
                    </MenuItem>
                    <MenuItem css={menuItemStyles} onClick={robotEnableClicked}>
                      {t('enable')}
                    </MenuItem>
                    <MenuItem
                      css={menuItemStyles}
                      onClick={robotDisableClicked}
                    >
                      {t('disable')}
                    </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
