import React, { useEffect, useState } from "react";
import "./UserBoard.css";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface user {
  roles: [string];
  firstName: string;
  userImage: string;
  lastName: string;
  address: string;
  email: string;
  userId: string;
}

const UserBoard = () => {
  const token = localStorage.getItem("token");
  const [currentData, setCurrentData] = useState<user[]>([]);
  const [roles, setRoles] = useState<{ [key: string]: string }>({});
  const [refreshKey, setRefreshKey] = useState(0);//dùng để reset page

  //load user ko có admin 
  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5158/api/Admin/list-user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          const data = response.data;
          const nonAdminUsers = data.filter((user: user) => !user.roles.includes("Admin"));
          setCurrentData(nonAdminUsers);
          const initialRoles = response.data.reduce((acc: any, user: user) => {
            acc[user.userId] = user.roles[0];
            return acc;
          }, {});
          setRoles(initialRoles);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getProfile();
    console.log();
    
  }, [token, refreshKey]);

  
  //cập nhật role cho id trên database
  const handleUpdateRole = async (id: string) => {
    const role = roles[id];
    try {
      const response = await axios.put(
        `http://localhost:5158/api/Admin/update-role`,
        {userId:id, newRole:role},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Cập nhật thành công")
        setRefreshKey((prevKey) => prevKey + 1);
      }
    } catch (error) {
      console.error(error);
      toast.error("có lỗi")
    }
  };

  // chỉnh role trong local (chưa lưu database)
  const handleRoleChange = (userId: string, newRole: string) => {
    setRoles((prevRoles) => ({
      ...prevRoles,
      [userId]: newRole,
    }));
  };

  //xóa user theo id
  const handleDelete = async (id:string) => {
    // Xử lý logic xóa
    console.log("Xóa tài khoản:", id);
    try {
      const response = await axios.delete(`http://localhost:5158/api/Admin/delete-user/${id}`,         
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (response.status === 200) {
        toast.success("Đã xóa tài khoản thành công")
        setRefreshKey((prevKey) => prevKey + 1);
      }
    } catch (error) {
      console.error(error);
      toast.error("có lỗi")
    }
  };

  return (
    <div className="Admin">
      <ToastContainer/>
      <SideBar />
      <div className="table-container">
        <h4>Customers</h4>

        <table className="customers-table">
          <thead>
            <tr>
              <th>Hình Ảnh</th>
              <th>Họ</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Địa chỉ</th>
              <th>Quản lý vai trò</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item) => (
              <tr key={item.userId}>
                <td> <img src={item.userImage}  alt="Customer Photo"  className="avatar"/> </td>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.email}</td>
                <td>
                  <select className="role" value={roles[item.userId] || item.roles[0]}  onChange={(e) => handleRoleChange(item.userId, e.target.value)}>
                    <option className="user-status" value="User"> User </option>
                    <option className="staff-status" value="Staff"> Staff </option>
                  </select>
                </td>
                <td>{item.address}</td>
                <td className="button">
                  <button className="update" onClick={() => handleUpdateRole(item.userId)}>
                    Cập nhật
                  </button>
                  <button className="delete"   onClick={() => handleDelete(item.userId)} >Xóa tài khoản</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserBoard;
