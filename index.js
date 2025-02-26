const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const mongoose = require('mongoose')
const path = require('path')
const connectDB = require('./config/db')
const user = require('./models/user.model')
const passport = require('passport')
const session = require('express-session')
require('./config/passport')

dotenv.config()
const app = express();
app.use(cors()); 
app.use(express.json())
const PORT = process.env.PORT || 5000

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile'); // Redirect after login
    }
);
app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/auth/google');
    }
    res.json(req.user);
});

app.get("/", (req,res) => {
    res.send("Server is ready")
})

app.get("/login", (req,res) => {

})



app.listen(PORT, () => {
    connectDB()
    console.log('Server started at specified port')
})