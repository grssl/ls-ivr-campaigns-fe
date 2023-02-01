import React, { useState } from "react";
import { toast } from "react-toastify";
import TableComponent from "../../../../components/Table/TableComponent";
import APICall, { explodeDataWithRowTable } from '../../../../components/Api/APICall';
import { InputBoxInput, SelectBoxInput } from '../../../agent/pages/formdata/FormInputType';
import dayjs from "dayjs";

const UserInputOption = (option, campType) => {
  let output = "";
  if (campType === "NDR") {
    switch (option) {
      case 1:
        output = "Re-attempt the delivery"
        break;
      case 2:
        output = "Cancel the order"
        break;
      case 3:
        output = "Order is already delivered"
        break;

      default:
        break;
    }
  } else if (campType === "CIR") {
    switch (option) {
      case 1:
        output = "Re-attempt the pickup "
        break;
      case 2:
        output = "Cancel the pickup"
        break;
      case 3:
        output = "Pickup is already done"
        break;

      default:
        break;
    }
  }

  return output;
}

export default function IVRCallReportPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [DataList, setDataList] = useState({
    row: [],
    dataWithRows: [],
    onlyData: []
  });

  const [InpValue, setInpValue] = useState({
    OptionType: 0,
    startDate: dayjs().format("YYYY-MM-DD"),
    endDate: dayjs().format("YYYY-MM-DD"),
    IvrType: "CIR"
  })

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setInpValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  const SearchReportHandler = (e) => {
    e.preventDefault();
    setDataList({
      row: [],
      dataWithRows: [],
      onlyData: []
    });
    setIsLoading(true);

    APICall(`/ivr/ivrdataReport`, "POST", InpValue).then(data => {
      if (data.status) {
        let temp = data.data.map(v => {
          // delete v.rid;
          delete v.file_id;
          return ({
            ...v,
            optionselected: UserInputOption(v.optionselected,v.campaign_type),
            updated_datetime: dayjs(v.updated_datetime).format("DD-MM-YYYY HH:mm:ss"),
            rdatetime: dayjs(v.updated_datetime).format("DD-MM-YYYY HH:mm:ss")
          })
        })
        explodeDataWithRowTable(temp, setDataList)
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
              label="Option Type"
              data={{
                id: "OptionType",
                name: "OptionType",
                value: InpValue.OptionType,
                required: "required",
              }}
              inputChangeHandler={inputChangeHandler}
            >
              <option value="0">All</option>
              <option value="1">Press 1</option>
              <option value="2">Press 2</option>
              <option value="3">Press 3</option>
            </SelectBoxInput>
          </div><div>
            <SelectBoxInput
              label="IVR Type"
              data={{
                id: "IvrType",
                name: "IvrType",
                value: InpValue.IvrType,
                required: "required",
              }}
              inputChangeHandler={inputChangeHandler}
            >
              <option value="CIR">Pickup</option>
              <option value="NDR">Delivery</option>
            </SelectBoxInput>
          </div>
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
              TicketsTitle={`IVR Report Details`}
            />
          </div>
        </>
        : ""}
    </>
  );
}
