import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DashboardTodayCount from "../SuperAdmin/Dashboard/DashboardTodayCount";
import DashboardTotalCount from "../SuperAdmin/Dashboard/DashboardTotalCount";
import FetchLeadsPage from './pages/FetchLeadsPage';
import TabComponent from '../../components/Tab/TabComponent';
import { DashboardCountApiCall } from "../CommanApiFunction";

export default function DashboardAgent() {
  const { userId } = useSelector((state) => state.UserDataReducer.data);
  const [TotalData, setTotalData] = useState({})
  const [Todaydata, setTodaydata] = useState({})


  useEffect(() => {
    DashboardCountApiCall(setTotalData, "agent&agentId=" + userId)
    DashboardCountApiCall(setTodaydata, "agentToday&agentId=" + userId)
  }, [userId])
  const TabData = [
    {
      title: 'Today Count  Report',
      PageComponent: <DashboardTodayCount AdminDashboardDatList={Todaydata} />
    },
    {
      title: 'Total Count  Report',
      PageComponent: <DashboardTotalCount AdminDashboardDatList={TotalData} />
    },
  ]

  return (
    <>
      <TabComponent tabData={TabData} />
      <FetchLeadsPage />

    </>
  );
}
