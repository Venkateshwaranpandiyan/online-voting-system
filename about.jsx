import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Divider,
  Stack,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GroupsIcon from '@mui/icons-material/Groups';

import vision from './img/vision2.webp';
import mission from './img/mission.jfif';

function About() {
  const values = [
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: 'rgb(174, 38, 70)' }} />,
      title: 'Security',
      description: 'We prioritize the security and integrity of every vote cast through our platform.'
    },
    {
      icon: <VerifiedUserIcon sx={{ fontSize: 40, color: 'rgb(174, 38, 70)' }} />,
      title: 'Transparency',
      description: 'Our voting process is transparent and verifiable at every step.'
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40, color: 'rgb(174, 38, 70)' }} />,
      title: 'Accessibility',
      description: 'Making voting accessible to everyone, anywhere, anytime.'
    }
  ];

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h2" component="h1" gutterBottom>
            About Us
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9 }}>
            Revolutionizing Democracy Through Technology
          </Typography>
        </Container>
      </Box>

      {/* Mission Statement */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
  <Grid container spacing={8} alignItems="center">
    {/* Left Column for Mission Section with Image/Icon */}
    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Our Mission
      </Typography>
      <Typography variant="body1" paragraph>
        We are dedicated to modernizing the democratic process through secure and accessible online voting solutions. Our platform ensures that every voice is heard and every vote counts.
      </Typography>
      <Typography variant="body1">
        With state-of-the-art encryption and verification systems, we provide a safe and reliable way for citizens to participate in elections from anywhere in the world.
      </Typography>
    </Grid>

    {/* Right Column for Mission Image or Icon */}
    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
      {/* Replace this with an image or relevant icon */}
      <img src={mission} alt="Mission" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
    </Grid>
  </Grid>

  <Grid container spacing={8} alignItems="center" sx={{ mt: 4 }}>
    {/* Left Column for Vision Section with Image/Icon */}
    <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
      {/* Replace this with an image or relevant icon */}
      <img src={vision} alt="Vision" style={{ maxWidth: '100%', height: 'auto', borderRadius: '8px' }} />
    </Grid>

    {/* Right Column for Vision Text */}
    <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
        Our Vision
      </Typography>
      <Typography variant="body1" paragraph>
        We envision a future where voting is accessible to all eligible citizens, regardless of their location or circumstances. By leveraging technology, we aim to increase voter participation and strengthen democratic institutions.
      </Typography>
    </Grid>
  </Grid>
</Container>

      {/* <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Mission
            </Typography>
            <Typography variant="body1" paragraph>
              We are dedicated to modernizing the democratic process through secure and accessible online voting solutions. Our platform ensures that every voice is heard and every vote counts.
            </Typography>
            <Typography variant="body1">
              With state-of-the-art encryption and verification systems, we provide a safe and reliable way for citizens to participate in elections from anywhere in the world.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
              Our Vision
            </Typography>
            <Typography variant="body1" paragraph>
              We envision a future where voting is accessible to all eligible citizens, regardless of their location or circumstances. By leveraging technology, we aim to increase voter participation and strengthen democratic institutions.
            </Typography>
          </Grid>
        </Grid>
      </Container> */}

      {/* Core Values */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" color='rgb(20, 25, 106)' gutterBottom>
            Our Core Values
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {values.map((value, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    }
                  }}
                >
                  <CardContent>
                    <Stack alignItems="center" spacing={2}>
                      {value.icon}
                      <Typography variant="h6" component="h3">
                        {value.title}
                      </Typography>
                      <Typography variant="body1" color="text.secondary" align="center">
                        {value.description}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Additional Information */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" color='rgb(20, 25, 106)' gutterBottom align="center">
          Our Impact
        </Typography>
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={4}>
            <Typography variant="h2" color="primary" align="center" gutterBottom>
              1M+
            </Typography>
            <Typography variant="h6" align="center">
              Votes Processed
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h2" color="primary" align="center" gutterBottom>
              100+
            </Typography>
            <Typography variant="h6" align="center">
              Elections Conducted
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant="h2" color="primary" align="center" gutterBottom>
              99.9%
            </Typography>
            <Typography variant="h6" align="center">
              System Reliability
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;