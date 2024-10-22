import React, { useContext, useEffect, useState } from "react";
import "./ChatBox.css";
import assets from "../../../assets/assetsChat";
import { AppChatContext } from "../../../context/AppChatContext";
import { response } from "express";
import upload from "../../../lib/upload";

interface status {
  success: boolean;
  messageResponse: messageData;
}

interface chatStatus{
  success: boolean,
  chats: Chat[];
}

interface Chat {
  reUserId: string;
  lastMessage: string;
  messageId: string;
  messageSeen: boolean;
  updatedAt: Date;
  chatUserData: chatUserData;
}

interface chatUserData {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
}

interface messageData {
  messageId: string;
  messages: messagesData[];
}

interface messagesData {
  createdAt: Date;
  seUserId: string;
  data: string;
}

interface user{
  id: string
}

const ChatBox = () => {
  const context = useContext(AppChatContext);

  if (!context) {
    throw new Error(
      "AppChatContext must be used within an AppChatContextProvider"
    );
  }

  const {
    socket,
    userData,
    messagesId,
    chatUser,
    messages,
    setMessages,
    chatVisible,
    setChatVisible,
    setAllChat,
  } = context;

  const [input, setInput] = useState("");

  // load lich su message khi bam vao doan chat
  useEffect(() => {
    if (messagesId) {
      if (socket) {
        socket.emit("getMessData", messagesId, (response: status) => {          
          if (response.success) {
            const data = response.messageResponse;
            if (data) {
              setMessages(data.messages.reverse());
            }
          }else {
            console.error('Failed to get message data');
          }
        });
      }else {
        console.error('Socket connection not available');
      }
      return () => {};
    }
  }, [messagesId]);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (newMessage) => {
        setMessages(newMessage.reverse());
      });
    }

    return () => {
      if (socket) {
        socket.off('newMessage');
      }
    };
  }, [socket, messages]);

  // chuyen doi gia tri thoi gian de hien thi
  const convertTimestamp = (timestamp: string | Date) => {
    // Nếu timestamp là chuỗi thì chuyển nó thành đối tượng Date
    const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    
    
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid timestamp, expected a valid Date.");
      return "Invalid date";
    }
    
    const hour = date.getHours();
    const minute = date.getMinutes();
  
    if (hour > 12) {
      return minute < 10 ? `${hour - 12}:0${minute} PM` : `${hour - 12}:${minute} PM`;
    } else {
      return minute < 10 ? `${hour}:0${minute} AM` : `${hour}:${minute} AM`;
    }
  };


  // function chat 
  const sendMessage = async () => {
    try {
      if(input && messagesId){
        if (socket) {
          const id =userData.id
          const time = new Date()
          socket.emit("sendMessage",{messagesId, id, input, time},(response: status) =>{
            if (response.success) {
              console.log("success to update mess"); 
            } else {
              console.error('Failed to send message to api');
            }
          })
        } else {
          console.error('Socket connection not available');
        }
      }

      if(input && messagesId){
        if(socket){
          const userIDs = [chatUser?.reUserId, userData.id,];
          userIDs.forEach(async (id) => {
            await socket .emit('getChats', id, (response:chatStatus) => {               
              if (response.success) {
                const data = response.chats    
                if(data){
                  const chatIndex = data.findIndex((c) => c.messageId === messagesId);
                  const lastMess= data[chatIndex].lastMessage = input.slice(0,30);
                  const update = data[chatIndex].updatedAt =new Date();
                  console.log(update);                  
                  let messSeen =data[chatIndex].messageSeen
                  if(data[chatIndex].reUserId === userData.id){
                    messSeen =data[chatIndex].messageSeen = false;
                  }
                  const userId = id
                  const messId = messagesId
                  const rId = data[chatIndex].reUserId
                  socket.emit("updateChatData",{userId,lastMess,rId, update, messSeen,messId},(response: { success: boolean, message?: string } ) =>{
                    if (response.success) {
                      console.log("success update chat"); 
                    } else {
                      console.error(response.message || 'Failed to update message seen status');
                    }
                  })
                }else{
                  console.error("data is not valid")
                }            
              } else {
                console.error('Failed to fetch chats');
              }
            });
          })
        }else {
          console.error('Socket connection not available');
        }
      }
    } catch (error) {
      console.error("can't sendMessage");
    }
    setInput("");
  }

  const sendImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0];
      if (file) {
        const fileUrl = await upload(file);
        const input = "Image:" + fileUrl        
        if (input && messagesId) {
          if (socket) {
            const id = userData.id;
            const time = new Date();
            socket.emit(
              "sendMessage",{ messagesId, id, input, time },
              (response: status) => {
                if (response.success) {
                  console.log("success to update mess");
                } else {
                  console.error("Failed to send message to api");
                }
              }
            );
  
            const userIDs = [chatUser?.reUserId, userData.id];
            userIDs.forEach(async (id) => {
              await socket.emit(
                "getChats",
                id,
                (response: chatStatus) => {
                  if (response.success) {
                    const data = response.chats;
                    if (data) {
                      const chatIndex = data.findIndex(
                        (c) => c.messageId === messagesId
                      );
                      const lastMess = (data[chatIndex].lastMessage = "Image");
                      const update = (data[chatIndex].updatedAt = new Date());
                      let messSeen = data[chatIndex].messageSeen;
                      if (data[chatIndex].reUserId === userData.id) {
                        messSeen = data[chatIndex].messageSeen = false;
                      }
                      const userId = id;
                      const messId = messagesId;
                      const rId = data[chatIndex].reUserId;
                      socket.emit(
                        "updateChatData",
                        {
                          userId,
                          lastMess,
                          rId,
                          update,
                          messSeen,
                          messId,
                        },
                        (
                          response: { success: boolean; message?: string }
                        ) => {
                          if (response.success) {
                            console.log("success update chat");
                          } else {
                            console.error(
                              response.message ||
                                "Failed to update message seen status"
                            );
                          }
                        }
                      );
                    } else {
                      console.error("data is not valid");
                    }
                  } else {
                    console.error("Failed to fetch chats");
                  }
                }
              );
            });
          } else {
            console.error("Socket connection not available");
          }
        }
      }
    } catch (error) {
      console.error(error||"can't sendMessage");
    }
    setInput("");
  };
  
  console.log(messages);
  
  return (
    <div className="chat-box">
      <div className="chat-user">
        <img src={assets.hongle} alt="" />
        <p>{chatUser?.chatUserData.lastName +" " + chatUser?.chatUserData.firstName}</p>{" "}
        <img className="dot" src={assets.green_dot} alt="" />
        <img src={assets.help_icon} alt="" />
      </div>

      <div className="chat-msg">
        {messages.map((msg, index) => (
          <div key={index} className={msg.seUserId=== userData.id ? "s-msg" : "r-msg"}>
            {msg.data.startsWith("Image:")
            ? ( <img src={msg.data.substring(6)} alt="" className="msg-img" />)
            : (<p className="msg">{msg.data}</p>)
            }
            <div>
              <img src={assets.hongle} alt="" />
              <p>{convertTimestamp(msg.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder="Send a message"/>
        <input onChange={sendImage} type="file" id="image" accept="image/png, img/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img onClick={sendMessage} src={assets.send_button} alt="" />
      </div>
    </div>
  );
};

export default ChatBox;
