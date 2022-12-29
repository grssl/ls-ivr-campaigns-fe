import TabComponent from '../../../components/Tab/TabComponent';
import AutodaillerCampaign from './Campaign/AutodaillerCampaign';
import IVRCampaigns from './Campaign/IVRCampaigns';
const TabData = [
  // {
  //   title: 'Autodailer Campaign',
  //   PageComponent: <AutodaillerCampaign />
  // },
  {
    title: 'IVR Campaign',
    PageComponent: <IVRCampaigns />
  },
  // {
  //   title: 'Fetch Call Campaign',
  //   PageComponent: <FetchCampaigns />
  // },
]
export default function AllCampaigns() {
  return (
    <TabComponent tabData={TabData} />
  );
}