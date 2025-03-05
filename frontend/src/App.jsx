import { useState, useEffect } from 'react'
import AddContactForm from './components/AddContactForm'
import personsAPI from './services/persons'
import ContactList from './components/ContactList'
import SearchBar from './components/SearchBar'


const App = () => {
  const [allContacts, setAllContacts] = useState([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)

console.log("TEST GIT")
  useEffect(() => {
    personsAPI.getAll()
      .then(response => {
        setAllContacts(response)
      })
  }, [])

  return (
    <>
      <div><h1>Telf Agenda</h1></div>
      <div className='container'>
        <SearchBar searchQuery={search} setSearchQuery={setSearch}/>
        <ContactList contacts={allContacts} setContacts={setAllContacts} search={search}/>
     
        <div>
          {showForm && <AddContactForm allContacts={allContacts} setAllContacts={setAllContacts} />}
        </div>
        <button className='button-group'
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Close form' : 'Add new contact'}
        </button>
      </div>
    </>
  )
}

export default App