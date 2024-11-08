import { useState } from "react";
import RenderStars from "../RenderStars";

type Comment = {
    id: number;
    name: string;
    avatar: string; // URL ảnh đại diện
    rating: number;
    date: string;
    time: string;
    comment: string;
  };

const RenderTotalReviews = (comments: Comment[]) => {

    const [visibleComments, setVisibleComments] = useState(5); // Số bình luận hiển thị ban đầu
    const [isExpanded, setIsExpanded] = useState(false); // Trạng thái hiển thị bình luận mở rộng hay không
  
    const handleShowMore = () => {
      setVisibleComments((prev) => {
        const newVisibleComments = prev + 10; // Hiển thị thêm 10 bình luận mỗi lần nhấn nút
        if (newVisibleComments >= comments.length) {
          setIsExpanded(true); // Đánh dấu là đã mở rộng khi đã hiển thị hết bình luận
        }
        return newVisibleComments;
      });
    };
  
    const handleShowLess = () => {
      setVisibleComments(5); // Rút gọn về 5 bình luận
      setIsExpanded(false); // Đánh dấu là không mở rộng
    };
  
    return (
      <div>
        {/* Nếu không có bình luận */}
        {comments.length === 0 ? (
          <div className="w-full py-5 mx-auto">
            <p className="text-xl text-center">User has no reviews!!!</p>
          </div>
        ) : (
          <div>
            {/* Hiển thị các bình luận, giới hạn số lượng theo visibleComments */}
            {comments.slice(0, visibleComments).map((comment) => (
              <div key={comment.id} className="p-8 border-b-2">
                <div className="flex items-center mb-2">
                  <img
                    src={comment.avatar}
                    alt={comment.name}
                    className="w-16 h-16 rounded-full mr-4 cursor-pointer"
                  />
                  <div className="flex justify-between w-full">
                    <div>
                      <p className="font-semibold cursor-pointer">{comment.name}</p>
                      <div className="flex items-center">
                        <RenderStars rating={comment.rating} />
                        <span className="ml-1 text-gray-600">({comment.rating})</span>
                      </div>
                    </div>
                    <p className="text-gray-500">
                      {comment.date}, {comment.time}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700">{comment.comment}</p>
              </div>
            ))}
  
            {/* Hiển thị nút "Show More" nếu chưa hiển thị hết các bình luận */}
            {!isExpanded && visibleComments < comments.length && (
              <div className="my-3 flex justify-center">
                <button
                  onClick={handleShowMore}
                  className="flex items-center text-[#87CBB9] text-sm group cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 group-hover:translate-y-2 transition-transform duration-300" viewBox="0 0 24 24" fill="currentColor">
                    <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd"/>
                  </svg>
                  Show More ({comments.length-visibleComments})
                </button>
              </div>
            )}
  
            {/* Hiển thị nút "Show Less" nếu đã hiển thị hết các bình luận */}
            {isExpanded && (
              <div className="my-3 flex justify-center">
                <button
                  onClick={handleShowLess}
                  className="flex items-center text-[#87CBB9] text-sm group cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 group-hover:-translate-y-2 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18" />
                  </svg>
                  Show Less
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  export default RenderTotalReviews;