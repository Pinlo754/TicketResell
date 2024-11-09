import "./SideBar.css"
import { Link, useLocation } from 'react-router-dom';

const SideBar = () => {

  const location = useLocation();
  const currentPath = location.pathname;

  type Link = {
    label: string;
    path: string;
  };

  const links: Link[] = [
    { label: "Hồ sơ", path: "/user/profile" },
    { label: "Ví", path: "/user/wallet"},
    { label: "Đơn mua", path: "/user/purchase" },
    { label: "Đơn bán", path: "/user/sale" },
    { label: "Thông báo", path: "/user/notification" },
  ];

  return (
    <div className="sidebar h-full">
      <ul className="sidebar-menu">
        {links.map((link) => (
          <li
          key={link.path}
          >
          <Link 
          to={link.path}
          className={`sidebar-link ${currentPath === link.path ? "active" : ""}`}
          >
            {link.label}
            </Link>
        </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBar;