const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGO_DB_URI

console.log("TRYING TO CONNECT TO CONTACTS DATABASE")
mongoose.connect(url)
    .then(result => {
        console.log("SUCCESSFULLY CONNECTED")
    })
    .catch( error => {
        console.log("ERROR CONNECTING TO DATABASE: ", error.message)
    })



const contactSchema = new mongoose.Schema({
        name: {
            type: String,
            requiered : true,
            minLength: 3
        },
        number: {
            type: String,
            requiered : true,
            minLength: 8,
            unique: true
        }
    })
    
contactSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Contact', contactSchema)
      