import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top'
    },
    title: {
      display: false,
      text: '',
    },
  },
};




export default function DispositionBarChart({ ActiveTab, dataList = [] }) {

  let graphData = dataList.map(({ campaignStartDate, campaignId, campaignEndDate, ...rest }) => ({ ...rest }));
  const dataLabel = graphData.length > 0 ? Object.keys(graphData[0]) : [];
  const data = {
    labels: dataLabel,
    datasets: [
      {
        label: "Call",
        data: dataLabel.map((item, i) => graphData[0][item]),
        backgroundColor: ['#32a852', '#1a31a3', '#a3331a', '#f29616', '#807260', '#1ba186', '#8f047a', '#806f05'],
        borderColor: ['#32a852', '#32a852', '#32a852', '#32a852', '#32a852', '#32a852', '#32a852', '#32a852'],
        borderWidth: 1,
      },
    ],
  };
  return (<>
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 rounded">
      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div className="flex flex-wrap items-center">
          <div className="relative w-full max-w-full flex-grow flex-1">

            <h2 className="text-slate-700 text-xl font-semibold uppercase">
              Campaign Summary - {ActiveTab.campaignId}
            </h2>
          </div>
        </div>
      </div>
      <div className="p-4 flex-auto">
        <div className="relative h-80">
          <Bar options={options} data={data} />
        </div>
      </div>
    </div>
  </>)
}
