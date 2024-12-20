import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import io, { Socket } from "socket.io-client";
// Định nghĩa các interface cho dữ liệu
interface status {
  success: boolean;
  chats: Chat[];
}

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

interface user {
  id: string;
}

interface AppChatContextProps {
  userData: user; // thog tin nguoi dung
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

interface AppChatContextProviderProps {
  children: ReactNode;
}

export const AppChatContext = createContext<AppChatContextProps | undefined>(
  undefined
);

const AppChatContextProvider = ({ children }: AppChatContextProviderProps) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>({
    id: localStorage.getItem("userId"),
  }); // Giả lập dữ liệu người dùng đăng nhập
  const [allChat, setAllChat] = useState<Chat[] | null>(null);
  const [messagesId, setMessagesId] = useState<string | null>(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [chatUser, setChatUser] = useState<Chat | null>(null);
  const [chatVisible, setChatVisible] = useState<boolean>(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  const fetchChats = useCallback(async (socket: Socket) => {
    if (!userData) return;
  
    return new Promise((resolve) => {
      socket.emit("getChats", userData.id, (response: status) => {
        if (response.success && response.chats) {
          const sortedData = response.chats
            .map((chat) => ({
              ...chat,
              updatedAt: new Date(chat.updatedAt),
            }))
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime());
          setAllChat(sortedData);
          resolve(sortedData);
        } else {
          console.error("Failed to fetch chats:", response);
          resolve(null);
        }
      });
    });
  }, [userData]);

  useEffect(() => {
    if (socket) {
      const handleChatUpdate = async () => {
        await fetchChats(socket);
      };
  
      socket.on("chatUpdated", handleChatUpdate);
      socket.on("newMessage", handleChatUpdate);
  
      return () => {
        socket.off("chatUpdated", handleChatUpdate);
        socket.off("newMessage", handleChatUpdate);
      };
    }
  }, [socket, fetchChats]);
  // Xử lý socket connections và events
  useEffect(() => {
    if (!userData) return;

    const newSocket = io("http://localhost:3020", {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    // Xử lý các socket events
    const handleConnect = () => {
      console.log("Connected to socket server:", newSocket.id);
      fetchChats(newSocket);
    };

    const handleChatUpdate = () => {
      console.log("Chat updated, refreshing chat list");
      fetchChats(newSocket);
    };

    const handleDisconnect = () => {
      console.log("Disconnected from socket server");
    };

    const handleError = (error: Error) => {
      console.error("Socket error:", error);
    };
    // Đăng ký các event listeners
    newSocket.on("connect", handleConnect);
    newSocket.on("disconnect", handleDisconnect);
    newSocket.on("error", handleError);
    newSocket.on("chatUpdated", handleChatUpdate); // 
    newSocket.on("newMessage", handleChatUpdate); // 
    setSocket(newSocket);

    // Cleanup function
    return () => {
      if (newSocket) {
        // Hủy đăng ký tất cả các event listeners
        newSocket.off("connect", handleConnect);
        newSocket.off("disconnect", handleDisconnect);
        newSocket.off("error", handleError);
        newSocket.off("getChats");
        newSocket.off('chatUpdated', handleChatUpdate);
        newSocket.off('newMessage', handleChatUpdate);
        // Ngắt kết nối socket
        newSocket.disconnect();
      }
    };
  }, [userData, fetchChats]);

  // Xử lý reconnect khi mất kết nối
  useEffect(() => {
    if (!socket) return;

    const handleReconnect = () => {
      console.log("Attempting to reconnect...");
      fetchChats(socket);
    };

    socket.on("reconnect", handleReconnect);

    return () => {
      socket.off("reconnect", handleReconnect);
    };
  }, [socket, fetchChats]);

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
    socket,
  };

  return (
    <AppChatContext.Provider value={value}>{children}</AppChatContext.Provider>
  );
};

export default AppChatContextProvider;
