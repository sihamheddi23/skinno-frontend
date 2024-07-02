import React from "react";

import StatisticsCard from "./StatisticsCard";
import TopFiveBarChart from "./TopFiveBarChart";
import PieChart from "./PieChart";

const MainContent = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the Skincare Shop Dashboard
      </h1>
      <StatisticsCard />
      <TopFiveBarChart />
      <PieChart />
    </div>
  );
};

export default MainContent;
