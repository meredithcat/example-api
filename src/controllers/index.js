const express = require('express');
const dogRoutes = require('./dogs.js');
const authRoutes = require('./auth.js');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: Change to your model.

router.use('/dogs', dogRoutes);

router.use('/auth', authRoutes);

module.exports = router;
