import React, { useState } from 'react';
import { TextField, Button, Stack, Typography, Paper } from '@mui/material';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('email', email);

      // Fetch user details after login
      const userResponse = await axios.get('https://reqres.in/api/users/1'); // Example request for user details
      const userDetails = userResponse.data.data;
      localStorage.setItem('userDetails', JSON.stringify(userDetails));

      window.location.href = '/';
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Paper sx={{ padding: 4, maxWidth: 400, margin: 'auto', marginTop: '100px' }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>Login</Typography>
      <Stack spacing={3}>
        <TextField
          label="Email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" onClick={handleLogin}>Login</Button>
      </Stack>
    </Paper>
  );
}

export default Login;