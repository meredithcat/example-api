const express = require('express');
const dogRoutes = require('./dogs.js');
const authRoutes = require('./auth.js');

const router = express.Router(); // eslint-disable-line new-cap

// all routes for accessing resource
router.use('/dogs', dogRoutes);


// all routes for auth
router.use('/auth', authRoutes);

module.exports = router;
