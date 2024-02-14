const Insurance = require('../models/insurance');
const Owners = require('../models/owner');
const InsDetail = require('../models/insuranceDetail');
const Cars = require('../models/car');
const Owner = require('../models/owner');

exports.index = async function(req, res) {
    let cars = await Cars.find().exec();
    var ToyotaArray = await Cars.find().where('make').equals("Toyota").exec();
    var MazdaArray = await Cars.find().where('make').equals("Mazda").exec();
    var OldsmobileArray = await Cars.find().where('make').equals("Toyota").exec();
    console.log(ToyotaArray);
    res.render('index.ejs', { cars, Toyota: ToyotaArray.length, Mazda: MazdaArray.length, Oldsmobile: OldsmobileArray.length });

}

exports.delete = async function (req, res, next) {
    try {
      await Cars.findByIdAndDelete(req.params.id).exec();
      res.redirect("/");
    } catch (err) {
      next(err);
    }
  };