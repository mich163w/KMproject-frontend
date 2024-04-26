const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let appointmentSchema = new Schema(
{
    appointmentName: {type: String}
}
);

module.exports = mongoose.model("appointment", appointmentSchema);

