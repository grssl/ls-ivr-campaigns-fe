import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateLocalStorageAuthData } from "../../../components/Api/APICall";
import CommonPage from '../../CommonPage';

export default function CustomerDetails({ setLiveCall, liveCall, FetchLeadData }) {
  const { data } = useSelector((state) => state.UserDataReducer);
  const { userId } = data;
  const userData = FetchLeadData;

  const dispatch = useDispatch();

  const clickToCallBtnHandler = () => {
    const agentCallingId = userId;
    const customerNumber = userData.phoneNumber;
    const ActionID = userData.rid;
    const url = `${process.env.REACT_APP_MANUAL_CALL}agent_number=SIP/${agentCallingId}&customerNumber=${customerNumber}&ActionID=${ActionID}&AccountCode=${ActionID}`
    fetch(url)
      .then((res) => res.json())
      .then(() => {
        UpdateLocalStorageAuthData(data, dispatch, false);
        setLiveCall(true);
      })
      .catch((e) => {
        console.log("call", e);
      });
  }
  let TableCalumn = []
  if (FetchLeadData.fields !== undefined) {
    TableCalumn = Object.keys(FetchLeadData.fields);
  }

  return (
    <CommonPage>
      {/* {JSON.stringify(FetchLeadData.fields)} */}
      <div className="grid grid-cols-12 gap-4 px-4">
        <div className="col-span-10">
          <h1 className="font-semibold text-xl text-slate-700 text-center">
            User Information
          </h1>
        </div>
        <div className="col-span-2 ">
          {!liveCall ? (
            <button
              className="bg-green-500 w-full text-white active:bg-indigo-600 text-xs font-bold uppercase  py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              title="Call Now"
              onClick={clickToCallBtnHandler}
            >
              Call Now <i className="fas fa-phone"></i>
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="p-6 overflow-auto">
        <table className="items-center w-full  bg-transparent border-collapse">
          {
            TableCalumn.map((item, i) => (
              <tr className="px-4  text-slate-500 align-middle border border-solid border-blueGray-100  text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                <th className="pl-3 py-3 bg-gray-50">{TableCalumn[i]}</th>
                <td className="pl-3 py-3 bg-gray-100">{FetchLeadData.fields[item]}</td>
              </tr>
            ))
          }
        </table>
      </div>
    </CommonPage>
  );
}
