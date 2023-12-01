const express = require('express');

const shiftRoute = require('./shift');
const executorRoute = require('./executor');

const router = express.Router();

router.use('/shift', shiftRoute);
router.use('/executor', executorRoute);

module.exports = router;
