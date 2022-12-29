import React, { useEffect, useState } from 'react'
const activeTabCss = `bg-green-600 text-gray-200 `

export default function TabComponent({ tabData = [] }) {
    const [ActiveTabData, setActiveTabData] = useState({})

    const TabClickHandler = (item) => {
        setActiveTabData(item)
    }
    useEffect(() => {
        if (tabData.length > 0) {
            setActiveTabData(tabData[0])
        }
    }, [tabData])


    return (
        <div className={`my-4`}>
            <ul className={`flex flex-wrap text-sm font-medium text-center text-gray-100 border-b border-gray-300 dark:border-gray-700 dark:text-gray-400 bg-gray-200`}>
                {tabData.map((item, i) => (<li className={`mr-2`} key={`tavView_${i}`} onClick={() => TabClickHandler(item)}>
                    <div className={`${ActiveTabData.title === item.title ? activeTabCss : "bg-gray-300 text-gray-800 "} cursor-pointer rounded-t-lg inline-block p-3 px-8  dark:bg-gray-800 dark:text-blue-500`}>{item.title}</div>
                </li>)
                )}
            </ul>
            {
                Object.keys(ActiveTabData).length > 0 ?
                    ActiveTabData.PageComponent
                    : ""
            }
        </div>

    )
}
