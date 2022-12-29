import React from "react";
import { useField } from "@formiz/core";

const DispositionInputField = (props) => {
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
  const {
    name,
    label,
    required,
    defaultValue,
    type,
    setFormInput,
    setFormInputValue,
    currentStep,
    FormInput,
    index,
  } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const showError = !isValid && !isFocused && (!isPristine || isSubmitted);

  const inputStepMaping = (val, FormInput) => {

    setFormInputValue((v) => ({ ...v, [name]: val.mainOptionValue }));

    // set form input filed

    let index = FormInput[currentStep].fileds
      .map((o) => o.parentName)
      .indexOf(name);
    // alert(index)
    if (index > 0) {
      if (index === 1) {
        console.log(
          "FormInput[currentStep].fileds",
          FormInput[currentStep].fileds
        );
        for (let i = FormInput[currentStep].fileds.length; i > 0; i--) {
          FormInput[currentStep].fileds.splice(i, 1);
        }
        FormInput[currentStep].fileds[index] = val;
      } else {
        FormInput[currentStep].fileds[index] = val;
      }
    } else {
      if (val !== undefined) {
        FormInput[currentStep].fileds.push(val);
      }
    }
    return FormInput;
  }

  const InputOnChangeHandles = (e) => {
    let { name, value } = e.target;
    value = JSON.parse(value)
    console.log("value", value);
    // alert(JSON.stringify(value))
    setValue(value);
    if (value === "0" || value === 0) {
      FormInput[currentStep].fileds.splice(1, 1);
      setFormInput((v) => FormInput);
    }
    if (Array.isArray(value)) {
      let val = value[0];
      let result = inputStepMaping(val, FormInput);
      setFormInput((v) => result);
    } else if (typeof value === "object") {
      let result = inputStepMaping(value, FormInput);
      setFormInput((v) => result);
    }
    else {
      setFormInputValue((v) => ({ ...v, [name]: value }));
    }
  };

  return (
    <div className={`form-group ${showError ? "is-error" : ""} text-left`} key={`inp_con_${index}`}>
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
            onChange={(e) => InputOnChangeHandles(e)}
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
          value={JSON.stringify(value) || ""}
          name={name}
          defaultValue={defaultValue}
          onChange={(e) => InputOnChangeHandles(e)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={!isValid}
          aria-describedby={!isValid ? `${id}-error` : null}
        >
          <option value={0}>Select Option</option>
          {props.options.map((item, i) => (
            <option value={JSON.stringify(item.value)}>{item.label}</option>
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
          onChange={(e) => InputOnChangeHandles(e)}
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
          name={name}
          defaultValue={defaultValue}
          className="shadow appearance-none border rounded w-full py-2 px-1 "
          onChange={(e) => InputOnChangeHandles(e)}
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

export default DispositionInputField;
