const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
// const { verifyToken } = require("./validation"); --> har ikke lyst til det er på alle og så tilføj linje 55 i stedet for 54


// CORS npm package
app.use(cors({
    "origin": "*"
}));


/*
app.use(function (req, res, next) {
    res.header("Acces-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-Width, Content-Type, Accept");
    next();
});

*/

// swagger dependencies
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");

// setup swagger
const swaggerDefinition = yaml.load('./swagger.yaml');
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// import routes
const authRoutes = require("./routes/auth");
const appointmentRoutes = require("./routes/appointment");
const shoppingItemRoutes = require("./routes/shoppingItem");
const toDoRoutes = require("./routes/toDo");


require("dotenv-flow").config();






// parse request of content-type JSON
app.use(bodyParser.json());




mongoose.set('strictQuery', false);
mongoose.connect
 (
    process.env.DBHOST,
    {
        useUnifiedTopology:true,
        useNewUrlParser: true
    }

).catch(error => console.log("Error connecting to MongoDB:" + error));
mongoose.connection.once("open", () => console.log("Succesfully connected to MongoDB"));





// route
app.get("/api/welcome", (req, res) => {

    res.status(200).send({message: "Welcome to the MEN RESTful API"});
})


// post, put, delete - CRUD
app.use("/api/appointment", appointmentRoutes);
app.use("/api/shoppingItem", shoppingItemRoutes);
app.use("/api/toDo", toDoRoutes);
app.use("/api/user", authRoutes);




const PORT = process.env.PORT || 4000;
// Start up server
app.listen(PORT, function() {
    console.log("Server is running on port: " + PORT);
})

module.exports = app;

