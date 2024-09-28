import React from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'

const ChatBox = () => {
  return (
    <div className='chat-box'>
      <div className="chat-user">
        <img src={assets.hongle} alt=""/>
        <p>Nguyễn Thị Hồng Lê</p> <img className='dot' src={assets.green_dot} alt="" />
        <img src={assets.help_icon} alt="" />
      </div>

      <div className="chat-msg">
        <div className="s-msg">
           <p className="msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta incidunt cupiditate, cum obcaecati quasi repellendus rerum eveniet ad fugit, itaque repellat corrupti saepe quo voluptatum quidem blanditiis at dolores ex?</p>
           <div>
            <img src={assets.hongle} alt="" />
            <p>2:30PM</p>
           </div>
        </div>
        <div className="s-msg">
            <img src={assets.pic1} alt="" className="msg-img" />
          <div>
            <img src={assets.hongle} alt="" />
            <p>2:30PM</p>
           </div>
        </div>
        <div className="r-msg">
           <p className="msg">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta incidunt cupiditate, cum obcaecati quasi repellendus rerum eveniet ad fugit, itaque repellat corrupti saepe quo voluptatum quidem blanditiis at dolores ex?</p>
           <div>
            <img src={assets.hongle} alt="" />
            <p>2:30PM</p>
           </div>
        </div>
      </div>

      <div className="chat-input">
        <input type="text" placeholder='Send a message' />
        <input type="file" id='image' accept='image/png, img/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img src={assets.send_button} alt="" />
      </div>
    </div>
  )
}

export default ChatBox

