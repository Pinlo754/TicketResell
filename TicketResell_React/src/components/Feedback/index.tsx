import RenderStars from "../RenderStars";
import useFeedback from "./useFeedback";
import RenderRating from "../RenderRating";

interface FeedbackProps {
  onClose: () => void;
}

const Feedback: React.FC<FeedbackProps> = ({ onClose }) => {

    const {
        navigate,
        rating, 
        setRating,
        comment, 
        setComment,
        totalRating,
        averageRating,
        comments,
        tickets,
        handleSubmit,
    } = useFeedback();
    
    return (
      <div className="w-[40%] max-h-[90vh] overflow-y-auto bg-white rounded-lg p-6">
        <p className="text-xl font-semibold mb-2">Đánh giá người bán</p>
        <div className="border-2 flex flex-col gap-y-4 p-4 rounded-lg">
          <div 
          className="bg-gray-100 flex gap-3 border p-3 rounded-lg group cursor-pointer"
          onClick={() => window.open("/userProfile", "_blank")}
          >
            {/* Avt Seller */}
            <div className="overflow-hidden rounded-full">
              <img
                src="https://static.vecteezy.com/system/resources/thumbnails/019/896/012/small_2x/female-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
                alt="Seller"
                className="w-12 h-12 rounded-full group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div>

              {/* Tên Seller */}
              <p>Mai Nguyen</p>

              {/* Rate trung bình */}
              <div className="flex gap-1 items-center">
                <div className="w-20">
                  <RenderStars rating={parseFloat(averageRating)} />
                </div>
                {comments.length === 0 ? (
                  <p className="text-sm">0.0</p>
                ) : (
                  <span className="text-sm">
                    {averageRating} ({comments.length} đánh giá)
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* DS vé */}
          <div className={`border-2 border-[#87CBB9] rounded-lg p-3 ${tickets.length > 2 ? 'overflow-y-auto max-h-32' : ''}`}>
            {tickets.map((ticket) => (
              <div 
              key={ticket.ticketId} 
              className={`flex gap-3 bg-[#E3F4F4] rounded-lg p-2 group cursor-pointer ${tickets.length > 2 ? 'mb-3 last:mb-0' : ''}`}
              onClick={() => window.open(`/eventDetail/${ticket.eventId}`, "_blank")}
              >
                <div className="overflow-hidden rounded-lg">
                  <img
                    src={ticket.eventImage}
                    alt="Event"
                    className="w-20 h-20 rounded-lg group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-lg">{ticket.eventName}</p>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 pr-1 text-red-600 cursor-pointer"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p className="text-red-600 font-medium">{ticket.eventDate}</p>
                  </div>

                  <div className="flex gap-3">
                    <p className="text-sm text-gray-500">Tên vé: {ticket.ticketName}</p>
                    <p className="text-sm text-gray-500">Loại vé: {ticket.ticketType === "Seat" ? "Ngồi" : "Đứng"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Feedback */}
        <form>
          <div className="p-4 flex justify-center">

            {/* Rating */}
            <div>
              <p className="font-medium mb-1 text-center">Bạn cảm thấy thế nào về người bán?</p>
              <RenderRating onChange={setRating}/>
            </div>
          </div>

          {/* Comment */}
          <div>
            <textarea
              placeholder="Hãy chia sẻ suy nghĩ của bạn về người bán này cho những người mua khác nhé."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border-2 border-gray-300 rounded-md focus:outline-none focus:border-[#87CBB9]"
              rows={4}
            ></textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 hover:text-white mr-2"
            >
              Đóng
            </button>
            <button
              type="button"
              onClick={() => {
                handleSubmit();
                onClose();
              }}
              className="px-4 py-2 bg-[#B9EDDD] rounded-md hover:bg-[#87CBB9] hover:text-white"
            >
              Hoàn thành
            </button>
          </div>
        </form>
      </div>
    );
  }

export default Feedback;