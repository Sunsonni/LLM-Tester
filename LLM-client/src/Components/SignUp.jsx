import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    //username, password, email
    const navigate= useNavigate();
  
        const [formData, setFormData] = useState({
            username: "",
            email: "",
            password: "",
        });

        const [responseMessage, setResponseMessage] = useState("");

        const handleChange = (event) => {
            const { name, value } = event.target;
            setFormData({
                ...formData,
                [name]: value,
            });
        };
        
        const handleSubmit = async (event) => {
            event.preventDefault();

            try {
                const response = await fetch('http://127.0.0.1:5280/create-new-user', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData),
            });
            if(!response.ok) {
                throw new Error(`HTTP error! Status ${response.status}`);
            }
                navigate("/Success");
            } catch (error) {
                setResponseMessage(`Error: ${error.message}`);
            }
        };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    Username: 
                    <input 
                        type='text' 
                        name='username' 
                        value={formData.username}
                        onChange={handleChange}
                        autoComplete="name"
                    />
                </label>

                <label>
                    Email: 
                    <input 
                    type='text' 
                    name='email' 
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    />
                </label>
                <label>
                    Password:
                    <input 
                    type='password' 
                    name='password' 
                    value={formData.password}
                    onChange={handleChange}
                />
                </label>
            <button type='submit'>Submit</button>
            </form>
            {responseMessage && <p>{responseMessage}</p>}
        </>
    )
}

export default SignUp;