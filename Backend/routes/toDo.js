const router = require("express").Router();
const { verifyToken } = require("../validation");
const toDo = require("../models/toDo");




// CRUD Operations

// Create product - post
router.post("/", /*verifyToken,*/ (req, res) => {

    // Body, parsed as json
    let data = req.body;

    // passed into insertMany function of mongoose and inserted into the database
    toDo.insertMany(data)

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});




// Read all products - get
// Create product - post  "/" = /api/toDo/
router.get("/", (req, res) => {

    toDo.find()

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});



router.get("/:author", (req, res) => {

    toDo.find({ user: req.params.author })

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});



// cars/type/           
router.get("/:id", (req, res) => {

    toDo.findById(req.params.id)

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});





// Update specific product - put
router.put("/:id", (req, res) => {

    const id = req.params.id;

    toDo.findByIdAndUpdate(id, req.body)

        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot update toDo by id=" + id + ". Maybe toDo was not found" })
            }
            else {
                res.send({ message: "Product was succesfully updated." })
            }

        })
        .catch(err => { res.status(500).send({ message: "Error updating toDo with id=" + id }); })
});




// Delete specific product - delete
router.delete("/:id", verifyToken, (req, res) => {

    const id = req.params.id;

    toDo.findByIdAndDelete(id)

        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete toDo by id=" + id + ". Maybe toDo was not found" })
            }
            else {
                res.send({ message: "toDo was succesfully deleted." })
            }

        })
        .catch(err => { res.status(500).send({ message: "Error deleting toDo with id=" + id }); })
});


module.exports = router;





