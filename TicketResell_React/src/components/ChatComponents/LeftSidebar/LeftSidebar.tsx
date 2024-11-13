import React, { useContext, useEffect, useState } from "react";
import "./LeftSidebar.css";
import assets from "../../../assets/assetsChat";
import { AppChatContext } from "../../../context/AppChatContext";
import { useLocation } from "react-router-dom";

interface chatUserData {
  bio: string;
  firstName: string;
  lastName: string;
  id: string;
  userImage: string
}

interface Chat {
  reUserId: string;
  lastMessage: string;
  messageId: string;
  messageSeen: boolean;
  updatedAt: Date;
  chatUserData: chatUserData;
}

interface ChatResponse {
  success: boolean;
  chatUser: chatUserData;
  error?: string;
}


const LeftSidebar: React.FC = () => {
  const context = useContext(AppChatContext);
  const location = useLocation();
  const {chatId} = location.state || {}
  const id = localStorage.getItem("userId")
  if (!context) {
    throw new Error("AppChatContext must be used within an AppChatContextProvider");
  }

  const { 
    socket, 
    userData, 
    allChat,
    chatUser, setChatUser,
    messagesId, setMessagesId,
    setChatVisible, 
  } = context;
  
  const [showSearch, setShowSearch] = useState(false)
  const [searchResult, setSearchResult] = useState<Chat[]>([])
  const [hasCheckedChatId, setHasCheckedChatId] = useState(false);

  useEffect(() => {
    const initializeChat = async () => {
      if (!hasCheckedChatId && chatId && allChat) {
        const chatData = allChat.find(item => item.reUserId === chatId);
        if (chatData) {
          await setChat(chatData);
        }
        setHasCheckedChatId(true);
      }
    };
  
    initializeChat();
  }, [chatId, allChat, hasCheckedChatId]);

  useEffect(() => {

      const updateChatUserData = () => {
        if (!chatUser || !socket) {
          return;
        }
  
        try {
          socket.emit("getChatUser", chatUser.chatUserData.id, (response: ChatResponse) => {
            if (response.success && response.chatUser) {
              const userData = response.chatUser;
              setChatUser(prev => {
                if (!prev) return null;
                return {
                  ...prev,
                  chatUserData: userData
                };
              });
            } else {
              console.error("Failed to get user data:", response.error);
            }
          });
        } catch (error) {
          console.error("Error in updateChatUserData:", error);
        }
      };
  
      updateChatUserData();
      // Cleanup
      return () => {
        if (socket) {
          socket.off("getChatUser");
          socket.off("updateChatData");
        }
      };
  }, [chatId,allChat,socket]);



  const inputHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const input = e.target.value
      if(input && allChat){
        const inputResult= allChat.filter((item) =>
          `${item.chatUserData.lastName} ${item.chatUserData.firstName}`
            .toLowerCase()
            .includes(input.trim().toLowerCase())
        );
        if(inputResult.length>0){
          setSearchResult(inputResult)
          setShowSearch(true)
        }
      }
      else{
        setShowSearch(false)
      }
    } catch (error) {
      console.error(error)
    }
  }
  
  const setChat = async (item: Chat) => {
    try {
      setMessagesId(item.messageId);
      setChatUser(item);
      if (socket) {
        socket.emit('updateChatData', {
          userId: userData.id,
          lastMess: item.lastMessage,
          messId: item.messageId,
          messSeen: true,
          rId: item.reUserId,
          update: item.updatedAt,
          seUserId: id
        }, (response: { success: boolean, message?: string }) => {
          if (response.success) {
            setChatVisible(true)
            console.log("success update messSeen in leftside"); 
          } else {
            console.error(response.message || 'Failed to update message seen status');
          }
        });
      } else {
        console.error('Socket connection not available');
      }
    } catch (error) {
      console.error('An error occurred while setting the chat');
      console.error(error);
    }
  };
  
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
          <input onChange={inputHandler} type="text" placeholder="Search here.." />
        </div>
      </div>
      <div className="ls-list">
      {showSearch
          ? searchResult?.map((item, index)=>(
            ( <div key={index} onClick={()=>setChat(item)} className="friends add-users">
              <img src={item.chatUserData.userImage} alt="" />
              <p>{item.chatUserData.lastName+ " "+item.chatUserData.firstName}</p>
            </div>)
          ))
        :  
        allChat?.map((item, index) => (
          <div key={index} onClick={() =>setChat(item)} className={`friends ${item.messageSeen || item.messageId === messagesId ? "" : "notSeen"}`}> 
            <img src={item.chatUserData.userImage} alt="" />
            <div>        
              <p>{item.chatUserData.lastName+ " "+item.chatUserData.firstName}</p>
              <span>{item.lastMessage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSidebar;