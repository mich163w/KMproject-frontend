const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let shoppingItemSchema = new Schema(
{
    shoppingItemName: {type: String}
}
);

module.exports = mongoose.model("shoppingItem", shoppingItemSchema);


