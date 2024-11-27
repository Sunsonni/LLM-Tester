import { Form, Input, Button } from 'reactstrap'
import { useState } from 'react'

const GeminiTextInput = () => {
    const [ prompt, setPrompt ] = useState('');
    const [ response, setResponse ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const geminiFetch = async () => {
        setLoading(true);
        try {
            const geminiResponse = await fetch('http://127.0.0.1:5280/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({message: prompt})
            });
            const data = await geminiResponse.json();
            setResponse(data.response || 'No response received');
        } catch (error) {
            setResponse('Error fetching reponse');
            console.error('Error: ', error);
        } finally {
            setLoading(false);
        }
       
    }
    return (
        <div className='content-container'>
            <div style={{marginBottom: '20px' }}>
                <h3>Response</h3>
                <p>{response}</p>
            </div>
            <div className='input-overlay'>
            <Form onSubmit={(e) => {e.preventDefault(); geminiFetch();}}>
                <Input type="text" value={prompt} onChange={(e)=> setPrompt(e.target.value)} placeholder='Enter your prompt'/>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </Button>
            </Form>
            </div>
        </div>
    )
}

export default GeminiTextInput;