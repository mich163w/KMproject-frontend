const router = require("express").Router();
const { verifyToken } = require("../validation"); // Importerer funktionen 'verifyToken' fra 'validation' modulet
const shoppingItem = require("../models/shoppingItem"); // Importerer 'shoppingItem' modelen
const { STATES } = require("mongoose"); // Importerer 'STATES' fra 'mongoose' modulet
const { update } = require("../models/user"); // Importerer 'update' funktionen fra 'user' modelen

// CRUD Operationer

// Opret produkt
router.post("/", verifyToken, (req, res) => {
    // Anmodningens body, parsed som json
    let data = req.body;

    // Indsætter dataene i databasen ved hjælp af 'insertMany' funktionen fra mongoose
    shoppingItem.insertMany(data)
        // Sender dataene som svar
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// Læs alle produkter
router.get("/", (req, res) => {
    // Finder alle produkter i databasen
    shoppingItem.find()
        // Sender dataene som svar
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// Læs produkter ud fra forfatter
router.get("/:author", (req, res) => {
    // Finder produkter baseret på forfatteren i anmodningen
    shoppingItem.find({ user: req.params.author })
        // Sender dataene som svar
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// Læs produkt ud fra ID
router.get("/:id", (req, res) => {
    // Finder produktet baseret på det angivne ID
    shoppingItem.findById(req.params.id)
        // Sender dataene som svar
        .then(data => { res.send(data); })
        .catch(err => { res.status(500).send({ message: err.message }); })
});

// Opdater specifikt produkt
router.put("/:id", (req, res) => {
    const id = req.params.id;
  
    // Finder og opdaterer produktet baseret på det angivne ID
    shoppingItem.findByIdAndUpdate(id, req.body, { new: true })
      .then(data => {
        if (!data) {
          res.status(404).send({ message: "Kan ikke opdatere shoppingvare med id=" + id + ". Måske blev indkøbslisten ikke fundet" });
        } else {
          res.send({ message: "Shoppingvare blev opdateret med succes.", data });
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Fejl under opdatering af shoppingvare med id=" + id });
      });
});

// Slet specifikt produkt
router.delete("/:id", verifyToken, (req, res) => {
    const id = req.params.id;

    // Finder og sletter produktet baseret på det angivne ID
    shoppingItem.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(404).send({ message: "Kan ikke slette shoppingvare med id=" + id + ". Måske blev indkøbslisten ikke fundet" })
            }
            else {
                res.send({ message: "Shoppingvare blev slettet med succes." })
            }
        })
        .catch(err => { res.status(500).send({ message: "Fejl under sletning af shoppingvare med id=" + id }); })
});

// Route til at opdatere positionsoplysninger for varer
router.post('/updatePositions', async (req, res) => {
    const { updatedItems } = req.body;

    console.log("Modtaget vare: ", updatedItems)

    try {
        // Opdaterer positionsoplysninger i databasen
        await Promise.all(updatedItems.map(async (item) => {
            console.log(item)
            await shoppingItem.findByIdAndUpdate(item._id, { position: item.position });
        }));

        res.status(200).send("OK")
    } catch (error) {
        console.error('Fejl ved opdatering af varepositioner:', error);
        res.status(500).send('Intern serverfejl');
    }
});

module.exports = router;
