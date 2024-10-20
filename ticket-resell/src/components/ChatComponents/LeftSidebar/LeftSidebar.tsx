import React, { useContext } from "react";
import "./LeftSidebar.css";
import assets from "../../../assets/assetsChat";
import { AppChatContext } from "../../../context/AppChatContext";

interface chatUserData {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
}

interface Chat {
  rID: string;
  lastMessage: string;
  messageId: string;
  messageSeen: boolean;
  updatedAt: Date;
  chatUserData: chatUserData;
}

const LeftSidebar: React.FC = () => {
  const context = useContext(AppChatContext);

  if (!context) {
    throw new Error("AppChatContext must be used within an AppChatContextProvider");
  }

  const { 
    socket, 
    userData, 
    chatData, 
    setMessagesId, 
    setChatUser, 
    setChatVisible, 
    setChatData 
  } = context;

  // const setChat = async (item: Chat) => {
  //   try {
  //     setMessagesId(item.messageId);
  //     setChatUser(item);
      
  //     if (socket) {
  //       socket.emit('updateMessageSeen', {
  //         userId: userData.id,
  //         messageId: item.messageId
  //       }, (response: { success: boolean, message?: string }) => {
  //         if (response.success) {
  //           setChatData(prevChatData => {
  //             if (prevChatData === null) return null;
  //             return prevChatData.map(chat => 
  //               chat.messageId === item.messageId 
  //                 ? { ...chat, messageSeen: true } 
  //                 : chat
  //             );
  //           });
  //           setChatVisible(true);
  //         } else {
  //           console.error(response.message || 'Failed to update message seen status');
  //         }
  //       });
  //     } else {
  //       console.error('Socket connection not available');
  //     }

  //   } catch (error) {
  //     console.error('An error occurred while setting the chat');
  //     console.error(error);
  //   }
  // };

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="" className="logo" />
          <p>Chat Page</p>
          <div className="menu">
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder="Search here.." />
        </div>
      </div>
      <div className="ls-list">
        {chatData?.map((item: Chat, index: number) => (
          <div key={index} className="friends"> 
            <img src={assets.hongle} alt="" />
            <div>        
              <p>{item.chatUserData.email}</p>
              <span>{item.lastMessage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;