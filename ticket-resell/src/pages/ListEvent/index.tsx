import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ScrollToTopButton from "../../components/ScrollToTopButton";
import ScrollToTop from "../../components/ScrollToTop";
import Pagination from "../../components/Pagination";
import useListEvent from "./useListEvent";

    
  


  // DROPDOWN SORT
  type SortOption = {
    label: string;
    value: string;
  }
  const sortOptions: SortOption[] = [
    { label: "Most popular", value: "popular" },
    { label: "Soonest first", value: "latest" },
    { label: "Lowest price", value: "price_low" },
  ];

    const ListEvent = () => {

   const {
     navigate,
     events,
     setEvents,
     filteredEvents,
     setFilteredEvents,
     isOpen,
     setIsOpen,
     toggleDropdown,
     selectedOption,
     setSelectedOption,
     handleSelect,
     dropdownRef,
     handleClickOutside,
     eventsPerPage,
     currentPage,
     setCurrentPage,
     totalPages,
     currentEvents,
     goToPage,
   } = useListEvent();

    return (
        <div className="w-screen min-h-screen flex flex-col">
        {/* SCROLL TO TOP */}
        <ScrollToTop/>

        {/* NAVBAR */} 
        <NavBar/>

        {/* SCROLL TO TOP BUTTON */}
        <ScrollToTopButton/>

            {/* MAIN CONTENT */}
            <div className="w-[45%] mx-auto mt-28 flex-grow">
                {/* SEARCH */}
                <h1 className="text-5xl">Search</h1>
                <div className="bg-gray-200 backdrop-blur rounded-lg pl-3 mt-8 flex items-center hover:bg-gray-100">
                    <div className="pointer-events-auto">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-current" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 3a7.5 7.5 0 015.775 12.425l5.35 5.35a.75.75 0 11-1.06 1.06l-5.35-5.35A7.5 7.5 0 1110.5 3zm0 1.5a6 6 0 100 12 6 6 0 000-12z" />
                        </svg>
                    </div>
                    <input type="text" placeholder="Search for an event..." className="pl-3 text-current bg-transparent outline-none w-full placeholder-gray-400 focus:text-black"/>
                    <button className="bg-[#87CBB9] text-white hover:bg-[#B9EDDD] hover:text-black rounded-r-lg px-4 py-2">Search</button>
                </div>

                {/* FILTER: CHƯA XONG */}

                <h1 className="text-xl mt-10">28 Results for "..."</h1>

                {/* DROPDOWN SORT */}
                <div ref={dropdownRef} className="relative inline-block text-left flex justify-end">
                    {/* Button to open dropdown */}
                    <button
                    className="bg-[#87CBB9] hover:shadow-lg focus:shadow-lg text-white px-4 py-2 rounded-lg flex items-center group"
                    onClick={() => toggleDropdown("sortDropdown")} // Mở dropdown sort
                    >
                        {sortOptions.find((option) => option.value === selectedOption)?.label}
                        <svg 
                        className={`ml-1 w-5 h-5 transition-transform duration-300 group-hover:translate-y-0.5 ${
                        isOpen["sortDropdown"] ? 'rotate-180 translate-y-0.5' : 'rotate-0'}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {/* Dropdown menu */}
                    {isOpen["sortDropdown"] && (
                        <ul className="absolute z-10 mt-12 w-[23%] bg-white rounded-md shadow-lg">
                        <li className="py-2 px-4 text-sm font-bold text-gray-700">Sort by</li>
                        {sortOptions.map((option) => (
                            <li
                            key={option.value}
                            onClick={() => handleSelect(option.value)}
                            className={`flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer 
                                ${selectedOption === option.value ? "text-[#87CBB9]" : ""}`}
                            >
                            <span>{option.label}</span>
                            {selectedOption === option.value && (
                                <svg className="w-5 h-5 text-[#87CBB9]" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-10.707a1 1 0 00-1.414 0L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4a1 1 0 000-1.414z" clipRule="evenodd"/>
                                </svg>
                            )}
                            </li>
                        ))}
                        </ul>
                    )}
                </div>

                {/* EVENT LIST */}
                <div className="w-full h-full">
                    {filteredEvents.map((ev) => (   
                        <div 
                        key={ev.eventId} 
                        className="bg-[#F4F4F4] w-full h-[18%] mt-4 flex rounded-lg shadow-md cursor-pointer group hover:shadow-2xl"
                        onClick={() => navigate(`/eventDetail/${ev.eventId}`)}
                        >
                            <div className="flex items-center w-1/5 pl-3 my-5">
                                <div className="relative overflow-hidden rounded-lg">
                                    <img 
                                    src={ev.eventImage}
                                    alt={ev.eventName}
                                    className="object-cover w-28 h-28 group-hover:scale-110 transition-transform duration-300"
                                    />
                                    <div className="absolute top-0 right-0 p-1 bg-black bg-opacity-50 text-white rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 origin-top transition-transform duration-300 hover:-rotate-12" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-3/5 pl-3 my-auto">
                                <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 pr-1 text-red-600 cursor-pointer" viewBox="0 0 24 24" fill="currentColor">
                                    <path fill-rule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clip-rule="evenodd" />
                                </svg>
                                <p className="text-red-600 font-medium">{ev.eventTime}</p>
                                </div>
                                <h3 className="font-bold text-xl mt-1 text-ellipsis whitespace-nowrap overflow-hidden">{ev.eventName}</h3>
                                <div className="flex text-sm text-gray-600 mt-2">
                                    {/* Location */}
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                                        <path fill-rule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clip-rule="evenodd"/>
                                        </svg>
                                        <p>{ev.location}</p>
                                    </div>
                                    {/* City */}
                                    <div className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1 ml-6" viewBox="0 0 24 24" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3 2.25a.75.75 0 0 0 0 1.5v16.5h-.75a.75.75 0 0 0 0 1.5H15v-18a.75.75 0 0 0 0-1.5H3ZM6.75 19.5v-2.25a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75ZM6 6.75A.75.75 0 0 1 6.75 6h.75a.75.75 0 0 1 0 1.5h-.75A.75.75 0 0 1 6 6.75ZM6.75 9a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM6 12.75a.75.75 0 0 1 .75-.75h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 6a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75Zm-.75 3.75A.75.75 0 0 1 10.5 9h.75a.75.75 0 0 1 0 1.5h-.75a.75.75 0 0 1-.75-.75ZM10.5 12a.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 0-1.5h-.75ZM16.5 6.75v15h5.25a.75.75 0 0 0 0-1.5H21v-12a.75.75 0 0 0 0-1.5h-4.5Zm1.5 4.5a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Zm.75 2.25a.75.75 0 0 0-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 0 0 .75-.75v-.008a.75.75 0 0 0-.75-.75h-.008ZM18 17.25a.75.75 0 0 1 .75-.75h.008a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-.75.75h-.008a.75.75 0 0 1-.75-.75v-.008Z" clip-rule="evenodd"/>
                                        </svg>
                                        <p>{ev.city}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/5 flex justify-center items-center">
                                <div className="my-2 px-2 py-1 bg-[#8ACDD7] rounded-2xl flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-1 text-white" viewBox="0 0 24 24" fill="currentColor">
                                        <path fill-rule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clip-rule="evenodd" />
                                    </svg>
                                    <p className="text-white">28</p>
                                </div>
                            </div>
                        </div>
                    ))}
                      {/* Pagination component */}
                      <div className="flex justify-center">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            goToPage={goToPage}
                        />
                      </div>
                </div>
            </div>

            {/* FOOTER */}
            <div className="flex-grow-0">
                <Footer />
            </div>
        </div>
    );
}

export default ListEvent;