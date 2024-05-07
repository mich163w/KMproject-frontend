const user = require('../models/user');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let appointmentSchema = new Schema(
{
    appointmentName: {type: String},
    user: { type: Schema.Types.ObjectId, ref: "user" }
}
);

module.exports = mongoose.model("appointment", appointmentSchema);

