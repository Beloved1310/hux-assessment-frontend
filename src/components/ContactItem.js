import React, { useContext } from 'react';
import moment from 'moment';
import contactContext from '../context/contactContext';
import { Link, useNavigate } from 'react-router-dom';

function Contactitem(props) {
  const context = useContext(contactContext);
  const { deleteContact } = context;
  const { contact, updateContact } = props;

  return (
    <tr>
      <td>{contact?.firstName}</td>
      <td>{contact?.lastName}</td>
      <td>{contact?.phoneNumber}</td>
      <td>{moment(contact.date).format('MMM Do YY')}</td>
      <td>
        <i
          className="far fa-edit mx-2"
          onClick={() => {
            // Trigger the update action when the edit icon is clicked
            updateContact(contact);
          }}
        ></i>
      </td>
      <td>
        <i
          className="far fa-trash-alt mx-2"
          onClick={() => {
            // Trigger the delete action when the trash icon is clicked
            deleteContact(contact?._id);
          }}
        ></i>
      </td>
      <td>
        {/* Provide a link to view the contact's details */}
        <Link to={`/contact/fetchContact/${contact?._id}`}>View Contact</Link>
      </td>
    </tr>
  );
}

export default Contactitem;
