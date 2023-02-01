import React, { useState } from "react";
import { toast } from "react-toastify";
import TableComponent from "../../../../components/Table/TableComponent";
import APICall, { explodeDataWithRowTable } from '../../../../components/Api/APICall';
import { InputBoxInput } from '../../../agent/pages/formdata/FormInputType';

export default function ManualCallReportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [DataList, setDataList] = useState({
    row: [],
    dataWithRows: [],
    onlyData: []
  });

  const [InpValue, setInpValue] = useState({})

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInpValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const returnValue = (value) => {
    return value === undefined ? 0 : value;
  }
  const SearchReportHandler = (e) => {
    e.preventDefault();
    setDataList({
      row: [],
      dataWithRows: [],
      onlyData: []
    });
    setIsLoading(true);
    const req = {
      startDate: returnValue(InpValue.startDate),
      endDate: returnValue(InpValue.endDate),
    }
    APICall(`/mc/getMCInteractionsReport`, "POST", req).then(data => {
      if (data.status) {
        explodeDataWithRowTable(data.data, setDataList)
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
