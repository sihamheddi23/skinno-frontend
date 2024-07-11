import CanvasJSReact from "@canvasjs/react-charts";
import { useAppSelector } from "../../../store";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function TopFiveBarChart({ top5Products }) {
  
  const data = top5Products.map((product) => ({
    label: product.name,
    y: product.price
  }));
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
        dataPoints: data,
      },
    ],
  };
  return (
    <div className={themeState.theme === "light" ? "my-6 bg-white w-full p-6 rounded-lg shadow" : "my-6 bg-[#32373a] w-full p-6 rounded-lg shadow text-white"}>
      {
        top5Products.length == 5 ?
          <CanvasJSChart options={options} />
          :
          <p className="text-center">No orders to show top 5 products</p>
      }
    </div>
  );
}

export default TopFiveBarChart;
