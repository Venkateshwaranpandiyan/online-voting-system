import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Link,
  Alert,
} from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

function Admin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    adminId: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check admin credentials
    if (formData.adminId === 'Admin' && formData.password === 'admin') {
      // Successful login
      navigate('/admin-dashboard');
    } else {
      // Failed login
      setError('Invalid admin credentials');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  // ...existing code for return statement...
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'error.main', width: 56, height: 56 }}>
          <AdminPanelSettingsIcon sx={{ fontSize: 32 }} />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Login
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 3,
            width: '100%',
          }}
        >
          <Box component="form" onSubmit={handleSubmit} noValidate>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              margin="normal"
              required
              fullWidth
              id="adminId"
              label="Admin ID"
              name="adminId"
              autoComplete="adminId"
              autoFocus
              value={formData.adminId}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ 
                mt: 3, 
                mb: 2,
                bgcolor: 'error.main',
                '&:hover': {
                  bgcolor: 'error.dark',
                }
              }}
            >
              Sign In
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} to="/" variant="body2">
                Back to Home
              </Link>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Admin;