import { useState, useEffect } from 'react'
import './App.css'

import { BACKEND_URL } from './app_config.jsx'
import ContactList from './ContactList.jsx';
import ContactForm from './ContactForm.jsx';

function App() {
  const [contacts, setContacts] = useState([]); 

  const fetchContacts = async () => {
    const response = await fetch(BACKEND_URL + "/contacts")
    const data = await response.json()
    setContacts(data.contacts)
    console.log(data.contacts)
  }

  useEffect(() => {
    fetchContacts()
  }, [])

  return <>
    < ContactList contacts={contacts} />
    < ContactForm />
  </>
}

export default App
