import { getStorage, ref, uploadBytesResumable, getDownloadURL, StorageError, UploadTask, UploadTaskSnapshot } from "firebase/storage";
import { app } from "../config/firebase"; // Đảm bảo đã import 'app' từ firebase.ts hoặc file khởi tạo Firebase

const upload = async (file: File): Promise<string> => {
  const storage = getStorage(app); // Truyền app đã khởi tạo vào getStorage()
  const storageRef = ref(storage, `images/${Date.now() + file.name}`);

  const uploadTask: UploadTask = uploadBytesResumable(storageRef, file);
  
  return new Promise<string>((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const progress: number = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error: StorageError) => {
        console.error("Upload failed with error: ", error.message);
        reject(error); // Reject nếu có lỗi trong quá trình upload
      },
      () => {
        // Upload thành công, lấy URL của file
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL: string) => {
            console.log("File available at: ", downloadURL);
            resolve(downloadURL); // Resolve với URL tải về
          })
          .catch((error: StorageError) => {
            console.error("Failed to get download URL: ", error.message);
            reject(error); // Reject nếu không lấy được URL
          });
      }
    );
  });
};

export default upload;
