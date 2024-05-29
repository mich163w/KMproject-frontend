const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../models/user');
const { registerValidation, loginValidation, changePasswordValidation } = require('../validation');
const jwt = require('jsonwebtoken');

// Registration
router.post("/register", async (req, res) => {
    // Validate user input (name, email, password) 
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    // Check if email is already registered
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
        return res.status(400).json({ error: "Email already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);

    // Create a user object and save in the DB
    const userObject = new User({
        name: req.body.name,
        email: req.body.email,
        password
    });

    try {
        const savedUser = await userObject.save();
        res.json({ error: null, data: savedUser.id });
    } catch (error) {
        res.status(400).json({ error });
    }
});

// Login
router.post("/login", async (req, res) => {
    // Validate user login info
    const { error } = loginValidation(req.body);
    if (error) {
        console.log("wrong user info");
        return res.status(400).json({ error: error.details[0].message });
    }

    // Find the user
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        console.log("not found in db");
        return res.status(400).json({ error: "Email is wrong" });
    }

    // Check for password correctness
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).json({ error: "Password is wrong" });
    }

    // Create access token
    const token = jwt.sign(
        { name: user.name, id: user.id },
        process.env.TOKEN_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );

   // Create refresh token
            const refreshToken = jwt.sign(
        // Opretter et nyt JWT-token, der indeholder brugerens navn, e-mail og typen 'refresh'
            { name: user.name, email: user.email, type: 'refresh' },
        // Bruger variabelen TOKEN_SECRET til at signere tokenet
            process.env.TOKEN_SECRET,
        // Angiver tiden for refresh token
            { expiresIn: '24h' }
            );

    const loggedInUser = {
        id: user._id,
        name: user.name,
        email: user.email
    };
    const userId = user.id;

    // Attach auth token to header and respond
    res.header("auth-token", token).json({
        error: null,
        data: { token, refreshToken, userId },
        loggedInUser
    });
});

// Refresh token route
router.post("/refresh", async (req, res) => {
    const { email, refreshToken } = req.body;
    // Validerer refresh token ved at kalde verifyRefresh-funktionen
    const isValid = verifyRefresh(email, refreshToken);
    if (!isValid) {
        // Hvis refresh token ikke er gyldigt, sendes en fejlmeddelelse
        return res.status(401).json({ success: false, error: "Invalid token, try login again" });
    }

    // Find brugeren baseret på den angivne e-mail
    const user = await User.findOne({ email: req.body.email });

    // Opretter en ny access token med en levetid på 2 timer
    const accessToken = jwt.sign(
        // Tokenet indeholder brugerens navn, e-mail og typen 'access'
        { name: user.name, email: user.email, type: 'access' },
        // Signerer tokenet med TOKEN_SECRET
        process.env.TOKEN_SECRET,
        // Angiver udløbstiden for access token til 2 timer
        { expiresIn: '2h' }
    );
    // Sender den nye access token til klienten som svar
    return res.status(200).json({ success: true, accessToken });
});


// Profile
router.get("/profile", async (req, res) => {
    try {
        const token = req.header("auth-token");
        if (!token) {
            return res.status(401).json({ error: "Access Denied" });
        }
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verified.id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json({ id: user._id, name: user.name, email: user.email });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Change user details
router.put('/changes/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if(req.body.newPassword) {
            if (!req.body.currentPassword) return res.status(400).json({ error: 'Current password is required' });  
            const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);  
            if (!isPasswordValid) return res.status(400).json({ error: 'Current password is incorrect' });  
        }

        user.email = req.body.email || user.email; 
        user.name = req.body.name || user.name;
        if (req.body.newPassword) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.newPassword, salt);
        }
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Change password
router.put("/password/:userId", async (req, res) => {
    const { error } = changePasswordValidation(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const user = await User.findById(req.params.userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isPasswordValid = await bcrypt.compare(req.body.currentPassword, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: 'Current password is incorrect' });

        const salt = await bcrypt.genSalt(10);
        const hashedNewPassword = await bcrypt.hash(req.body.newPassword, salt);

        user.password = hashedNewPassword;
        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
