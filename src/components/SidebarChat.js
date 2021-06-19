import { Avatar } from '@material-ui/core';
import React, { useEffect, useState, forwardRef } from 'react'
import './SidebarChat.css';
import { useDispatch } from 'react-redux'
import { setGroupInfo} from '../features/appSlice'
import db from '../firebase.js'
 
const SidebarChat  = forwardRef(({ id, title }, ref) => {
   
   const dispatch = useDispatch()
   const [lastMessage, setLastMessage] = useState();

   useEffect(() => {
       db.collection('groups') 
         .doc(id)
         .collection('conversations')
         .orderBy('timestamp', 'desc')
         .onSnapshot( snapshot => {
             const messages = snapshot.docs.map(doc => doc.data());
               setLastMessage(messages[0]);
         }) 
   }, [id])


   const changeGroup = () => {
        if(id){
         dispatch(
             setGroupInfo({
                 groupId: id,
                 groupName: title,
             })
         )             
        }
   } 
   
 console.log('last message ', lastMessage)

    return (
        <div ref={ref} onClick={changeGroup} className='sidebar_chat' >
            <Avatar src={lastMessage?.avatar}/>
            <div className="sidebar_chatInfo">
                <h3>{title}</h3>
                <p>{lastMessage?.message}</p>
                <small>{new Date(lastMessage?.timestamp?.toDate()).toLocaleString()}</small>
            </div>
        </div>
    )
})

export default SidebarChat
