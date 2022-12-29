import React, { useEffect, useState } from 'react'
import DashboardCard from '../../../components/Dahboard-card/DashboardCard'
import APICall from '../../../components/Api/APICall';

export default function DashboardCallTrendCount() {

    const [AdminDashboardCard, setAdminDashboardCard] = useState([])
    const [CampaignCounts, setCampaignCounts] = useState({})
    const [ElastixCampaignIds, setElastixCampaignIds] = useState([])
    useEffect(() => {
        APICall(`/getCampaigns?campType=autodailler`).then((response) => {
            if (response.length > 0) {
                const tempData = response.filter(data => data.campaignEnable);
                const ids = tempData.map(data => data.elastixCampaignId)
                setElastixCampaignIds(ids)
            }
        })
    }, [])
    useEffect(() => {
        if (ElastixCampaignIds.length > 0) {
            APICall(`/elastisk/call/getAutoDialerCallCount?CampaignID=${ElastixCampaignIds.join(",")}`).then((response) => {
                if (response.status) {
                    if (response.data.length > 0) {
                        setCampaignCounts(response.data[0])
                    }
                }
            })
        }
    }, [ElastixCampaignIds])


    useEffect(() => {
        const tempData = CampaignCounts;
        const temp = [
            {
                title: "Total Leads",
                icon: "",
                iconBg: "",
                data: tempData.TotalLeads
            }, {
                title: "Fetch Leads",
                icon: "file-download",
                iconBg: "bg-pink-600",
                data: tempData.Fetched
            }, {
                title: "Pending",
                icon: "folder",
                iconBg: "bg-yellow-600",
                data: tempData.NotFetched
            },
            {
                title: "Failure Leads",
                icon: "newspaper",
                iconBg: "bg-indigo-600",
                data: tempData.Failure
            }, {
                title: "Connected",
                icon: "clock",
                iconBg: "bg-red-600",
                data: tempData.Success
            },
            {
                title: "Abandoned",
                icon: "folder-open",
                iconBg: "bg-blue-600",
                data: tempData.Abandoned
            },
        ]
        setAdminDashboardCard(temp)
    }, [CampaignCounts])




    return (
        <>

            {/* {JSON.stringify(CampaignCounts)} */}
            <h3 className="text-center font-bold text-xl uppercase bg-orange-200 p-2 "> Autodailer Call Trend </h3>
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                {
                    AdminDashboardCard.length > 0 ?
                        <DashboardCard data={AdminDashboardCard} /> : ''
                }
            </div>

        </>
    )
}
