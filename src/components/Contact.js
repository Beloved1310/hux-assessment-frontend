import React, { useContext, useEffect, useRef, useState } from 'react';
import contactContext from '../context/contactContext';
import { Link, useNavigate } from 'react-router-dom';
import Contactitem from './ContactItem';

const Contacts = () => {
  let navigate = useNavigate();
  const context = useContext(contactContext);
  const { contacts, getContacts, editContact } = context;

  useEffect(() => {
    // Check if there's a token in localStorage
    if (localStorage.getItem('token')) {
      getContacts();
    } else {
      // Redirect to the login page if no token is found
      navigate('/login');
    }
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);

  const [contact, setContact] = useState({
    id: '',
    efirstName: '',
    elastName: '',
    ephoneNumber: '',
  });

  const updateContact = (currentContact) => {
    ref.current.click();
    // Set the contact details to edit
    setContact({
      id: currentContact._id,
      efirstName: currentContact.firstName,
      elastName: currentContact.lastName,
      ephoneNumber: currentContact.phoneNumber,
    });
  }

  const handleClick = (e) => {
    // Trigger the edit action and close the modal
    editContact(contact.id, contact.efirstName, contact.elastName, contact.ephoneNumber);
    refClose.current.click();
  }

  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className="display-4 text-primary text-center">Contacts</div>

      <div className="container mx-2">
        {/* Display a message if no contacts are available */}
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
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            // Map each contact to a ContactItem component
            <Contactitem key={contact._id} updateContact={updateContact} contact={contact} />
          ))}
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
                  <label htmlFor="firstName" className="form-label">
                    FirstName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="efirstName"
                    name="efirstName"
                    value={contact.efirstName}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">
                    LastName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="elastName"
                    name="elastName"
                    value={contact.elastName}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ephoneNumber"
                    name="ephoneNumber"
                    value={contact.ephoneNumber}
                    onChange={onChange}
                    minLength={5}
                    required
                  />
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
                disabled={contact.efirstName.length < 5 || contact.elastName.length < 5}
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
  );
}

export default Contacts;
