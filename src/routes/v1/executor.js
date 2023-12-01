const express = require('express');

const executorController = require('../../controllers/executor');

const router = express.Router();

router.route('/4').get(executorController.Query4);

router.route('/5').get(executorController.Query5);

router.route('/6').get(executorController.Query6);

module.exports = router;
