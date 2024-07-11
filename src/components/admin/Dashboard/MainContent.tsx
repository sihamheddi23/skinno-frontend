import React, { useEffect, useState } from "react";

import StatisticsCard from "./StatisticsCard";
import TopFiveBarChart from "./TopFiveBarChart";
import PieChart from "./PieChart";
import { useAppSelector } from "../../../store";
import { BASE_URL } from "../../../api/axiosConfig";

const MainContent = () => {
  const userState = useAppSelector((state) => state.user);
  const [totalProfit, setTotalProfit] = useState(0)
  const [total_orders, setTotal_orders] = useState(0)
  const [total_stock, setTotal_stock] = useState(0)
  const [top5Products, setTop5Products] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}/orders/analytics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userState.user.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setTotalProfit(res.analytics?.totalProfit??0)
        setTotal_orders(res.analytics?.total_orders??0)
        setTotal_stock(res.analytics?.total_stock??0)
        setTop5Products(res.analytics?.top5Products??[])
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the Skincare Shop Dashboard
      </h1>
      <StatisticsCard totalProfit={totalProfit} total_orders={total_orders} total_stock={total_stock} />
      <TopFiveBarChart top5Products={top5Products}/>
      <PieChart totalProfit={totalProfit} total_orders={total_orders} total_stock={total_stock} />
    </div>
  );
};

export default MainContent;
