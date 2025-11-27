import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent,
  Paper,
  Stack,
  Divider
} from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';

function Home() {
  const features = [
    {
      icon: <HowToVoteIcon sx={{ fontSize: 50, color: 'rgb(174, 38, 70)' }} />,
      title: 'Easy Voting Process',
      description: 'Vote securely from anywhere with just a few clicks'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 50, color: 'rgb(174, 38, 70)' }} />,
      title: 'Maximum Security',
      description: 'State-of-the-art encryption and verification systems'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 50, color: 'rgb(174, 38, 70)' }} />,
      title: 'Instant Results',
      description: 'Get real-time updates on election progress and results'
    },
    {
      icon: <PeopleIcon sx={{ fontSize: 50, color: 'rgb(174, 38, 70)' }} />,
      title: 'Accessible for All',
      description: 'Designed to be inclusive and user-friendly'
    }
  ];

  return (
    <Box>
      {/* Hero Section with Gradient Background */}
      <Box 
        sx={{
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'rgb(20, 25, 106)',
          py: { xs: 8, md: 17 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography 
                variant="h2" 
                component="h1" 
                sx={{ 
                  fontWeight: 'bold',
                  mb: 3
                }}
              >
                Democracy Goes Digital
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                Secure, Fast, and Accessible Online Voting Platform
              </Typography>
              <Stack direction="row" spacing={2}>
                <Button 
                  component={Link} 
                  to="/login" 
                  variant="contained" 
                  color="secondary" 
                  size="large"
                  sx={{ px: 4, background:'rgb(174, 38, 70)' }}
                >
                  Get Started
                </Button>
                <Button 
                  component={Link} 
                  to="/about" 
                  variant="outlined" 
                  color="inherit" 
                  sx={{background:'#fff', border:'white'}}
                  size="large"
                >
                  Learn More
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography 
          variant="h3" 
          component="h2" 
          align="center" 
          sx={{ mb: 6, color:'rgb(20, 25, 106)' }}
        >
          Why Choose Us?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 3, 
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: 3
                  }
                }}
              >
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action */}
      <Box 
        sx={{ 
          bgcolor: 'grey.900',
          color: 'white',
          py: 8,
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h4" gutterBottom>
            Ready to Make Your Voice Heard?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, opacity: 0.8 }}>
            Join thousands of voters who have already embraced the future of voting.
          </Typography>
          <Button 
            component={Link} 
            to="/login" 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ 
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
              background:'rgb(174, 38, 70)'
            }}
          >
            Sign In Now
          </Button>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;