// Para lanzar este script, ejecutar en la terminal: node mongo.js <password>
// Ejemplo: node mongo.js my_password

require('dotenv').config()
const mongoose = require('mongoose')

const MONGO_PASS = process.env.MONGO_DB_PASS

const url =
`mongodb+srv://gongoraicar:${MONGO_PASS}@telfagenda.jwj6i.mongodb.net/telfAgenda?retryWrites=true&w=majority&appName=telfAgenda`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if(process.argv.length > 2){
    const new_contact = new Contact({
        name: process.argv[2],
        number: process.argv[3]
    })

    new_contact.save().then(result => {
        console.log(`contact ${process.argv[3]} saved!`)
    })
}

Contact.find({}).then(result => {
    result.forEach(contact => {
        console.log(contact)
    })
    mongoose.connection.close()
})

