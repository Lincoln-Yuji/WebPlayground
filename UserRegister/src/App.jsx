import { useState, useEffect } from 'react'
import './App.css'

import { BACKEND_URL } from './app_config.jsx'
import ContactList from './ContactList.jsx';
import ContactForm from './ContactForm.jsx';

function App() {
  const [contacts, setContacts] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentContact, setCurrentContact] = useState({});

  const fetchContacts = async () => {
    const response = await fetch(BACKEND_URL + "/contacts")
    const data = await response.json()
    setContacts(data.contacts)
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentContact({});
  };

  const openCreateModal = () => {
    if (!isModalOpen) setIsModalOpen(true);
  };

  const openEditModal = (contact) => {
    if (isModalOpen) return
    setCurrentContact(contact);
    setIsModalOpen(true);
  }

  const onUpdate = () => {
    closeModal();
    fetchContacts();
  }

  useEffect(() => {
    fetchContacts()
  }, []);

  return <>
    < ContactList contacts={contacts} updateContact={openEditModal} updateCallback={onUpdate} />
    <button onClick={openCreateModal}>Create New Contact</button>
    { isModalOpen &&
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        < ContactForm existingContact={currentContact} updateCallback={onUpdate} />
      </div>
    </div>
    }
  </>
}

export default App
