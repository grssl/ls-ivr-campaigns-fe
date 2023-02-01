export function SelectBoxInput(props) {
    return (<>
        <label className="block text-black text-sm font-bold mb-1 mt-3" htmlFor={props.data.id} >{props.label}</label>
        <select
            {...props.data}
            className="w-full form-select px-4  py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            onChange={props.inputChangeHandler}
        >
            <option value=""> Select one Options</option>
            {props.children}
        </select>
    </>)
}



export function InputBoxInput({ label, data, inputChangeHandler }) {
    return (<>
        <label className="block text-black text-sm font-bold mb-1 mt-3" htmlFor={data.id} >{label}</label>
        <input
            {...data}
            className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
            onChange={inputChangeHandler}
        />
    </>)

}
export function TextareaBoxInput({ label, data, inputChangeHandler }) {
    return (
        <>
            <label className="block text-black text-sm font-bold mb-1 mt-3" htmlFor={data.id}>
                {label}
            </label>
            <textarea
                {...data}
                className="shadow appearance-none border rounded w-full py-2 px-1 text-black"
                onChange={inputChangeHandler}
            />
        </>
    )
}