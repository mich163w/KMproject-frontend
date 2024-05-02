const router = require("express").Router();
const { verifyToken } = require("../validation");
const Board = require("../models/board");




// Create board - post
router.post("/", /*verifyToken, */ (req, res) => {
    let data = req.body;

      // passed into insertMany function of mongoose and inserted into the database
      Board.insertMany(data)
        // responds with the data
        .then(data => { res.status(201).send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
});




// Read all boards - get
router.get("/", (req, res) => {
    Board.find()
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
});





// Read specific board - get
router.get("/:id", (req, res) => {
    Board.findById(req.params.id)
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); });
});





// Update specific board - put
router.put("/:id", (req, res) => {
    const id = req.params.id;
    Board.findByIdAndUpdate(id, req.body)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot update board by id=" + id + ". Maybe board was not found" });
            } else {
                res.send({ message: "Board was successfully updated." });
            }
        })
        .catch(err => { res.status(500).send({ message: "Error updating board with id=" + id }); });
});





// Delete specific board - delete
router.delete("/:id", verifyToken, (req, res) => {
    const id = req.params.id;
    Board.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Cannot delete board by id=" + id + ". Maybe board was not found" });
            } else {
                res.send({ message: "Board was successfully deleted." });
            }
        })
        .catch(err => { res.status(500).send({ message: "Error deleting board with id=" + id }); });
});



module.exports = router;
