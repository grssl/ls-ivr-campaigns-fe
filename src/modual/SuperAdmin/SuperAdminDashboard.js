import { useEffect, useState } from 'react';
import DispositionBarChart from '../../components/graphs/DispositionBarChart';
import IVRBarChart from '../../components/graphs/IVRBarChart';
import TabComponent from '../../components/Tab/TabComponent';
import DashboardTotalCount from './Dashboard/DashboardTotalCount';
import DashboardTodayCount from './Dashboard/DashboardTodayCount';
import { DashboardCountApiCall } from '../CommanApiFunction';
import DashboardCallTrendCount from './Dashboard/DashboardCallTrendCount';
import APICall from '../../components/Api/APICall';
import AgentLiveStatus from './pages/AgentLiveStatus';
import dayjs from 'dayjs';

export default function SuperAdminDashboard() {

  const [DashboardCounts, setDashboardCounts] = useState({})
  const [DashboardCountsToday, setDashboardCountsToday] = useState({})
  const [ActiveCampaing, setActiveCampaing] = useState([])
  const [IvrDashboardData, setIvrDashboardData] = useState([])
  const [ActiveTab, setActiveTab] = useState({})
  const [ActiveTabData, setActiveTabData] = useState({})


  useEffect(() => {

    APICall("/ivr/dashboardCount", "POST", {
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
    }).then((response) => {
      if (response.status) {
        setIvrDashboardData(response.data)
      }
    })

    APICall("/getCampaigns").then((response) => {
      if (response.length) {
        const tempAction = response.filter(v => v.campaignEnable)
        setActiveCampaing(tempAction);
        setActiveTab(tempAction[0])
        activeCampDataCall(tempAction[0].campaignId)
      }
    })

    DashboardCountApiCall(setDashboardCounts, "admin")
    DashboardCountApiCall(setDashboardCountsToday, "adminToday")
    DashboardCountApiCall(setDashboardCountsToday, "adminToday")
  }, [])
  const activeCampDataCall = (campid) => {
    APICall("/getCurrentDashboard?type=campaign&agentId=" + campid).then((response) => {
      if (response.length) {
        setActiveTabData(response);
      }
    })
  }

  const selectCampingHandoler = (campData) => {
    setActiveTab(campData);
    activeCampDataCall(campData.campaignId)
  };

  const TabData = [
    // {
    //   title: 'Today Count  Report',
    //   PageComponent: <DashboardTodayCount AdminDashboardDatList={DashboardCountsToday} />
    // },
    // {
    //   title: 'Total Count  Report',
    //   PageComponent: <DashboardTotalCount AdminDashboardDatList={DashboardCounts} />
    // },
    // {
    //   title: 'Autodialer Call Trend',
    //   PageComponent: <DashboardCallTrendCount />
    // },
  ]

  return (
    <>
      <TabComponent tabData={TabData} />
      <div className="grid grid-cols-2 gap-1 justify-evenly">
        {/* <div className="flex flex-row flex-wrap flex-grow">
          <div className="w-full">
            <div className="bg-white border rounded shadow">
              <div className="border-b p-3 pb-0">
                <h5 className="font-bold uppercase text-gray-600">Active Campaign</h5>
              </div>
              <div className="my-1 mx-4">
                <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-400 dark:border-gray-700 dark:text-gray-400">
                  {ActiveCampaing.map((item, i) => (
                    <li
                      className=""
                      key={`camp${i}`}
                      onClick={() => selectCampingHandoler(item)}
                    >
                      <button
                        aria-current="page"
                        className={`inline-block p-3 text-gray-50 active:bg-blue-600 bg-${ActiveTab.campaignId === item.campaignId ? `green` : "gray"
                          }-500 rounded-t-lg active dark:bg-gray-800 dark:text-blue-500 border-r-2`}
                      >
                        {item.campaignId}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                {
                  ActiveTabData.length > 0 ?
                    <DispositionBarChart ActiveTab={ActiveTab} dataList={ActiveTabData} />
                    : ""}
              </div>
            </div>
          </div>
        </div> */}
        <div className="flex flex-row flex-wrap flex-grow">
          <div className="w-full">
            <div className="bg-white border rounded shadow">
              <div>
                {
                  IvrDashboardData.length > 0 ?
                    <IVRBarChart dataList={IvrDashboardData} />
                    : ""}
              </div>
            </div>
          </div>
        </div>

        <div>
          {/* <AgentLiveStatus /> */}
        </div>
      </div>
    </>
  );
}
