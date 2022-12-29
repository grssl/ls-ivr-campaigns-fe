import React from 'react'

export default function DashboardCard({ data = [] }) {
    // data = [{ title: "", icon: "", iconBg: "",data:'' }] 
    return (
        <>
            <div className="flex flex-wrap">
                {data.map((item, i) => (
                    <div className="w-full md:w-1/2 xl:w-1/5 p-3" key={`card_DB_${i}`}>
                        <div className="bg-white border rounded shadow p-2">
                            <div className="flex flex-row items-center">
                                <div className="flex-shrink pr-4">
                                    <div className={`rounded p-3 ${(item.iconBg === undefined || item.iconBg === "") ? "bg-green-600" : (item.iconBg)}`}>
                                        <i className={`fa fa-${(item.icon === undefined || item.icon === "") ? "user" : (item.icon)} fa-2x fa-fw fa-inverse`} />
                                    </div>
                                </div>
                                <div className="flex-1 text-right md:text-center">
                                    <h5 className="font-bold uppercase text-gray-500">{item.title}</h5>
                                    <h3 className="font-bold text-3xl">{item.data}
                                        <span className="text-green-500">
                                        </span>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
