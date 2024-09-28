import React from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets";

const LeftSidebar = () => {
  return (
    <div>
      <div className="ls">
        <div className="ls-top">
          <div className="ls-nav">
            <img src={assets.chat_icon} alt="" className="logo" />
            <p>Chat Page</p>
            <div className="menu">
              {/* <img src={assets.return_icon} alt="" /> */}
            </div>
          </div>
          <div className="ls-search">
            <img src={assets.search_icon} alt="" />
            <input type="text" placeholder="Search here.." />
          </div>
        </div>
        <div className="ls-list">
          {Array(12).fill("").map((item,index) => (
              <div key={index} className="friends">
                <img src={assets.hongle} alt="" />
                <div>
                  <p>Nguyễn Thị Hồng Lê</p>
                  <span>Hello moi nguoi</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
