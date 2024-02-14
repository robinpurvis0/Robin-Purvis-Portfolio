const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var InsuranceSchema = new Schema({
  name: { type: String },
  founder: { type: String },
  headquarter: { type: String },
  rank: { type: String },
  website: { type: String },
  logo: {type: String},
  formed: { type: Date },
  active: { type: Boolean, required: true, default: true }
});

InsuranceSchema.virtual("url").get(function () {
  return "/ins/id/" + this._id;
});

InsuranceSchema.virtual("coverage").get(async function () {
  const InsDetail = require('../models/insuranceDetail');
  let detailArray = await InsDetail.find().where('insuranceID').equals(this._id).exec();
  return detailArray;
});

InsuranceSchema.virtual("cars").get(async function () {
  const Cars = require('../models/car');
  let carsArray = await Cars.find().where('insuranceID').equals(this._id).exec();
  return carsArray;
});

InsuranceSchema.virtual("members").get(async function () {
  const Owner = require('../models/owner');
  let ownerArray = await Owner.find().where('insuranceID').equals(this._id).exec();
  return ownerArray;
});

//Export model
module.exports = mongoose.model("Insurance", InsuranceSchema);