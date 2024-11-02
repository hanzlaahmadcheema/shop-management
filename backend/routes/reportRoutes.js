const express = require('express');
const router = express.Router();

// Define a test route to ensure it's working
router.get('/', (req, res) => {
  res.send('Report endpoint is working');
});

module.exports = router;
