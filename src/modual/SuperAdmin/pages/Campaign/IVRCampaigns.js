import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableComponent from "../../../../components/Table/TableComponent";
import APICall, { explodeDataWithRowTable } from '../../../../components/Api/APICall';
import dayjs from "dayjs";
import { ActiveDeactivate } from '../../../CommanApiFunction';

export default function IVRCampaigns() {
  const [CampaignList, setCampaignList] = useState({
    row: [],
    dataWithRows: [],
    onlyData: []

  });

  const CampingApiCall = () => {
    APICall("/ivr/getCampaign").then((response) => {
      if (response.data.length > 0) {
        let tempResponse = response.data.map((row) => ({
          ...row,
          created_at: dayjs(row.created_at).format("DD/MM/YYYY HH:mm:ss"),
          status: ActiveDeactivate(row.status),
        }))
        explodeDataWithRowTable(tempResponse, setCampaignList)
      } else {
        toast.error(response)
      }
    })
  };
  useEffect(() => {
    CampingApiCall();
  }, []);
  return (
    <>
      {/* {JSON.stringify(CampaignList.row)} */}
      <h3 className="text-center font-bold text-xl uppercase bg-blue-200 p-2"> All Campaings</h3>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        {
          CampaignList.dataWithRows.length > 0 ?
            <TableComponent
              columns={CampaignList.row}
              data={CampaignList.dataWithRows}
              pagination={true}
              exportData={true}
              TicketsTitle={`IVR Campaign List`}
            /> : ""
        }
      </div>
    </>
  );
}
