import logo from "../../assets/Logo_festix.png";
import support from "../../assets/Support.png";
import vnpay from "../../assets/VNPay.png";
import momo from "../../assets/Momo.png";
import { useNavigate } from "react-router-dom";

const Footer = () => {

    const navigate = useNavigate();

    return (
        <div className="w-screen">
            
            {/* 4 Column Section */}
            <div className="w-[75%] mx-auto py-8 grid grid-cols-1 md:grid-cols-4 md:space-x-0 md:divide-x-2 divide-gray-300">
                {/* Column 1 */}
                <div className="flex flex-col md:flex-row items-center space-x-4 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                    <div>
                        <h3 className="font-bold text-lg">Giao dịch nhanh</h3>
                        <p className="text-gray-500">Nhận vé của bạn trong vài giây.</p>
                    </div>
                </div>

                {/* Column 2 */}
                <div className="flex flex-col md:flex-row items-center space-x-4 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                    </svg>
                    <div>
                        <h3 className="font-bold text-lg">Dễ sử dụng</h3>
                        <p className="text-gray-500">Giao diện thân thiện với người dùng.</p>
                    </div>
                </div>

                {/* Column 3 */}
                <div className="flex flex-col md:flex-row items-center space-x-4 p-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                    <div>
                        <h3 className="font-bold text-lg">Thanh toán an toàn</h3>
                        <p className="text-gray-500">100% an toàn và được xác minh.</p>
                    </div>
                </div>

                {/* Column 4 */}
                <div className="flex flex-col md:flex-row items-center space-x-4 p-4">
                    <img src={support} alt="24/7 Support" className="w-12 h-12" />
                    <div>
                        <h3 className="font-bold text-lg">24/7 Hỗ trợ</h3>
                        <p className="text-gray-500">Hỗ trợ trực tuyến bất cứ khi nào bạn cần.</p>
                    </div>
                </div>
            </div>

            {/* Footer Section */}
            <footer className="w-screen bg-black text-white pt-4 divide-y divide-gray-600">
                {/* Logo Section */}
                <div className="flex flex-col items-center mt-14">
                    <img 
                    src={logo} alt="Festix" className="mb-2 w-16 h-20 cursor-pointer"
                    onClick={() => navigate("/main")}
                    />
                    <h1 
                    className="text-3xl font-bold hover:text-gray-400 cursor-pointer"
                    onClick={() => navigate("/main")}
                    >
                        Festix
                    </h1>
                </div>

                <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 pl-20  mt-14 pt-14">
                    {/* Contact Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Liên hệ</h2>
                        {/* Location */}
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-1" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                            </svg>
                            <p>500 Terry Francine Street</p>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center mt-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-1" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                            </svg>
                            <p>123-456-7890</p>
                        </div>

                        {/* Email */}
                        <div className="flex items-center mt-2 group pointer-events-auto">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-1 group-hover:text-gray-400" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                            </svg>
                            <a href="info@mysite.com" className="group-hover:text-gray-400 cursor-pointer" target="_blank" rel="noopener noreferrer">
                                info@mysite.com
                            </a>
                        </div>
                    </div>

                    {/* Shop Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Shop</h2>
                        <ul>
                            <li className="hover:text-gray-400 cursor-pointer">Shop All</li>
                            <li className="hover:text-gray-400 cursor-pointer">Plants</li>
                            <li className="hover:text-gray-400 cursor-pointer">Pots</li>
                            <li className="hover:text-gray-400 cursor-pointer">Sale</li>
                        </ul>
                    </div>

                    {/* Helpful Links Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Helpful Links</h2>
                        <ul>
                            <li className="hover:text-gray-400 cursor-pointer">FAQ</li>
                            <li className="hover:text-gray-400 cursor-pointer">Shipping & Returns</li>
                            <li className="hover:text-gray-400 cursor-pointer">Terms & Conditions</li>
                            <li className="hover:text-gray-400 cursor-pointer">Payment Methods</li>
                        </ul>
                    </div>

                    {/* Company Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Company</h2>
                        <ul>
                            <li className="hover:text-gray-400 cursor-pointer">Our Story</li>
                            <li className="hover:text-gray-400 cursor-pointer">Contact Us</li>
                        </ul>
                    </div>

                    {/* Opening Hours Section */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Opening Hours</h2>
                        <p>Mon - Fri: 7am - 10pm</p>
                        <p>Saturday: 8am - 10pm</p>
                        <p>Sunday: 8am - 11pm</p>
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="w-[90%] flex mt-14 py-14 mx-auto">
                    <div className="w-1/2 self-start">
                        <p>Copyright © 2024. All Rights Reserved.</p>
                    </div>
                    <div className="w-1/2 flex justify-end">
                        <a href="https://www.momo.vn/" target="_blank" rel="noopener noreferrer">
                        <img src={momo} alt="Momo" className="w-10 h-6 mr-2"/>
                        </a>
                        <a href="https://vnpay.vn/" target="_blank" rel="noopener noreferrer">
                        <img src={vnpay} alt="VNPay" className="w-10 h-6 mr-2"/>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer;