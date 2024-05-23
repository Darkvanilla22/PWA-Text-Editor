const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, '../../dist')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Import routes
require('./routes/htmlRoutes')(app);

// Serve the index.html file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../dist', 'index.html'));
});

app.listen(PORT, () => console.log(`Now listening on port: ${PORT}`));