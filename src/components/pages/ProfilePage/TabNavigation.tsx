import React from "react";

interface TabNavigationProps {
  tabs: string[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs }) => {
  return (
    <div className="flex items-center justify-center gap-[61px] mb-[10px]">
      {tabs.map((tab, index) => (
        <h1 key={index} className="font-semibold text-[20px] text-[#7B7373]">
          {tab}
        </h1>
      ))}
    </div>
  );
};

export default TabNavigation;
