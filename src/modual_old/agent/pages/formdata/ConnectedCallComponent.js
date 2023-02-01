import dayjs from "dayjs";
import { useEffect, useState } from "react";
import APICall from "../../../../components/Api/APICall";
import { InputBoxInput, SelectBoxInput } from "./FormInputType";
import { CallConnectivity, CallConnectivityInboundCall, ComfortableLanguage, InterestedFor, NotInterestedReason, ProductDealing, ShowOnlyRemarkOption, TechIssueCallDropDownOptions, TurnOver, TypeOfBusiness } from "./DropDownDataList";

function NameEmailContect({ InpValue, inputChangeHandler }) {
    return (<>
        <div>
            <InputBoxInput
                data={{
                    type: "text",
                    required: "required",
                    id: "name",
                    name: "UserName",
                    value: InpValue.UserName,
                    placeholder: "Customer Name "
                }}
                label="Customer Name "
                inputChangeHandler={inputChangeHandler}
            />
        </div>

        <div>
            <InputBoxInput
                label="User Email Address"
                data={{
                    type: "email",
                    required: "required",
                    id: "UserEmail",
                    name: "UserEmail",
                    value: InpValue.UserEmail,
                    placeholder: "EmailAddress",
                }}
                inputChangeHandler={inputChangeHandler}
            />
        </div>
        <div>
            <InputBoxInput
                label="Customer Mobile No."
                data={{
                    type: "tel",
                    required: "required",
                    id: "MobileNumber",
                    name: "MobileNumber",
                    value: InpValue.MobileNumber,
                    placeholder: "Customer Mobile No."
                }}
                inputChangeHandler={inputChangeHandler}
            />
        </div>
    </>)
}




