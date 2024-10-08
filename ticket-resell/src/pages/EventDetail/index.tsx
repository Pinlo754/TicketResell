const EventDetail = () => {
    return (
        <div className="w-screen h-screen">
            {/* BACKGROUND */}
            <div className="w-full h-[85%] relative">
                {/* Background */}
                <div
                className="absolute inset-0 bg-cover bg-center blur-2xl bg-opacity-80"
                style={{ backgroundImage:'url(https://www.oyorooms.com/blog/wp-content/uploads/2018/02/event.jpg)'}}
                > </div>
                {/* Overlay màu tối */}
                <div className="absolute inset-0 bg-black opacity-60"></div>
                
                {/* Content */}
                <div className="relative z-10 pt-8 mx-auto text-center text-white flex flex-col justify-center items-center">
                    {/* Img */}
                    <div className="relative py-10">
                        <div className="overflow-hidden rounded-lg">
                        <img
                            src="https://www.oyorooms.com/blog/wp-content/uploads/2018/02/event.jpg"
                            alt="Event"
                            className="object-cover w-46 h-56 hover:scale-110 transition-transform duration-300"
                        />
                        </div>
                    </div>

                    {/* Info */}
                    <h1 className="mt-4 text-4xl font-bold  sm:text-5xl">
                    Gewoon Boef
                    </h1>
                    <div className="mt-6 text-lg flex justify-center gap-x-8">
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-2" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                            </svg>
                            <p>Sat, Oct 12, 8:00 PM</p>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-2" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd" />
                            </svg>
                            <p>Ziggo Dome</p>
                        </div>
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mx-2" viewBox="0 0 24 24" fill="currentColor">
                                <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd" />
                            </svg>
                            <p>Amsterdam, Netherlands</p>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="mt-8 px-4 py-2 flex items-center rounded-lg bg-[#87CBB9] hover:bg-[#B9EDDD] hover:text-black group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-2 origin-top transition-transform duration-300 group-hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                            </svg>
                                Subcribe
                        </button>
                    </div>
                </div>

                {/* Quantity */}
                <div className="relative z-10 flex justify-between mt-10">
                    <button className="bg-transparent text-white font-semibold ml-10 group flex items-center">
                        Sell your tickets on Festix
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-2 origin-top transition-transform duration-300 group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                    <p className="text-white font-semibold mr-10">128 available • 200 sold • 150 wanted</p>
                </div>
            </div>
        </div>
    )
};

export default EventDetail;