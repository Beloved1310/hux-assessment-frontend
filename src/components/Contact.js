import React, { useContext, useEffect, useRef, useState } from 'react'
import contactContext from '../context/contactContext'
import { useNavigate } from 'react-router-dom'
import Contactitem from './Contactitem'
const Contacts = () => {
  let navigate = useNavigate()
  const context = useContext(contactContext)
  const { contacts, getContacts, editContact } = context
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getContacts()
    } else {
      navigate('/login')
    }
  }, [])
  const ref = useRef(null)
  const refClose = useRef(null)
  const [contact, setContact] = useState({
    id: '',
    efirstName: '',
    elastName: '',
    ephoneNumber: '',
  })

  const updateContact = (currentContact) => {
    ref.current.click()
    console.log(currentContact.phoneNumber)
    setContact({
      id: currentContact._id,
      efirstname: currentContact.firstname,
      elastname: currentContact.lastname,
      ephoneNumber: currentContact.phoneNumber,
    })
  }

  const handleClick = (e) => {
    editContact(contact.id, contact.efirstname, contact.elastname, contact.ephoneNumber)
    refClose.current.click()
  }

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value })
  }

  return (
    <>
      <div className="display-4 text-primary text-center">Contacts</div>

      <div className="container mx-2">
        {contacts.length === 0 && 'No Contacts to display'}
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">Date</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Update</th>
            <th scope="col">delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => {
            return (
              <Contactitem key={contact._id} updateContact={updateContact} contact={contact} />
            )
          })}
        </tbody>
      </table>

      <button
        ref={ref}
        type="button"
        className="btn btn-dark d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit Contact
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-firstname" id="exampleModalLabel">
                Edit contact
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="firstname" className="form-label">
                    FirstName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="efirstname"
                    name="efirstname"
                    value={contact.efirstname}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastname" className="form-label">
                    LastName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="elastname"
                    name="elastname"
                    value={contact.elastname}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="phoneNumber"
                      value="true"
                      name="ephoneNumber"
                      onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor="phoneNumber">
                      Yes
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      id="phoneNumber"
                      value="false"
                      name="ephoneNumber"
                      onChange={onChange}
                    />
                    <label className="form-check-label" htmlFor="phoneNumber">
                      No
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={contact.efirstname.length < 5 || contact.elastname.length < 5}
                onClick={handleClick}
                type="button"
                className="btn btn-dark"
              >
                Update Contact
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contacts