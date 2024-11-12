import { useState } from "react";

type Tab = {
  id: number;
  label: string;
};

type TopBarProps = {
  tabs: Tab[];
};

const TopBar = ({ tabs }: TopBarProps) => {
  const [activeTab, setActiveTab] = useState<number>(tabs[0]?.id || 1);

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
};

export default TopBar;