import { useState, useEffect, useRef } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import '../styles/CommunityChat.css';

const CommunityChat = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            setMessages(snapshot.docs.map(doc => doc.data()));
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage.trim() !== "") {
            await addDoc(collection(db, "messages"), {
                text: newMessage,
                createdAt: new Date(),
                user: "Om",  // Replace with authenticated user
                timestamp: new Date().getTime()
            });
            setNewMessage("");
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h2 className="text-center mb-4">
                    <i className="bi bi-chat-dots me-2"></i>
                    Community Chat
                </h2>
            </div>
            
            <div className="messages-container">
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`message ${msg.user === "Om" ? "message-own" : "message-other"}`}
                    >
                        <div className="message-content">
                            <div className="message-user">
                                <i className="bi bi-person-circle me-2"></i>
                                {msg.user}
                            </div>
                            <div className="message-text">{msg.text}</div>
                            <div className="message-time">
                                {new Date(msg.timestamp).toLocaleTimeString()}
                            </div>
                        </div>
                    </div>
                ))}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={sendMessage} className="chat-form">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        required
                    />
                    <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={!newMessage.trim()}
                    >
                        <i className="bi bi-send me-1"></i>
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CommunityChat;
