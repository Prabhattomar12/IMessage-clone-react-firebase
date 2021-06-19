import React, {useState, useEffect} from 'react';
import './Sidebar.css';
import { Avatar, IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RateReviewOutlinedIcon from '@material-ui/icons/RateReviewOutlined';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux'
import db, { auth } from '../firebase';
import { selectUser } from '../features/userSlice';
import FlipMove from 'react-flip-move';

function Sidebar() {

  const user = useSelector(selectUser)
  const [groupList, setGroupList] = useState([]);

   useEffect(() => {
      
     db.collection('groups')
       .onSnapshot((snapshot) => {
             setGroupList(snapshot.docs.map(doc => ({id: doc.id, group: doc.data()} )))
       })

   }, [])

  const logout = () => {
    auth.signOut()   
  }

  const addGroup = () => {
     const newGroup = prompt('Enter new group Name')
       if(newGroup){
         db.collection('groups')
         .add({
           groupName: newGroup
         })
       }
    }

  console.log('grp lst ', groupList)
  return (
    <div className='sidebar'>
      <div className='sidebar_header'>
        <Avatar onClick={logout} src={user.photo} className='sidebar_header_avatar'/>
        <div className='sidebar_header_search'>
          <SearchIcon />
          <input type='text' placeholder='Search' />
        </div>
        <IconButton onClick={addGroup}>
          <RateReviewOutlinedIcon className='rating_icon' />
        </IconButton>
      </div>

      <div className='sidebar_chats'>
         <FlipMove> 
        {groupList.map(({ id, group }) =>  <SidebarChat
          key={id}
          id={id}
         title={group.groupName}
          lastMessage='lastmessage....'
          timestamp='timestamp....'
        />)}
         </FlipMove>
      </div>
    </div>
  );
}

export default Sidebar;
