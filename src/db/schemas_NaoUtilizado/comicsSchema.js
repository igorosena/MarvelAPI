const Mongoose = require ('mongoose');

const comicsSchema = new Mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    resourceURI:{
        type: String,
        required: true
    }
})

const Comics = Mongoose.model('Comics', comicsSchema)

module.exports = Comics;