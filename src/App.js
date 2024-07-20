import React, { useState } from 'react';
import "./App.css"
const App = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        phone: '',
        email: ''
    });

    const BOT_TOKEN = '7267506140:AAEHhJBrHmIyiqbqxefjdLMU4yubr9-7dk8'; // Replace with your bot token
    const CHAT_ID = 6959587043; // Replace with your chat ID

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstName, phone, email } = formData;

        const message = `
            First Name: ${firstName}\nPhone: ${phone}\nEmail: ${email}
        `;

        fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: CHAT_ID,
                text: message
            }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.ok) {
                alert('Message sent successfully!');
            } else {
                alert('Failed to send message: ' + data.description);
            }
        })
        .catch((error) => {
            alert('Error: ' + error.message);
        });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="phone">Phone:</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default App;
