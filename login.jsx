import React, { useState } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    voterId: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate(); // React Router navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear any previous error messages
    setLoading(true); // Set loading state to true during the request

    try {
      const response = await axios.post('http://localhost:8000/api/login', formData);
      if (response.data.success) {
        console.log('Login successful:', response.data);

        // Show success Snackbar message
        setOpenSuccessSnackbar(true);
        // Navigate to the voter dashboard after a successful login
        setTimeout(() => {
          navigate('/voter-dashboard', { state: { voterId: formData.voterId } });
        }, 1000); // Delay navigation slightly for Snackbar to show
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false); // Set loading to false after request completion
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Voter Login
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 3,
            width: '100%',
          }}
        >
          {error && (
            <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="voterId"
              label="Voter ID"
              name="voterId"
              autoComplete="voterId"
              autoFocus
              value={formData.voterId}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              id="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                endAdornment: (
                  <IconButton
                    position="end"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={loading} // Disable button when loading
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Snackbar for successful login at the top */}
      <Snackbar
        open={openSuccessSnackbar}
        autoHideDuration={3000} // Hide after 3 seconds
        onClose={() => setOpenSuccessSnackbar(false)}
        anchorOrigin={{
          vertical: 'top', // Show Snackbar at the top
          horizontal: 'center', // Center it horizontally
        }}
      >
        <Alert
          onClose={() => setOpenSuccessSnackbar(false)}
          severity="success"
          sx={{ width: '100%' }}
        >
          Login successful!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;














// import React, { useState } from 'react';
// import {
//   Box,
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Avatar,
//   Link,
// } from '@mui/material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import { Link as RouterLink } from 'react-router-dom';

// function Login() {
//   const [formData, setFormData] = useState({
//     voterId: '',
//     password: '',
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Add your login logic here
//     console.log('Login attempt:', formData);
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <Container component="main" maxWidth="xs">
//       <Box
//         sx={{
//           marginTop: 2,
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
//           <LockOutlinedIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Voter Login
//         </Typography>
//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             mt: 3,
//             width: '100%',
//           }}
//         >
//           <Box component="form" onSubmit={handleSubmit} noValidate>
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               id="voterId"
//               label="Voter ID"
//               name="voterId"
//               autoComplete="voterId"
//               autoFocus
//               value={formData.voterId}
//               onChange={handleChange}
//             />
//             <TextField
//               margin="normal"
//               required
//               fullWidth
//               name="password"
//               label="Password"
//               type="password"
//               id="password"
//               autoComplete="current-password"
//               value={formData.password}
//               onChange={handleChange}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Sign In
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// }

// export default Login;