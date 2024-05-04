const Mongoose = require ('mongoose');

const charactersSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    marvelID:{
        type: Number,
        required:true
    },
    resourceURI:{
        type: String,
        required:true
    }
})

const charactersModel = Mongoose.model('Character',charactersSchema);

module.exports = charactersModel;