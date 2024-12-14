// filepath: /c:/Users/jhnh1/OneDrive/Documents/code-projects/case-notes-app/server.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/tinymce-api-key', (req, res) => {
  console.log('API Key:', process.env.TINYMCE_API_KEY);
  res.json({ apiKey: process.env.TINYMCE_API_KEY });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});