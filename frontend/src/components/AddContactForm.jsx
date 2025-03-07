import {useState} from 'react'
import personsAPI from '../services/persons'

const AddContactForm = ({allContacts, setAllContacts, setNotification}) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')


    const handleSubmit = (event) => {
        event.preventDefault()

        if(newName === '' || newNumber === ''){
            alert('Name or number is empty')
            return
        }

        if(allContacts.find(contact => contact.name === newName)){
            if(window.confirm(`User with name ${newName} exists in DB. Do you want to update the number?`)){
                const personToUpdate = allContacts.find(person => person.name === newName)
                const updatedPerson = {...personToUpdate, number: newNumber}

                personsAPI
                    .update(updatedPerson.id, updatedPerson)
                    .then(response => {
                        setNewName('')
                        setNewNumber('')
                        setAllContacts(allContacts.map(contact => contact.id !== updatedPerson.id ? contact : response))
                        setNotification({ message: `Updated contact: ${newName}`, type: 'info' })
                    })
                    .catch(error => {
                        setNotification({ 
                            message: error.response?.data?.error || 'Error updating contact', 
                            type: 'error' 
                        })
                    })
            }
        }else{
            const newContact = {
                name: newName,
                number: newNumber
            }

            personsAPI
                .create(newContact)
                .then(response => {
                    setNewName('')
                    setNewNumber('')
                    setAllContacts(allContacts.concat(response))
                    setNotification({ message: `Added new contact: ${newName}`, type: 'success' })
                })
                .catch(error => {
                    setNotification({ 
                        message: error.response?.data?.error || 'Error creating new contact', 
                        type: 'error' 
                    })
                })
        }
    }


    return (
        <>
            <div className='form-container'>
                <h2>Add new contact</h2>
                <form>
                    <div>
                        name: 
                        <input 
                            value={newName}
                            onChange={(event)=>{setNewName(event.target.value)}}
                        />
                    </div>
                    <div>
                        number: 
                        <input 
                            value={newNumber}
                            onChange={(event) => {setNewNumber(event.target.value)}} 
                        />
                    </div>
                    <br />
                    <div>
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className='button'
                        >
                            Add Contact
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddContactForm