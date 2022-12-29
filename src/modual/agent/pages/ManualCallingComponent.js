import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import CustomerInteractions from './CustomerInteractions';
import DiscussionForumManualCall from './DiscussionForumManualCall';
import { InputBoxInput } from './formdata/FormInputType';
import { toast } from 'react-toastify';

export default function ManualCallingComponent() {
    const { data } = useSelector((state) => state.UserDataReducer);
    const { userId } = data;
    const [FetchLeadData, setFetchLeadData] = useState({})
    const [InpValue, setInpValue] = useState({})
    const [isLoading, setIsLoading] = useState(false);
    const [IntrectionData, setIntrectionData] = useState([])

    const ManualCalllFormSubmitHandler = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const agentCallingId = userId;
        const customerNumber = InpValue.phoneNumber;
        const ActionID = userId
        const url = `${process.env.REACT_APP_MANUAL_CALL}agent_number=SIP/${agentCallingId}&customerNumber=${customerNumber}&ActionID=${ActionID}&AccountCode=${ActionID}`
        fetch(url)
            .then((res) => res.json())
            .then((response) => {
                if (response.Status === "Success") {
                    InpValue.AccountCode = response.AccountCode;
                    setFetchLeadData(InpValue)
                    toast.success("Call Initiated Successfully")
                    setIsLoading(false);
                    setInpValue({})
                } else {
                    setIsLoading(false);
                    toast.error("Call not connected")
                }
            })
            .catch((e) => {
                console.log("call", e);
                toast.error("Call not connected")
                setIsLoading(false);
            });
    }
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;
        setInpValue((prevState) => ({
            ...prevState,
            [name]: value,
        }));

    }

    const sh = window.screen.height;
    const ht = sh - (sh * 53) / 100;

    return (
        <>
            <div className="px-5">
                {Object.keys(FetchLeadData).length === 0 ?
                    <form className="py-4 px-4" onSubmit={ManualCalllFormSubmitHandler}>
                        <div className="grid grid-cols-2 gap-4 w-1/2 py-4 px-3">
                            <div>
                                <InputBoxInput label="Contact Number "
                                    data={{
                                        id: "phoneNumber",
                                        name: "phoneNumber",
                                        value: InpValue.phoneNumber,
                                        placeholder: "Customer contact number",
                                        required: "required",
                                    }}
                                    inputChangeHandler={inputChangeHandler}
                                />
                            </div>
                            <div className="mt-6">

                                <button
                                    disabled={isLoading}
                                    type={isLoading ? "button" : "submit"}
                                    className="bg-green-500 rounded-lg mt-3 text-white active:bg-indigo-600 text-xs font-bold uppercase px-5 py-3  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                >
                                    {isLoading ? <>
                                        <i className="animate-spin fas fa-spinner  pr-3"></i>
                                        Loading...
                                    </> :
                                        <>
                                            Call   <i className="fas fa-phone pl-1"></i>
                                        </>}
                                </button>

                            </div>
                        </div>
                    </form> : ""}
            </div>
            <div className="flex flex-wrap mt-4">
                {Object.keys(FetchLeadData).length > 0 ? (
                    <>
                        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                            <DiscussionForumManualCall
                                FetchLeadData={FetchLeadData}
                                setFetchLeadData={setFetchLeadData}
                                setIntrectionData={setIntrectionData}
                            />
                        </div>
                        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                            <CustomerInteractions IntrectionData={IntrectionData} />
                        </div>
                    </>
                ) : (
                    <div style={{ height: `${ht}px` }}></div>
                )}
            </div>

        </>
    );
}
