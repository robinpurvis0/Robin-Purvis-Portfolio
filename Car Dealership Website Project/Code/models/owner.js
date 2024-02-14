const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Cars = require('../models/car');

var OwnerSchema = new Schema({
    first_name: { type: String },
    last_name: { type: String },
    gender: { type: String },
    age: { type: Number },
    address: { type: String },
    state: { type: String },
    zipcode: { type: String },
    phone: { type: String },

    insuranceID: { type: Schema.Types.ObjectId, ref: "Insurance" },
    insuranceDetailID: { type: Schema.Types.ObjectId, ref: "InsuranceDetail" },
    carID: [{ type: Schema.Types.ObjectId, ref: "Car" }],
});


OwnerSchema.virtual("url").get(function() {
    return "/owner/id/" + this._id;
});

OwnerSchema.virtual("fullname").get(function() {
    return this.first_name + " " + this.last_name;
});

OwnerSchema.virtual("cars").get(async function() {
    let cars = await Cars.find().where('ownerID').equals(this._id).exec();
    return cars;
});

//Export model
module.exports = mongoose.model("Owner", OwnerSchema);