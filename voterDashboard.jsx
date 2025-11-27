import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, Dialog, DialogTitle, DialogContent, DialogActions, Avatar, Divider, Paper, Snackbar, Alert } from '@mui/material';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import partyBJP from './img/bjp1.png';
import partyCongress from './img/cong1.png';
import partyNOTA from './img/nota3.png';
import partyTVK from './img/tvk1.png';  // Add your image path for TVK
// import partyTVK from './img/tvk.webp';  // Add your image path for TVK
import partyDMK from './img/dmk.png';  // Add your image path for DMK
import partyADMK from './img/admk.png';  // Add your image path for ADMK

function VoterDashboard() {
  const [selectedParty, setSelectedParty] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [voteSubmitted, setVoteSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation(); // Get the current location
  const voterId = location.state?.voterId; 

  const parties = [
    { id: 1, name: "BJP", sign: "bjp", image: partyBJP, description: "Bharatiya Janata Party", memberName: "Narendra Modi" },
    { id: 2, name: "Congress", sign: "cong", image: partyCongress, description: "Indian National Congress", memberName: "Rahul Gandhi" },
    { id: 3, name: "TVK", sign: "tvk", image: partyTVK, description: "Tamizhaga Vettri Kazhagam", memberName: "Vijay" }, // Updated TVK Party
    { id: 4, name: "DMK", sign: "dmk", image: partyDMK, description: "Dravida Munnetra Kazhagam", memberName: "M. K. Stalin" }, // DMK Party
    { id: 5, name: "ADMK", sign: "admk", image: partyADMK, description: "All India Anna Dravida Munnetra Kazhagam", memberName: "O. Panneerselvam" }, // ADMK Party
    { id: 6, name: "NOTA", sign: "nota", image: partyNOTA, description: "None Of The Above", memberName: "No Candidate" },
  ];

  const handleVoteClick = (party) => {
    setSelectedParty(party);
    setOpenDialog(true);
  };

  const handleConfirmVote = async () => {
    setError(''); // Reset error state
    try {
      // Assuming `voterId` is available in the component state (you should store this when the user logs in)
      const response = await axios.post('http://localhost:8000/api/submit-vote', {
        voterId: voterId, // Example voterId, replace with dynamic value
        partySign: selectedParty.sign, // Send the party sign (e.g., "bjp", "cong", etc.)
      });
      if (response.data.success) {
        setVoteSubmitted(true);
        setSuccessMessage('Vote submitted successfully!');
      }
    } catch (err) {
      setError('Failed to submit vote. Please try again later.');
    }
    setOpenDialog(false);
  };
  

  // const handleConfirmVote = async () => {
  //   setError(''); // Reset error state
  //   try {
  //     const response = await axios.post('http://localhost:8000/api/submit-vote', {
  //       partySign: selectedParty.sign, // Send the party sign (e.g., "bjp", "cong", etc.)
  //     });
  //     if (response.data.success) {
  //       setVoteSubmitted(true);
  //       setSuccessMessage('Vote submitted successfully!');
  //     }
  //   } catch (err) {
  //     setError('Failed to submit vote. Please try again later.');
  //   }
  //   setOpenDialog(false);
  // };

  useEffect(() => {
    if (voteSubmitted) {
      // Navigate to the home page after a 2-second delay
      const timer = setTimeout(() => {
        navigate('/');
      }, 2000);

      // Cleanup the timer if the component unmounts before the timeout
      return () => clearTimeout(timer);
    }
  }, [voteSubmitted, navigate]);

  if (voteSubmitted) {
    return (
      <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default' }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center', maxWidth: 400 }}>
          <CheckCircleIcon sx={{ fontSize: 60, color: 'success.main', mb: 2 }} />
          <Typography variant="h5" gutterBottom>Vote Confirmed!</Typography>
          <Typography color="text.secondary">{successMessage}</Typography>
        </Paper>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        <Paper sx={{ p: 4, mb: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>Election 2025</Typography>
          <Typography color="text.secondary" gutterBottom>Select your preferred party and cast your vote securely</Typography>
          <Divider sx={{ my: 2 }} />
        </Paper>

        <Grid container spacing={3}>
          {parties.map((party) => (
            <Grid item xs={12} sm={6} md={4} key={party.id}>
              <Card sx={{ height: '100%', borderRadius: 2, position: 'relative', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: 6 } }}>
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Avatar src={party.image} sx={{ width: '150px', height: '150px', margin: 'auto', bgcolor: 'transparent' }} variant="rounded" />
                  </Box>
                  <Typography variant="h5" component="div" align="center" gutterBottom>{party.name}</Typography>
                  <Typography variant="subtitle1" color="primary" align="center" gutterBottom>{party.memberName}</Typography>
                  <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>{party.description}</Typography>
                  <Button variant="contained" startIcon={<HowToVoteIcon />} fullWidth onClick={() => handleVoteClick(party)} sx={{ borderRadius: 2, py: 1.5 }}>
                    Vote for {party.name}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Confirmation Dialog */}
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} PaperProps={{ sx: { borderRadius: 2 } }}>
          <DialogTitle sx={{ pb: 1 }}>Confirm Your Vote</DialogTitle>
          <DialogContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar src={selectedParty?.image} sx={{ mr: 2, width: 60, height: 60 }} variant="rounded" />
              <Box>
                <Typography variant="h6">{selectedParty?.name}</Typography>
                <Typography variant="subtitle2" color="primary">{selectedParty?.memberName}</Typography>
              </Box>
            </Box>
            <Typography color="text.secondary">This action cannot be undone. Are you sure you want to proceed?</Typography>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpenDialog(false)} variant="outlined">Cancel</Button>
            <Button onClick={handleConfirmVote} variant="contained" startIcon={<HowToVoteIcon />}>Confirm Vote</Button>
          </DialogActions>
        </Dialog>

        {/* Error Snackbar */}
<Snackbar
  open={Boolean(error)}
  autoHideDuration={3000}
  onClose={() => setError('')}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }} // Position at the top-center
  sx={{ zIndex: 1201 }} // Ensures the snackbar appears above other elements like the dialog
>
  <Alert severity="error">{error}</Alert>
</Snackbar>

      </Container>
    </Box>
  );
}

export default VoterDashboard;
