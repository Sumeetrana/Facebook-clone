const express = require('express');

const { userRegistration, activateAccount } = require('../controllers/user');

const router = express.Router();

router.post("/register", userRegistration);
router.post("/activate", activateAccount);

module.exports = router;