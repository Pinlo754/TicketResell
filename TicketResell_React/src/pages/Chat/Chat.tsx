import React from 'react'
import './Chat.css'
import LeftSidebar from '../../components/ChatComponents/LeftSidebar/LeftSidebar'
import ChatBox from '../../components/ChatComponents/ChatBox/ChatBox'
import RightSidebar from '../../components/ChatComponents/RightSidebar/RightSidebar'
import NavBar from '../../components/NavBar'

const Chat = () => {
  return (
    <div className='chat'>
      <NavBar/>
      <div className="chat-container">
        <LeftSidebar/>
        <ChatBox/>
        <RightSidebar/>
      </div>
    </div>
  )
}

export default Chat
