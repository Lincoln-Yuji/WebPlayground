import  { useState } from 'react'
import { BACKEND_URL } from './app_config'

const ContactForm = ({}) => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")

    const registerNewContact = async (e) => {
        // Forms refresh the page on submit by default. Prevent that from happening.
        e.preventDefault()

        // Prepare all the necessary data to FETCH with the backend.
        const userData = {
            firstName,
            lastName,
            email
        }
        const url = BACKEND_URL + "/create_contact"
        const request_options = {
            method: "POST",
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
        }
    }

    return <form onSubmit={registerNewContact}>
        <div class="form-data-container">
            <label htmlFor="firstName">First Name:</label>
            <input type="text"
                   id="firstName"
                   value={firstName}
                   onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <div class="form-data-container">
            <label htmlFor="lastName">Last Name:</label>
            <input type="text"
                   id="lastName"
                   value={lastName}
                   onChange={(e) => setLastName(e.target.value)}
            />
        </div>
        <div class="form-data-container">
            <label htmlFor="email">Email:</label>
            <input type="text"
                   id="email"
                   value={email}
                   onChange={(e) => setFirstName(e.target.value)}
            />
        </div>
        <button type="submit">Register</button>
    </form>
}

export default ContactForm