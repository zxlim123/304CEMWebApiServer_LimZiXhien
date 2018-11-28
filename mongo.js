const mongoose = require('mongoose');
const db = 'mongodb://xhien123:xhien123@ds157712.mlab.com:57712/pokebase123';

mongoose
.connect (db,{useNewUrlParser: true})
.then(()=>{
    console.log('Connected to mongodb');
})
.catch((error)=>{
console .log('Connection mongobd error: ', error);
});

const column = new mongoose.Schema({
    name: {type: String},
    ability1: {type: String},
    ability2: {type: String},
    pokeindex: {type: String},
    pokeimage: {type: String}
});

const mongo = mongoose.model('pokebase', column, 'poketable');

module.exports = mongo;