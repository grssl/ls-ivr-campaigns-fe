import React, { useEffect, useState } from "react";
import TableComponent from "../../../components/Table/TableComponent";
import CommanApiGETFunction from '../../CommanApiFunction';

export default function AgentLiveStatus() {
    const [DataList, setDataList] = useState({
        row: [],
        dataWithRows: [],
    })
    useEffect(() => {
        CommanApiGETFunction(`/elastisk/agentStatus`, setDataList)
    }, []);
    return (
        <>
            {DataList.row.length > 0 ?
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
                    <TableComponent
                        columns={DataList.row}
                        data={DataList.dataWithRows}
                        selectOption={{ show: false, }}
                        pagination={false}
                        exportData={false}
                        TicketsTitle={`Agent Live Status`}
                    />
                </div>
                : ""}
        </>
    );
}
