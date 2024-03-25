import  { useState } from 'react'
import { BACKEND_URL } from './app_config'

const ContactForm = ({existingContact = {}, updateCallback}) => {
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    const updating = Object.entries(existingContact).length !== 0;
    console.log(existingContact)

    const registerNewContact = async (e) => {
        // Forms refresh the page on submit by default. Prevent that from happening.
        e.preventDefault()

        // Prepare all the necessary data to FETCH with the backend.
        const userData = {
            firstName,
            lastName,
            email
        }
        const url = BACKEND_URL + (updating ? `/update_contact/${existingContact.id}` : "/create_contact")
        const request_options = {
            method: updating ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData)
        }

        // FETCH
        const response = await fetch(url, request_options)

        if (response.status !== 201 && response.status !== 200) {
            // Failure
            const response_data = await response.json()
            alert(response_data.message)
        }
        else {
            // Successful
            updateCallback()
        }
    }

    return <form onSubmit={registerNewContact}>
        <div className="form-data-container">
            <label htmlFor="firstName">First Name:</label>
            <input type="text"
                   id="firstName"
                   value={firstName}
                   onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div className="form-data-container">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text"
                   id="lastName"
                   value={lastName}
                   onChange={(e) => setLastName(e.target.value)}
            />
        </div>
        <div className="form-data-container">
            <label htmlFor="email">Email:</label>
            <input type="text"
                   id="email"
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
            />
        </div>
        <button type="submit">{updating ? "Update" : "Create"}</button>
    </form>
}

export default ContactForm