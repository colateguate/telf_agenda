require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


const app = express();

const Contact = require('./models/contact')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})




// ----------------- GET ALL CONTACTS -----------------
app.get('/api/persons', (request, response) => {
  Contact.find({}).then(result => {
          response.json(result)
    })
})



// ----------------- GET SINGLE CONTACT -----------------
app.get('/api/persons/:id', (request, response, next) => {
  const contact_id = request.params.id
  
  Contact.findById(contact_id)
    .then(contact => {
      response.json(contact)
    })
    .catch(error => next(error))
  
})


// ----------------- ADD NEW CONTACT -----------------
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  const new_contact = new Contact({
    name: body.name,
    number: body.number
  })

  new_contact.save()
    .then(savedContact => {
      response.json(savedContact)
    })
    .catch(error => next(error))
})




// ----------------- UPDATE CONTACT -----------------
app.put('/api/persons/:id', (request, response, next) => {
  const contactId = request.params.id
  const body = request.body
  
  contact = {
    name: body.name,
    number: body.number
  }

  const options = {
    new: true,
    runValidators: true,
    context: 'query'
  }


  Contact.findByIdAndUpdate(contactId, contact, options)
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => {
      next(error)
    })
})



// ----------------- DELETE CONTACT -----------------
app.delete('/api/persons/:id', (request, response, next) => {
  Contact.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
})




// ----------------- ERROR HANDLING -----------------

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if(error.name === 'CastError'){
    return response.status(400).send({error: 'malformatted id'})
  }else if(error.name === 'ValidationError'){
    return response.status(400).json({error: error.message})
  }

  
  next(error)
}

app.use(errorHandler)
app.use(unknownEndpoint)