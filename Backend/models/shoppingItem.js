const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let shoppingItemSchema = new Schema(
{
    shoppingItemName: {type: String},
    user: { type: Schema.Types.ObjectId, ref: "user" },
    position: { type: Number},
    backgroundColor: { type: String, default: "#FFFFFF" }
}
);

module.exports = mongoose.model("shoppingItem", shoppingItemSchema);


