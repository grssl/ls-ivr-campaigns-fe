import React from "react";

const ViewTicketModal = ({ showViewModal, setShowViewModal, selectValue }) => {
  return (
    <>
      {showViewModal ? (
        <>
          <div className="flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative  my-6 mx-auto w-2/6">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex justify-center items-center p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    View Lead Information
                  </h3>
                  <button
                    title="Close"
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowViewModal(false)}
                  >
                    <span className="bg-transparent text-red-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*Body*/}
                <div className="p-4 flex-auto text-justify">
                  {selectValue.map((item, i) => (
                    <div
                      className="p-2 mb-3 rounded-lg shadow-lg bg-white w-auto"
                      key={`table${i}`}
                    >
                      {/* {JSON.stringify(item)} */}
                      <table>
                        <caption className="font-bold text-red-600 uppercase">
                          Ticket Id : &nbsp;&nbsp;&nbsp;{item.LeadID}
                        </caption>
                        <thead>
                          <tr className="text-green-500">
                            <th>Field</th>
                            <th>Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          <>
                            <tr>
                              <th>Campaign Name</th>
                              <td>{item.CampaignName}</td>
                            </tr>
                            <tr>
                              <th>Customer First Name</th>
                              <td>{item.CustomerFirstName}</td>
                            </tr>
                            <tr>
                              <th>Customer Last Name</th>
                              <td>{item.CustomerLastName}</td>
                            </tr>
                            <tr>
                              <th>Customer Phone Number</th>
                              <td>{item.CustomerPhoneNumber}</td>
                            </tr>
                            <tr>
                              <th>Customer Email Id</th>
                              <td>{item.CustomerEmailID}</td>
                            </tr>
                            <tr>
                              <th>Customer Reference</th>
                              <td>{item.CustomerReference}</td>
                            </tr>
                            <tr>
                              <th>Last State</th>
                              <td>{item.LastState}</td>
                            </tr>
                            <tr>
                              <th>Last Status</th>
                              <td>{item.LastStatus}</td>
                            </tr>
                            <tr>
                              <th> Category</th>
                              <td>{item.Category}</td>
                            </tr>
                            <tr>
                              <th> City</th>
                              <td>{item.City}</td>
                            </tr>
                            <tr>
                              <th> Interest For Webstore</th>
                              <td>{item.InterestForWebstore}</td>
                            </tr>
                            <tr>
                              <th> Company</th>
                              <td>{item.Company}</td>
                            </tr>
                            <tr>
                              <th> Business Type</th>
                              <td>{item.BusinessType}</td>
                            </tr>
                          </>
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-red-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowViewModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
};

export default ViewTicketModal;
