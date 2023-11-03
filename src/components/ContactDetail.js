import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import contactContext from '../context/contactContext';

const ContactDetail = () => {
  const { id } = useParams();
  const context = useContext(contactContext);
  const { getContactDetail } = context;

  // Define state to store contact details and loading state
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch contact details for the specified ID
    getContactDetail(id)
      .then((data) => {
        if (data && data.firstName) {
          // Set the retrieved contact details
          setContact(data);
        } else {
          console.error("Contact not found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  return (
    <div className="container mt-4">
      <h2>Contact Details</h2>
      {loading ? (
        // Display a loading message while fetching contact details
        <p>Loading contact details...</p>
      ) : (
        contact.firstName ? (
          // Display contact details if they exist
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                {contact.firstName} {contact.lastName}
              </h5>
              <p className="card-text">Phone Number: {contact.phoneNumber}</p>
            </div>
          </div>
        ) : (
          // Display a message when contact details are not found
          <p>Contact details not found.</p>
        )
      )}
    </div>
  );
};

export default ContactDetail;
