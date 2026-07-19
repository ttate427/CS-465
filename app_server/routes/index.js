const express = require('express');
const router = express.Router();
const travellerController = require('../controllers/traveller');

router.get('/', travellerController.home);
router.get('/travel', travellerController.travel);

module.exports = router;
