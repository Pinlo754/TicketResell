import React, { useContext, useEffect, useState } from "react";
import "./RightSidebar.css";
import assets from "../../../assets/assetsChat";
import { useNavigate } from "react-router-dom";
import { AppChatContext } from "../../../context/AppChatContext";

const RightSidebar = () => {
  const context = useContext(AppChatContext)
  if (!context) {
    throw new Error(
      "AppChatContext must be used within an AppChatContextProvider"
    );
  }
  const navigate = useNavigate()
  const { chatUser, messages } = context;
  const [msgImages, setMsgImages] = useState<string[]>([]);

  useEffect(() => {
    let tempVar: string[] = [];
    messages.map((msg) => {
      if (msg.data.startsWith("Image:")) {
        tempVar.push(msg.data.substring(6));
      }
    });
    setMsgImages(tempVar);
  }, [messages]);

  return chatUser? (
    <div className="rs">
      <div className="rs-profile">
        <img src={assets.hongle} className="khongchinhdc" alt="" />
        <h3>{chatUser?.chatUserData.lastName +" " + chatUser?.chatUserData.firstName}</h3>
        <p>{chatUser.chatUserData.bio}</p>
      </div>
      <hr />
      <div className="rs-media">
        <p>Media</p>
        <div>
          {msgImages.map((url, index)=>(
            <img onClick={() => window.open(url)} key={index} src={url} alt=''/>
          ))}
        </div>
      </div>
      <button onClick={() => navigate("/main")}>Return</button>
    </div>
  ):(
    <div className="rs">
      <button onClick={() => navigate("/main")}>Return</button>
    </div>
  );
};

export default RightSidebar;
