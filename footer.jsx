import React from 'react';
import { Box, Typography, Container } from '@mui/material';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'background.paper',
        py: 3,
        position: 'fixed',
        bottom: 0,
        width: '100%',
        left: 0,
        textAlign: 'center',
      }}
    >
      <Container>
        <Typography variant="body2" color="text.secondary">
          &copy; {new Date().getFullYear()} Online Voting. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;
