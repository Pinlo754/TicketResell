import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import ScrollToTop from "../../components/ScrollToTop";
import RenderStars from "../../components/RenderStars";
import RenderTotalReviews from "../../components/RenderTotalReviews";
import RenderTotalTickets from "../../components/RenderTotalTickets";
import useUserProfile from "./useUserProfile";

const UserProfile = () => {

  const {
    user,
    tickets,
    comments,
    totalTickets,
    totalReviews,
    averageRating,
  } = useUserProfile();

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* SCROLL TO TOP */}
      <ScrollToTop/>

      {/* NAVBAR */} 
      <NavBar/>

      {/* SCROLL TO TOP BUTTON */}
      <ScrollToTopButton/>

      {/* MAIN CONTENT */}
      <div className="w-[60%] min-h-screen flex flex-grow justify-between gap-8 mx-auto mt-32">
        <div className="flex w-1/3 h-full bg-[#F4F4F4] rounded-lg drop-shadow-xl">
          <div className="w-full h-fit flex flex-col items-center justify-center mb-3 pt-10 pb-6">
            <div className="relative rounded-full">
              <img
                src={user?.userImage}
                alt="User Img"
                className="object-cover w-40 h-40"
              />
            </div>
            <p className="text-3xl font-bold mt-4">{user?.firstName} {user?.lastName}</p>

            {/* Email */}
            <div className="flex gap-1 items-center mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"/>
              </svg>
              <p>{user?.email}</p>
            </div>

            {/* SVG */}
            <div className="w-[90%] flex items-center justify-around mt-4">
              {/* Rate trung bình */}
              <div className="flex gap-1 items-center">
                <RenderStars rating={parseFloat(averageRating)} />
                {comments.length ===0 ? <p>0.0</p> : <span>{averageRating}</span>}  
              </div>
              <div className="flex gap-1 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 fill-black" viewBox="0 0 24 24" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.17l-2.755 4.133a.75.75 0 0 1-1.248 0l-2.755-4.133a.39.39 0 0 0-.297-.17 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97ZM6.75 8.25a.75.75 0 0 1 .75-.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H7.5Z" clip-rule="evenodd"/>
                </svg>
                <p>{totalReviews}</p>
              </div>
            </div>
            {/* Chat */}
            <button
                  className="flex items-center gap-1 mt-6 bg-[#87CBB9] text-white text-lg rounded-lg px-4 py-2 hover:bg-[#B9EDDD] hover:text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                    />
                  </svg>
                  Nhắn tin
                </button>
          </div>
        </div>

        {/* LISTINGS & REVIEWS */}
        <div className="w-2/3 flex flex-col">
          {/* Listings */}
          <div className="w-full bg-[#F4F4F4] rounded-lg drop-shadow-xl">
            <p className="bg-[#87CBB9] rounded-t-lg px-8 py-3 text-lg font-medium text-white">
              Danh sách vé ({totalTickets})
            </p>
            {RenderTotalTickets(tickets)}
          </div>

          {/* Reviews */}
          <div className="w-full bg-[#F4F4F4] rounded-lg drop-shadow-xl mt-8">
            <p className="bg-[#87CBB9] rounded-t-lg px-8 py-3 text-lg font-medium text-white">
              Đánh giá ({totalReviews})
            </p>
            {RenderTotalReviews(comments)}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex-grow-0">
        <Footer />
      </div>
    </div>
  );
};

export default UserProfile;