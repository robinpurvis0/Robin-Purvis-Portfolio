const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var CarSchema = new Schema({
    vin: { type: String },
    make: { type: String },
    model: { type: String },
    year: { type: Number },
    mileage: { type: Number },
    insuranceID: { type: Schema.Types.ObjectId, ref: "Insurance" },
    ownerID: { type: Schema.Types.ObjectId, ref: "Owner" },
    logo: {
        type: String,
        default: "https://www.fredsautoremoval.com/wp-content/uploads/2021/03/Cash-for-Junk-Cars-Salem-Sell-my-car-Oregon.jpg"
    },

    //insuranceDetailID: { type: Schema.Types.ObjectId, ref: "InsuranceDetail" },

    //will have reference to owner
});

//Export model
module.exports = mongoose.model("Car", CarSchema);