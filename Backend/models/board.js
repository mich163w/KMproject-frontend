const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let boardSchema = new Schema(
{
    boardName: { type: String }
});

module.exports = mongoose.model("Board", boardSchema);