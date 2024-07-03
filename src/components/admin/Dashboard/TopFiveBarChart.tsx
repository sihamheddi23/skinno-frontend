import React from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import { useAppSelector } from "../../../store";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function TopFiveBarChart() {
  const themeState = useAppSelector((state) => state.theme);
  const options = {
    animationEnabled: true,
    exportEnabled: true,
    theme: themeState.theme==="light"?"light2":"dark2", //"light1", "dark1", "dark2"
    title: {
      text: "Top five products and their sales in USD",
    },
    axisY: {
      includeZero: true,
    },
    data: [
      {
        type: "column",
        indexLabel: "{y}",
        indexLabelFontColor: "white",
        dataPoints: [
          { label: "product1", y: 5000000 },
          { label: "product2", y: 4000000 },
          { label: "product3", y: 7000000 },
          { label: "product4", y: 800000 },
          { label: "product5", y: 900000 },
        ],
      },
    ],
  };
  return (
    <div className={themeState.theme === "light" ? "my-6 bg-white w-full p-6 rounded-lg shadow" : "my-6 bg-[#32373a] w-full p-6 rounded-lg shadow text-white"}>
      <CanvasJSChart
        options={options}
        containerProps={{ width: "100%" }}
      />
    </div>
  );
}

export default TopFiveBarChart;
