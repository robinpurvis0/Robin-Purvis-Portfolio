//Connect to DB with Mongoose
const credentials = require("./dbCredentials");
const mongoose = require("mongoose");
mongoose.connect(credentials.connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const insList = require('./models/insurance');

async function test () {
    let geico = await insList.find().where('name').eq('Progressive').exec();
    console.log(geico.name);
}

test();