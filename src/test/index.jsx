import { Stomp } from '@stomp/stompjs';
import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import SockJS from 'sockjs-client';
import { selectCurrentToken, selectCurrentUser } from '../features/auth/authSlice';

const Test = () => {
    const messageRef = useRef();
    const [message, setMessage] = useState("");
    const handleMessageInput = (e) => setMessage(e.target.value);
    const [stompClient, setStompClient] = useState(null);
    const token = useSelector(selectCurrentToken);
    const user = useSelector(selectCurrentUser);

    console.log('index page is ready');
    useEffect(() => {

        // axios.get('http://localhost:8080/api/v1/token/csrf', {
        //     headers:{
        //         "authorization": `Bearer ${token}`,
        //         Accept: 'application/json', 
        //     },
        //     withCredentials: true,
        // })
        // .then(response => {
        //     // const csrfToken = response.data.csrf_token;      
            
        //     console.log(response)
        // }).catch((err) => console.log(err.message))
        // .catch(error => {
        //     console.log(error);
        // });
        connect();
    }, [])

    const clickSend = (e) => {
        e.preventDefault();
        sendMessage();
        sendPrivateMessage();
    }


    const connect = () => {
        const socket = new SockJS(`http://localhost:8080/our-websocket?userId=${user.id}`);
        const stompClient = Stomp.over(socket);
        var headers = {};
        // headers[headerName] = csrfToken;
        headers['authentication'] = token;
        console.log(headers);
        stompClient.connect({'Sec-WebSocket-Protocol': 'userId=khoimai'}, function (frame) {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/messages', function(message) {
                showMessage(JSON.parse(message.body).content);
            })

            stompClient.subscribe('/user/topic/private-messages', function (message) {
                showMessage(JSON.parse(message.body).content);
            });
        })
        setStompClient(stompClient)
    }

    const showMessage = (message) => {
        // $('#messages').append("<tr><td>" + message + "</tr></td>");
        console.log(message)
    }

    const sendMessage = () => {
        console.log('sending message');
        stompClient.send('/ws/message', {userId: "43158209850234"}, JSON.stringify({'messageContent': message}))
    }

    const sendPrivateMessage = () => {
        console.log("sending private message");
        stompClient.send("/ws/private-message", {}, JSON.stringify({'messageContent': message}));
    }
  return (
    <div>
        <form >
            <div>
                <label>Message</label>
                <input 
                    className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus: outline-none"
                //  
                    id="message"
                    ref={messageRef}
                    value={message}
                    onChange={handleMessageInput}
                    autoComplete="off"
                    requiredplaceholder='Place your message here'/>
            </div>
            <button onClick={clickSend}>Send</button>
        </form>
    </div>
  )
}

export default Test