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
    const [ relationship, setRelationship ] = useState(null);
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

    useEffect(()=> {
        const fetchRelationship = async () => {
            try {
                const requestBody = {
                    user_id: 1,
                    character_name: "Todd Cunningham",
                };

                const response = await fetch (`http://127.0.0.1:5280/get-relationship`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestBody),
                });

            if(!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`)
            }

            const data = await response.json();
            setRelationship(data.relationship_value);
            console.log("relationship data fetched and set", data);

            } catch (error) {
                console.error('Error fetching relationship:', error.message);
            }
        }
        fetchRelationship();
    },[])

    const geminiFetch = async () => {
        setLoading(true);
        try {
            const geminiResponse = await fetch('http://127.0.0.1:5280/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    message: prompt,
                    user_id: 1 
                })
            });
            const data = await geminiResponse.json();
            const newEntry = [
                { role: 'user', parts: prompt },
                { role: 'model', parts: data.response || 'No response received' }
            ];
            console.log("Appending to history:", newEntry);
            setHistory((prevHistory) => [...prevHistory, ...newEntry]);
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
                    <p className='relationship-indicator'>{JSON.stringify(relationship)}</p>
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