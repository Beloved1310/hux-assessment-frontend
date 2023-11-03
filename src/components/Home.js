import React from 'react';
import AddContacts from './Addcontacts';

function Home() {
  return (
    <>
      {/* Display a welcome message with the user's name from localStorage */}
      <h1 className="text-center">welcome {localStorage.getItem('name')}</h1>

      {/* Render the AddContacts component for adding new contacts */}
      <AddContacts />
    </>
  );
}

export default Home;
