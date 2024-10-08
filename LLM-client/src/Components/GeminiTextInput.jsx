import { Form, Input, Button } from 'reactstrap'
import { useState } from 'react'

const GeminiTextInput = () => {
    const [ prompt, setPrompt ] = useState('');
    const [ response, setResponse ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const geminiFetch = async () => {
        setLoading(true);
        try {
            const geminiResponse = await fetch('http://localhost:5280/api/Gemini/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prompt)
            });
            const data = await geminiResponse.text();
            setResponse(data);
        } catch (error) {
            setResponse('Error fetching reponse');
            console.error('Error: ', error);
        } finally {
            setLoading(false);
        }
       
    }
    return (
        <div>
            <div style={{marginBottom: '20px' }}>
                <h3>Response</h3>
                <p>{response}</p>
            </div>
            <Form onSubmit={(e) => {e.preventDefault(); geminiFetch();}}>
                <Input type="text" value={prompt} onChange={(e)=> setPrompt(e.target.value)} placeholder='Enter your prompt'/>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </Form>
        </div>
    )
}

export default GeminiTextInput;