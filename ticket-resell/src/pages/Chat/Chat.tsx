import React from 'react'
import './Chat.css'
import LeftSidebar from '../../components/ChatComponents/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatComponents/ChatBox/ChatBox'
import RightSidebar from '../../components/ChatComponents/RightSidebar/RightSidebar'

const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSidebar/>
        <ChatBox/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default Chat
