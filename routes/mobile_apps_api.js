const express = require('express');
const router = express.Router();

router.get('/read', (req, res, next) => {
  res.json('READ');
});

router.post('/set', (req, res, next) => {
  res.json('SET');
});

router.post('/bump', (req, res, next) => {
  res.json('BUMP');
});

module.exports = router;