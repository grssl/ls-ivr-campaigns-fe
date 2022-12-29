import React from "react";
import { useSelector } from "react-redux";
export default function TableTicketTimelie() {
  const ticketData = useSelector((state) => state.ticketTimeline.data);
  const ticketStatus = ["open", "close", "assigned"];

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white mr-auto w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-slate-700 uppercase">
                Ticket Timeline
              </h3>
            </div>
            <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
              <button
                className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
              >
                See all
              </button>
            </div>
          </div>
        </div>

        <ol className="relative border-l-4 ml-6 border-gray-200 dark:border-gray-700">
          {ticketData.map((item, i) => {
            return (
              <>
                <li className="mb-5 ml-4 " key={`ticket${i}`}>
                  <div className="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -left-2 border border-white dark:border-gray-900 dark:bg-green-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                    {item.createdAt}
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    ticket created {item.ticketID}
                  </h3>
                  <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
                    {item.ticketTitle}
                  </p>
                </li>
                <li className="mb-5 ml-4">
                  <div className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -left-2 border border-white dark:border-gray-900 dark:bg-green-700"></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
                  {item.updatedAt}
                  </time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    ticket assigned
                  </h3>
                  <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                    Assigned to {item.ticketAsignee}
                  </p>
                </li>
              </>
            );
          })}
        </ol>
        <ol className="relative border-l-4 ml-6 border-gray-200 dark:border-gray-700">
          <li className="mb-5 ml-4 ">
            <div className="absolute w-3 h-3 bg-gray-500 rounded-full mt-1.5 -left-2 border border-white dark:border-gray-900 dark:bg-green-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              2022-03-25 10:00:01
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              ticket created MH00024
            </h3>
            <p className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400">
              Physiotherapy session Request
            </p>
          </li>
          <li className="mb-5 ml-4">
            <div className="absolute w-3 h-3 bg-green-500 rounded-full mt-1.5 -left-2 border border-white dark:border-gray-900 dark:bg-green-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              2022-03-25 11:01:00
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              ticket assigned
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Assigned to Selvam
            </p>
          </li>
          <li className="mb-5 ml-4">
            <div className="absolute w-3 h-3 bg-red-500 rounded-full mt-1.5 -left-2 border border-white dark:border-gray-900 dark:bg-green-700"></div>
            <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
              2022-03-25 12:00:05
            </time>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              ticket closed
            </h3>
            <p className="text-base font-normal text-gray-500 dark:text-gray-400">
              Appointment Confirmed with Physiotherapist
            </p>
          </li>
        </ol>
      </div>
    </>
  );
}
