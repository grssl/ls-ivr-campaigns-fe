import TabComponent from '../../../components/Tab/TabComponent';
import AutoDailerLeadsBaseUpload from './baseupload/AutoDailerLeadsBaseUpload';
import IvrLeadsBaseUpload from './baseupload/IvrLeadsBaseUpload';
const TabData = [
  // {
  //   title: 'Fetch lead Base Upload',
  //   PageComponent: <FetchLeadBaseUpload />
  // },
  {
    title: 'IVR Base Upload',
    PageComponent: <IvrLeadsBaseUpload />
  },
  // {
  //   title: 'Autodailer lead Base Upload',
  //   PageComponent: <AutoDailerLeadsBaseUpload />
  // },
]
export default function BaseUpload() {
  return (
    <TabComponent tabData={TabData} />
  );
}