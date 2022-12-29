import React from "react";
import { Formiz, FormizStep } from "@formiz/core";
import DispositionInputField from "./DispositionInputField";

const DispositionFormWizard = ({
  inputes,
  showStep = false,
  submitForm,
  isLoading,
  myForm,
  grid = "grid-cals-1",
  titleText,
  setFormInput,
  setFormInputValue,
  currentStep,
  FormInput,
  FormTitle,
}) => {
  return (
    <Formiz onValidSubmit={submitForm} connect={myForm}>
      <form
        noValidate
        onSubmit={myForm.submitStep}
        className="shadow-md rounded px-3 w-full"
      >
        {showStep ? (
          <div className="pb-5 border-b border-solid border-slate-200 rounded-t">
            <ol className="flex flex-row ml-8 mb-6  w-full">
              {myForm.steps.map((step, i) => (
                <li
                  className={`w-2/6 ${myForm.steps.length - 1 === i
                    ? ""
                    : i <= myForm.currentStep.index - 1
                      ? "border-t-4 border-green-500"
                      : "border-t-4 border-gray-200"
                    }`}
                >
                  <div
                    className={`absolute w-8 h-8 text-center p-1 -mt-4 -ml-4 ${i <= myForm.currentStep.index - 1
                      ? "bg-green-500"
                      : "bg-gray-300"
                      } rounded-full border border-white `}
                  >
                    {i + 1}
                  </div>
                  <p className={`absolute pl-4 mb-4 font-normal text-gray-500 dark:text-gray-400 ${titleText ? titleText : 'text-base'}`}>
                    {step.name}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          ""
        )}
        <div>
          {inputes.map((item, i) => (
            <FormizStep name={item.title}>
              <div className={`grid ${grid}`}>
                {item.fileds.map((filed, i) => (
                  <DispositionInputField
                    {...filed} key={`inp${i}`}
                    setFormInput={setFormInput}
                    setFormInputValue={setFormInputValue}
                    currentStep={currentStep}
                    FormInput={FormInput}
                    index={i}
                  />
                ))}
              </div>
            </FormizStep>
          ))}
        </div>
        <div className="container p-5">
          <div className="float-left">
            {!myForm.isFirstStep && (
              <button
                className="bg-red-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-5 py-2.5 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={myForm.prevStep}
              >
                Previous
              </button>
            )}
          </div>
          <div className="float-right">
            {myForm.isLastStep ? (
              <button
                className="bg-green-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-5 py-2.5 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                disabled={
                  isLoading || (!myForm.isValid && myForm.isStepSubmitted)
                }
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            ) : (
              <button
                className="bg-blue-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-5 py-2.5 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="submit"
                disabled={!myForm.isStepValid && myForm.isStepSubmitted}
              >
                Next
              </button>
            )}
          </div>
          <div className="clear-both"></div>
        </div>
      </form>
    </Formiz>
  );
};
export default DispositionFormWizard;
