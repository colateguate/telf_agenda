import Contact from "./contact"
import personsAPI from '../services/persons'


const ContactList = ({contacts, setContacts, search, setNotification}) => {

    const handleDelete = (event) => {
        const id = event.target.value
        const contactToDelete = contacts.find(contact => contact.id === id)

        if(contactToDelete){
            if(window.confirm(`Do you want to delete ${contactToDelete.name}?`)){
                personsAPI
                    .remove(id)
                    .then(() => {
                        setContacts(contacts.filter(contact => contact.id !== id))
                        setNotification({ message: `Deleted ${contactToDelete.name}`, type: 'warning' })
                    })
                    .catch(error => {
                        setNotification({ message: 'Error deleting contact', type: 'error' })
                    })
            }
        }
    }

    const contactsToShow = search.length === 0 
        ? contacts 
        : contacts.filter(contact => contact.name.toLowerCase().includes(search.toLowerCase()))

    return (
        <div>
            <ul>
                {contactsToShow.map(
                        (contact) => {
                            return (
                                <li key={contact.id}>
                                    <Contact info={contact} /> 
                                    <button
                                        value={contact.id}
                                        onClick={handleDelete}
                                    >
                                        Delete
                                    </button>
                                </li>
                            )
                        }
                    )
                }
            </ul>
        </div>
    )
}

export default ContactList