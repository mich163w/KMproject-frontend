const router = require("express").Router();
const { verifyToken } = require("../validation");
const toDo = require("../models/toDo");




// CRUD Operations

// Create product
router.post("/", verifyToken, (req, res) => {

    // Body, parsed as json
    let data = req.body;

    // passed into insertMany function of mongoose and inserted into the database
    toDo.insertMany(data)

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});




// Read all products
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



router.get("/:id", (req, res) => {

    toDo.findById(req.params.id)

        // responds with the data
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })

});





// Update specific product
router.put("/:id", (req, res) => {
    const id = req.params.id;
  
    toDo.findByIdAndUpdate(id, req.body, { new: true })
      .then(data => {
        if (!data) {
          res.status(404).send({ message: "Cannot update to do by id=" + id + ". Maybe to do was not found" });
        } else {
          res.send({ message: "To do was successfully updated.", data });
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Error updating to do with id=" + id });
      });
  });




// Delete specific product
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


// Route to update item positions
router.post('/updatePositions', async (req, res) => {
    const { updatedItems } = req.body;

    console.log("recieved item: ", updatedItems)

    try {
        // Update positions in the database
        await Promise.all(updatedItems.map(async (item) => {
            console.log(item)
            await toDo.findByIdAndUpdate(item._id, { position: item.position });
        }));

        res.status(200).send("OK")
    } catch (error) {
        console.error('Error updating item positions:', error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;





