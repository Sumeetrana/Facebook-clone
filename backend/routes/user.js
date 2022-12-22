const express = require('express');

const { userRegistration, activateAccount, login } = require('../controllers/user');

const router = express.Router();

router.post("/register", userRegistration);
router.post("/activate", activateAccount);
router.post("/login", login);

module.exports = router;