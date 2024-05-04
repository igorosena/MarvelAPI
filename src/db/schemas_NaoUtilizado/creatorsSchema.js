const Mongoose = require ('mongoose');

const creatorSchema = new Mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    resourceURI:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    }
})

const Creator = Mongoose.model('Creator',creatorSchema);

module.exports = Creator;