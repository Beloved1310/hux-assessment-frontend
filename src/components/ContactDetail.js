import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import contactContext from '../context/contactContext';

const ContactDetail = () => {
  const { id } = useParams();
  const context = useContext(contactContext);
  const { getContactDetail } = context;
  const [contact, setContact] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContactDetail(id)
      .then((data) => {
        if (data && data.firstName) {
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
        <p>Loading contact details...</p>
      ) : (
        contact.firstName ? (
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">
                {contact.firstName} {contact.lastName}
              </h5>
              <p className="card-text">Phone Number: {contact.phoneNumber}</p>
            </div>
          </div>
        ) : (
          <p>Contact details not found.</p>
        )
      )}
    </div>
  );
};

export default ContactDetail;
