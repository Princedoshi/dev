// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import the cors middleware
const routes = require('./routes');
const database = require('./database');

const app = express();
const port = 3001;

app.use(bodyParser.json());

// Enable CORS for all routes
app.use(cors());

// Initialize the database
database.initializeDatabase();

// Use routes
app.use('/api', routes);

// Listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Close the database when the app is terminated
process.on('SIGINT', () => {
  database.closeDatabase();
  process.exit();
});
