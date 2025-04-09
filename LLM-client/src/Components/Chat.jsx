import React, { useEffect, useRef } from 'react';
import '../App.css';

const Chat = ({ history }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end"
        });
    }, [history])


    return (
        <div className="messages-container">
            {history.map((entry, index) => (
                <div key={index} className={`message-bubble ${entry.role}`}>
                    <strong style={{ textAlign: 'left' }}>{entry.role}:</strong>
                    <div className='message-content'>{entry.parts}</div>
                </div>
            ))}
            <div ref={messagesEndRef} className='scroll-anchor'/>
        </div>
    )
}
export default Chat;