import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Button,
} from '@mui/material';

import { setDigitalInput, setDigitalOutput } from '../../apis/apis';

function DigitalIODialog({ open, onClose, dialogType }) {
  const [activeDIO, setActiveDIO] = useState([]);
  const buttons = Array.from({ length: 16 }, (_, i) => i + 1);
  const isDO = dialogType === 'DO';
  const title = isDO ? 'Digital Outputs' : 'Digital Inputs';

  const storageKey = isDO ? 'DO_ACTIVE' : 'DI_ACTIVE';

  useEffect(() => {
    const storedDIO = JSON.parse(localStorage.getItem(storageKey)) || [];
    setActiveDIO(storedDIO);
  }, [storageKey]);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(activeDIO));
  }, [activeDIO, storageKey]);

  const handleButtonClick = (button) => {
    setActiveDIO((prevActiveDIO) => {
      const updatedDIO = prevActiveDIO.includes(button)
        ? prevActiveDIO.filter((b) => b !== button)
        : [...prevActiveDIO, button];

      // 상태가 변경된 후 API 호출
      if (isDO) {
        DOButtonClicked(button);
      } else {
        DIButtonClicked(button);
      }

      return updatedDIO;
    });
  };

  const DOButtonClicked = async (button) => {
    try {
      await setDigitalOutput(button);
    } catch (error) {
      console.error('Failed to set digital output. : ', error);
    }
  };

  const DIButtonClicked = async (button) => {
    try {
      await setDigitalInput(button);
    } catch (error) {
      console.error('Failed to set digital input. : ', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {buttons.map((button) => (
            <Grid item xs={12} sm={6} md={4} key={button}>
              <Button
                variant={activeDIO.includes(button) ? 'contained' : 'outlined'}
                color="primary"
                fullWidth
                onClick={() => handleButtonClick(button)}
              >
                {isDO ? `DO ${button}` : `DI ${button}`}
              </Button>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </Dialog>
  );
}

export default DigitalIODialog;
