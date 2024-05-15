const router = require("express").Router();
const { verifyToken } = require("../validation");
const shoppingItem = require("../models/shoppingItem");
const { STATES } = require("mongoose");
const { update } = require("../models/user");



// CRUD Operations

// Create product - post
router.post("/", /*verifyToken,*/ (req, res) => {

    // Body, parsed as json
    let data = req.body;

    // passed into insertMany function of mongoose and inserted into the database
    shoppingItem.insertMany(data)

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});




// Read all products - get
// Create product - post  "/" = /api/shoppinglist/
router.get("/", (req, res) => {

    shoppingItem.find()

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});


router.get("/:author", (req, res) => {

    shoppingItem.find({ user: req.params.author })

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});



// cars/type/           
router.get("/:id", (req, res) => {

    shoppingItem.findById(req.params.id)

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});





// Update specific product - put
router.put("/:id", (req, res) => {

    const id = req.params.id;

    shoppingItem.findByIdAndUpdate(id, req.body)

        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot update shoppingItem by id=" + id + ". Maybe shoppinglist was not found" })
            }
            else {
                res.send({ message: "shoppingItem was succesfully updated." })
            }

        })
        .catch(err => { res.status(500).send({ message: "Error updating shoppingItem with id=" + id }); })
});




// Delete specific product - delete
router.delete("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    shoppingItem.findByIdAndDelete(id)

        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete shoppingItem by id=" + id + ". Maybe shoppinglist was not found" })
            }
            else {
                res.send({ message: "shoppingItem was succesfully deleted." })
            }

        })
        .catch(err => { res.status(500).send({ message: "Error deleting shoppingItem with id=" + id }); })
});


// Route to update item positions
router.post('/updatePositions', async (req, res) => {
    const { updatedItems } = req.body;

    console.log("recieved item: ", updatedItems)

    try {
        // Update positions in the database
        await Promise.all(updatedItems.map(async (item) => {
            console.log(item)
            await shoppingItem.findByIdAndUpdate(item._id, { position: item.position });
        }));

        res.status(200).send("OK")
    } catch (error) {
        console.error('Error updating item positions:', error);
        res.status(500).send('Internal Server Error');
    }
});


module.exports = router;





