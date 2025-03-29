import React, { useState } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Typography,
} from '@mui/material';
import axios from 'axios';

function EditUserDialog({ user, onClose, onUserUpdated }) {
  const [firstName, setFirstName] = useState(user.first_name);
  const [lastName, setLastName] = useState(user.last_name);
  const [email, setEmail] = useState(user.email);
  const [error, setError] = useState('');

  const handleSave = async () => {
    try {
      const response = await axios.put(`https://reqres.in/api/users/${user.id}`, {
        first_name: firstName,
        last_name: lastName,
        email,
      });
      onUserUpdated(response.data);
    } catch (err) {
      setError('Failed to update user');
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <TextField
          label="First Name"
          fullWidth
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Last Name"
          fullWidth
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          sx={{ mt: 2 }}
        />
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mt: 2 }}
        />
        {error && <Typography color="error" sx={{ mt: 1 }}>{error}</Typography>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default EditUserDialog;