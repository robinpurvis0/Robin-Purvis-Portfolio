const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var InsuranceDetailSchema = new Schema({
    ins_name: { type: String },
    ins_payment: { type: String },
    ins_s_date: { type: String },
    ins_e_date: { type: String },
    ins_policy: { type: String },
    ins_BIL: { type: String },
    ins_PDL: { type: String },
    ins_PIP: { type: String },
    ins_UMBI: { type: String },
    ins_UMPD: { type: String },
    ins_collision: { type: String },
    ins_com: { type: String },
    insuranceID: { type: Schema.Types.ObjectId, ref: "Insurance" },
    ownerID: { type: Schema.Types.ObjectId, ref: "Owner" },
});



//Export model
module.exports = mongoose.model("InsuranceDetail", InsuranceDetailSchema);