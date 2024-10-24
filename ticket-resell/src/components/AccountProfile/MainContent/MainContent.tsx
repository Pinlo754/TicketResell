import React, { ChangeEvent, FormEvent, useState } from "react";
import assets from "../../../assets/assetsChat";
import "./MainContent.css";
import { toast } from "react-toastify";
import upload from "../../../lib/upload";
import axios from "axios";


const MainContent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [prevImage, setPrevImage] = useState("");
  const [image, setImage] = useState<File | "">();

  const updateProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      let imageUrl = ""; // Mặc định là chuỗi rỗng

      // Nếu có ảnh mới, upload ảnh
      if (image) {
        imageUrl = await upload(image);
        setPrevImage(imageUrl);
      }
      // Nếu có prevImage và không có ảnh mới
      else if (prevImage) {
        imageUrl = prevImage;
      }
      // Gửi request cập nhật thông tin
      const response = await axios.put(
        "http://localhost:5158/api/Account/update-profile",
        {
          firstName: firstName,
          lastName: lastName,
          address: address,
          gender: gender,
          userImage: imageUrl, // URL ảnh sau khi upload
          bio: bio,
        }
      );

      console.log(response);
      if (response.status === 200) {
        
        toast.success("Cập nhật thông tin thành công!");
      } else {
        throw new Error("Lỗi cập nhật thông tin");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Có lỗi xảy ra khi cập nhật thông tin!");
    }
  };

  return (
    <div className="content">
      <form onSubmit={updateProfile}>
        <h3>Hồ Sơ Cá Nhân</h3>

        <div className="profile-photo">
          <label htmlFor="avatar">
            <input
              type="file"
              id="avatar"
              accept=".png, .jpg, .jpeg"
              hidden
              onChange={(e) => setImage(e.target.files?.[0])}
            />
            <img
              src={image ? URL.createObjectURL(image) : assets.avatar}
              alt=""
            />
            <span>Cập nhật hình ảnh</span>
          </label>
        </div>

        <div className="name-group">
          <input
            type="text"
            placeholder="Họ"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Tên"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Giới tính:</label>
          <select
            className="gioi-tinh"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          >
            <option value="">Chọn giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="khác">Khác</option>
          </select>
        </div>

        <div className="form-group">
          <label>Địa chỉ:</label>
          <input
            type="text"
            placeholder="Địa chỉ của bạn"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Giới thiệu:</label>
          <textarea
            placeholder="Lời Giới Thiệu"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <button type="submit">Lưu</button>
      </form>
    </div>
  );
};

export default MainContent;
