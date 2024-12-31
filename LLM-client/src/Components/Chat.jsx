import React from 'react';
import './Chat.css';

const Chat = ({ history }) => {
    

    return (
        <div className="chat-container">
            {history.map((entry, index) => (
                <div key={index} className={`chat-message ${entry.role}`}>
                    <strong style={{ textAlign: 'left' }}>{entry.role}:</strong>
                    <div>{entry.parts}</div>
                </div>
            ))}
        </div>
    )
}
export default Chat;