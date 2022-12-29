import React from "react";
import { useField } from "@formiz/core";

const MyField = (props) => {
  const {
    errorMessage,
    id,
    isValid,
    isPristine,
    isSubmitted,
    resetKey,
    setValue,
    value,
  } = useField(props);

  const { name, label, required, defaultValue, type, readOnly } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const showError = !isValid && !isFocused && (!isPristine || isSubmitted);



  return (
    <div className={`form-group ${showError ? "is-error" : ""} text-left`}>
      {type === "checkbox" || type === "radio" ? (
        ""
      ) : (
        <label className="block  text-sm font-bold mb-1" htmlFor={id}>
          {label}
          {required && "*"}
        </label>
      )}
      {type === "checkbox" || type === "radio" ? (
        <label className="block  text-sm font-bold m-1" htmlFor={id}>
          <input
            key={resetKey}
            id={id}
            name={name}
            defaultValue={defaultValue}
            onChange={(e) => setValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            type="radio"
            className="form-checkbox border-0 rounded text-slate-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
          />
          <span className="ml-2 text-sm font-semibold text-slate-600">
            {label}
          </span>
        </label>
      ) : type === "select" ? (
        <select
          className="form-select w-full px-4  py-3 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          key={resetKey}
          id={id}
          value={value || ""}
          name={name}
          defaultValue={defaultValue}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!isValid}
          aria-describedby={!isValid ? `${id}-error` : null}
        >
          {props.options.map((item) => (
            <option value={item.value}>{item.label}</option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          key={resetKey}
          id={id}
          type={type || "text"}
          value={value || ""}
          name={name}
          defaultValue={defaultValue}
          className="shadow appearance-none border rounded w-full py-2 px-1 "
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!isValid}
          aria-describedby={!isValid ? `${id}-error` : null}
        />
      ) : (
        <input
          key={resetKey}
          id={id}
          type={type || "text"}
          value={value || ""}
          readOnly={readOnly || false}
          name={name}
          defaultValue={defaultValue}
          className="shadow appearance-none border rounded w-full py-2 px-1 "
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!isValid}
          aria-describedby={!isValid ? `${id}-error` : null}
        />
      )}
      {showError && (
        <div id={`${id}-error`} className="text-red-500">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default MyField;
