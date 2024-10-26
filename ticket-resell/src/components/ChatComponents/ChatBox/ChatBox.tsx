import React, { useCallback, useContext, useEffect, useState } from "react";
import "./ChatBox.css";
import assets from "../../../assets/assetsChat";
import { AppChatContext } from "../../../context/AppChatContext";
import { response } from "express";
import upload from "../../../lib/upload";
import { log } from "console";

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
  } = context;

  const [input, setInput] = useState("");

  // load lich su message khi bam vao doan chat
  const fetchMessage = useCallback(() => {
    if (socket && messagesId) {

      socket.emit("getMessData", messagesId, (response: status) => {
        if (response.success && response.messageResponse) {
          const data = response.messageResponse;
          setMessages(data.messages.reverse());
        } else {
          console.error("Failed to get message data");
        }
      });
    } else {
      console.error("Socket connection or message ID not available");
    }
  }, [socket, messagesId, setMessages]);
  
  //hien lich su message khi gui message
  useEffect(() => {
    if (messagesId && socket) {
      const handleMessUpdate = () => {
        console.log("New message received, fetching message history");
        fetchMessage(); // Fetch messages when a new message arrives
      };

      socket.on("newMessage", handleMessUpdate);

      // Clean up the listener when the component unmounts or when dependencies change
      return () => {
        socket.off("newMessage", handleMessUpdate);
      };
    }
  }, [socket, messagesId, fetchMessage]);

  useEffect(() => {
    if (messagesId) {
      fetchMessage(); // Fetch messages when component loads
    }
  }, [messagesId, fetchMessage]);

  // chuyen doi gia tri thoi gian de hien thi
  const convertTimestamp = (timestamp: string | Date) => {
    // Nếu timestamp là chuỗi thì chuyển nó thành đối tượng Date
    const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
    
    // Kiểm tra tính hợp lệ của timestamp
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error("Invalid timestamp, expected a valid Date."); 
      return "Invalid date";
    }
  
    // Chuyển thời gian từ UTC sang múi giờ của hệ thống hiện tại
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    
    // Lấy giờ và phút sau khi chuyển đổi
    const hour = localDate.getHours();
    const minute = localDate.getMinutes();
  
    // Xử lý hiển thị giờ ở định dạng 12 giờ (AM/PM)
    if (hour > 12) {
      return minute < 10 ? `${hour - 12}:0${minute} PM` : `${hour - 12}:${minute} PM`;
    } else {
      return minute < 10 ? `${hour}:0${minute} AM` : `${hour}:${minute} AM`;
    }
  };
  
  // function chat 
  const sendMessage = async () => {
    try {
      if (input && messagesId) {
        if (socket) {
          const id = userData.id;
          const time = new Date().toISOString().slice(0, 23);  // Thời gian hiện tại đã chuẩn hóa theo múi giờ hệ thống
          socket.emit("sendMessage", { messagesId, id, input, time }, (response: status) => {
            if (response.success) { 
              console.log("success to update mess"); 
            } else {
              console.error('Failed to send message to API');
            }
          });
        } else {
          console.error('Socket connection not available');
        }
      }
  
      // cập nhật chat như logic
      if (input && messagesId) {
        if (socket) {
          const userIDs = [chatUser?.reUserId, userData.id];
          userIDs.forEach(async (id) => {
            await socket.emit('getChats', id, (response: chatStatus) => {
              if (response.success) {
                const data = response.chats;
                if (data) {
                  const chatIndex = data.findIndex((c) => c.messageId === messagesId);
                  const lastMess = data[chatIndex].lastMessage = input.slice(0, 30);
                  const update = data[chatIndex].updatedAt = new Date(); // Đảm bảo thời gian cập nhật đúng
                  console.log(update);
                  
                  let messSeen = data[chatIndex].messageSeen;
                  if (data[chatIndex].reUserId === userData.id) {
                    messSeen = data[chatIndex].messageSeen = false;
                  }
                  const userId = id;
                  const messId = messagesId;
                  const rId = data[chatIndex].reUserId;
  
                  socket.emit("updateChatData", { userId, lastMess, rId, update, messSeen, messId }, (response: { success: boolean, message?: string }) => {
                    if (response.success) {
                      console.log("Success update chat");
                    } else {
                      console.error(response.message || 'Failed to update message seen status');
                    }
                  });
                } else {
                  console.error("Data is not valid");
                }
              } else {
                console.error('Failed to fetch chats');
              }
            });
          });
        } else {
          console.error('Socket connection not available');
        }
      }
    } catch (error) {
      console.error("Can't sendMessage", error);
    }
    setInput("");
  };

  // bam enter de gui
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  
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
  
  return chatUser ?(
    <div className="chat-box">
      <div className="chat-user">
        <img src={chatUser.chatUserData.userImage} alt="" />
        <p>{chatUser?.chatUserData.lastName +" " + chatUser?.chatUserData.firstName}</p>{" "}
        {/* <img className="dot" src={assets.green_dot} alt="" />
        <img src={assets.help_icon} alt="" /> */}
      </div>

      <div className="chat-msg">
        {messages.map((msg, index) => (
          <div key={index} className={msg.seUserId=== userData.id ? "s-msg" : "r-msg"}>
            {msg.data.startsWith("Image:")
            ? ( <img src={msg.data.substring(6)} alt="" className="msg-img" />)
            : (<p className="msg">{msg.data}</p>)
            }
            <div>
               <img src={msg.seUserId === userData.id ? assets.hongle : chatUser.chatUserData.userImage} alt="" />
              <p>{convertTimestamp(msg.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input 
          onChange={(e) => setInput(e.target.value)} 
          onKeyPress={handleKeyPress}
          value={input} 
          type="text" 
          placeholder="Send a message"
        />
        <input onChange={sendImage} type="file" id="image" accept="image/png, img/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img onClick={sendMessage} src={assets.send_button} alt="" />
      </div>
    </div>
  ): (
    <div className="chat-welcome">
      <img src={assets.logo} alt="" />
      <p>Ready to connect</p>
    </div>
  );
};

export default ChatBox;