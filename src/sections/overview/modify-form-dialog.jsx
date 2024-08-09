// FormDialog.jsx
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from '@mui/material';

const ModifyFormDialog = ({ open, onClose, onSave, item }) => {
  const [formData, setFormData] = useState(item || {});

  useEffect(() => {
    setFormData(item || {});
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    const updatedItem = {
      ...formData,
      originalName: item.name, // 기존 이름을 원본 이름으로 저장
    };
    onSave(updatedItem); // 수정된 아이템을 부모 컴포넌트에 전달
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} disableScrollLock={true}>
      <DialogTitle>Edit Item</DialogTitle>
      <DialogContent>
        <TextField
          name="name"
          label="Name"
          value={formData.name || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="x"
          label="X"
          value={formData.x || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="y"
          label="Y"
          value={formData.y || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="z"
          label="Z"
          value={formData.z || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="rx"
          label="RX"
          value={formData.rx || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="ry"
          label="RY"
          value={formData.ry || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          name="rz"
          label="RZ"
          value={formData.rz || ''}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModifyFormDialog;
