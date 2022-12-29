// import React from "react";
// import Chart from "chart.js";
// import { useSelector } from "react-redux";

// export default function CampaignTimeLineChart() {
//   const ActiveTab = useSelector((state) => state.ActiveCampaing.tab);
//   const { today, all,yesterday } = useSelector((state) => state.dashboardReport.campaign);

//   let { todayData, allData,yesterdayData } = [];
//   todayData = today.map((d) => d.data);
//   allData = all.map((d) => d.data);
//   yesterdayData = yesterday.map((d) => d.data);

//   React.useEffect(() => {
//     var config = {
//       type: "line",
//       data: {
//         labels: [
//           "7-8AM",
//           "8-9AM",
//           "9-10AM",
//           "10-11AM",
//           "11-12AM",
//           "12-1PM",
//           "1-2PM",
//           "2-3PM",
//           "3-4PM",
//           "4-5PM",
//           "5-6PM",
//           "6-7PM",
//           "7-8PM",
//           "8-9PM",
//           "9-10PM",
//         ],
//         datasets: [
//           {
//             label: "Total",
//             backgroundColor: "#000",
//             borderColor: "rgba(75, 192, 192, 1)",
//             data: allData,
//             fill: false,
//           },
//           {
//             label: "Today",
//             fill: false,
//             backgroundColor: "#000",
//             borderColor: "rgba(255, 205, 86, 1)",
//             data: todayData,
//           },{
//             label: "Yesterday",
//             fill: false,
//             backgroundColor: "#000",
//             borderColor: "rgb(34,139,34,0.8)",
//             data: yesterdayData,
//           },
//         ],
//       },
//       options: {
//         maintainAspectRatio: false,
//         responsive: true,
//         legend: {
//           labels: {
//             fontColor: "#000",
//           },
//           align: "end",
//           position: "bottom",
//         },
//         tooltips: {
//           mode: "index",
//           intersect: false,
//         },
//         hover: {
//           mode: "nearest",
//           intersect: true,
//         },
//         scales: {
//           xAxes: [
//             {
//               ticks: {
//                 fontColor: "#000",
//               },
//               display: true,
//             },
//           ],
//           yAxes: [
//             {
//               ticks: {
//                 suggestedMin: 0,
//                 beginAtZero: true,
//                 suggestedMax: 10,
//                 fontColor: "#000",
//                 precision: 0,
//               },
//               display: true,
//             },
//           ],
//         },
//       },
//     };

//     var ctx = document.getElementById("line-chart").getContext("2d");
//     window.myLine = new Chart(ctx, config);
//   }, [allData, todayData, yesterdayData]);
//   return (
//     <>
//       <div className="relative flex flex-col min-w-0 break-words mr-2 bg-white w-full mb-6 shadow-lg rounded">
//         <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
//           <div className="flex flex-wrap items-center">
//             <div className="relative w-full max-w-full flex-grow flex-1">
//               <h2 className="uppercase text-gray-600 mb-1 text-base font-semibold">
//                 Campaign Overview - {ActiveTab.CampaignName}
//               </h2>
//               {/* <h2 className="text-slate-700 text-xl font-semibold"></h2> */}
//             </div>
//           </div>
//         </div>
//         <div className="p-4 flex-auto">
//           {/* Chart */}
//           <div className="relative h-80">
//             <canvas id="line-chart"></canvas>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  interaction: {
    mode: 'index',
    intersect: false,
  },
  stacked: false,
  plugins: {
    title: {
      display: true,
      text: 'Chart.js Line Chart - Multi Axis',
    },
  },
  scales: {
    y: {
      type: 'linear',
      display: true,
      position: 'left',
    },
    y1: {
      type: 'linear',
      display: true,
      position: 'right',
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
      yAxisID: 'y',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
      yAxisID: 'y1',
    },
  ],
};

export function CampaignTimeLineChart() {
  return <Line options={options} data={data} />;
}