import { Form, Input, Button } from 'reactstrap'
import { useState } from 'react'

const GeminiTextInput = () => {
    const [ prompt, setPrompt ] = useState('');
    const geminiFetch = async () => {
        
        const geminiResponse = await fetch('http://localhost:5280/api/Gemini/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(prompt)
        });
        const data = await geminiResponse.json();
        console.log(data);
    }
    return (
        <Form onSubmit={(e) => {e.preventDefault(); geminiFetch();}}>
            <Input type="text" value={prompt} onChange={(e)=> setPrompt(e.target.value)} placeholder='Enter your prompt'/>
            <Button type="submit">Submit</Button>
        </Form>
    )
}

export default GeminiTextInput;