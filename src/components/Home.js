import React from 'react'
import AddContacts from './Addcontacts'

function Home() {
  return (
    <>
      <h1 className="text-center">welcome {localStorage.getItem('name')}</h1>
      <AddContacts />
    </>
  )
}

export default Home