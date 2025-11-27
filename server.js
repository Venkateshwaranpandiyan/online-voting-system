const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { createObjectCsvWriter, readRecords } = require('csv-writer');
const path = require('path');
const fs = require('fs');
const csvParser = require('csv-parse');
const csv = require('fast-csv');

const app = express();
const port = 8000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // Parse JSON bodies

// Path to save the CSV file
const csvFilePath = path.join(__dirname, 'voterList.csv');

// Create a CSV Writer
const csvWriter = createObjectCsvWriter({
  path: csvFilePath, // Path to save the CSV file
  header: [
    { id: 'id', title: 'voter_id' },
    { id: 'name', title: 'Name' },
    { id: 'gender', title: 'Gender' },
    { id: 'zone', title: 'Zone' },
    { id: 'city', title: 'City' },
    { id: 'password', title: 'Passw' },
    { id: 'hasVoted', title: 'hasVoted' },
  ],
  append: true, // Append to the file if it exists
});

// Sample Data Structure for New Voter Registration
let nextVoterId = 10001; // Start with 10001 for voter_id

// This is your voter CSV path
const voterFilePath = path.join(__dirname, 'voterList.csv');

// POST route for registering a voter
app.post('/api/register', (req, res) => {
  const { name, gender, zone, city, password } = req.body;

  // Check if data is valid
  if (!name || !gender || !zone || !city || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  // Prepare the new voter data
  const newVoter = {
    id: nextVoterId++,
    name,
    gender,
    zone,
    city,
    password,
    hasVoted: 0, // Default value for hasVoted is 0 (not voted)
  };

  // Add new voter to the CSV file
  csvWriter.writeRecords([newVoter])
    .then(() => {
      // Respond with success message and the new Voter ID
      res.status(200).json({
        success: true,
        message: 'Registration successful!',
        voterId: newVoter.id,
      });
    })
    .catch((err) => {
      console.error('Error writing to CSV file:', err);
      res.status(500).json({ success: false, message: 'Error saving voter data' });
    });
});

// POST route for logging in a voter
app.post('/api/login', (req, res) => {
  const { voterId, password } = req.body;
  console.log('Login request received:', req.body);

  // Check if data is valid
  if (!voterId || !password) {
    return res.status(400).json({ success: false, message: 'Voter ID and password are required' });
  }

  // Read the voterList.csv file and check for a matching voter
  fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error reading voter data' });
    }

    // Parse the CSV file and look for the matching voter ID and password
    csvParser.parse(data, { delimiter: ',', trim: true }, (parseErr, records) => {
      if (parseErr) {
        return res.status(500).json({ success: false, message: 'Error parsing voter data' });
      }

      // Manually map each record based on the expected column order
      const mappedRecords = records.map((record) => ({
        voter_id: record[0],  // First column: voter_id
        Name: record[1],      // Second column: Name
        Gender: record[2],    // Third column: Gender
        Zone: record[3],      // Fourth column: Zone
        City: record[4],      // Fifth column: City
        Passw: record[5],     // Sixth column: Password
        hasVoted: record[6],  // Seventh column: hasVoted
      }));

      // Debugging: Check the mapped records
      console.log('Mapped records:', mappedRecords);

      // Find the voter based on voterId and password
      const voter = mappedRecords.find((record) => {
        return parseInt(record.voter_id) === parseInt(voterId) && record.Passw === password;
      });

      if (voter) {
        // Check if the voter has already voted
        if (voter.hasVoted === '1') {
          return res.status(400).json({ success: false, message: 'You have already registered your vote.' });
        }

        res.status(200).json({
          success: true,
          message: 'Login successful!',
          voterId: voter.voter_id,
          name: voter.Name,
          hasVoted: voter.hasVoted,  // Seventh column: hasVoted
        });
      } else {
        res.status(401).json({ success: false, message: 'Invalid Voter ID or password' });
      }
    });
  });
});


// // POST route for logging in a voter
// app.post('/api/login', (req, res) => {
//   const { voterId, password } = req.body;
//   console.log('Login request received:', req.body);

//   // Check if data is valid
//   if (!voterId || !password) {
//     return res.status(400).json({ success: false, message: 'Voter ID and password are required' });
//   }

//   // Read the voterList.csv file and check for a matching voter
//   fs.readFile(csvFilePath, 'utf8', (err, data) => {
//     if (err) {
//       return res.status(500).json({ success: false, message: 'Error reading voter data' });
//     }

//     // Parse the CSV file and look for the matching voter ID and password
//     csvParser.parse(data, { delimiter: ',', trim: true }, (parseErr, records) => {
//       if (parseErr) {
//         return res.status(500).json({ success: false, message: 'Error parsing voter data' });
//       }

//       // Manually map each record based on the expected column order
//       const mappedRecords = records.map((record) => ({
//         voter_id: record[0],  // First column: voter_id
//         Name: record[1],      // Second column: Name
//         Gender: record[2],    // Third column: Gender
//         Zone: record[3],      // Fourth column: Zone
//         City: record[4],      // Fifth column: City
//         Passw: record[5],     // Sixth column: Password
//         hasVoted: record[6],  // Seventh column: hasVoted
//       }));

//       // Debugging: Check the mapped records
//       console.log('Mapped records:', mappedRecords);

//       // Find the voter based on voterId and password
//       const voter = mappedRecords.find((record) => {
//         return parseInt(record.voter_id) === parseInt(voterId) && record.Passw === password;
//       });

