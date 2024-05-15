const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let toDoSchema = new Schema(
{
    toDoName: {type: String},
    user: { type: Schema.Types.ObjectId, ref: "user" },
    position: { type: Number}

}
);

module.exports = mongoose.model("toDo", toDoSchema);

