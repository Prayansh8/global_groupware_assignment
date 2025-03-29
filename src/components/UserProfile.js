import React, { useState } from 'react';
import {
  Typography, Paper, Box, Avatar, Button, Dialog, DialogTitle,
  DialogContent, TextField, DialogActions, Divider
} from '@mui/material';

function UserProfile() {
  const [open, setOpen] = useState(false);
  const userDetails = JSON.parse(localStorage.getItem('userDetails'));
  const [firstName, setFirstName] = useState(userDetails.first_name);
  const [lastName, setLastName] = useState(userDetails.last_name);
  const [email, setEmail] = useState(userDetails.email);

  const handleEdit = () => {
    const updatedDetails = { ...userDetails, first_name: firstName, last_name: lastName, email };
    localStorage.setItem('userDetails', JSON.stringify(updatedDetails));
    setOpen(false);
  };

  const handleDeleteAccount = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 600, margin: 'auto', marginTop: '100px', textAlign: 'center' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
        <Avatar sx={{ width: 100, height: 100, marginBottom: 2 }} src={userDetails.avatar} alt={userDetails.first_name} />
        <Typography variant="h4">{`${firstName} ${lastName}`}</Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary', mb: 2 }}>{email}</Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>Edit Profile</Button>
        <Button variant="outlined" color="error" onClick={handleDeleteAccount}>Delete Account</Button>
      </Box>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Edit Profile</DialogTitle>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEdit}>Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default UserProfile;