const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

let persons = [
  {
    "name": "Elna Góngora",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Sau Góngora",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Ícar Góngora",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "id": 756,
    "name": "Cristina Flores",
    "number": "43242-64865-5456"
  }
]

const requestLogger = (request, response, next) => {
  console.log('Method:', request.method)
  console.log('Path:', request.path)
  console.log('Body:', request.body)
  console.log('---')
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(cors());
app.use(express.json());
//app.use(requestLogger);
app.use(morgan('tiny'));


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})



app.get('/info', (request, response) => {
  const date = new Date()
  response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const person_id = Number(request.params.id)
  const person = persons.find(person => person.id === person_id)

  if(person){
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const person_id = Number(request.params.id)
  persons = persons.filter(person => person.id !== person_id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'name or number missing'
    })
  }

  if(persons.find(person => person.name === body.name)){
    return response.status(400).json({
      error: 'name must be unique'
    })
  }

  const new_person = {
    id: Math.floor(Math.random() * 100000),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(new_person)
  response.json(new_person)
})

app.put('/api/persons/:id', (request, response) => {
  const contactId = Number(request.params.id)
  const body = request.body
  const contactToUpdate = persons.find(person => person.id === contactId)

  console.log(contactId, contactToUpdate)
  if(!contactToUpdate){
    return response.status(404).json({
      error: 'contact not found'
    })
  }

  const updatedContact = {...contactToUpdate, number: body.number, name: body.name}

  persons = persons.map(person => person.id !== contactId ? person : updatedContact)
  response.json(updatedContact)

})

app.use(unknownEndpoint)