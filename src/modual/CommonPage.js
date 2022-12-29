export default function CommonPage(props) {
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="rounded-t mb-0 px-4 py-3 border-0 bg-orange-500">
        <div className="flex-wrap text-center">
          <h1 className="font-semibold  text-slate-700 text-2xl p-2 content-center">
            {props.title}
          </h1>
        </div>
      </div>
      <div className="items-center  bg-transparent border-collapse">
        {props.children}
      </div>
    </div>
  );
}
