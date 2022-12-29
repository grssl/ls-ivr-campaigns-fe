import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import CommonPage from "../modual/CommonPage";
import { InputBoxInput, SelectBoxInput, TextareaBoxInput } from "../modual/agent/pages/formdata/FormInputType";
import { NotConnectedDropDowns } from "../modual/agent/pages/formdata/DropDownDataList";
import ConnectedCallComponent from "../modual/agent/pages/formdata/ConnectedCallComponent";


export default function InboundScreen() {
  const { data } = useSelector((state) => state.UserDataReducer);
  const [FetchLeadData, setFetchLeadData] = useState({ rid: "123", name: "demo user" })
  const { userId } = data;

  const [isLoading, setIsLoading] = useState(false);
  const [InpValue, setInpValue] = useState({
    ContactNumber: 9557735224,
    CallStatus: "Connected"
  });

  const [ShowConnectedFrom, setShowConnectedFrom] = useState(true);
  const DiscussionFormSubmitHandler = (e) => {
    e.preventDefault();

    setIsLoading(true);
    InpValue.interactionsDateTime = new Date();
    InpValue.agentId = userId;
    const postIntrectionData = {
      AccountCode: FetchLeadData.rid,
      agentId: userId,
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
    // APICall("/updateLead", "POST", postIntrectionData).then(response => {
    //   setIsLoading(false)
    //   toast.info(response.message)
    //   if (response.status !== undefined) {
    //     setFetchLeadData({})
    //     setInpValue({})
    //     setLiveCall(false)
    //     UpdateLocalStorageAuthData(data, dispatch);
    //   }
    // }).catch(err => {
    //   toast.error(err)
    // })

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
  return (
    <main className="bg-gray-200 font-sans leading-normal tracking-normal px-96 py-10">
      <ToastContainer />
      <div className="w-full mx-auto">
        <div className="w-full  px-4 md:px-0  mb-16 text-gray-800 leading-normal">
          <form onSubmit={DiscussionFormSubmitHandler}>
            <CommonPage title="Inbound Call Interaction Form">
              <div className="py-2 grid grid-cols-1 gap-4 place-items-center ">
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <InputBoxInput label="Contact Number "
                        data={{
                          id: "ContactNumber",
                          name: "ContactNumber",
                          value: InpValue.ContactNumber,
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
                      <InputBoxInput label="Purpose Of call"
                        data={{
                          id: "purpose",
                          name: "purpose",
                          value: InpValue.purpose,
                          placeholder: "Enter Call purpose",
                          required: "required",
                        }}
                        inputChangeHandler={inputChangeHandler}
                      />
                    </div>

                    {ShowConnectedFrom ? <ConnectedCallComponent FormType="Inbound" InpValue={InpValue} inputChangeHandler={inputChangeHandler} /> : <div>
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

                </div>
              </div>
              <div className="text-center items-center bg-slate-300 pb-3">
                {isLoading ? (
                  <button
                    type="button"
                    disabled
                    className=" bg-green-500 mt-3 text-white active:bg-orange-600  text-lg font-bold uppercase px-20 py-3 rounded outline-none hover:bg-cyan-600 focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    <i className="animate-spin fas fa-spinner  pr-3"></i>
                    Loading...
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="bg-green-500 mt-3 text-white active:bg-orange-600  text-lg font-bold uppercase px-20 py-3 rounded outline-none hover:bg-cyan-600 focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  >
                    <i className="fas fa-save pr-3"></i> Submit
                  </button>
                )}
              </div>

            </CommonPage>
          </form>
        </div>
      </div>
      {/* <FooterComponent /> */}
    </main>

  );
}
