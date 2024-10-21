import { createContext, useEffect, useState, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import io, { Socket }from "socket.io-client"; 
// Định nghĩa các interface cho dữ liệu
interface chatUserData {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
}

interface Chat {
  reUserId: string;
  lastMessage: string;
  messageId: string;
  messageSeen: boolean;
  updatedAt: Date;
  chatUserData: chatUserData;
}

interface status {
  success: boolean;
  chats: Chat[];
}

interface AppChatContextProps {
  userData: any; // thog tin nguoi dung
  setUserData: React.Dispatch<React.SetStateAction<any>>;

  allChat: Chat[] | null; // thong tin tat ca doan chat va nguoi nhan === chatData
  setAllChat: React.Dispatch<React.SetStateAction<Chat[] | null>>;
  
  messages: any[];
  setMessages: React.Dispatch<React.SetStateAction<any[]>>;

  messagesId: string | null;
  setMessagesId: React.Dispatch<React.SetStateAction<string | null>>;
  
  chatUser: Chat | null; // thong tin chat va nguoi nhan === chatUser
  setChatUser: React.Dispatch<React.SetStateAction<Chat | null>>;

  chatVisible: boolean;
  setChatVisible: React.Dispatch<React.SetStateAction<boolean>>;

  socket: Socket | null;
}

export const AppChatContext = createContext<AppChatContextProps | undefined>(undefined);

interface AppChatContextProviderProps {
  children: ReactNode;
}

const AppChatContextProvider = ({ children }: AppChatContextProviderProps) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>({ id: '2f4ed17e-6bf6-4828-92c2-c3d35374b06e' });// Giả lập dữ liệu người dùng đăng nhập
  const [allChat, setAllChat] = useState<Chat[] | null>(null);
  const [messagesId, setMessagesId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatUser, setChatUser] = useState<Chat | null>(null);
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (userData) {
      // Kết nối socket và gửi yêu cầu getChats
      const newSocket  = io('http://localhost:3020');  
      newSocket .on('connect', () => {
        console.log('Connected to socket server:', newSocket.id);
        fetchChats(newSocket ); // Gọi fetchChats ngay sau khi kết nối thành công
      });
      setSocket(newSocket);
      const fetchChats = (newSocket :Socket) => {
        if (userData) {
          // Gửi yêu cầu getChats tới server qua socket
          newSocket .emit('getChats', userData.id, (response: status) => {   
            if (response.success) {
              const data = response.chats    
              if(data){
                const sortedData = data.map(chat => ({
                  ...chat,
                  updatedAt: new Date(chat.updatedAt)
                })).sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
                setAllChat(sortedData);
              }            
            } else {
              console.error('Failed to fetch chats');
            }
          });
        }
      };
      // Clean up socket khi component unmount
      return () => {
        newSocket .disconnect();
      };
    }
  }, [userData]);

  const value: AppChatContextProps = {
    userData,
    setUserData,
    allChat,
    setAllChat,
    messages,
    setMessages,
    messagesId,
    setMessagesId,
    chatUser,
    setChatUser,
    chatVisible,
    setChatVisible,
    socket
  };

  return (
    <AppChatContext.Provider value={value}>
      {children}
    </AppChatContext.Provider>
  );
};

export default AppChatContextProvider;
