const Joi = require("joi"); // Importerer Joi til validering af data
const jwt = require('jsonwebtoken'); // Importerer jwt til behandling af JSON Web Tokens

// Validering af registrering
const registerValidation = (data) => {
    // Definerer valideringsskemaet for registrering
    const schema = Joi.object({
        name: Joi.string().min(6).max(255).required(), // Navn skal være mellem 6 og 255 tegn langt og påkrævet
        email: Joi.string().min(3).max(255).required(), // Email skal være mellem 3 og 255 tegn lang og påkrævet
        password: Joi.string().min(8).max(255).required() // Adgangskode skal være mellem 8 og 255 tegn lang og påkrævet
    });
    return schema.validate(data); // Validerer dataene mod skemaet
}

// Validering af login
const loginValidation = (data) => {
    // Definerer valideringsskemaet for login
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required(), // Email skal være mellem 3 og 255 tegn lang og påkrævet
        password: Joi.string().min(8).max(255).required() // Adgangskode skal være mellem 8 og 255 tegn lang og påkrævet
    });
    return schema.validate(data); // Validerer dataene mod skemaet
}

// Verificerer token (JWT)
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token"); // Henter token fra anmodningens header
    if (!token) return res.status(401).json({ error: "Access Denied." }); // Hvis der ikke er nogen token, returneres en fejlmeddelelse

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET); // Verificerer tokenet ved hjælp af TOKEN_SECRET
        req.user = verified; // Gemmer verificerede brugeroplysninger i anmodningen
        next(); // Kalder næste middleware
    } catch (error) {
        res.status(400).json({ error: "Token is not valid." }); // Hvis der opstår en fejl under verificeringen, returneres en fejlmeddelelse
    }
}

// Verificerer refresh token
const verifyRefresh = (email, refreshToken) => {
    try {
        // Dekoder refresh token for at få adgang til dets indhold
        const decoded = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
        // Sammenligner e-mailen fra tokenet med den angivne e-mail for at sikre gyldighed
        return decoded.email === email;
    } catch (error) {
        // Hvis der opstår en fejl (f.eks. udløbet token), returneres false
        return false;
    }
}

// Validering af ændring af adgangskode
const changePasswordValidation = (data) => {
    // Definerer valideringsskemaet for ændring af adgangskode
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required(), // Email skal være mellem 3 og 255 tegn lang og påkrævet
        currentPassword: Joi.string().min(8).max(255).required(), // Nuværende adgangskode skal være mellem 8 og 255 tegn lang og påkrævet
        newPassword: Joi.string().min(8).max(255).required() // Ny adgangskode skal være mellem 8 og 255 tegn lang og påkrævet
    });
    return schema.validate(data); // Validerer dataene mod skemaet
}

module.exports = { registerValidation, loginValidation, verifyToken, verifyRefresh, changePasswordValidation }; // Eksporterer valideringsfunktionerne
