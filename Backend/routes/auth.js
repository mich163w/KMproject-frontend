const router = require('express').Router();
const { application } = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { registerValidation, loginValidation, changePasswordValidation } = require('../validation');
const jwt = require('jsonwebtoken');
const Joi = require("joi");

// /registration
// post request because we want to send data to the api and eventually also to the database to save registering a user
router.post("/register", async (req, res) => {
    // validate user input (name, email, password) 
    const { error } = registerValidation(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });

    }


    // check if email is already registered
    const emailExist = await User.findOne({ email: req.body.email });

    if (emailExist) {
        return res.status(400).json({ error: "Email already exists" })
    }

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // Se hvordan koden ændres med salt og hashing i terminalen når man laver en bruger
    // console.log("salt: " + salt);
    // console.log("Pass: " + password);

    // create a user object and save in the DB
    const userObject = new User({
        name: req.body.name,
        email: req.body.email,
        password
    });

    try {
        const savedUser = await userObject.save();
        res.json({ error: null, data: savedUser.id });
    } catch (error) {
        res.status(400).json({ error })
    }

})


// /login
router.post("/login", async (req, res) => {

    // validate user login info
    const { error } = loginValidation(req.body);

    if (error) {
        console.log("wrong user info");
        return res.status(400).json({ error: error.details[0].message });
    }

    // if login info is valid, find the user
    const user = await User.findOne({ email: req.body.email });

    // throw error if the email is wrong (user does not exist in DB)
    if (!user) {
        console.log("not found in db");
        return res.status(400).json({ error: "Email is wrong" })
    }


    // user exist - check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password)


    // throw error if password is wrong
    if (!validPassword) {
        return res.status(400).json({ error: "Password is wrong" });
    }


    // create authentication token with username and id
    const token = jwt.sign(
        // payload
        {
            name: user.name,
            id: user.id
        },
        // TOKEN_SECRET
        process.env.TOKEN_SECRET,
        //EXPIRATION TIME
        { expiresIn: process.env.JWT_EXPIRES_IN },


    )

    const userId = user.id

    // attach auth token to header
    res.header("auth-token", token).json({
        error: null,
        data: { token, userId }
    });
})

router.get("/profile", async (req, res) => {
    try {
        // Få token fra anmodningens header
        const token = req.header("auth-token");

        // Hvis token ikke er tilgængelig, send fejl
        if (!token) {
            return res.status(401).json({ error: "Access Denied" });
        }

        // Valider token
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);

        // Find brugeren baseret på tokenens id
        const user = await User.findById(verified.id);

        // Hvis brugeren ikke eksisterer, send fejl
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Returner brugerens navn og e-mail
        res.json({ id: user._id, name: user.name, email: user.email });
    } catch (error) {
        // Hvis der opstår en fejl, send fejlbesked
        res.status(400).json({ error: error.message });
    }
});


router.put('/changes/:userId', async (req, res) => {


    try {
        // Hent brugerens eksisterende oplysninger fra databasen
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if(req.body.newPassword) {
            if (!req.body.currentPassword) return res.status(400).json({ error: 'Current password is required' });  
            const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);  
            if (!isPasswordValid) return res.status(400).json({ error: 'Current password is incorrect' });  
        }

        // Opdater brugerens loginoplysninger baseret på de modtagne data
        user.email = req.body.email || user.email; // Opdater kun, hvis der er sendt en ny e-mail
        user.name = req.body.name || user.name;
        if (req.body.newPassword) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.newPassword, salt);
        }
        // Gem ændringerne i databasen
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


router.put("/password/:userId", async (req, res) => {
    // Validér inputdata fra brugeren
    const { error } = changePasswordValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        // Hent brugerens eksisterende oplysninger fra databasen
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Kontroller, om det gamle kodeord matcher det, der blev sendt
        const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: 'Current password is incorrect' });

        // Generer et salt og hash for det nye kodeord
        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);

        // Opdater brugerens adgangskode i databasen
        user.password = hashedNewPassword;

        // Gem ændringerne i databasen
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})


module.exports = router;
