import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://chatbot-backend-0rpb.onrender.com'
const App = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await axios.get('API_URL/api/messages');
            setMessages(response.data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const sendMessage = async () => {
        if (input.trim() === '') return;

        try {
            const response = await axios.post('API_URL/api/messages', { user_message: input });
            setMessages([...messages, response.data]);
            setInput('');
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Chatbot</h1>
            <div style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px', maxHeight: '300px', overflowY: 'scroll' }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{ marginBottom: '10px' }}>
                        <strong>User:</strong> {msg.user_message}
                        <br />
                        <strong>Bot:</strong> {msg.bot_reply}
                    </div>
                ))}
            </div>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} style={{ width: '80%', padding: '10px', marginRight: '10px' }} placeholder="Type your message..."/>
            <button onClick={sendMessage} style={{ padding: '10px' }}>Send</button>
        </div>
    );
};

export default App;
