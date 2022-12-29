import React from "react";
import Chart from "chart.js";
import { useSelector } from "react-redux";

export default function CallingTimeLineChart() {
  const ActiveTab = useSelector((state) => state.ActiveCampaing.tab);
  const { inCall, idelCall, fetchData } = useSelector(
    (state) => state.dashboardReport.call
  );

  let { inCallData, idelCallData, fetchDatas } = [];
  inCallData = inCall.map((call) => call.data);
  idelCallData = idelCall.map((call) => call.data);
  fetchDatas = fetchData.map((call) => call.data);

  React.useEffect(() => {
    var config = {
      type: "line",
      data: {
        labels: [
          "7-8AM",
          "8-9AM",
          "9-10AM",
          "10-11AM",
          "11-12AM",
          "12-1PM",
          "1-2PM",
          "2-3PM",
          "3-4PM",
          "4-5PM",
          "5-6PM",
          "6-7PM",
          "7-8PM",
          "8-9PM",
          "9-10PM",
        ],
        datasets: [
          {
            label: "Total",
            backgroundColor: "#000",
            borderColor: "rgba(75, 192, 192, 1)",
            data: inCallData,
            fill: false,
          },
          {
            label: "Today",
            fill: false,
            backgroundColor: "#000",
            borderColor: "rgba(255, 205, 86, 1)",
            data: fetchDatas,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        legend: {
          labels: {
            fontColor: "#000",
          },
          align: "end",
          position: "bottom",
        },
        tooltips: {
          mode: "index",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: true,
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: "#000",
              },
              display: true,
            },
          ],
          yAxes: [
            {
              ticks: {
                suggestedMin: 0,
                beginAtZero: true,
                suggestedMax: 10,
                fontColor: "#000",
                precision: 0,
              },
              display: true,
            },
          ],
        },
      },
    };

    var ctx = document.getElementById("line-chart").getContext("2d");
    window.myLine = new Chart(ctx, config);
  }, [inCallData, idelCallData]);
  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words mr-2 bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h2 className="uppercase text-gray-600 mb-1 text-base font-semibold">
                Campaign Overview - {ActiveTab.campaignName}
              </h2>
              {/* <h2 className="text-slate-700 text-xl font-semibold"></h2> */}
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-80">
            <canvas id="line-chart"></canvas>
          </div>
        </div>
      </div>
    </>
  );
}
