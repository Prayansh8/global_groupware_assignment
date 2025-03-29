import React, { useState } from 'react';
import { Card, CardContent, Typography, Avatar, Box, IconButton, Stack, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function UserCard({ user, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    onDelete(user.id);
    handleClose();
  };

  return (
    <>
    <Card sx={{ maxWidth: 345, width: 345, height: 'auto', margin: 'auto' }}>
      <CardContent sx={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Avatar sx={{ width: 56, height: 56 }} src={user.avatar} alt={user.first_name} />
        <Box sx={{ marginLeft: 2, flexGrow: 1 }}>
          <Typography variant="h6">{`${user.first_name} ${user.last_name}`}</Typography>
          <Typography variant="body2" color="text.secondary">{user.email}</Typography>
        </Box>
        <Stack direction="row">
          <IconButton onClick={() => onEdit(user)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleClickOpen}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete {user.first_name} {user.last_name}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleConfirmDelete} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
      </>
  );
}

export default UserCard;