import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import './Home.css'; // Import the CSS file for styling

function Home() {
    const [loggedInUser, setLoggedInUser] = useState({});
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const user = {
            name: localStorage.getItem('loggedInUser'),
            email: localStorage.getItem('loggedInUserEmail')
        };
        setLoggedInUser(user);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedInUser');
        localStorage.removeItem('loggedInUserEmail');
        handleSuccess('User logged out');
        setTimeout(() => {
            navigate('/login');
        }, 1000);
    };

    const fetchContacts = async () => {
        try {
            const url = "http://localhost:8000/contact";
            const token = localStorage.getItem('token');
            const headers = {
                'Authorization': `Bearer ${token}`
            };
            const response = await fetch(url, { headers });
            const result = await response.json();
            setContacts(result);
        } catch (err) {
            handleError('Failed to fetch contacts');
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    return (
       <div> 
        <div className='home-container'>
        <div>  <button className='logout-button' onClick={handleLogout}>Logout</button>
        </div>
            <div className='contacts-container'>
                {contacts && contacts.map((contact) => (
                    <div className='contact-card' key={contact._id}>
                        <h2>{contact.fullname || contact.fullName}</h2>
                        <p>Email: {contact.email}</p>
                        <p>Company: {contact.company}</p>
                        <p>Phone: {contact.phone || contact.phoneNumber}</p>
                        <p>Message: {contact.helpText || contact.description}</p>
                    </div>
                ))}
            </div>
          
        </div>
        </div>
    );
}

export default Home;
