import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { useSetRecoilState } from 'recoil';

import { usePathname } from '../../routes/hooks';
import { RouterLink } from '../../routes/components';

import { useResponsive } from '../../hooks/use-responsive';
import { account } from '../../_mock/account';

import Logo from '../../components/logo';
import Scrollbar from '../../components/scrollbar';

import { NAV } from './config-layout';
import navConfig from './config-navigation';
import '../../i18n.js';
import { useTranslation } from 'react-i18next';
import { imageState, brandState } from '../../recoilState';
import { ListItemIcon, MenuItem, MenuList } from '@mui/material';

// ----------------------------------------------------------------------

export default function Nav({ openNav, onCloseNav }) {
  const pathname = usePathname();
  const { t } = useTranslation();
  const upLg = useResponsive('up', 'lg');

  const [openPopover, setOpenPopover] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

  const setImage = useSetRecoilState(imageState);
  const setBrand = useSetRecoilState(brandState);

  const handleClick = (event, item) => {
    setOpenPopover(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setOpenPopover(null);
    setSelectedItem(null);
  };

  const handleImageButtonClick = (imagePath, brandName) => {
    setImage(imagePath); // change the recoil state.
    setBrand(brandName);
    handleClose();
  };

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderAccount = (
    <Box
      sx={{
        my: 3,
        mx: 2.5,
        py: 2,
        px: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        bgcolor: (theme) => alpha(theme.palette.grey[500], 0.12),
      }}>
      <Avatar src={account.photoURL} alt="photoURL" />
      <Box sx={{ ml: 2 }}>
        <Typography variant="subtitle2">
          {t('user name', account.displayName)}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {account.role}
        </Typography>
      </Box>
    </Box>
  );

  const renderMenu = (
    <Stack component="nav" spacing={0.5} sx={{ px: 2 }}>
      {navConfig.map((item) => (
        <div key={item.title}>
          <ListItemButton
            component={RouterLink}
            href={item.path}
            sx={{
              minHeight: 44,
              width: '100%',
              borderRadius: 0.75,
              typography: 'body2',
              color: 'text.secondary',
              textTransform: 'capitalize',
              fontWeight: 'fontWeightMedium',
              ...(item.path === pathname && {
                color: 'primary.main',
                fontWeight: 'fontWeightSemiBold',
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
                '&:hover': {
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.16),
                },
              }),
            }}
            onClick={(event) => handleClick(event, item)}>
            <Box component="span" sx={{ width: 24, height: 24, mr: 2 }}>
              {item.icon}
            </Box>
            <Box component="span">{item.title}</Box>
          </ListItemButton>
        </div>
      ))}
    </Stack>
  );

  const renderUpgrade = (
    <Box sx={{ px: 2.5, pb: 3, mt: 10 }}>
      <Stack
        alignItems="center"
        spacing={3}
        sx={{ pt: 5, borderRadius: 2, position: 'relative' }}>
        <Box
          component="img"
          src={`${process.env.PUBLIC_URL}/assets/illustrations/illustration_avatar.png`}
          sx={{ width: 100, position: 'absolute', top: -50 }}
        />
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6">{t('need help')}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
            {t('email us at')}
          </Typography>
        </Box>
        <Button
          href="mailto:cutshion@cutshion.com"
          target="_blank"
          variant="contained"
          color="inherit">
          cutshion@cutshion.com
        </Button>
      </Stack>
    </Box>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': {
          height: 1,
          display: 'flex',
          flexDirection: 'column',
        },
      }}>
      <Logo sx={{ mt: 3, ml: 4 }} />
      {renderAccount}
      {renderMenu}
      <Box sx={{ flexGrow: 1 }} />
      {renderUpgrade}
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}>
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: 'fixed',
            width: NAV.WIDTH,
            borderRight: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}>
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}>
          {renderContent}
        </Drawer>
      )}

      {/* Popover component for menu items */}
      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClose}>
        <MenuList
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 247,
            display: 'flex',
            flexDirection: 'column',
          }}>
          <MenuItem
            onClick={() =>
              handleImageButtonClick(
                `${process.env.PUBLIC_URL}/assets/images/jaka_robot_arm.png`,
                `JakaRobot`
              )
            }>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
              }}>
              <img
                style={{
                  width: '17px',
                  height: '17px',
                }}
                src={`${process.env.PUBLIC_URL}/assets/jaka_logo.png`}
                alt=""
              />
            </Box>
            <Box sx={{ fontWeight: 'bold', marginLeft: '20px' }}>
              Jaka Robotics
            </Box>
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleImageButtonClick(
                `${process.env.PUBLIC_URL}/assets/images/ur_robot_arm.png`,
                `URRobot`
              )
            }>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
              }}>
              <img
                style={{
                  width: '17px',
                  height: '17px',
                }}
                src={`${process.env.PUBLIC_URL}/assets/ur_logo.png`}
                alt=""
              />
            </Box>
            <Box sx={{ fontWeight: 'bold', marginLeft: '20px' }}>
              Universal Robot
            </Box>
          </MenuItem>
          <MenuItem
            onClick={() =>
              handleImageButtonClick(
                `${process.env.PUBLIC_URL}/assets/images/aubo_robot_arm.png`
              )
            }>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'start',
              }}>
              <img
                style={{
                  width: '17px',
                  height: '17px',
                }}
                src={`${process.env.PUBLIC_URL}/assets/aubo_logo.png`}
                alt=""
              />
            </Box>
            <Box sx={{ fontWeight: 'bold', marginLeft: '20px' }}>
              Aubo robot
            </Box>
          </MenuItem>
        </MenuList>
      </Popover>
    </Box>
  );
}

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};
