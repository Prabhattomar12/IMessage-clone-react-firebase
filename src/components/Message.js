import { Avatar } from '@material-ui/core'
import React, {forwardRef} from 'react'
import './Message.css'
import { selectUser } from '../features/userSlice'
import { useSelector } from 'react-redux'

const Message = forwardRef(({username, message, avatar, timestamp }, ref) => {
   
   const user = useSelector(selectUser)
    console.log('in message ', user.username === username)
    return (
  <div ref={ref} className={user.username === username ? 'message message_sender': 'message'} >
            <Avatar className='message_photo' src={avatar} />
             <div className="message_info">
             <p className='text '>{message}</p>
          <small className='message_detail'>{username} <span>{new Date(timestamp?.toDate()).toUTCString()}</span></small>
             </div>
                                 
        </div>
    )
})

export default Message
