/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';
import { useTranslation } from 'react-i18next';
import '../../i18n.js';
import MicNoneOutlinedIcon from '@mui/icons-material/MicNoneOutlined';

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

export default function RobotOperationList() {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

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

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

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
      const response = await voiceCommand(); // Call the voiceCommand API
      console.log('Voice command executed:', response);
    } catch (error) {
      console.error('Failed to execute voice command: ', error);
    }
  };

  const { t } = useTranslation();

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            style={{
              color: 'white',
              backgroundColor: 'rgb(178,204,255)',
              width: '200px',
              height: '57px',
              fontSize: '20px',
              boxShadow: '0 0 10px rgba(131, 169, 190, 0.6)',
              borderRadius: '20px',
              marginTop: '5px',
            }}
            ref={anchorRef}
            id="composition-button"
            aria-controls={open ? 'composition-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleToggle}>
            {t('operation menu')}
          </Button>
          <Button
            style={{
              height: '57px',
              width: '63px',
              marginTop: '5px',
              marginLeft: '10px',
              borderRadius: '20px',
            }}>
            <MicNoneOutlinedIcon
              onClick={handleVoiceCommand}
              style={{
                height: '57px',
                width: '63px',
                padding: '0 15 0 15',
                color: 'gray',
                backgroundColor: 'white',
                boxShadow: '0 0 10px rgba(131, 169, 190, 0.6)',
                borderRadius: '20px',
              }}
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
          style={{
            width: anchorRef.current
              ? anchorRef.current.offsetWidth
              : undefined,
          }}>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    css={menuListStyles}
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}>
                    <MenuItem css={menuItemStyles} onClick={robotLoginClicked}>
                      {t('login')}
                    </MenuItem>
                    <MenuItem css={menuItemStyles} onClick={robotLogoutClicked}>
                      {t('logout')}
                    </MenuItem>
                    <MenuItem
                      css={menuItemStyles}
                      onClick={robotPowerOnClicked}>
                      {t('power on')}
                    </MenuItem>
                    <MenuItem
                      css={menuItemStyles}
                      onClick={robotPowerOffClicked}>
                      {t('power off')}
                    </MenuItem>
                    <MenuItem css={menuItemStyles} onClick={robotEnableClicked}>
                      {t('enable')}
                    </MenuItem>
                    <MenuItem
                      css={menuItemStyles}
                      onClick={robotDisableClicked}>
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
