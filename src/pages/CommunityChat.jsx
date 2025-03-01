import React, { useState, useEffect, useRef } from 'react';
import '../styles/CommunityChat.css';

const CommunityChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const messagesEndRef = useRef(null);

  // Mock user data
  const mockUsers = [
    { id: 1, name: 'Sarah Johnson', avatar: 'https://randomuser.me/api/portraits/women/32.jpg' },
    { id: 2, name: 'Michael Chen', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
    { id: 3, name: 'Amara Okafor', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    { id: 4, name: 'David Rodriguez', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' },
    { id: 5, name: 'Emma Wilson', avatar: 'https://randomuser.me/api/portraits/women/17.jpg' }
  ];

  // Initial mock messages
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        userId: 1,
        text: "Hello everyone! I'm organizing a fundraiser for local schools next month. Anyone interested in joining?",
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
      },
      {
        id: 2,
        userId: 2,
        text: "That sounds great! I'd love to help out. What kind of support are you looking for?",
        timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
      },
      {
        id: 3,
        userId: 3,
        text: "I just donated to the Wildlife Protection campaign. It's an amazing cause!",
        timestamp: new Date(Date.now() - 3600000 * 3).toISOString(),
      },
      {
        id: 4,
        userId: 4, 
        text: "Has anyone participated in virtual fundraising events? Looking for some tips.",
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
      },
      {
        id: 5,
        userId: 5,
        text: "David, I organized one last year. Happy to share my experience! Let's connect.",
        timestamp: new Date(Date.now() - 3600000 * 1).toISOString(),
      }
    ];

    setMessages(mockMessages);
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const newMsg = {
      id: messages.length + 1,
      userId: 'user', // special ID for the current user
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMsg]);
    setNewMessage('');

    // Simulate a response after a brief delay
    setTimeout(() => {
      const responseIdx = Math.floor(Math.random() * mockUsers.length);
      const responseMsg = {
        id: messages.length + 2,
        userId: mockUsers[responseIdx].id,
        text: getRandomResponse(),
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, responseMsg]);
    }, 3000);
  };

  const getRandomResponse = () => {
    const responses = [
      "That's a great point! Thanks for sharing.",
      "I completely agree with what you're saying.",
      "Interesting perspective. I hadn't thought of it that way.",
      "Thanks for contributing to the discussion!",
      "I'd love to hear more about your experience with this.",
      "Has anyone else had similar experiences?",
      "That's exactly what I was thinking too.",
      "This community is so supportive, thank you all!",
      "I'm learning so much from everyone here.",
      "What other campaigns are you all interested in supporting?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleJoinChat = (e) => {
    e.preventDefault();
    if (username.trim() === '') return;
    setIsJoined(true);
    
    // Add system message for joining
    const joinMsg = {
      id: messages.length + 1,
      userId: 'system',
      text: `${username} has joined the chat.`,
      timestamp: new Date().toISOString(),
    };
    setMessages([...messages, joinMsg]);
  };

  const getUserById = (userId) => {
    return mockUsers.find(user => user.id === userId) || null;
  };

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card shadow border-0 chat-card">
            <div className="card-header bg-primary text-white py-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h4 className="mb-0">Community Chat</h4>
                  <p className="mb-0 small">Connect with other donors and campaigners</p>
                </div>
                <div className="d-flex align-items-center">
                  <span className="badge bg-success me-2 pulse-animation">Live</span>
                  <span className="online-count">
                    <i className="bi bi-people-fill me-2"></i>
                    {mockUsers.length + (isJoined ? 1 : 0)} Online
                  </span>
                </div>
              </div>
            </div>
            
            {!isJoined ? (
              <div className="card-body p-4">
                <div className="text-center my-4 py-4">
                  <i className="bi bi-chat-quote chat-icon mb-3"></i>
                  <h3>Join the Conversation</h3>
                  <p className="text-muted">Enter your name to start chatting with the community</p>
                  
                  <form onSubmit={handleJoinChat} className="join-form mt-4">
                    <div className="row justify-content-center">
                      <div className="col-md-6">
                        <div className="mb-3 position-relative">
                          <i className="bi bi-person position-absolute ms-3" style={{top: '15px'}}></i>
                          <input 
                            type="text" 
                            className="form-control form-control-lg ps-5" 
                            placeholder="Your name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary btn-lg w-100">
                          <i className="bi bi-box-arrow-in-right me-2"></i>
                          Join Chat
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            ) : (
              <>
                <div className="card-body p-0">
                  <div className="chat-messages p-4" style={{ height: '500px', overflowY: 'auto' }}>
                    <div className="chat-day-divider">
                      <span>Today</span>
                    </div>
                    
                    {messages.map((message) => {
                      const isOwnMessage = message.userId === 'user';
                      const isSystemMessage = message.userId === 'system';
                      const user = isOwnMessage ? null : getUserById(message.userId);
                      
                      if (isSystemMessage) {
                        return (
                          <div key={message.id} className="text-center my-3 system-message">
                            <div className="badge bg-light text-dark py-2 px-3">
                              <i className="bi bi-info-circle me-2"></i>
                              {message.text}
                            </div>
                          </div>
                        );
                      }
                      
                      return (
                        <div 
                          key={message.id} 
                          className={`message mb-3 ${isOwnMessage ? 'own-message text-end' : ''}`}
                        >
                          {!isOwnMessage && (
                            <div className="d-flex align-items-center mb-1">
                              <div className="position-relative">
                                <img 
                                  src={user?.avatar} 
                                  alt={user?.name} 
                                  className="rounded-circle me-2"
                                  width="36"
                                  height="36"
                                />
                                <span className="position-absolute bottom-0 end-0 bg-success rounded-circle status-indicator"></span>
                              </div>
                              <div>
                                <span className="fw-bold user-name">{user?.name}</span>
                              </div>
                            </div>
                          )}
                          
                          <div className={`message-bubble ${isOwnMessage ? 'own-bubble' : 'other-bubble'}`}>
                            <div className="message-text">{message.text}</div>
                            <div className="message-time">
                              {isOwnMessage && <i className="bi bi-check2-all me-1"></i>}
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </div>
                </div>
                
                <div className="card-footer bg-white border-0 p-3">
                  <form onSubmit={handleSendMessage}>
                    <div className="input-group message-input-group">
                      <button type="button" className="btn btn-outline-secondary icon-btn">
                        <i className="bi bi-emoji-smile"></i>
                      </button>
                      <input 
                        type="text" 
                        className="form-control message-input"
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      />
                      <button type="submit" className="btn btn-primary message-send-btn">
                        <i className="bi bi-send"></i>
                      </button>
                    </div>
                    <div className="text-muted small mt-2">
                      Sending as <span className="fw-bold">{username}</span>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
          
          <div className="card mt-4 border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Community Guidelines</h5>
              <ul className="mb-0">
                <li>Be respectful and kind to all community members</li>
                <li>Stay on topic and avoid spamming</li>
                <li>Don't share personal or sensitive information</li>
                <li>Report inappropriate behavior</li>
                <li>Support each other and share knowledge</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-lg-4 mt-4 mt-lg-0">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="card-title">Active Users</h5>
              <p className="card-text text-muted small mb-3">Currently online users</p>
              
              <ul className="list-unstyled">
                {mockUsers.map(user => (
                  <li key={user.id} className="d-flex align-items-center mb-3">
                    <div className="position-relative">
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="rounded-circle me-2"
                        width="40"
                        height="40"
                      />
                      <span 
                        className="position-absolute bottom-0 end-0 bg-success rounded-circle"
                        style={{ width: '10px', height: '10px', border: '2px solid white' }}
                      ></span>
                    </div>
                    <div>
                      <p className="mb-0 fw-medium">{user.name}</p>
                      <p className="mb-0 small text-muted">Active now</p>
                    </div>
                  </li>
                ))}
                
                {isJoined && (
                  <li className="d-flex align-items-center mb-3">
                    <div className="position-relative">
                      <div 
                        className="rounded-circle me-2 bg-primary d-flex align-items-center justify-content-center text-white"
                        style={{ width: '40px', height: '40px' }}
                      >
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <span 
                        className="position-absolute bottom-0 end-0 bg-success rounded-circle"
                        style={{ width: '10px', height: '10px', border: '2px solid white' }}
                      ></span>
                    </div>
                    <div>
                      <p className="mb-0 fw-medium">{username} <span className="badge bg-primary">You</span></p>
                      <p className="mb-0 small text-muted">Active now</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
          </div>
          
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Trending Topics</h5>
              <div className="d-flex flex-wrap gap-2 mt-3">
                <span className="badge bg-light text-dark p-2">#EnvironmentalCauses</span>
                <span className="badge bg-light text-dark p-2">#EducationForAll</span>
                <span className="badge bg-light text-dark p-2">#DisasterRelief</span>
                <span className="badge bg-light text-dark p-2">#AnimalWelfare</span>
                <span className="badge bg-light text-dark p-2">#HealthcareAccess</span>
                <span className="badge bg-light text-dark p-2">#CommunityDevelopment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityChat;
