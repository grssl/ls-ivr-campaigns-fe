
import ManualCallReportPage from './report/ManualCallReportPage';
import ReportPage from './report/ReportPage';

import TabComponent from '../../../components/Tab/TabComponent';
import IVRCallReportPage from './report/IVRCallReportPage';
import CDRReportPage from './report/CDRReportPage';
const TabData = [
  // {
  //   title: 'Manual Calling Report',
  //   PageComponent: <ManualCallReportPage />
  // },
  // {
  //   title: 'IVR Calling Option Report',
  //   PageComponent: <IVRCallReportPage />
  // },
   {
    title: 'IVR Calling Report',
    PageComponent: <IVRCallReportPage />
  }, {
    title: 'CDR Report',
    PageComponent: <CDRReportPage />
  },
  //  {
  //   title: 'Other Calling Report',
  //   PageComponent: <ReportPage />
  // },
]
export default function AllCampaigns() {
  return (
    <TabComponent tabData={TabData} />
  );
}