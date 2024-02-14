const Ins = require('../models/insurance');
const Owner = require('../models/owner');
const InsDetail = require('../models/insuranceDetail');

exports.list = async function (req, res) {
  let ins = await Ins.find().exec();
  var geicoArray = await Owner.find().where('insuranceID').equals(ins[1]._id).exec();
  var sfArray = await Owner.find().where('insuranceID').equals(ins[0]._id).exec();
  var proArray = await Owner.find().where('insuranceID').equals(ins[2]._id).exec();
  res.render('insList.ejs', { ins: ins, sfNum: sfArray.length, geicoNum: geicoArray.length, proNum: proArray.length });
}

exports.peopleList = async function (req, res) {
  let singleIns = await Ins.findById(req.params.id).exec();
  let members = await singleIns.members;
  let cars = await singleIns.cars;
  let coverage = await singleIns.coverage;
  res.render('singleIns.ejs', { ins: singleIns, members: members, cars: cars, coverage: coverage });
}

exports.insDetail = async function (req, res) {
  let singleInsDetail = await InsDetail.findById(req.params.id).exec();
  let owner = await Owner.find().where('insuranceDetailID').equals(req.params.id).exec();
  console.log(owner[0].fullname);
  res.render('insDetail.ejs', { detail: singleInsDetail, owner: owner[0].fullname });
}

exports.update_get = async function (req, res, next) {
  try {
    let insList = await Ins.find().select('name').exec();
    let owner = await Owner.findOne().where('insuranceDetailID').equals(req.params.id).exec();
    let insDetail = await InsDetail.findById(req.params.id).exec();
    console.log(insDetail)
    res.render('insDetailForm.ejs', {
      title: `Update ${owner.fullname}`,
      owner: owner,
      insList: insList,
      insDetail: insDetail,
    });
  } catch (err) {
    next(err);
  }
};

exports.update_post = async function (req, res, next) {
  try {
    let insDetail = await InsDetail.findById(req.body.insDetail_id).exec();
    let ins = await Ins.findById(req.body.insuranceID).exec();
    let owner = await Owner.findById(req.body.owner_id).exec();
    console.log(owner)


    insDetail.ins_name = ins.name;
    insDetail.ins_payment = req.body.ins_payment;
    insDetail.ins_s_date = req.body.ins_s_date;
    insDetail.ins_e_date = req.body.ins_e_date;
    insDetail.ins_policy = req.body.ins_policy;
    insDetail.ins_BIL = req.body.ins_BIL;
    insDetail.ins_PDL = req.body.ins_PDL;
    insDetail.ins_PIP = req.body.ins_PIP;
    insDetail.ins_UMBI = req.body.ins_UMBI;
    insDetail.ins_UMPD = req.body.ins_UMPD;
    insDetail.ins_collision = req.body.ins_collision;
    insDetail.ins_com = req.body.ins_com;
    insDetail.insuranceID = req.body.insuranceID;
    await insDetail.save();
    res.render('insDetail.ejs', { detail: insDetail, owner: owner.fullname });

  } catch (err) {
    next(err);
  }

};
