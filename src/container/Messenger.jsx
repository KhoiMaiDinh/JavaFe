import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";
import ChatOnline from "../components/ChatOnline";
import Message from "../components/Message";
import Conversation from "../components/Conversation";

const Messenger = () => {
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const socket = useRef();
    const user = useSelector(selectCurrentUser);
    const scrollRef = useRef();

    const handleSubmit = () => {
        console.log('handleSubmit')
    }
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                <input placeholder="Search for friends" className="chatMenuInput" />
                {/* {conversations.map((c) => (
                    <div onClick={() => setCurrentChat(c)}>
                    <Conversation conversation={c} currentUser={user} />
                    </div>
                ))} */}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                {currentChat ? (
                    <>
                    <div className="chatBoxTop">
                        {messages.map((m) => (
                        <div ref={scrollRef}>
                            <Message message={m} own={m.sender === user._id} />
                        </div>
                        ))}
                    </div>
                    <div className="chatBoxBottom">
                        <textarea
                        className="chatMessageInput"
                        placeholder="write something..."
                        onChange={(e) => setNewMessage(e.target.value)}
                        value={newMessage}
                        ></textarea>
                        <button className="chatSubmitButton" onClick={handleSubmit}>
                        Send
                        </button>
                    </div>
                    </>
                ) : (
                    <span className="noConversationText">
                    Open a conversation to start a chat.
                    </span>
                )}
                </div>
            </div>
            <div className="chatOnline">
                <div className="chatOnlineWrapper">
                <ChatOnline
                    onlineUsers={onlineUsers}
                    currentId={user._id}
                    setCurrentChat={setCurrentChat}
                />
                </div>
            </div>
        </div>
  );
};

export default Messenger;
