import React from 'react'
import './IMessage.css';
import Sidebar from './Sidebar';
import Chat from './Chat';

function IMessage() {
    return (
        <div className='iMessage'>
            {/* Sidebar  */}
            {/* Chat */}
            <Sidebar />
            <Chat />
        </div>
    )
}

export default IMessage
