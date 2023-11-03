import React, { useContext, useState } from 'react';
import contactContext from '../context/contactContext';
import Contacts from './Contact';

function Addcontacts() {
  // Access the contact context
  const context = useContext(contactContext);
  const { addContacts } = context;

  // Define state to manage the form inputs
  const [contact, setContact] = useState({ firstName: '', lastName: '', phoneNumber: '' });

  // Handle form submission
  const handleClick = (e) => {
    e.preventDefault();
    addContacts(contact.firstName, contact.lastName, contact.phoneNumber);
    // Clear form inputs after submission
    setContact({ firstName: '', lastName: '', phoneNumber: '' });
  }

  // Update the state when input values change
  const onChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  }

  return (
    <div>
      <div className="container m-3">
        <div className="row">
          <div className="col-md-5">
            <div className="card m-3 p-3">
              <h3 className="display-4 text-primary text-center">Add Contact</h3>

              <form>
                <div className="form-group">
                  {/* Input field for first name */}
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    aria-describedby="enter name"
                    value={contact.firstName}
                    onChange={onChange}
                    minLength={5}
                    placeholder="firstName"
                    required
                  />
                </div>
                <div className="form-group">
                  {/* Input field for last name */}
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    aria-describedby="enter name"
                    value={contact.lastName}
                    onChange={onChange}
                    minLength={5}
                    placeholder="lastName"
                    required
                  />
                </div>
                <div className="form-group">
                  {/* Input field for phone number */}
                  <input
                    type="number"
                    className="form-control"
                    id="phoneNumber"
                    name="phoneNumber"
                    aria-describedby="enter number"
                    value={contact.phoneNumber}
                    onChange={onChange}
                    minLength={5}
                    placeholder="phoneNumber"
                    required
                  />
                </div>

                <button
                  // Disable the button if first name or last name is too short
                  disabled={contact.firstName.length < 5 || contact.lastName.length < 5}
                  type="submit"
                  className="btn btn-dark mt-2"
                  onClick={handleClick}
                >
                  Add Contact
                </button>
              </form>
            </div>
          </div>
          <div className="col-md-7">
            <Contacts />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Addcontacts;
