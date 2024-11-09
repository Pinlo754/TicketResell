import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface CoverSectionProps {
  title: string;
  description: string;
  image: string;
}

const CoverSection: React.FC<CoverSectionProps> = ({ title, description, image }) => {
  type Tab = {
    label: string;
    path: string;
  };

  const tabs: Tab[] = [
    {
      label: 'Cách Bán',
      path: '/how-it-works/hts',
    },
    {
      label: 'Cách Mua',
      path: '/how-it-works/htb',
    },
  ];

  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  return (
    <div 
      className={`flex items-end overflow-hidden min-h-[60vh] text-white pt-16 ${
        currentPath === '/how-it-works/hts' 
          ? 'bg-gradient-to-r from-blue-500 to-purple-600' 
          : 'bg-gradient-to-r from-purple-600 to-yellow-500'
      }`}
    >
      {/* Text Section */}
      <div className="pl-28">
        <div className="-translate-y-36">
            <h1 className="text-6xl font-bold mb-6">{title}</h1>
            <p className="text-xl max-w-2xl mb-6 text-gray-300">{description}</p>
        </div>
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => navigate(tab.path)}
              className={`px-4 py-2 rounded-t font-bold ${
                currentPath === tab.path ? 'bg-white text-black' : 'hover:bg-black text-white'
              }`}
            >
              <span className="text-3xl">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Overlay Image */}
      <div className={`relative ${currentPath === '/how-it-works/hts' ? '-translate-y-4' : 'translate-y-5'}`}>
        <img src={image} alt="Cover" className="h-[600px] object-cover scale-110" />
      </div>
    </div>
  );
};

export default CoverSection;