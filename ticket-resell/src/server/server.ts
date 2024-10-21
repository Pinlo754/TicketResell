// src/server.ts
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import axios from 'axios';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Địa chỉ frontend React của bạn
    methods: ["GET", "POST"]
  }
});

interface chats {
  chatData: []
}

interface chatsData {
  lastMessage:string,
  messageId:string,
  messageSeen: boolean,
  reUserId: string
}

io.on('connection', (socket) => {
  console.log('Client mới kết nối:', socket.id);

  socket.on('getChats', async (seUserId, callback) => {
    try {
      // Gọi API để lấy danh sách chat
      const response = await axios.get(`http://localhost:5158/api/Chat/get-chat/${seUserId}`);         
      // const userData = await axios.get(`/api/Chat/${seUserId}`);         
      //Nếu thành công, gửi dữ liệu chat về cho client
      if (response.status === 200) {
        const chatResponse = response.data;
        console.log(chatResponse);
        
        const chatsPromises = chatResponse.flatMap((item: chats) =>
          // 
          item.chatData.map(async (data: chatsData) => {
            try {
              const chatUser = await axios.post(`http://localhost:5158/api/Account/ID?userID=${data.reUserId}`);
              const chatUserData = chatUser.data;
              return { ...data, chatUserData };
            } catch (error) {
              console.error('Error occurred while fetching chats:', error);
              return null;
            }
          })
        );
      
        try {
          const chats = (await Promise.all(chatsPromises)).filter(chat => chat !== null);
          console.log(chats);
          callback({ success: true, chats }); // return 1 array cau truc Chat trong appContext
        } catch (error) {
          console.error('Error occurred while processing chats:', error);
          callback({ success: false, message: 'Error occurred while processing chats' });
        }
      }
       else {
        callback({ success: false, message: 'Failed to fetch chats' });
      }
    } catch (error) {
      console.error('Error occurred while fetching chats:', error); // Ghi log lỗi
      callback({ success: false, message: 'Error occurred while fetching chats' });
    }
  });

  socket.on('getMessData', async (messId, callback) => {
    try {
      const response = await axios.get(`http://localhost:5158/api/Chat/get-message/${messId}`);
      if(response.status === 200){
        const messageResponse = response.data
        console.log(messageResponse);
        callback({success: true, messageResponse})
      } else{
        callback({success: false, message: "failed to get message data"})
      }
    } catch (error) {
      console.error('Error occurred while fetching chats:', error)
      callback({success: false, message: "can't call api"})
    }
  })

  socket.on('updateChatData', async (data: { userId: string, lastMess: string, messId:string, messSeen : boolean, rId: string, update:Date }, callback) => {
    try {
      // Gọi API để cập nhật trạng thái messageSeen
      const response = await axios.put(`http://localhost:5158/api/Chat/update-chat/${data.userId}`, {
        seUserId: data.userId,
        chatData:[{
                  lastMessage: data.lastMess,
                  messageId: data.messId,
                  messageSeen: data.messSeen,
                  reUserId: data.rId,
                  updatedAt: data.update     
        }
      ]
      });
      if (response.status === 200) {
        callback({ success: true });
      } else {
        callback({ success: false, message: 'Failed to update message seen status' });
      }
    } catch (error) {
      console.error('Error updating message seen status:', error);
      callback({ success: false, message: 'Error updating message seen status' });
    }
  });

  socket.on('sendMessage', async (data :{ messagesId: string, id: string, input: string, time: Date}, callback) => {
    try {
      // Gọi API để cập nhật trạng thái messageSeen
      const response = await axios.put(`http://localhost:5158/api/Chat/${data.messagesId}`, {
        messageId: data.messagesId,
        messages:[{
                  createdAt:data.time.toISOString,
                  seUserId: data.id,
                  data: data.input,    
        }
      ]
      });
      if (response.status === 200) {
        const data = response.data
        const messages = data.messages
        io.emit('newMessage', messages);
        callback({ success: true });
      } else {
        callback({ success: false, message: 'Failed to update message seen status' });
      }
    } catch (error) {
      console.error('Error updating message seen status:', error);
      callback({ success: false, message: 'Error updating message seen status' });
    }
  });


  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3020, () => {
  console.log('Máy chủ WebSocket đang chạy trên ws://localhost:3020');
});