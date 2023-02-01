import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableComponent from "../../../../components/Table/TableComponent";
import APICall, { explodeDataWithRowTable } from '../../../../components/Api/APICall';
import dayjs from "dayjs";
import CommunEditModal from "../../../../components/Modal/CommunEditModal";
import FormWizard from "../../../../components/Form/FormWizard";
import { useForm } from "@formiz/core";
import { ActiveDeactivate } from '../../../CommanApiFunction';

export default function FetchCampaigns() {
  const [RowEditData, setRowEditData] = useState([]);
  const [EditData, setEditData] = useState({});

  const [ShowEditModal, setShowEditModal] = useState(false);
  const [CampaignList, setCampaignList] = useState({
    row: [],
    dataWithRows: [],
    onlyData: []

  });
  const col = [
    {
      "accessor": "campaignId",
      "Header": "Id"
    },
    {
      "accessor": "campaignName",
      "Header": "Name"
    },
    {
      "accessor": "campaignPriority",
      "Header": "Priority"
    },
    {
      "accessor": "totalLeadsCount",
      "Header": "Total"
    },
    {
      "accessor": "processedLeadsCount",
      "Header": "Contacted Leads"
    },
    {
      "accessor": "campaignStartDate",
      "Header": "Start Date"
    },
    {
      "accessor": "campaignEndDate",
      "Header": "End Date"
    },
    {
      "accessor": "Status",
      "Header": "Status"
    },

    {
      "accessor": "updatedAt",
      "Header": "updatedAt"
    }
  ];

  const CampingApiCall = () => {
    APICall("/getCampaigns?campType=fetch").then((response) => {
      if (response.length > 0) {
        let tempResponse = response.map((row) => ({
          ...row,
          campaignStartDate: dayjs(row.campaignStartDate).format("DD/MM/YYYY HH:mm:ss"),
          campaignStartDateUTC: row.campaignStartDate,
          campaignEndDate: dayjs(row.campaignEndDate).format("DD/MM/YYYY HH:mm:ss"),
          campaignEndDateUTC: row.campaignEndDate,
          updatedAt: dayjs(row.updatedAt).format("DD/MM/YYYY HH:mm:ss"),
          Status: ActiveDeactivate(row.campaignEnable),
        }))
        explodeDataWithRowTable(tempResponse, setCampaignList)
      } else {
        toast.error(response)
      }
    })
  };
  const CampaignStatusHandler = (status) => {
    RowEditData.map(v => {
      APICall(`/modifyCampaign`, "POST", {
        "campaignId": v.campaignId,
        "campaignPriority": v.campaignPriority,
        "campaignEndDate": v.campaignEndDateUTC,
        "campaignStartDate": v.campaignStartDateUTC,
        "campaignEnable": status,
      })
        .then((res) => {
        })
        .catch((e) => {
          console.log(e);
        });

      CampingApiCall();
      toast.success(`${v.campaignId} Campaign status updated`);

      return "";
    })


  };

  const editInputHandler = (EditDataList) => {
    const inptFildes = [
      {
        title: "Edit Campaign",
        fileds: [
          {
            name: "campaignId",
            label: "Campaign Id",
            required: "Campaign Id is required",
            type: "text",
            defaultValue: EditDataList.campaignId,
            readOnly: true
          }, {
            name: "campaignStartDate",
            label: "Campaign Start Date",
            required: "Campaign Start Date is required",
            type: "datetime-local",
            defaultValue: dayjs(EditDataList.campaignStartDateUTC).format("YYYY-MM-DDTHH:mm:ss")
          }, {
            name: "campaignEndDate",
            label: "Campaign End Date",
            required: "Campaign End Date is required",
            type: "datetime-local",
            defaultValue: dayjs(EditDataList.campaignEndDateUTC).format("YYYY-MM-DDTHH:mm:ss")
          },
          {
            name: "campaignPriority",
            label: "Campaign Priority",
            required: "End Date is required",
            type: "select",
            defaultValue: EditDataList.campaignPriority,
            options: [
              { label: "P1", value: "1" },
              { label: "P2", value: "2" },
              { label: "P3", value: "3" },
              { label: "P4", value: "4" },
              { label: "P5", value: "5" },
              { label: "P6", value: "6" },
              { label: "P7", value: "7" },
              { label: "P8", value: "8" },
              { label: "P9", value: "9" },
              { label: "P10", value: "10" }
            ]
          },
        ],
      },
    ];
    setEditData(inptFildes);
  }

  const selectMenuHandoler = (event) => {
    const value = event.target.value;
    switch (value) {
      case "active":
        toast.warning("On active");
        CampaignStatusHandler(true);
        break;
      case "deactive":
        toast.warning("On deactive");
        CampaignStatusHandler(false);
        break;
      case "edit":
        if (RowEditData.length === 1) {
          editInputHandler(RowEditData[0]);
          setShowEditModal(true);
        } else {
          toast.warning("Please select one campaign at a time");

        }
        break;

      default:
        toast.error("Select Valid Options", value);
        break;
    }
  };

  const selectRowOption = (
    <select
      className="form-select  py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      onChange={(e) => selectMenuHandoler(e)}
    >
      <option selected value={0}>
        Select Menu
      </option>
      <option value="active">Active</option>
      <option value="deactive">De-Active</option>
      <option value="edit">Edit</option>

    </select>
  );

  useEffect(() => {
    CampingApiCall();
  }, []);


  const [isLoading, setIsLoading] = useState(false);
  const myForm = useForm();
  const editFormSubmit = (values) => {
    const campRowData = RowEditData[0]
    APICall(`/modifyCampaign`, "POST", {
      // ...campRowData,
      ...values,
      campaignEnable: campRowData.campaignEnable

    }).then(() => {
      CampingApiCall();
      setShowEditModal(false);
      setIsLoading(false);

    }).catch((error) => {
      console.log(error);
    })
  };
  return (
    <>
      {/* {JSON.stringify(CampaignList.row)} */}
      <h3 className="text-center font-bold text-xl uppercase bg-blue-200 p-2"> All Campaings</h3>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        {
          CampaignList.dataWithRows.length > 0 ?
            <TableComponent
              columns={col}
              data={CampaignList.dataWithRows}
              selectOption={{ show: true, option: selectRowOption }}
              pagination={true}
              exportData={true}
              TicketsTitle={`Campaign List`}
              action={{ setRowEditData }}
            /> : ""
        }

        <CommunEditModal
          showModal={ShowEditModal}
          setShowModal={setShowEditModal}
          Title="Edit Campaign"
        >
          <FormWizard
            inputes={EditData}
            showStep={false}
            isLoading={isLoading}
            submitForm={editFormSubmit}
            myForm={myForm}
          />
        </CommunEditModal>


      </div>
    </>
  );
}
