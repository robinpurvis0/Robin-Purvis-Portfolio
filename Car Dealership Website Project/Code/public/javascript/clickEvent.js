const searchGeico = document.querySelector('#geico');
const searchProg = document.querySelector('#prog');
const searchAllS = document.querySelector('#allS');

searchGeico.addEventListener('click', geico);
searchProg.addEventListener('click', prog);
searchAllS.addEventListener('click', allState);

const insList = require('../../models/insurance');
const ownerList = require('../../models/owner');
const carList = require('../../models/car');
const insDetail = require('../../models/insuranceDetail');



async function geico() {
    let geico = await insList.find().where('ins_name').equals('Geico').exec();
    console.log(geico);
}
