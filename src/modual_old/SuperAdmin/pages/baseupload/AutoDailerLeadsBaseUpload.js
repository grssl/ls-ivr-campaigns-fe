import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import { toast } from "react-toastify";
import { useForm } from "@formiz/core";
import dayjs from "dayjs";
import APICall from '../../../../components/Api/APICall';
import TableComponent from '../../../../components/Table/TableComponent';
import CommunModal from '../../../../components/Modal/CommunModal';
import FormWizard from "../../../../components/Form/FormWizard";

function generateAccountCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return dayjs().format("YYMMDD") + result;
}

function chunkArrayInGroups(arr, size) {
    var newArr = [];
    for (var i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size));
    }
    return newArr;
}



export default function AutoDailerLeadsBaseUpload() {
    const [ShowModal, setShowModal] = useState(false);
    const [isDisabled, setDisabled] = useState(true);
    const [parsedData, setParsedData] = useState([]);
    const [tableRows, setTableRows] = useState([]);
    const [QuaueListData, setQuaueListData] = useState([]);

    const [InputFileData, setInputFileData] = useState({});
    const CampaigndataUpload = async (campId) => {

        const finarray = parsedData.map(row => (
            {
                phoneNumber: row.phoneNumber,
                leadName: row.leadName,
                campaignId: InputFileData.CampaignName,
                campaignName: InputFileData.fileName,
                campaignPriority: 0,
                queueId:InputFileData.QueueID,
                campaignStartDate: InputFileData.campaignStartDate,
                campaignEndDate: InputFileData.campaignEndDate,
                agentId: row.agentId,
                priority: row.priority,
                elastixCampaignId: campId,
                rid: generateAccountCode(18),
                fields: row
            }
        ))
        console.log("finarray", finarray);

        const finarrayChunckInGroup = chunkArrayInGroups(finarray, 2000);
        const sleep = m => new Promise(r => setTimeout(r, m));
        let i = 1;
        for (const item of finarrayChunckInGroup) {
            let a = i;
            await APICall(`/uploadLeadsMultiple`, "POST", item)
                .then(() => {
                    toast.success(`${a}/${finarrayChunckInGroup.length} Data uploaded successfully`);
                })
                .catch((error) => {

                    toast.error(error);
                });
            i++;
            await sleep(2000);
        }
        if (i > 1) {
            toast.success("Data Saved Successfully");
        }
    }

    const campaignfilesAPI = async () => {
        toast.info("Please wait.. Campaign process starting...")
        const temp = {
            ...InputFileData,
            StartDateTime: dayjs(InputFileData.campaignStartDate).format('YYYY-MM-DD HH:mm:ss'),
            EndDateTime: dayjs(InputFileData.campaignEndDate).format('YYYY-MM-DD HH:mm:ss'),
        }
        APICall("/elastisk/elastiskroutes/updateCampaignElastix", "POST", temp).then(async (response) => {
            if (response.status) {
                toast.info("Campaign created successfully.Data Upload process starting...")
                await CampaigndataUpload(response.data[0].last_id);
                alert(response.data[0].last_id)
            } else {
                toast.error("Campaign not created. please try again")
            }
        })
    };



    const uploadFileHandler = async (e) => { //async added..
        const { id } = e.target;
        if (id === "delete") {
            setParsedData([]);
            setTableRows([]);
            // setValues([]);
            setDisabled(false);
            setInputFileData({});
            toast.warning("Data Cleared Successfully");
        } else {
            setDisabled(true);
            toast.success("Please wait...");
            await campaignfilesAPI();
        }
    };
    const col = tableRows.map((row) => ({ accessor: row, Header: row }));

    useEffect(() => {

        if (tableRows.length > 0) {
            if (tableRows.includes("leadName") !== true) {
                toast.error("leadName is required in sheet");
            } else if (tableRows.includes("phoneNumber") !== true) {
                toast.error("phoneNumber is required in sheet");
            } else if (tableRows.includes("agentId") !== true) {
                toast.error("agentId is required in sheet");
            } else if (tableRows.includes("priority") !== true) {
                toast.error("priority is required in sheet");
            } else {
                setDisabled(true);
                const errorList = parsedData.map((row, i) => {
                    if (row.leadName === "") {
                        return (`leadName is not emptyCheck Row Number: ${i + 1}`);
                    }
                    if (row.phoneNumber === "") {
                        return (`phoneNumber is not empty Check Row Number: ${i + 1}`);
                    }
                    if (row.phoneNumber.length < 10 || row.phoneNumber.length > 12) {
                        return (`phoneNumber is not Valid Check Row Number: ${i + 1}`);
                    }
                    return ''
                });
                let er = errorList.filter(v => v !== "")
                if (er.length > 0) {
                    er.map(v => {
                        toast.error(v)
                        return ""
                    })
                } else {
                    toast.success("Good Job data is completed useable");
                    setDisabled(false);
                }
            }
        }
    }, [tableRows, parsedData]);
    const CampInputFildes = useMemo(() => [
        {
            title: "Campaign Form",
            fileds: [
                {
                    name: "QueueID",
                    label: "Queue Name",
                    required: "Queue Name is required",
                    type: "select",
                    options: [
                        { label: "Select Queue Name", value: "" },
                        ...QuaueListData.map(v => ({ label: v.Name, value: v.ID }))
                    ]
                }, {
                    name: "CampaignName",
                    label: "Campaign Name",
                    required: "Campaign name is required",
                    type: "text",
                },
                {
                    name: "campaignStartDate",
                    label: "Start Date",
                    required: "Start Date is required",
                    type: "datetime-local",
                }, {
                    name: "campaignEndDate",
                    label: "End Date",
                    required: "End Date is required",
                    type: "datetime-local",
                },
            ],
        },
    ], [QuaueListData]);

    const [isLoadingCampaign, setIsLoadingCampaign] = useState(false);
    const myForm = useForm();
    const SubmitCampaignForm = (values) => {
        setIsLoadingCampaign(true);
        setInputFileData(v => ({ ...v, ...values }))
        setShowModal(false);
        setIsLoadingCampaign(false); //false
    }
    const changeHandler = (event) => {
        const tmpFVal = event.target.value;
        const tempSlice = tmpFVal.split("\\");
        setInputFileData(v => ({ ...v, fileName: tempSlice[tempSlice.length - 1] }));
        setDisabled(true);
        setIsLoadingCampaign(false);
        // Passing file data (event.target.files[0]) to parse using Papa.parse
        Papa.parse(event.target.files[0], {
            header: true,
            skipEmptyLines: true,
            complete: function (results) {
                const rowsArray = [];
                const valuesArray = [];

                // Iterating data to get column name and their values
                results.data.map((d) => {
                    rowsArray.push(Object.keys(d));
                    valuesArray.push(Object.values(d));
                    return "";
                });

                // Parsed Data Response in array format
                setParsedData(results.data);

                // Filtered Column Names
                setTableRows(rowsArray[0]);

                // Filtered Values
                // setValues(valuesArray);
            },
        });
    };
    useEffect(() => {
        APICall("/elastisk/elastiskroutes/getQueueListfromElastix").then((response) => {
            if (response.status) {
                setQuaueListData(response.data)
            }
        })
    }, [])


    return (
        <>

            <TableComponent
                columns={col}
                data={parsedData}
                pagination={true}
                exportData={false}
                TicketsTitle={`Upload Autodialer ${InputFileData.CampaignName === undefined ? "" : InputFileData.CampaignName} Campaign Data `}
                other={
                    <>
                        {parsedData.length > 0 ? (
                            <>
                                <button
                                    className="mr-10 bg-red-500 text-white active:bg-pink-600 text-xs font-bold uppercase px-3 py-2.5 rounded outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    id="delete"
                                    onClick={(e) => uploadFileHandler(e)}
                                >
                                    <i className="fas fa-trash"></i> Clear data
                                </button>

                                <button
                                    className="mr-10 bg-green-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-2.5 rounded outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    id="upload"
                                    onClick={(e) => uploadFileHandler(e)}
                                    disabled={isDisabled}
                                >
                                    <i className="fas fa-paper-plane"></i> Submit Data
                                </button>
                            </>
                        ) : (
                            <>
                                {
                                    (InputFileData.CampaignName !== undefined && InputFileData.CampaignName.length > 0) ?

                                        <input
                                            type="file"
                                            name="file"
                                            onChange={changeHandler}
                                            accept=".csv"
                                            className="mr-2 py-1.5 px-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                                        /> :
                                        <CommunModal
                                            showModal={ShowModal}
                                            setShowModal={setShowModal}
                                            btnName="Add New Campaing"
                                            Title="Autodialer Campaign"
                                        >
                                            <FormWizard
                                                inputes={CampInputFildes}
                                                showStep={false}
                                                isLoading={isLoadingCampaign}
                                                submitForm={SubmitCampaignForm}
                                                myForm={myForm}
                                            />
                                        </CommunModal>
                                }
                            </>
                        )}
                    </>
                }
            />
        </>
    );


}
