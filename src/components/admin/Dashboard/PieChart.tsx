import React from 'react'
import CanvasJSReact from '@canvasjs/react-charts';
import { useAppSelector } from '../../../store';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function PieChart({totalProfit,  total_orders, total_stock}) {
  const themeState = useAppSelector((state) => state.theme);
  const total = totalProfit + total_orders + total_stock || 1;
	
  const options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: themeState.theme==="light"?"light2":"dark2", // "light1", "dark1", "dark2"
			title:{
				text: "Products Vs Orders Vs Revenue"
			},
			data: [{
				type: "pie",
				indexLabel: "{label}: {y}%",		
				startAngle: -90,
				dataPoints: [
					{ y: parseFloat((total_stock/total).toFixed(2))*100, label: "products" },
					{ y:  ((total_orders/total)*100).toFixed(2), label: "orders" },
					{ y: parseFloat((totalProfit/total).toFixed(2))*100, label: "total revenue" },
				]
			}]
		}
  return (
      <div className={themeState.theme === "light" ? "my-6 bg-white w-full p-6 rounded-lg shadow" : "my-6 bg-[#32373a] w-full p-6 rounded-lg shadow text-white"}>
	      <CanvasJSChart options = {options} />
    </div>
  )
}

export default PieChart