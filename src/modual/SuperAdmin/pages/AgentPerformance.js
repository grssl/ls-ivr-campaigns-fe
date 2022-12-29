import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/Table/TableComponent";
import CommanApiGETFunction from '../../CommanApiFunction';

export default function AgentPerformance() {
    const [DataList, setDataList] = useState({
        row: [],
        dataWithRows: [],
    })
    useEffect(() => {
        CommanApiGETFunction(`/elastisk/agentPerformance?startDate=${dayjs().format("YYYY-MM-DD")}&endDate=${dayjs().format("YYYY-MM-DD")}`, setDataList)
    }, []);
    return (
        <>
            {DataList.row.length > 0 ?
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <TableComponent
                        columns={DataList.row}
                        data={DataList.dataWithRows}
                        selectOption={{ show: false, }}
                        pagination={true}
                        exportData={true}
                        TicketsTitle={`Agent Performance`}
                    />
                </div>
                : ""}
        </>
    );
}