export default function ConnectedCallComponent({ inputChangeHandler, InpValue, FormType = "Fetch" }) {
    const [CityDataList, setCityDataList] = useState([])
    const [StateList, setStateList] = useState([])
    const [ShowCallBack, setShowCallBack] = useState(false);
    const [InterestedForOption, setInterestedForOption] = useState(false);
    const [WrongNumber, setWrongNumber] = useState(false);
    const [Language, setLanguage] = useState(false);
    const [NotInterestedShow, setNotInterestedShow] = useState(false);
    const [AskingDetails, setAskingDetails] = useState(false);
    const [ShowTechnicalIssueOption, setShowTechnicalIssueOption] = useState(false);
    const [CallConnectivityFormOption, setCallConnectivityFormOption] = useState([]);
    const [ShowDemoDateTime, setShowDemoDateTime] = useState(false);



    useEffect(() => {
        if (InpValue.StateName !== undefined) {
            console.log("InpValue.StateName", InpValue.StateName);
            if (InpValue.StateName === 0) {
                setCityDataList([]);
            } else {
                APICall(`/getCity?StateId=${InpValue.StateName}`).then(data => {
                    if (data.length > 0) {
                        setCityDataList(data)
                    }
                })

            }
        }
    }, [InpValue.StateName])

    // call back 
    useEffect(() => {
        if (InpValue.CallConnectivity !== undefined) {
            setShowCallBack(false);
            setInterestedForOption(false);
            setLanguage(false);
            setNotInterestedShow(false);
            setAskingDetails(false);
            setWrongNumber(false);
            setShowTechnicalIssueOption(false)
            setShowDemoDateTime(false)

            switch (InpValue.CallConnectivity) {
                case "Call Back":
                    setShowCallBack(true);
                    break;
                case "Demo to be organised":
                    setShowDemoDateTime(true);
                    break;
                case "Interested":
                    setInterestedForOption(true);
                    break;
                case "Language Barrier":
                    setLanguage(true);
                    break;
                case "Not Interested":
                    setNotInterestedShow(true);
                    break;
                case "Asking details through Email/WhatsApp":
                    setAskingDetails(true);
                    break
                case "Tech Issue call / Any other issue call":
                    setShowTechnicalIssueOption(true);
                    setWrongNumber(true);
                    break
                default:

                    if (ShowOnlyRemarkOption.includes(InpValue.CallConnectivity)) {
                        setWrongNumber(true);
                    }
                    break;
            }

        }
    }, [InpValue.CallConnectivity])


    useEffect(() => {
        APICall("/getStates").then(data => {
            if (data.length > 0) {
                setStateList(data)
            }
        })
    }, [])
    useEffect(() => {
        switch (FormType) {
            case "Inbound":
                setCallConnectivityFormOption(CallConnectivityInboundCall);
                break;

            default:
                setCallConnectivityFormOption(CallConnectivity);
                break;
        }

    }, [FormType])

    return (
        <>
            {/* {JSON.stringify(ShowDemoDateTime)} */}
            <div>
                <SelectBoxInput
                    label="Call Connectivity"
                    data={{
                        id: "CallConnectivity",
                        name: "CallConnectivity",
                        value: InpValue.CallConnectivity,
                        required: "required"
                    }}
                    inputChangeHandler={inputChangeHandler}
                >
                    {
                        CallConnectivityFormOption.map((item, i) => (
                            <option value={item} key={`CallConnectivity${i}`}>{item}</option>
                        ))
                    }
                </SelectBoxInput>
            </div>
            {WrongNumber ?

                ShowTechnicalIssueOption ?
                    <div>
                        <SelectBoxInput
                            label="Tech Issue call / Any other issue call"
                            data={{
                                id: "TechIssueCall",
                                name: "TechIssueCall",
                                value: InpValue.TechIssueCall,
                                required: "required"
                            }}
                            inputChangeHandler={inputChangeHandler}
                        >
                            {
                                TechIssueCallDropDownOptions.map((item, i) => (
                                    <option value={item} key={`TechCallIssue${i}`}>{item}</option>
                                ))
                            }
                        </SelectBoxInput>
                    </div> : ""
                :
                <>{
                    ShowCallBack ?
                        <div>
                            <InputBoxInput
                                data={{
                                    type: "datetime-local",
                                    require,
                                    id: "CallBack",
                                    name: "CallBack",
                                    value: InpValue.CallBack,
                                    required: "required",
                                    min: `${dayjs().format("YYYY-MM-DDTH:s")}`,
                                }}
                                label="Call Back Date Time"
                                inputChangeHandler={inputChangeHandler}
                            />
                        </div>
                        :
                        Language ? <div>
                            <SelectBoxInput
                                label="Comfortable language to talk to Product Experts"
                                data={{
                                    required: "required",
                                    id: "ComfortableLanguage",
                                    name: "ComfortableLanguage",
                                    value: InpValue.ComfortableLanguage,

                                }}
                                inputChangeHandler={inputChangeHandler}
                            >
                                {
                                    ComfortableLanguage.map((item, i) => (
                                        <option value={item} key={`ComfortableLanguage${i}`}>{item}</option>
                                    ))
                                }
                            </SelectBoxInput>
                        </div> :
                            NotInterestedShow ?
                                <div>
                                    <SelectBoxInput
                                        label="Not Interested Reason"
                                        data={{
                                            required: "required",
                                            id: "NotInterestedReason",
                                            name: "NotInterestedReason",
                                            value: InpValue.NotInterestedReason,

                                        }}
                                        inputChangeHandler={inputChangeHandler}
                                    >
                                        {
                                            NotInterestedReason.map((item, i) => (
                                                <option value={item} key={`ComfortableLanguage${i}`}>{item}</option>
                                            ))
                                        }
                                    </SelectBoxInput>
                                </div>
                                :
                                AskingDetails ?
                                    <NameEmailContect InpValue={InpValue} inputChangeHandler={inputChangeHandler} />
                                    :
                                    ShowDemoDateTime ?
                                        <div>
                                            <InputBoxInput
                                                data={{
                                                    type: "datetime-local",
                                                    require,
                                                    id: "DemoDateTime",
                                                    name: "DemoDateTime",
                                                    value: InpValue.DemoDateTime,
                                                    required: "required",
                                                    min: `${dayjs().format("YYYY-MM-DDTH:s")}`,
                                                }}
                                                label="Schedule date and time "
                                                inputChangeHandler={inputChangeHandler}
                                            />
                                        </div> :
                                        <>
                                            <div>
                                                <SelectBoxInput
                                                    label="State"
                                                    data={{
                                                        required: "required",
                                                        id: "StateName",
                                                        name: "StateName",
                                                        value: InpValue.StateName,

                                                    }}
                                                    inputChangeHandler={inputChangeHandler}
                                                >
                                                    {
                                                        StateList.map((item, i) => (
                                                            <option value={item.StateId} key={`state_${i}`}>{item.StateName}</option>
                                                        ))
                                                    }
                                                </SelectBoxInput>

                                            </div>
                                            <div>
                                                <SelectBoxInput
                                                    label="City"
                                                    data={{
                                                        required: "required",
                                                        id: "CityName",
                                                        name: "CityName",
                                                        value: InpValue.CityName,

                                                    }}
                                                    inputChangeHandler={inputChangeHandler}
                                                >
                                                    {
                                                        CityDataList.map((item, i) => (
                                                            <option value={item.CityName} key={`city_${i}`}>{item.CityName}</option>
                                                        ))
                                                    }
                                                </SelectBoxInput>
                                            </div>
                                            <div>
                                                <SelectBoxInput
                                                    label="Turn over"
                                                    data={{
                                                        required: "required",
                                                        id: "TurnOver",
                                                        name: "TurnOver",
                                                        value: InpValue.TurnOver,

                                                    }}
                                                    inputChangeHandler={inputChangeHandler}
                                                >
                                                    {
                                                        TurnOver.map((item, i) => (
                                                            <option value={item} key={`TurnOver_${i}`}>{item}</option>
                                                        ))
                                                    }
                                                </SelectBoxInput>
                                            </div>
                                            <div>
                                                <SelectBoxInput
                                                    label="Type Of Business"
                                                    data={{
                                                        required: "required",
                                                        id: "TypeOfBusiness",
                                                        name: "TypeOfBusiness",
                                                        value: InpValue.TypeOfBusiness,

                                                    }}
                                                    inputChangeHandler={inputChangeHandler}
                                                >
                                                    {
                                                        TypeOfBusiness.map((item, i) => (
                                                            <option value={item} key={`TypeOfBusiness${i}`}>{item}</option>
                                                        ))
                                                    }
                                                </SelectBoxInput>
                                            </div>
                                            <div>
                                                <SelectBoxInput
                                                    label="Product Dealing"
                                                    data={{
                                                        required: "required",
                                                        id: "ProductDealing",
                                                        name: "ProductDealing",
                                                        value: InpValue.ProductDealing,

                                                    }}
                                                    inputChangeHandler={inputChangeHandler}
                                                >
                                                    {
                                                        ProductDealing.map((item, i) => (
                                                            <option value={item} key={`ProductDealing${i}`}>{item}</option>
                                                        ))
                                                    }
                                                </SelectBoxInput>
                                            </div>
                                            <div>
                                                <SelectBoxInput
                                                    label="Comfortable language to talk to Product Experts"
                                                    data={{
                                                        required: "required",
                                                        id: "ComfortableLanguage",
                                                        name: "ComfortableLanguage",
                                                        value: InpValue.ComfortableLanguage,

                                                    }}
                                                    inputChangeHandler={inputChangeHandler}
                                                >
                                                    {
                                                        ComfortableLanguage.map((item, i) => (
                                                            <option value={item} key={`ComfortableLanguage${i}`}>{item}</option>
                                                        ))
                                                    }
                                                </SelectBoxInput>
                                            </div>
                                            {
                                                InterestedForOption ? <>
                                                    <div>
                                                        <SelectBoxInput
                                                            label="Interested For"
                                                            data={{
                                                                required: "required",
                                                                id: "InterestedFor",
                                                                name: "InterestedFor",
                                                                value: InpValue.InterestedFor,

                                                            }}
                                                            inputChangeHandler={inputChangeHandler}
                                                        >
                                                            {
                                                                InterestedFor.map((item, i) => (
                                                                    <option value={item} key={`InterestedFor${i}`}>{item}</option>
                                                                ))
                                                            }
                                                        </SelectBoxInput>
                                                    </div>
                                                    <div>
                                                        <InputBoxInput
                                                            data={{
                                                                type: "datetime-local",
                                                                required: "required",
                                                                id: "AppointmentDateTime",
                                                                name: "AppointmentDateTime",
                                                                min: `${dayjs().format("YYYY-MM-DDTH:s")}`,
                                                                value: InpValue.AppointmentDateTime,
                                                            }}
                                                            label="Appointment Date Time"
                                                            inputChangeHandler={inputChangeHandler}
                                                        />
                                                    </div>
                                                </>
                                                    : ""
                                            }
                                        </>


                }
                </>
            }



        </>


    )
}

