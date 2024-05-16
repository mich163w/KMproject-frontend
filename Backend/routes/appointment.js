const router = require("express").Router();
const { verifyToken } = require("../validation");
const appointment = require("../models/appointment");
const { STATES } = require("mongoose");





// CRUD Operations

// Create product 
router.post("/", /*verifyToken,*/ (req, res) => {

    // Body, parsed as json
    let data = req.body;

    // passed into insertMany function of mongoose and inserted into the database
    appointment.insertMany(data)

        .then(data => { res.status(201).send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});




// Read all products
router.get("/", (req, res) => {

    appointment.find()

    .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});



router.get("/:author", (req, res) => {

    appointment.find({ user: req.params.author })

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});





router.get("/:id", (req, res) => {

    appointment.findById(req.params.id)

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});





// Update specific product
router.put("/:id", (req, res) => {

    const id = req.params.id;

    appointment.findByIdAndUpdate(id, req.body)

        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot update appointment by id=" + id + ". Maybe appointment was not found" })
            }
            else {
                res.send({ message: "appointment was succesfully updated." })
            }

        })
        .catch(err => { res.status(500).send({ message: "Error updating appointment with id=" + id }); })
});




// Delete specific product 
router.delete("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    appointment.findByIdAndDelete(id)

        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete appointment by id=" + id + ". Maybe appointment was not found" })
            }
            else {
                res.send({ message: "appointment was succesfully deleted." })
            }

        })
        .catch(err => { res.status(500).send({ message: "Error deleting appointment with id=" + id }); })
});

// Route to update item positions
router.post('/updatePositions', async (req, res) => {
    const { updatedItems } = req.body;

    console.log("recieved item: ", updatedItems)

    try {
        // Update positions in the database
        await Promise.all(updatedItems.map(async (item) => {
            console.log(item)
            await appointment.findByIdAndUpdate(item._id, { position: item.position });
        }));

        res.status(200).send("OK")
    } catch (error) {
        console.error('Error updating item positions:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;








