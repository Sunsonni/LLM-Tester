import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [responseMessage, setResponseMessage] = useState('');
    const [ formData, setFormData ] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const  { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
        }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch('http://127.0.0.1:5280/check-user', {
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

    }
    return(
        <form onSubmit={handleSubmit}>
            <label>Username or Email:
                <input
                type='text' 
                name='username' 
                value={formData.username}
                onChange={handleChange}
                autoComplete="name"
                />
            </label>
            <label>Password:
                <input
                type='password' 
                name='password' 
                value={formData.password}
                onChange={handleChange}
                autoComplete="name"
                />
            </label>
            <button type='submit'>Submit</button>
            {responseMessage && <p>{responseMessage}</p>}
        </form>
    )
}

export default Login;