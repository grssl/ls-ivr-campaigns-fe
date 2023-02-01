import CommonPage from "../../CommonPage";

export default function CustomerInteractions({ IntrectionData }) {

  return (
    <CommonPage>
      <h1 className="font-semibold text-xl text-slate-700 text-center mb-4">
        Customer Interactions Report - {IntrectionData.length > 0 ? IntrectionData[0].leadName : ""}
      </h1>
      <div className="p-2 overflow-auto">
        <table className="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr className="px-4  bg-blue-400 align-middle border border-solid border-blueGray-100  text-sm uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
              <th className="pl-3 py-3 ">leadName</th>
              <th className="pl-3 py-3">Remarks</th>
              <th className="pl-3 py-3 ">CallStatus</th>
              <th className="pl-3 py-3 ">Callback Time</th>
              <th className="pl-3 py-3 ">Action Date</th>
            </tr>
          </thead>
          <tbody>
            {IntrectionData.map((item) => (
              <tr className="px-4  text-slate-500 align-middle border border-solid border-blueGray-100 uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-xs">
                <td className="pl-3 py-3 bg-gray-50">{item.leadName}</td>
                <td className="pl-3 py-3 bg-gray-50">{item.Notes}</td>
                <td className="pl-3 py-3 bg-gray-50">{item.CallStatus}</td>
                <td className="pl-3 py-3 bg-gray-50">{item.callback}</td>
                <td className="pl-3 py-3 bg-gray-50">{item.submitTime}</td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </CommonPage>
  );
}
