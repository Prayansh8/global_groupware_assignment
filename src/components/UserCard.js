import React from 'react';
import { Card, CardContent, Typography, Avatar, Box, IconButton, Stack } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function UserCard({ user, onEdit, onDelete }) {
  return (
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
          <IconButton onClick={() => onDelete(user.id)}>
            <DeleteIcon />
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default UserCard;