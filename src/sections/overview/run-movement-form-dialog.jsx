/** @jsxImportSource @emotion/react */
import * as React from 'react';
import { css } from '@emotion/react';
import '../../i18n.js';

import {
  Alert,
  Stack,
  Button,
  Dialog,
  Snackbar,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
} from '@mui/material';

import { runAllMoves } from '../../apis/apis';
import { useTranslation } from 'react-i18next';

const divStyles = css`
  border-radius: 15px;
  width: 100%;
  height: 100%;
  padding: 0;
  box-shadow: 2px 2px 20px 3px rgba(0, 0, 0, 0.03);
  background-color: white;
  transition:
    background-color 0.3s,
    box-shadow 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const buttonStyles = css`
  width: 100%;
  height: 100%;
  border: none;
  font-size: 18px;
  color: #919eab;

  &:hover {
    background-color: #f0f0f0;
    border: none;
  }
`;

export default function RunMovementFormDialog() {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (!inputValue || inputValue <= 0) {
      setSnackbarMessage('Please enter a valid positive number.');
      setSnackbarOpen(true);
      return;
    }
    setOpen(false);
    try {
      const response = await runAllMoves(inputValue);
      console.log(`${response}: ${inputValue} times move`);
      setInputValue('');
    } catch (error) {
      console.error('Failed to load data. : ', error);
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSnackbarClose = (event, reason) => {
    setSnackbarOpen(false);
  };

  const { t } = useTranslation();

  return (
    <Stack css={divStyles}>
      <Button css={buttonStyles} variant="outlined" onClick={handleClickOpen}>
        {t('run movements')}
      </Button>
      <Dialog open={open} onClose={handleClose} disableScrollLock={true}>
        <DialogTitle>{t('repetitions of robot movements')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t('description about repetitions')}
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            label={t('placeholder')}
            type="number"
            fullWidth
            variant="standard"
            value={inputValue}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{t('cancel')}</Button>
          <Button onClick={handleConfirm}>{t('start')}</Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}>
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
