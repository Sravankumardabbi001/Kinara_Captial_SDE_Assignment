const express = require('express');
const csv = require('csv-parser');
const fs = require('fs');
const app = express();

// Define the route for loading student details with pagination
app.get('/students', (req, res) => {
  const { page, pageSize } = req.query;

  // Read the data file using the appropriate module based on the file format
  const fileFormat = 'csv'; // Replace with the actual file format you're using
  const filePath = 'Students.' + fileFormat; // Replace with the path to your data file
  const data = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (row) => {
      // Collect all student details from the file
      data.push(row);
    })
    .on('end', () => {
      // Apply pagination to the data and return the appropriate subset
      const startIndex = (page - 1) * pageSize;
      const endIndex = page * pageSize;
      const paginatedData = data.slice(startIndex, endIndex);

      res.json(paginatedData);
    });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
