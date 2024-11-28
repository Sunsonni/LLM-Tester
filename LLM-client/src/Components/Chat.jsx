import React from 'react';
import './Chat.css';

const Chat = ({ history }) => {
    return (
        <div className="chat-container">
            {history.map((entry, index) => (
                <div key={index} className={`chat-message ${entry.role}`}>
                    <strong>{entry.role}:</strong> {entry.parts}
                </div>
            ))}
        </div>
    )
}
export default Chat;