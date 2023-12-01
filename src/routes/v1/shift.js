const express = require('express');

const shiftController = require('../../controllers/shift');

const router = express.Router();

router.route('/').get(shiftController.getAll);

router.route('/calculate-overlap').get(shiftController.calculateOverlap);

module.exports = router;
