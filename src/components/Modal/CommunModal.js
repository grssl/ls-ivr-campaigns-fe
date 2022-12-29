export default function CommunModal(props) {
  return (
    <>
      <button
        className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-2 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        type="button"
        onClick={() => props.setShowModal(true)}
      >
        <i className="fas fa-plus"></i> {props.btnName}
      </button>
      {props.showModal ? (
        <>
          <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="w-1/3 border-0 rounded-lg shadow-lg relative  bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                <h3 className="text-3xl font-semibold">{props.Title}</h3>
                <button
                  title="Close"
                  className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                  onClick={() => props.setShowModal(false)}
                >
                  <span className="bg-transparent text-red-500 h-6 w-6 text-2xl block outline-none focus:outline-none">
                    ×
                  </span>
                </button>
              </div>
              <div className="items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                {props.children}
              </div>
            </div>
          </div>
          <div className="opacity-60 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
