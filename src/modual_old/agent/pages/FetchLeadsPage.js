import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import DiscussionForum from './DiscussionForum';
import CustomerInteractions from './CustomerInteractions';
import CustomerDetails from './CustomerDetails';
import APICall, { UpdateLocalStorageAuthData } from '../../../components/Api/APICall';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';

export default function FetchLeadsPage() {
    const { data } = useSelector((state) => state.UserDataReducer);

    const { userId, rid } = data;
    const [FetchLeadData, setFetchLeadData] = useState({})
    const [liveCall, setLiveCall] = useState(false);

    const dispatch = useDispatch();

    const fetchDataHandler = () => {
        let agentId = userId;
        APICall("/fetchLead", "POST", { agentId, rid }).then((response) => {
            if (response.status) {
                setFetchLeadData(response.data);
                let temp = {
                    ...data,
                    rid: response.data.rid
                }
                UpdateLocalStorageAuthData(temp, dispatch, false);
            } else {
                toast.info("Leads Exhausted")
            }
        }).catch((err) => {
            console.log(err);
        })
    };

    // useEffect(() => {
    //     if (data.liveStatus === "Fetch") {
    //         fetchDataHandler();
    //         setLiveCall(true);
    //     }
    // }, [data])


    // footer size
    const sh = window.screen.height;
    const ht = sh - (sh * 53) / 100;

    return (
        <>
            {/* {JSON.stringify(FetchLeadData)} */}
            <div className="px-5">
                {Object.keys(FetchLeadData).length === 0 ?
                    <button
                        className="my-4 bg-green-500 text-white active:bg-blue-600 text-xs font-bold uppercase px-3 py-2.5 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        onClick={fetchDataHandler}
                    >
                        Fetch Records <i className="fas fa-folder pl-2"></i>
                    </button> : ""}

                {Object.keys(FetchLeadData).length > 0 ? (
                    <div
                        className={`bg-orange-500  w-full text-white active:bg-blue-600 text-xs  uppercase px-3 py-2.5 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    >
                        <marquee scrollamount="2">
                            Lead Status :
                            <b className="font-bold">{FetchLeadData.leadStatus}</b>
                            &nbsp;&nbsp;&nbsp; Caller Name :
                            <b className="font-bold"> {FetchLeadData.leadName}
                            </b>
                            Campaign Name :
                            <b className="font-bold">{FetchLeadData.campaignId}</b> {"  "}
                            Campaign End  Date :
                            <b className="font-bold"> {dayjs(FetchLeadData.campaignEndDate).format("dddd DD-MM-YYYY H:s:i A ")}</b>
                        </marquee>
                    </div>
                ) : (
                    ""
                )}
            </div>
            <div className="flex flex-wrap mt-4">
                {liveCall ? (
                    <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                        <DiscussionForum
                            setLiveCall={setLiveCall}
                            FetchLeadData={FetchLeadData}
                            setFetchLeadData={setFetchLeadData}
                        />
                    </div>
                ) : (
                    ""
                )}
                {Object.keys(FetchLeadData).length > 0 ? (
                    <>
                        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                            <CustomerInteractions FetchLeadData={FetchLeadData} />
                        </div>
                        <div className="w-full xl:w-6/12 mb-12 xl:mb-0 px-4">
                            <CustomerDetails
                                setLiveCall={setLiveCall}
                                liveCall={liveCall}
                                FetchLeadData={FetchLeadData}
                            />
                        </div>
                    </>
                ) : (
                    <div style={{ height: `${ht}px` }}></div>
                )}
            </div>

        </>
    );
}
