import React, { useEffect, useState } from 'react'
import DashboardCard from '../../../components/Dahboard-card/DashboardCard'

export default function DashboardTodayCount({ AdminDashboardDatList }) {

    const [AdminDashboardCard, setAdminDashboardCard] = useState([])

    useEffect(() => {
        const tempData = AdminDashboardDatList;
        const temp = [
            {
                title: "Total Leads",
                icon: "",
                iconBg: "",
                data: tempData.totalLeadCount
            }, {
                title: "Contacted",
                icon: "file-download",
                iconBg: "bg-pink-600",
                data: tempData.FetcheLeadsCount
            }, {
                title: "Pending",
                icon: "folder",
                iconBg: "bg-yellow-600",
                data: tempData.leadStatusNEWCount
            },
            /*  {
               title: "Lead Status OPEN",
               icon: "folder-open",
               iconBg: "bg-blue-600",
               data: tempData.leadStatusOPENCount
             },  */
            {
                title: "INTERESTED",
                icon: "newspaper",
                iconBg: "bg-indigo-600",
                data: tempData.leadStatusCLOSECount
            }, {
                title: "Callbacks",
                icon: "clock",
                iconBg: "bg-red-600",
                data: tempData.callbackStatusCount
            },
        ]
        setAdminDashboardCard(temp)


    }, [AdminDashboardDatList])




    return (
        <>
            <h3 className="text-center font-bold text-xl uppercase bg-orange-200 p-2 "> Today campaign Report </h3>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                {
                    AdminDashboardCard.length > 0 ?
                        <DashboardCard data={AdminDashboardCard} /> : ''
                }
            </div>

        </>
    )
}