//       if (voter) {
//         res.status(200).json({
//           success: true,
//           message: 'Login successful!',
//           voterId: voter.voter_id,
//           name: voter.Name,
//           hasVoted: voter.hasVoted,  // Seventh column: hasVoted

//         });
//       } else {
//         res.status(401).json({ success: false, message: 'Invalid Voter ID or password' });
//       }
//     });
//   });
// });

// //new
// // POST route for submitting a vote api/submit-vote
app.post('/api/submit-vote', (req, res) => {
  const { voterId, partySign } = req.body;
  console.log('Vote submission request received:', req.body);
  
  // Check if voterId and partySign are provided
  if (!voterId || !partySign) {
    return res.status(400).json({ success: false, message: 'Voter ID and Party Sign are required.' });
  }

  // Path to the voter CSV file
  const voterFilePath = path.join(__dirname, 'voterList.csv');
  
  // Read the voter CSV file to find the voter and update the hasVoted status
  let updatedVoters = [];
  let voterFound = false;

  fs.createReadStream(voterFilePath)
    .pipe(csv.parse({ headers: false, skipEmptyLines: true })) // no headers in CSV
    .on('data', (row) => {
      // Mapping columns manually since no headers are available
      const voterIdFromCsv = row[0]; // First column: voter_id
      const name = row[1];           // Second column: Name
      const gender = row[2];         // Third column: Gender
      const zone = row[3];           // Fourth column: Zone
      const city = row[4];           // Fifth column: City
      const password = row[5];       // Sixth column: Passw
      let hasVoted = row[6];         // Seventh column: hasVoted

      // Ensure we compare voterId as a string (since row data is in string format)
      if (String(voterIdFromCsv) === String(voterId)) {
        voterFound = true;

        // If the voter has already voted, send an error message
        if (hasVoted === '1') {
          return res.status(400).json({ success: false, message: 'You have already voted.' });
        }

        // Update the hasVoted field to 1
        hasVoted = '1';
      }

      // Push the updated row back into the array
      updatedVoters.push([voterIdFromCsv, name, gender, zone, city, password, hasVoted]);
    })
    .on('end', () => {
      if (!voterFound) {
        return res.status(404).json({ success: false, message: 'Voter not found.' });
      }

      // Path to the candidate CSV file
      const candFilePath = path.join(__dirname, 'cand_list.csv');
      
      // Read the candidate CSV file to update the vote count
      fs.readFile(candFilePath, 'utf8', (err, candData) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Error reading candidate CSV file' });
        }

        let candLines = candData.split('\n');
        let partyUpdated = false;

        // Update vote count for the party based on partySign
        for (let i = 1; i < candLines.length; i++) {
          let columns = candLines[i].split(',');
          if (columns[1] === partySign) {
            columns[3] = (parseInt(columns[3]) + 1).toString(); // Increment vote count
            candLines[i] = columns.join(',');
            partyUpdated = true;
            break;
          }
        }

        if (partyUpdated) {
          // Write the updated candidate data back to the CSV file
          fs.writeFile(candFilePath, candLines.join('\n'), 'utf8', (err) => {
            if (err) {
              return res.status(500).json({ success: false, message: 'Error writing candidate CSV file' });
            }

            // Now update the voter data (mark the voter as having voted)
            const writer = csv.format({ headers: false });
            const output = fs.createWriteStream(voterFilePath);
            writer.pipe(output);

            updatedVoters.forEach((row) => {
              writer.write(row);
            });

            writer.end();

            res.status(200).json({
              success: true,
              message: 'Vote submitted successfully!',
              party: partySign,
            });
          });
        } else {
          res.status(404).json({ success: false, message: 'Party not found' });
        }
      });
    })
    .on('error', (err) => {
      console.error('Error reading the voter CSV file:', err);
      res.status(500).json({ success: false, message: 'Error processing your vote.' });
    });
});


// Endpoint to get voting results
app.get('/api/voting-results', (req, res) => {
  const filePath = path.join(__dirname, 'cand_list.csv');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send({ success: false, message: 'Error reading CSV file' });
    }

    let lines = data.split('\n');
    let totalVotes = 0;
    let results = [];

    // Loop through each line (skip the first line as it's headers)
    for (let i = 1; i < lines.length; i++) {
      let columns = lines[i].split(',');
      
      if (columns.length < 4) continue; // Skip if there are not enough columns

      let partySign = columns[1];
      let voteCount = parseInt(columns[3]);

      // Handle cases where voteCount is not a valid number
      if (isNaN(voteCount)) {
        console.log(`Invalid voteCount at line ${i}: ${columns[3]}`); // Debugging: log invalid voteCount
        voteCount = 0; // Default to 0 if invalid
      }

      console.log('Vote count:', voteCount);  // Debugging: Check the vote count
      totalVotes += voteCount;  // Sum up total votes
      console.log('Total votes:', totalVotes);  // Debugging: Check the total votes

      results.push({
        partySign,
        partyName: columns[2],
        voteCount,
        votePercentage: 0,  // Default percentage
      });
    }

    // Calculate vote percentage for each party
    if (totalVotes > 0) {
      results = results.map(result => ({
        ...result,
        votePercentage: ((result.voteCount / totalVotes) * 100).toFixed(2),  // Percentage calculation
      }));
    }

    res.status(200).json({
      success: true,
      totalVotes,
      results,
    });
  });
});



// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


