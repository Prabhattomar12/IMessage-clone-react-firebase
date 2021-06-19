import React, { useState, useEffect } from 'react';
import './Chat.css';
import Message from './Message.js';
import db from '../firebase.js';
import { selectGroupId, selectGroupName } from '../features/appSlice';
import { selectUser, SelectUser } from '../features/userSlice';
import { useSelector } from 'react-redux';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

const Chat = () => {
  const [text, setText] = useState('');
  const user = useSelector(selectUser);
  const groupId = useSelector(selectGroupId);
  const groupName = useSelector(selectGroupName);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // get messages
    if (groupId)
      db.collection('groups')
        .doc(groupId)
        .collection('conversations')
        .orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => {
          console.log('snapshot ', snapshot)
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
  }, [groupId]);

  const postMessage = (e) => {
    e.preventDefault();

    if (text !== '' && groupId){
      db.collection('groups').doc(groupId).collection('conversations').add({
        username: user.username,
        avatar: user.photo,
        message: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        send: true,
      });
      console.log('msg send')
    }

    setText('')
  };


  console.log('messages in chat ', messages);


  return (
    <div className='chat'>
      <div className='chat_header'>
        <h4>
          To: <span className='groupName'>{groupName}</span>
        </h4>
        <strong>Details</strong>
      </div>
      <div className='chat_messages'>
        <FlipMove>
        {messages.map((message) => 
          <Message
            key={message.id}
            username={message.username}
            avatar={message.avatar}
            message={message.message}
            timestamp={message.timestamp}
            send={message.send}
          />
        )}
        </FlipMove>
      </div>
      <div className='chat_input'>
        <form>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            type='text'
            placeholder='Type Message'
          />
          <button onClick={postMessage}>Send message</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
