import React, { useState } from 'react'; 
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Grid,
  Link,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    zone: '',
    city: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();

  const handleTogglePassword = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/register', {
        name: formData.name,
        gender: formData.gender,
        zone: formData.zone,
        city: formData.city,
        password: formData.password,
      });

      if (response.data.success) {
        setSuccess(`Registration successful! Your Voter ID is: ${response.data.voterId}`);
        setError('');

        // Clear form
        setFormData({
          name: '',
          gender: '',
          zone: '',
          city: '',
          password: '',
          confirmPassword: ''
        });

        // Redirect after 3 seconds
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      setSuccess('');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Voter Registration
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mt: 2,
            width: '80%',
          }}
        >
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          {success && (
            <Typography color="success.main" sx={{ mb: 2 }}>
              {success}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    name="gender"
                    value={formData.gender}
                    label="Gender"
                    onChange={handleChange}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Zone"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleTogglePassword('password')}
                          edge="end"
                        >
                          {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => handleTogglePassword('confirm')}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default Register;







// import React, { useState } from 'react';
// import {
//   Box,
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Avatar,
//   Grid,
//   Link,
//   MenuItem,
//   Select,
//   FormControl,
//   InputLabel,
//   IconButton,
//   InputAdornment,
// } from '@mui/material';
// import PersonAddIcon from '@mui/icons-material/PersonAdd';
// import VisibilityIcon from '@mui/icons-material/Visibility';
// import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
// import { Link as RouterLink } from 'react-router-dom';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Register() {
//   const [formData, setFormData] = useState({
//     name: '',
//     gender: '',
//     zone: '',
//     city: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const navigate = useNavigate();
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   const handleTogglePassword = (field) => {
//     if (field === 'password') {
//       setShowPassword(!showPassword);
//     } else {
//       setShowConfirmPassword(!showConfirmPassword);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // Validate passwords match
//     if (formData.password !== formData.confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:8000/api/register', {
//         name: formData.name,
//         gender: formData.gender,
//         zone: formData.zone,
//         city: formData.city,
//         password: formData.password
//       });

//       if (response.data.success) {
//         setSuccess(`Registration successful! Your Voter ID is: ${response.data.voterId}`);
//         setError('');
        
//         // Clear form
//         setFormData({
//           name: '',
//           gender: '',
//           zone: '',
//           city: '',
//           password: '',
//           confirmPassword: ''
//         });

//         // Redirect after 3 seconds
//         setTimeout(() => {
//           navigate('/login');
//         }, 3000);
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Registration failed');
//       setSuccess('');
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <Container component="main" maxWidth="sm">
//       <Box
//         sx={{
//           display: 'flex',
//           flexDirection: 'column',
//           alignItems: 'center',
//           mb: 2,
//         }}
//       >
//         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//           <PersonAddIcon />
//         </Avatar>
//         <Typography component="h1" variant="h5">
//           Voter Registration
//         </Typography>
//         <Paper
//           elevation={3}
//           sx={{
//             p: 4,
//             mt: 2,
//             width: '80%',
//           }}
//         >
//                     {error && (
//             <Typography color="error" sx={{ mb: 2 }}>
//               {error}
//             </Typography>
//           )}
//           {success && (
//             <Typography color="success.main" sx={{ mb: 2 }}>
//               {success}
//             </Typography>
//           )}
//           <Box component="form" onSubmit={handleSubmit} noValidate>
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Full Name"
//                   name="name"
//                   autoComplete="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControl fullWidth required>
//                   <InputLabel>Gender</InputLabel>
//                   <Select
//                     name="gender"
//                     value={formData.gender}
//                     label="Gender"
//                     onChange={handleChange}
//                   >
//                     <MenuItem value="male">Male</MenuItem>
//                     <MenuItem value="female">Female</MenuItem>
//                     <MenuItem value="other">Other</MenuItem>
//                   </Select>
//                 </FormControl>
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="Zone"
//                   name="zone"
//                   value={formData.zone}
//                   onChange={handleChange}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   label="City"
//                   name="city"
//                   value={formData.city}
//                   onChange={handleChange}
//                 />
//               </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 value={formData.password}
//                 onChange={handleChange}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => handleTogglePassword('password')}
//                         edge="end"
//                       >
//                         {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             <Grid item xs={12} sm={6}>
//               <TextField
//                 required
//                 fullWidth
//                 label="Confirm Password"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 InputProps={{
//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         onClick={() => handleTogglePassword('confirm')}
//                         edge="end"
//                       >
//                         {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 }}
//               />
//             </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Register
//             </Button>
//           </Box>
//         </Paper>
//       </Box>
//     </Container>
//   );
// }

// export default Register;