import React, { useEffect, useState } from 'react';
import { useAuth } from './AuthContext';

function Contacts() {
  const { state, logout } = useAuth();
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch('http://localhost:3000/contact', {
        headers: {
          'Authorization': `Bearer ${state.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setContacts(data);
      } else {
        alert('Failed to fetch contacts');
      }
    };

    fetchContacts();
  }, [state.token]);

  return (
    <div>
      <h1>Contacts</h1>
      <button onClick={logout}>Logout</button>
      <ul>
        {contacts.map(contact => (
          <li key={contact._id}>
            <p>Full Name: {contact.fullName}</p>
            <p>Email: {contact.email}</p>
            <p>Company: {contact.company}</p>
            <p>Phone: {contact.phone || contact.phoneNumber}</p>
            <p>Description: {contact.helpText || contact.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Contacts;
