import { useState, useEffect } from 'react'
import AddContactForm from './components/AddContactForm'
import personsAPI from './services/persons'
import ContactList from './components/ContactList'
import SearchBar from './components/SearchBar'
import Notification from './components/Notification'


const App = () => {
  const [allContacts, setAllContacts] = useState([])
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [notification, setNotification] = useState({message: null, type:''})


  useEffect(() => {
    personsAPI.getAll()
      .then(response => {
        setAllContacts(response)
      })
  }, [])

  const setNotificationWithTimeout = (newNotification) => {
    setNotification(newNotification)

    setTimeout(() => {
      setNotification({ message: null, type: '' })
    }, 3000)
  }

  return (
    <>
      <div><h1>Telf Agenda</h1></div>

      <Notification message={notification.message} type={notification.type} />

      <div className='container'>
        <SearchBar searchQuery={search} setSearchQuery={setSearch}/>
        <ContactList 
          contacts={allContacts} 
          setContacts={setAllContacts} 
          search={search}
          setNotification={setNotificationWithTimeout}
        />
     
        <div>
          {showForm && <AddContactForm allContacts={allContacts} setAllContacts={setAllContacts} setNotification={setNotificationWithTimeout} />}
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