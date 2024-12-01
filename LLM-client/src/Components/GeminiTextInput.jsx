import { Form, Input, Button } from 'reactstrap'
import { useState, useEffect, useRef} from 'react'
import { useOutletContext } from 'react-router-dom';
import Chat from './Chat';
import './TextInput.css';

const GeminiTextInput = () => {
    const { isNavOpen } = useOutletContext();
    const [ prompt, setPrompt ] = useState('');
    const [ history, setHistory ] = useState([]); 
    const [ loading, setLoading ] = useState(false);
    const chatContainerRef = useRef(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch ('http://127.0.0.1:5280/chat-history');
                const data = await response.json();
                console.log("history set");
                setHistory(data.history || []);
            } catch (error) {
                console.error('Error fetching chat history', error)
            }
        };
        fetchHistory();
    }, []);

    useEffect(() => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [history]);

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
            const newHistory = [
                ...history,
                { role: 'user', message: prompt },
                { role: 'model', message: data.response || 'No response received' }
            ];
            setHistory(newHistory);
            setPrompt('');
        } catch (error) {
            console.error('Error: ', error);
        } finally {
            setLoading(false);
        }
       
    }
    return (
        <div className={`content-container ${isNavOpen ? 'shifted': ''}`}>
            <div className='chat-container' ref={chatContainerRef}>
                <h3>Chat</h3>
               <Chat history={history}/>
            </div>
            <div className='input-overlay'>
            <Form onSubmit={(e) => {
                e.preventDefault(); 
                geminiFetch();
                }}
            >
                <div className='input-button-container'>
                    <Input 
                    className='textarea'
                    type="textarea" 
                    value={prompt} 
                    onChange={(e)=> setPrompt(e.target.value)} placeholder='Enter your prompt'/>
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Loading...' : 'Submit'}
                    </Button>
                </div>
            </Form>
            </div>
        </div>
    )
}

export default GeminiTextInput;