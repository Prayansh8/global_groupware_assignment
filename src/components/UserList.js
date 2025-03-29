import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid, CircularProgress, Pagination, Box, Snackbar, Alert,
} from '@mui/material';
import UserCard from './UserCard';
import EditUserDialog from './EditUserDialog';

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://reqres.in/api/users?page=${page}`);
        setUsers(response.data.data);
        setTotalPages(response.data.total_pages);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [page]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
      setMessage('User deleted successfully');
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
  };

  const handleCloseSnackbar = () => {
    setMessage('');
    setError('');
  };

  return (
    <Box>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Grid container spacing={3} sx={{margin: 'auto', width: '100%'}}>
            {users.map(user => (
              <Grid item xs={12} sm={6} md={4} key={user.id} sx={{margin: 'auto'}}>
                <UserCard user={user} onEdit={handleEdit} onDelete={handleDelete} />
              </Grid>
            ))}
          </Grid>
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_, value) => setPage(value)}
            sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}
          />
        </>
      )}
      {selectedUser && (
        <EditUserDialog
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUserUpdated={(updatedUser) => {
            setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
            setSelectedUser(null);
            setMessage('User updated successfully');
          }}
        />
      )}
      <Snackbar
        open={!!message || !!error}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'success'}>
          {error || message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default UserList;