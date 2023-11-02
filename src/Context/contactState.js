import { useState } from 'react'
import ContactContext from './contactContext'

const ContactState = (props) => {
  const host = 'https://hux-assessment-backend.vercel.app'
  const contactsInitial = []
  const [contacts, setContact] = useState(contactsInitial)

  // Add a Note
  const addContacts = async (firstName, lastName, phoneNumber) => {
    // CONTACT: API Call
    // API Call
    const response = await fetch(`${host}/api/contact/addContact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ firstName, lastName, phoneNumber }),
    })

    const contact = await response.json()
    setContact(contacts.concat(contact))
    props.showAlert('Contact Added', 'info')
  }

  //get all the contacts

  const getContacts = async () => {
    //Api call
    const response = await fetch(`${host}/api/contact/fetchAllContact/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    })
    const json = await response.json()
    setContact(json)
  }

  //edit contact

  const editContact = async (id, firstName, lastName, phoneNumber) => {
    // API Call
    const response = await fetch(`${host}/api/contact/updateContact/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ firstName, lastName, phoneNumber }),
    })
    const json = await response.json()

    let newContacts = JSON.parse(JSON.stringify(contacts))
    // Logic to edit in client
    for (let index = 0; index < newContacts.length; index++) {
      const element = newContacts[index]
      if (element._id === id) {
        newContacts[index].firstName = firstName
        newContacts[index].lastName = lastName
        newContacts[index].phoneNumber = phoneNumber
        break
      }
    }
    setContact(newContacts)
    props.showAlert('Contact Updated', 'warning')
  }

  const deleteContact = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/contact/deleteContact/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
    })
    const json = response.json()
    const newContacts = contacts.filter((contact) => {
      return contact._id !== id
    })
    setContact(newContacts)
    props.showAlert('Contact Deleted', 'danger')
  }

  return (
    <ContactContext.Provider
      value={{ contacts, addContacts, getContacts, editContact, deleteContact }}
    >
      {props.children}
    </ContactContext.Provider>
  )
}
export default ContactState