import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, Alert, CircularProgress } from '@mui/material';

function Votes() {
  const [votingResults, setVotingResults] = useState([]);
  const [totalVotes, setTotalVotes] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);  // To handle loading state

  // Fetch voting results when the component mounts
  useEffect(() => {
    axios.get('http://localhost:8000/api/voting-results')
      .then((response) => {
        if (response.data.success) {
          setVotingResults(response.data.results);
          setTotalVotes(response.data.totalVotes);
        } else {
          setError('Failed to fetch voting results');
        }
      })
      .catch((err) => {
        setError('Error fetching voting results');
        console.error(err);
      })
      .finally(() => {
        setLoading(false); // Set loading to false after the request finishes
      });
  }, []);

  return (
    <Box sx={{ py: 4, backgroundColor: '#f4f6f8' }}>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom color="primary">Voting Results</Typography>

        {/* Error Snackbar */}
        {error && (
          <Snackbar open={true} autoHideDuration={6000} onClose={() => setError('')}>
            <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
          </Snackbar>
        )}

        {/* Loading Indicator */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <>
            {/* Total Votes */}
            <Typography variant="h6" align="center" sx={{ mb: 4, color: 'text.secondary' }}>
              Total Votes: <strong>{totalVotes}</strong>
            </Typography>

            {/* Table to Display Voting Results */}
            <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
              <Table sx={{ minWidth: 650 }} aria-label="voting results table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      <Typography variant="h6">Name</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      <Typography variant="h6">Party</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      <Typography variant="h6">Vote Count</Typography>
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                      <Typography variant="h6">Vote Percentage</Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {votingResults.map((result) => (
                    <TableRow key={result.partySign} sx={{ '&:nth-of-type(even)': { backgroundColor: '#f9f9f9' } }}>
                      <TableCell align="center">{result.partyName}</TableCell>
                      <TableCell align="center">{result.partySign.toUpperCase()}</TableCell>
                      <TableCell align="center">{result.voteCount}</TableCell>
                      <TableCell align="center">{result.votePercentage}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Container>
    </Box>
  );
}

export default Votes;









// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Snackbar, Alert } from '@mui/material';

// function Votes() {
//   const [votingResults, setVotingResults] = useState([]);
//   const [totalVotes, setTotalVotes] = useState(0);
//   const [error, setError] = useState('');

//   // Fetch voting results when the component mounts
//   useEffect(() => {
//     axios.get('http://localhost:8000/api/voting-results')
//       .then((response) => {
//         if (response.data.success) {
//           setVotingResults(response.data.results);
//           console.log('response.data.results',response.data.results);
//           setTotalVotes(response.data.totalVotes);
//         } else {
//           setError('Failed to fetch voting results');
//         }
//       })
//       .catch((err) => {
//         setError('Error fetching voting results');
//         console.error(err);
//       });
//   }, []);

//   return (
//     <Box sx={{ py: 4 }}>
//       <Container maxWidth="md">
//         <Typography variant="h4" align="center" gutterBottom>Voting Results</Typography>

//         {/* Error Snackbar */}
//         {error && (
//           <Snackbar open={true} autoHideDuration={6000} onClose={() => setError('')}>
//             <Alert severity="error" onClose={() => setError('')}>{error}</Alert>
//           </Snackbar>
//         )}

//         {/* Total Votes */}
//         <Typography variant="h6" align="center" sx={{ mb: 4 }}>Total Votes: {totalVotes}</Typography>

//         {/* Table to Display Voting Results */}
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 650 }} aria-label="voting results table">
//             <TableHead>
//               <TableRow>
//                 <TableCell align="center"><Typography variant="h6">Name</Typography></TableCell>
//                 <TableCell align="center"><Typography variant="h6">Party</Typography></TableCell>
//                 <TableCell align="center"><Typography variant="h6">Vote Count</Typography></TableCell>
//                 <TableCell align="center"><Typography variant="h6">Vote Percentage</Typography></TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {votingResults.map((result) => (
//                 <TableRow key={result.partySign}>
//                   <TableCell align="center">{result.partyName}</TableCell>
//                   <TableCell align="center">{result.partySign}</TableCell>
//                   <TableCell align="center">{result.voteCount}</TableCell>
//                   <TableCell align="center">{result.votePercentage}%</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </Container>
//     </Box>
//   );
// }

// export default Votes;
