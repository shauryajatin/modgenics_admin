import React, { useEffect, useState } from 'react';

function Contacts({ token }) {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch('http://localhost:3000/contact', {
        headers: {
          'Authorization': `Bearer ${token}`,
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
  }, [token]);

  return (
    <div>
      <h1>Contacts</h1>
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
