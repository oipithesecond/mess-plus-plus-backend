const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');

router.get('/google', authMiddleware.googleAuth);

router.get('/google/callback', authMiddleware.googleCallback, (req, res) => {
    res.redirect('https://messplusplusfe.vercel.app/dashboard');
});

router.get('/logout', authMiddleware.logout);

module.exports = router;
