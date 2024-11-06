// server.js
const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Enable CORS for frontend
app.use(cors());

// Set up storage for file upload using Multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route to upload and process PDF
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    // Parse the PDF
    const data = await pdfParse(req.file.buffer);
    const text = data.text;

    // Extract region and sales data (customize this as per your PDF's structure)
    const dataPattern = /Region:\s*([\w\s]+),?\s*Sales:\s*(\d+)/g;
    let match;
    const chartData = [];

    while ((match = dataPattern.exec(text)) !== null) {
      chartData.push({
        region: match[1].trim(),
        sales: parseInt(match[2])
      });
    }

    res.json({ chartData });
  } catch (error) {
    res.status(500).json({ error: 'Error parsing PDF' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
