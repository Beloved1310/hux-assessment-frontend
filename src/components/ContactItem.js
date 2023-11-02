import React, { useContext } from 'react'
import moment from 'moment'
import contactContext from '../context/contactContext'

function Contactitem(props) {
  const context = useContext(contactContext)
  const { deleteContact } = context
  const { contact, updateContact } = props

  return (
    <tr>
      <td>{contact?.firstName}</td>
      <td>{contact?.lastName}</td>
      <td>{contact?.phoneNumber}</td>
      <td>{moment(contact.date).format('MMM Do YY')}</td>
      <td>
        <input
          type="checkbox"
          className="form-check-input"
          id="isComplete"
          checked={contact?.isComplete == 'true'}
          onChange={() => {
            console.log('ok')
          }}
        />
      </td>
      <td>
        <i
          className="far fa-edit mx-2"
          onClick={() => {
            updateContact(contact)
          }}
        ></i>
      </td>
      <td>
        <i
          className="far fa-trash-alt mx-2"
          onClick={() => {
            deleteContact(contact?._id)
          }}
        ></i>
      </td>
    </tr>
  )
}

export default Contactitem