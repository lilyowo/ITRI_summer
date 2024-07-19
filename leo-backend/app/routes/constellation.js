const express = require('express');
const router = express.Router();
const { addConstellation, getConstellations } = require('../models/constellation.model');

// router.post('/', (req, res) => {
//     const newConstellation = req.body;
//     addConstellation(newConstellation);
//     res.status(200).json({ message: 'Data saved successfully' });
// });

// router.get('/', (req, res) => {
//     res.status(200).json(getConstellations());
// });
router.get('/', (req, res) => {
    res.send('Hello, World!');
});

module.exports = router;



/*
app.get('/data', (req, res) => {
    fs.readFile('test_data.json', 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading file');
        return;
      }
      const jsonData = JSON.parse(data);
      res.send(`<h1>${JSON.stringify(jsonData, null, 2)}</h1>`);
    });
  });
*/