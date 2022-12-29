import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import CommonPage from "../modual/CommonPage";
import { SelectBoxInput, TextareaBoxInput } from "../modual/agent/pages/formdata/FormInputType";
import { CallStatus, NotConnectedDropDowns } from "../modual/agent/pages/formdata/DropDownDataList";
import ConnectedCallComponent from "../modual/agent/pages/formdata/ConnectedCallComponent";
import CustomerDetails from "../modual/agent/pages/CustomerDetails";
import { useParams } from "react-router-dom";
import APICall from "../components/Api/APICall";


export default function AutodaillerScreen() {

  const prams = useParams();

  const { sipId, RID } = prams;
  // const { sipId, contactNumber, callId, callType, RID } = prams;
  const [LiveCall, setLiveCall] = useState(false)
  const [FetchLeadData, setFetchLeadData] = useState({})
  const [AgentSIpId, setAgentSIpId] = useState("")


  const [isLoading, setIsLoading] = useState(false);
  const [InpValue, setInpValue] = useState({
    CallStatus: "Connected"
  });
  const [ShowConnectedFrom, setShowConnectedFrom] = useState(true);
  const DiscussionFormSubmitHandler = (e) => {
    e.preventDefault();
    InpValue.interactionsDateTime = new Date();
    InpValue.agentId = AgentSIpId;
    const postIntrectionData = {
      AccountCode: FetchLeadData.rid,
      agentId: AgentSIpId,
      leadStatus: "OPEN",
      interactions: InpValue,
      callbackStatus: false,
    };

    if (InpValue.CallBack !== undefined) {
      postIntrectionData.callback = new Date(InpValue.CallBack);
      InpValue.CallBack = new Date(InpValue.CallBack);
      postIntrectionData.callbackStatus = true;

    } if (InpValue.AppointmentDateTime !== undefined) {
      postIntrectionData.leadStatus = "CLOSE"
    }
    APICall("/updateLead", "POST", postIntrectionData).then(response => {
      setIsLoading(false)
      toast.info(response.message)
      if (response.status !== undefined) {
        setFetchLeadData({})
        setInpValue({})
        setInterval(() => {
          window.location = "/"
        }, 2000);
      }
    }).catch(err => {
      toast.error(err)
      setIsLoading(false)

    })

  }
  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    if (name === "CallStatus") {
      setInpValue({});
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

    let agentSipId = sipId.split("/")
    if (Array.isArray(agentSipId)) {
      setAgentSIpId(agentSipId[1])
    }

    APICall("/fetchLead", "POST", { agentId: AgentSIpId, rid: RID }).then((response) => {
      if (response.status) {
        if (Object.keys(response.data).length > 0) {
          setFetchLeadData(response.data);
          setLiveCall(true)
        }
      } else {
        setLiveCall(false)

        toast.info("Leads Exhausted")
      }
    }).catch((err) => {
      setLiveCall(false)
      console.log(err);
    })
  }, [AgentSIpId, RID, sipId])

  return (
    <main className="bg-gray-100 font-sans leading-normal tracking-normal p-10">
      <ToastContainer />
      {/* {JSON.stringify(prams)} */}
      <div className="w-full mx-auto">
        <div className="w-full  px-4 md:px-0  mb-16 text-gray-800 leading-normal">
          <CommonPage title="Autodailer Intrection Form">
            <div className="py-2 grid grid-cols-2 gap-4">
              <div className="">
                <form className="px-4" onSubmit={DiscussionFormSubmitHandler}>
                  <div className="grid grid-cols-2 gap-4">
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
                        className=" bg-green-500 mt-3 text-white active:bg-orange-600 text-lg hover:bg-cyan-600 font-bold uppercase px-20 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        <i className="animate-spin fas fa-spinner  pr-3"></i>
                        Loading...
                      </button>
                    ) : (
                      <button
                        type="submit"
                        className="bg-green-500 mt-3 text-white active:bg-orange-600 text-lg hover:bg-cyan-600 font-bold uppercase px-20 py-3 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      >
                        <i className="fas fa-save pr-3"></i> Submit
                      </button>
                    )}
                  </div>
                </form>
              </div>
              <div>
                {
                  LiveCall ?
                    <CustomerDetails
                      setLiveCall={setLiveCall}
                      liveCall={LiveCall}
                      FetchLeadData={FetchLeadData}
                    />
                    : ""}
              </div>
            </div>

          </CommonPage>
        </div>
      </div>
    </main>

  );
}
