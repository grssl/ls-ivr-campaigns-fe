import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import TableComponent from "../../../components/Table/TableComponent";
import APICall, { explodeDataWithRowTable } from '../../../components/Api/APICall';
import { InputBoxInput, SelectBoxInput } from '../../agent/pages/formdata/FormInputType';

export default function ElastixAllReportManagment() {
  const [CampaignList, setCampaignList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [StateList, setStateList] = useState(false);

  const [ShowHide, setShowHide] = useState({
    campaign: true,
    dateRange: false,
  })
  const [DataList, setDataList] = useState({
    row: [],
    dataWithRows: [],
    onlyData: []
  });

  const [InpValue, setInpValue] = useState({ ReportType: "Autodailer" })
  const CampingApiCall = () => {
    APICall("/getCampaigns?campType=autodailler").then((response) => {
      if (response.length > 0) {
        setCampaignList(response.map(v => ({ campaignName: v.campaignId, campaignId: v.elastixCampaignId })))
      } else {
        toast.error(response)
      }
    })
  };

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "ReportType") {
      setInpValue({})
      if (value === 'Autodailer') {
        setShowHide(v => ({ ...v, dateRange: false, campaign: true }))
      }
      if (value === 'Inbound') {
        setShowHide(v => ({ ...v, campaign: false, dateRange: true }))
      }
    }
    setInpValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }


  useEffect(() => {
    CampingApiCall();
  }, []);

  const SearchReportHandler = (e) => {
    e.preventDefault();
    setDataList({
      row: [],
      dataWithRows: [],
      onlyData: []
    });
    setIsLoading(true);
    APICall(`/elastisk/getCampaignCallDetailsElastix`, "POST", { CampaignID: InpValue.campaignId }).then(responce => {
      if (responce.status) {
        explodeDataWithRowTable(responce.data, setDataList)
      }
      setIsLoading(false);
    }).catch(err => {
      setIsLoading(false);
      toast.error(err)
    })
  }
  return (
    <>
      <form method="post" onSubmit={SearchReportHandler}>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
          <div>
            <SelectBoxInput
              label="Call Type Report"
              data={{
                id: "ReportType",
                name: "ReportType",
                value: InpValue.ReportType,
                required: "required",
              }}
              inputChangeHandler={inputChangeHandler}
            >
              <option value="Autodailer">Autodailer</option>
              <option value="Inbound">Inbound</option>
            </SelectBoxInput>
          </div>
          {
            ShowHide.campaign ?
              <div>
                <SelectBoxInput
                  label="Campaign Name"
                  data={{
                    id: "campaignId",
                    name: "campaignId",
                    value: InpValue.campaignId,
                    required: "required",
                  }}
                  inputChangeHandler={inputChangeHandler}
                >
                  {
                    InpValue.ReportType !== "Autodailer" ? <option value={0} >All Campaigns</option> : ""
                  }

                  {
                    CampaignList.map((item, i) => (
                      <option value={item.campaignId} key={`CallStatus_${i}`}>{item.campaignName}</option>
                    ))
                  }
                </SelectBoxInput>
              </div>
              :
              <>
                <div>
                  <InputBoxInput label="Start Date"
                    data={{
                      id: "startDate",
                      name: "startDate",
                      value: InpValue.startDate,
                      type: "date",
                      required: "required"
                    }}
                    inputChangeHandler={inputChangeHandler}
                  />
                </div>
                <div>
                  <InputBoxInput label="End Date"
                    data={{
                      id: "endDate",
                      name: "endDate",
                      value: InpValue.endDate,
                      type: "date",
                      required: "required"
                    }}
                    inputChangeHandler={inputChangeHandler}
                  />
                </div>
              </>
          }
          <div className="text-center items-center md:pt-7">
            {isLoading ? (
              <button
                type="button"
                disabled
                className=" bg-green-500 mt-3 text-white active:bg-indigo-600 text-xs font-bold uppercase px-5 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                <i className="animate-spin fas fa-spinner  pr-3"></i>
                Loading...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-green-500 mt-3 text-white active:bg-indigo-600 text-xs font-bold uppercase px-5 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              >
                <i className="fas fa-paper-plane pr-3"></i> Search Report
              </button>
            )}
          </div>
        </div>
      </form>
      {DataList.row.length > 0 ?
        <>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <TableComponent
              columns={DataList.row}
              data={DataList.dataWithRows}
              selectOption={{ show: false, }}
              pagination={true}
              exportData={true}
              TicketsTitle={`Report Details`}
            />
          </div>
        </>
        : ""}
    </>
  );
}
