import React, { useEffect, useRef } from 'react';
import './Chat.css';

const Chat = ({ history }) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [history])
    return (
        <div className="chat-container">
            {history.map((entry, index) => (
                <div key={index} className={`chat-message ${entry.role}`}>
                    <strong style={{ textAlign: 'left' }}>{entry.role}:</strong>
                    <div>{entry.parts}</div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    )
}
export default Chat;