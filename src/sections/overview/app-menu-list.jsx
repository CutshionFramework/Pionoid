/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';

import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import {
  robotLogin,
  robotLogout,
  robotEnable,
  robotDisable,
  robotPowerOn,
  robotPowerOff,
} from 'src/apis/apis';

const buttonStyles = css`
  font-size: 1.25rem;
  padding: 23px;
  color: rgba(131, 169, 190);
  background-color: white;
  box-shadow: 0 0 10px rgba(131, 169, 190, 0.6);
`;

const menuListStyles = css`
  font-size: 1.25rem;
`;

const menuItemStyles = css`
  font-size: 1.25rem;
  font-weight: 600;
`;

export default function MenuListComposition() {
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

  return (
    <Stack direction="row" spacing={2}>
      <div>
        <Button
          css={buttonStyles}
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        >
          Robot manipulation
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal={false}
          style={{ width: anchorRef.current ? anchorRef.current.offsetWidth : undefined }}
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
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
                      robot login
                    </MenuItem>
                    <MenuItem css={menuItemStyles} onClick={robotLogoutClicked}>
                      robot logout
                    </MenuItem>
                    <MenuItem css={menuItemStyles} onClick={robotPowerOnClicked}>
                      robot power on
                    </MenuItem>
                    <MenuItem css={menuItemStyles} onClick={robotPowerOffClicked}>
                      robot power off
                    </MenuItem>
                    <MenuItem css={menuItemStyles} onClick={robotEnableClicked}>
                      robot enable
                    </MenuItem>
                    <MenuItem css={menuItemStyles} onClick={robotDisableClicked}>
                      robot disable
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
