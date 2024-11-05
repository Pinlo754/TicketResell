import React from 'react';
import "./SideBar.css"
const SideBar = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li><a href="#" className="active-menu">Hồ Sơ</a></li>
        <li><a href="#">Đơn Mua</a></li>
        <li><a href="#">Vé bán</a></li>
        <li><a href="#">Thông Báo</a></li>
      </ul>
    </div>
  );
};

export default SideBar;