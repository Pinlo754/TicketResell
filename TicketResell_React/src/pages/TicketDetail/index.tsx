import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import ScrollToTop from "../../components/ScrollToTop";
import useTicketDetail from "./useTicketDetail";

const TicketDetail = () => {
  const {
    navigate,
    formatCurrency,
    averageRating,
    comments,
    ticket,
    quantity,
    decreaseQuantity,
    increaseQuantity,
    user,
    handleCheckReUserId,
    AddToCart
  } = useTicketDetail();

  const subtotal = ticket.price * quantity;
      const selectedItems = [{ ticketId: ticket.ticketId, sellerName: user.firstName + user.lastName, quantity, sellerImg: user.userImage + "" }];
      const handleCheckout = () => {navigate("/checkout", { state: { subtotal, quantity, selectedItems } });};

  return (
    <div className="w-screen min-h-screen flex flex-col">
      {/* SCROLL TO TOP */}
      <ScrollToTop />

      {/* NAVBAR */}
      <NavBar />

      {/* SCROLL TO TOP BUTTON */}
      <ScrollToTopButton />

      {/* MAIN CONTENT */}
      <div className="flex-grow">
        {/* BACKGROUND */}
        <div className="w-full relative">
          {/* Background */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-2xl bg-opacity-80"
            style={{
              backgroundImage:
                "url(https://www.oyorooms.com/blog/wp-content/uploads/2018/02/event.jpg)",
            }}
          ></div>
          {/* Overlay màu tối */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
          {/* Content */}
          <div className="relative z-10 pt-32 mx-auto text-center text-white flex justify-around items-center">
            {/* Info */}
            <div className="flex flex-col">
              <h1 className="mt-4 text-4xl font-bold  sm:text-5xl">
                Gewoon Boef
              </h1>
              <div className="mt-6 text-lg flex justify-center gap-x-8">
                {/* Date */}
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mx-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p>Sat, Oct 12, 8:00 PM</p>
                </div>
                {/* Venue */}
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mx-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p>Ziggo Dome</p>
                </div>
                {/* City */}
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 mx-2"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <p>Amsterdam, Netherlands</p>
                </div>
              </div>
            </div>
            {/* Img */}
            <div className="relative">
              <div className="overflow-hidden rounded-lg">
                <img
                  src="https://www.oyorooms.com/blog/wp-content/uploads/2018/02/event.jpg"
                  alt="Event"
                  className="object-cover w-46 h-56 hover:scale-110 transition-transform duration-300"
                />
              </div>
            </div>
          </div>

          {/* Quantity */}
          <div className="relative z-10 pb-10 flex justify-between mt-12">
            <button
              className="bg-transparent text-white font-semibold ml-10 group flex items-center"
              onClick={() => navigate("/sell")}
            >
              Sell your tickets on Festix
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
            <p className="text-white font-semibold mr-10">
              128 available • 200 sold • 150 wanted
            </p>
          </div>
        </div>

        <div className="w-[60%] mx-auto pt-10">
          {/* Navigate */}
          <div
            className="flex gap-1 items-center group cursor-pointer"
            onClick={() => navigate(`/eventDetail/${ticket.eventId}`)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-[#87CBB9] transition-transform duration-300 group-hover:-translate-x-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
            <p className="text-[#87CBB9] text-xl font-semibold">All tickets</p>
          </div>

          <div className="w-full flex mx-auto gap-8">
            {/* Info seller */}
            <div className="w-1/3 h-[90%] bg-[#F4F4F4] rounded-lg drop-shadow-xl mt-10">
              <div className="w-full flex flex-col items-center justify-center mb-3 pt-10 pb-6">
                <div
                  className="relative overflow-hidden rounded-full cursor-pointer"
                  onClick={() => navigate("/userProfile")}
                >
                  <img
                    alt="https://static.vecteezy.com/system/resources/previews/008/442/086/non_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
                    src = {user.userImage}
                    className="object-cover w-40 h-40 hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <p className="text-3xl font-bold mt-4">
                  {user.firstName + " " + user.lastName}
                </p>

                {/* SVG */}
                <div className="w-[70%] flex items-center justify-around mt-4">
                  {/* Rate */}
                  <div className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 fill-[#FACC15]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    {comments.length === 0 ? (
                      <p>0.0</p>
                    ) : (
                      <p>{averageRating}</p>
                    )}
                  </div>
                  {/* Số lượng vé đã bán */}
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 fill-[#8ACDD7]"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <p>4</p>
                  </div>
                </div>

                {/* Chat */}
                <button
                  className="flex items-center gap-1 mt-6 bg-[#87CBB9] text-white text-lg rounded-lg px-4 py-2 hover:bg-[#B9EDDD] hover:text-black"
                  onClick={handleCheckReUserId}
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
                  Chat
                </button>
              </div>
            </div>

            {/* Info ticket */}
            <div className="flex flex-col w-2/3">
              {/* Type */}
              <div className="w-full bg-[#F4F4F4] rounded-lg drop-shadow-xl mt-10 py-8 px-4">
                <div className="flex justify-between px-6">
                  <div className="flex flex-col">
                    <div className="flex gap-1.5">
                      <p className="font-bold text-3xl">
                        Section {ticket.section}
                      </p>
                      {ticket.type === "Seat" && (
                        <p className="font-bold text-gray-500 text-3xl mr-10">
                          • Row {ticket.row}
                        </p>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{ticket.type}</p>
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold text-3xl text-center">
                      {ticket.quantity}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="bg-[#F4F4F4] rounded-t-lg drop-shadow-xl mt-6 py-8 px-10">
                <p className="text-3xl font-bold">Pricing</p>
                <p className="text-sm text-gray-400 mt-2">
                  Original Price:{" "}
                  <span className="text-gray-400 font-bold">
                    {formatCurrency(ticket.originPrice)}/Ticket
                  </span>
                </p>
                <div className="flex items-center justify-between px-3 pt-6 mt-6 border-t-2">
                  <p className="text-xl">
                    {formatCurrency(ticket.price)} VND{" "}
                    <span className="text-gray-500 text-lg">per ticket</span>
                  </p>
                  <div className="flex justify-center items-center">
                    {/* Nút giảm số lượng */}
                    <button
                      onClick={decreaseQuantity}
                      className={`px-4 py-2 rounded-sm border-2 ${
                        quantity === 1
                          ? "cursor-not-allowed bg-gray-100 border-gray-200"
                          : "bg-gray-200 border-gray-300 hover:bg-gray-300"
                      }`}
                      disabled={quantity === 1}
                    >
                      -
                    </button>

                    {/* Hiển thị số lượng hiện tại */}
                    <p className="text-center mx-1 py-2 w-16 rounded-sm border-2 border-gray-300 cursor-not-allowed">
                      {quantity}
                    </p>

                    {/* Nút tăng số lượng */}
                    <button
                      onClick={increaseQuantity}
                      className={`px-4 py-2 rounded-sm border-2 ${
                        quantity === ticket.quantity
                          ? "cursor-not-allowed bg-gray-100 border-gray-200"
                          : "bg-gray-200 border-gray-300 hover:bg-gray-300"
                      }`}
                      disabled={quantity === ticket.quantity}
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal */}
                <div className="flex items-center justify-between mt-6 pt-6 border-t-2">
                  <p className="text-gray-400 text-lg">Subtotal</p>
                  <p className="text-2xl text-[#87CBB9] font-bold">
                    {formatCurrency(ticket.price * quantity)} VND
                  </p>
                </div>
              </div>

              {/* Button */}
              <div className="w-full flex items-center justify-center gap-10 bg-black rounded-b-lg drop-shadow-xl">
                <button className="py-2 px-2 my-4 bg-[#87CBB9] text-white text-lg rounded-xl hover:bg-[#B9EDDD] hover:text-black"
                onClick={AddToCart}
                >
                  Add to cart
                </button>
                <button className="py-2 px-10 my-4 bg-[#87CBB9] text-white text-lg rounded-xl hover:bg-[#B9EDDD] hover:text-black"
                onClick={handleCheckout}>                 
                  Buy
                </button>
              </div>
            </div>
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

export default TicketDetail;
