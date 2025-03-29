import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import UserList from './components/UserList';
import Login from './components/Login';
import UserProfile from './components/UserProfile';

function App() {
  const token = localStorage.getItem('token');
  const email = localStorage.getItem('email');

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => window.location.href = '/'}>
            User Management
          </Typography>
          {token && (
            <>
              <IconButton color="inherit" onClick={() => window.location.href = '/profile'}>
                <AccountCircleIcon />
              </IconButton>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ marginTop: '4vh'}}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={token ? <UserList /> : <Navigate to="/login" replace />} />
          <Route path="/profile" element={token ? <UserProfile email={email} /> : <Navigate to="/login" replace />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;