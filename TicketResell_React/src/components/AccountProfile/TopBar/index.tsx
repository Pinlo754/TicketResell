import { useState } from "react";

const TopBar = () => {

    const [activeTab, setActiveTab] = useState<number>(1);

    type Tab = {
        id: number,
        label: string,
    }

    const tabs: Tab[] = [
        {
            id: 1,
            label: "Tất cả",
        },
        {
            id: 2,
            label: "Hoàn thành",
        },
        {
            id: 3,
            label: "Hoàn tiền",
        },
    ];

    return (
      <div className="flex border-b border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-2 px-4 text-sm font-medium hover:text-[#077eff] ${
              activeTab === tab.id
                ? "text-[#077eff] border-b-2 border-[#077eff]"
                : "text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    );
}

export default TopBar;