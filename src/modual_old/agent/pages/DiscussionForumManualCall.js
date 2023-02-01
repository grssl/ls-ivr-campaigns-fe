import React, { useEffect, useState } from "react";
import CommonPage from "../../CommonPage";
import ConnectedCallComponent from "./formdata/ConnectedCallComponent";
import { InputBoxInput, SelectBoxInput, TextareaBoxInput } from './formdata/FormInputType';
import { toast } from "react-toastify";
import APICall from "../../../components/Api/APICall";
import { useSelector } from "react-redux";
import { CallStatus, NotConnectedDropDowns } from './formdata/DropDownDataList'


export default function DiscussionForumManualCall({ FetchLeadData, setFetchLeadData, setIntrectionData }) {
  const { data } = useSelector((state) => state.UserDataReducer);
  const { userId } = data;
  const [isLoading, setIsLoading] = useState(false);
  const [InpValue, setInpValue] = useState({});
  const [ShowConnectedFrom, setShowConnectedFrom] = useState(true);
  const DiscussionFormSubmitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);
    InpValue.interactionsDateTime = new Date();
    InpValue.agentId = userId;
    const postIntrectionData = {
      agentId: userId,
      phoneNumber: FetchLeadData.phoneNumber,
      leadName: InpValue.CustomerName,
      interactions: InpValue,
      callback: "",
      callbackStatus: false,
      escalatedFlag: false,
    };

    if (InpValue.CallBack !== undefined) {
      postIntrectionData.callback = new Date(InpValue.CallBack);
      postIntrectionData.callbackStatus = true;

    } if (InpValue.AppointmentDateTime !== undefined) {
      postIntrectionData.leadStatus = "CLOSE"
    }
    console.log("postIntrectionData", postIntrectionData);
    APICall("/mc/createMCInteraction", "POST", postIntrectionData).then(response => {
      setIsLoading(false)
      toast.info(response.message)
      if (response.status) {
        setFetchLeadData({})
        setInpValue({})
        toast.success("Intrection Update Successfully")
        // UpdateLocalStorageAuthData(data, dispatch);
      }
    }).catch(err => {
      toast.error(err)
    })

  }
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "CallStatus") {
      delete InpValue['CallStatus']
      setInpValue(InpValue);
    }
    setInpValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === "CallStatus" && value === "Connected") {
      setShowConnectedFrom(true);
    } else if (name === "CallStatus" && value !== "Connected") {
      setShowConnectedFrom(false);
    };
  }

  useEffect(() => {

    APICall("/mc/getMCInteractionsReport", "POST", { phoneNumber: FetchLeadData.phoneNumber }).then((response) => {
      if (response.status) {
        setIntrectionData(response.data)
      }
    })
  }, [FetchLeadData, setIntrectionData])

  return (
    <CommonPage title="Discussion Forum">
      <form className="py-4 px-4" onSubmit={DiscussionFormSubmitHandler}>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <InputBoxInput label="Contact Number "
              data={{
                id: "ContactNumber",
                name: "ContactNumber",
                value: FetchLeadData.phoneNumber,
                placeholder: "Customer contact number",
                required: "required",
                readOnly: "true",
              }}
              inputChangeHandler={inputChangeHandler}
            />
          </div>
          <div>
            <InputBoxInput label="Customer Name "
              data={{
                id: "CustomerName",
                name: "CustomerName",
                value: InpValue.CustomerName,
                placeholder: "Customer Name",
                required: "required",
              }}
              inputChangeHandler={inputChangeHandler}
            />
          </div>
          <div>
            <InputBoxInput label="Customer Email"
              data={{
                id: "EmailId",
                name: "EmailId",
                value: InpValue.EmailId,
                placeholder: "Enter Email Address",
                required: "required",
              }}
              inputChangeHandler={inputChangeHandler}
            />
          </div>
          <div>
            <InputBoxInput label="Lead Source"
              data={{
                id: "LeadSource",
                name: "LeadSource",
                value: InpValue.LeadSource,
                placeholder: "Enter Lead Source",
                required: "required",
              }}
              inputChangeHandler={inputChangeHandler}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-3">
          <div>
            <SelectBoxInput
              label="Call Status"
              data={{
                id: "status",
                name: "CallStatus",
                value: InpValue.CallStatus,
                required: "required",
                // defaultValue:"Connected"
              }}
              inputChangeHandler={inputChangeHandler}
            >
              {
                CallStatus.map((item, i) => (
                  <option value={item} key={`CallStatus_${i}`}>{item}</option>
                ))
              }
            </SelectBoxInput>
          </div>
          {ShowConnectedFrom ? <ConnectedCallComponent InpValue={InpValue} inputChangeHandler={inputChangeHandler} /> : <div>
            <SelectBoxInput
              label="Call Not Connected"
              data={{
                id: "NotConnectedCall",
                name: "NotConnectedCall",
                value: InpValue.NotConnectedCall,
                required: "required"
              }}
              inputChangeHandler={inputChangeHandler}
            >
              {
                NotConnectedDropDowns.map((item, i) => (
                  <option value={item} key={`notConnect_${i}`}>{item}</option>
                ))
              }
            </SelectBoxInput>
          </div>}
        </div>
        <div>
          <TextareaBoxInput label="Remark"
            data={{
              id: "remark",
              name: "Notes",
              value: InpValue.Notes,
              placeholder: "Write notes here...",
              required: "required"
            }}
            inputChangeHandler={inputChangeHandler}
          />
        </div>


        <div className="text-center items-center">
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
              <i className="fas fa-save pr-3"></i> Submit
            </button>
          )}
        </div>
      </form>
    </CommonPage>
  );
}
