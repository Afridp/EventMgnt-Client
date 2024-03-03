/* eslint-disable react/prop-types */
import { Tooltip } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { getEventForm, submitForm } from "../../../Api/manager";
import { toast } from "react-toastify";
import LoaderManager from "../../../Pages/ErrorPages/LoaderManager";
import useCapitalizedValue from "../../../CustomHooks/useCapitalizedValue";
import { useSelector } from "react-redux";
import { Checkbox } from "antd";

// eslint-disable-next-line react/prop-types
function FormBuilder({
  isModalOpen,
  // eslint-disable-next-line react/prop-types
  setIsModalOpen,
  eventType,
  eventId,
  fetchEvents,
}) {
  const { manager } = useSelector((state) => state.managerSlice);
  const { capitalizeFirstLetter } = useCapitalizedValue();
  const [Loading, setLoading] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);
  const [fields, setFields] = useState([]);
  const [newSelects, setNewSelects] = useState("");
  const [selectOptions, setSelectOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    setLoading(true);
    setDataLoader(true);
    fetchEventForm(eventId);
  }, [isModalOpen]);

  const fetchEventForm = async (eventId) => {
    try {
      const res = await getEventForm(eventId);
      setFields(res?.data?.fields);
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setDataLoader(false);
    }, 600);
  };

  const handlePersonalInfoCheck = (e) => {
    const { checked } = e.target;
    if (checked) {
      setFields([
        ...fields,
        { label: "Name", type: "Text", required: true, isPersonal: true },
        { label: "Address", type: "Text", required: true, isPersonal: true },
        "info",
      ]);
    } else {
      // Remove the "Name" and "Address" fields from the fields array
      setFields(
        fields.filter(
          (field) => field.label !== "Name" && field.label !== "Address"
        )
      );
      setFields(fields.filter((field) => field === "info"));
    }
  };

  const handleAddFields = () => {
    setFields([...fields, { label: "", type: "", required: true }]);
  };

  // this is my way
  // const handleAddOptions = (index) => {
  //   fields.filter((field, i) =>
  //     i == index ? (field["options"] = { ...field.options, option: "" }) : ""
  //   );
  //   return;
  // };

  // Gpt
  // const handleAddOptions = (index) => {
  //   setFields(
  //     fields.map((field, i) => {
  //       if (i === index && field.type === "Checkbox") {
  //         const maxOptions = 2;

  //         if (field.options && Object.keys(field.options).length > maxOptions) {
  //           alert("Limit exceeded");
  //           return field;
  //         }
  //         const optionLabel = `Option ${
  //           field.options ? Object.keys(field.options).length + 1 : 1
  //         }`;
  //         const newOptions = {
  //           ...field.options,
  //           [optionLabel]: "",
  //         };
  //         return { ...field, options: newOptions };
  //       }
  //       return field;
  //     })
  //   );
  // };

  // BASIC LABEL INPUT AND TYPE SELECTOR

  /**
   * Updates the field at the provided index when input changes.
   * Maps through all fields, returning new field object if index matches,
   * otherwise returning existing field. Updates fields state with new array.
   */
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const titleCasedValue = capitalizeFirstLetter(value);
    setFields(
      fields.map((field, i) =>
        i === index ? { ...field, [name]: titleCasedValue } : field
      )
    );
  };

  // CHECKBOX OPTION

  const handleAddCheckboxOptions = (index) => {
    // ADDING CHECKBOX OTION INPUT
    setFields(
      fields.map((field, i) => {
        if (i === index && field.type === "Checkbox") {
          const maxOptions = 3;
          if (field.options && field.options.length >= maxOptions) {
            alert("Maximum options reached");
            return field;
          }
          const newOptions = field.options ? [...field.options, ""] : [""];
          return { ...field, options: newOptions };
        }
        return field;
      })
    );
  };

  const handleOptionInputChange = (index, optionIndex, e) => {
    // CHECKBOX OPTION VALUE
    const { value } = e.target;
    const titleCasedValue = capitalizeFirstLetter(value);
    setFields(
      fields.map((field, i) => {
        if (i === index && field.options) {
          const updatedOptions = [...field.options]; // Make a copy of the options array
          updatedOptions[optionIndex] = titleCasedValue; // Update the value at the specified index
          return { ...field, options: updatedOptions }; // Return the field with updated options
        }
        return field;
      })
    );
  };

  // SELECT OPTION ADDER

  const handleAddSelects = (index) => {
    if (newSelects.trim() !== "") {
      const updatedFields = [...fields];
      const updatedField = { ...updatedFields[index] };

      if (!updatedField.selects) {
        updatedField.selects = [];
      }
      updatedField.selects.push(newSelects);

      updatedFields[index] = updatedField;
      setFields(updatedFields);
      setSelectOptions([...selectOptions, newSelects]);
      setNewSelects("");
    } else {
      alert("Select option cannot be empty");
    }
  };

  // RADIO OPTION

  const handleRadioBooleansInputChange = (index, booleanIndex, value) => {
    setFields((prevFields) => {
      const updatedFields = [...prevFields];
      const updatedField = { ...updatedFields[index] };

      // Initialize options array if it's undefined
      if (!updatedField.booleans) {
        updatedField.booleans = {};
      }
      const titleCasedValue = capitalizeFirstLetter(value);
      // Update the value at the specified optionIndex
      updatedField.booleans[`Option ${booleanIndex + 1}`] = titleCasedValue;

      updatedFields[index] = updatedField;
      return updatedFields;
    });
  };

  /**
   * Removes a field from the fields array at the provided index.
   * Updates the fields state by filtering out the field to remove.
   * This will return all exept not matching the index,that will be set to the field
   */
  const handleRemoveFields = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    try {
      console.log(fields);
      setLoading(true);
      const res = await submitForm({ eventId, managerId: manager._id, fields });
      toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
    } finally {
      setLoading(false);
      handleClose();
      fetchEvents();
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Dialog
        open={isModalOpen}
        scroll="body"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
        maxWidth="md"
      >
        <LoaderManager loading={Loading} />
        <DialogTitle id="scroll-dialog-title">
          <div className="flex items-center justify-between borer">
            <h1 className="flex-1">{eventType}</h1>
            <Checkbox
              onChange={handlePersonalInfoCheck}
              checked={fields.includes("info")}
            >
              Include Personal Information
            </Checkbox>
          </div>
        </DialogTitle>
        {dataLoader ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        ) : (
          <DialogContent dividers={scroll == "paper"}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <div className="dialog-(content-text fade-ef">
                {fields.length > 0 ? (
                  fields?.map((field, index) => (
                    <div key={index}>
                      {typeof field === "object" && (
                        <div className="flex flex-col mt-4 font-normal text-black border border-dashed rounded-sm p-3">
                          <div className="flex items-center">
                            <div className="w-8/12">
                              <input
                                type="text"
                                id={`label-${index}`}
                                name="label"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none capitalize"
                                placeholder="Label Name"
                                value={field.label}
                                onChange={(e) => handleInputChange(index, e)}
                              />
                            </div>
                            <div className="w-3/12 ml-4">
                              <select
                                id={`type-${index}`}
                                name="type"
                                className="w-full px-2 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
                                value={field.type}
                                onChange={(e) => handleInputChange(index, e)}
                              >
                                <option value="" disabled defaultValue={true}>
                                  Select Type
                                </option>
                                <option value="Text">Text</option>
                                <option value="Number">Number</option>
                                <option value="Email">Email</option>
                                <option value="Date">Date</option>
                                <option value="Time">Time</option>
                                <option value="Textarea">Textarea</option>
                                <option value="Checkbox">Checkbox</option>
                                <option value="Select">Select</option>
                                <option value="Radio">Radio</option>
                                <option value="File">File</option>
                                <option value="Map">Map</option>
                                {/* <option value="dropdown">Dropdown</option> */}
                              </select>
                            </div>
                            <a
                              className="w-1/12 pl-6 cursor-pointer"
                              onClick={() => handleRemoveFields(index)}
                            >
                              <Tooltip title="Remove">
                                <svg
                                  className="w-[25px] h-[25px] text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="red"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.1"
                                    d="M6 18 18 6m0 12L6 6"
                                  />
                                </svg>
                              </Tooltip>
                            </a>
                          </div>

                          {field.type === "Checkbox" && (
                            <div className="mt-2 flex flex-row items-center">
                              {field.options &&
                                field.options.map(
                                  (optionValue, optionIndex) => (
                                    <input
                                      key={optionIndex}
                                      type="text"
                                      className="w-30 px-4 py-2 mr-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none capitalize"
                                      placeholder={`Option ${optionIndex + 1}`}
                                      value={optionValue}
                                      onChange={(e) =>
                                        handleOptionInputChange(
                                          index,
                                          optionIndex,
                                          e
                                        )
                                      }
                                    />
                                  )
                                )}

                              <a
                                onClick={() => handleAddCheckboxOptions(index)}
                                className="ml-2 cursor-pointer"
                              >
                                <svg
                                  className="w-[21px] h-[21px] text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.8"
                                    d="M12 7.8v8.4M7.8 12h8.4m4.8 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                  />
                                </svg>
                              </a>
                            </div>
                          )}

                          {field.type === "Radio" && (
                            <div className="mt-2 flex flex-row items-center">
                              <input
                                type="text"
                                className="w-30 px-4 py-2 mr-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none capitalize"
                                placeholder="Option 1"
                                value={
                                  fields[index]?.booleans?.[`Option 1`] || ""
                                }
                                onChange={(e) =>
                                  handleRadioBooleansInputChange(
                                    index,
                                    0,
                                    e.target.value
                                  )
                                }
                              />
                              <input
                                type="text"
                                className="w-30 px-4 py-2 mr-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none capitalize"
                                placeholder="Option 2"
                                value={
                                  fields[index]?.booleans?.[`Option 2`] || ""
                                }
                                onChange={(e) =>
                                  handleRadioBooleansInputChange(
                                    index,
                                    1,
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          )}

                          {field.type === "Select" && (
                            <div className="mt-2 flex flex-row items-center">
                              <input
                                type="text"
                                placeholder="Type options here"
                                className="w-30 px-4 py-2 mr-2 rounded-sm border text-gray-500 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none capitalize"
                                onChange={(e) =>
                                  setNewSelects(
                                    capitalizeFirstLetter(e.target.value)
                                  )
                                }
                                value={newSelects}
                              />
                              <a onClick={() => handleAddSelects(index)}>
                                <svg
                                  className="w-[29px] h-[22px] text-gray-800 dark:text-white"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m5 12 4.7 4.5 9.3-9"
                                  />
                                </svg>
                              </a>
                              <div className="relative">
                                <button
                                  type="button"
                                  className="w-60 rounded-lg border-gray-200 p-3 text-sm appearance-none"
                                  onClick={() => setShowOptions(!showOptions)}
                                >
                                  See all options
                                </button>
                                {showOptions && (
                                  <ul className="absolute z-10 mt-1 w-60 bg-white border rounded-lg shadow-lg">
                                    {selectOptions?.map((option, index) => (
                                      <li
                                        key={index}
                                        className="px-4 py-2 cursor-default"
                                      >
                                        {option}
                                      </li>
                                    ))}
                                  </ul>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center">
                    <p>No data.please add new fields..</p>
                  </div>
                )}

                <a
                  className="w-9 h-9 m-2 text-gray-800 dark:text-white cursor-pointer"
                  onClick={handleAddFields}
                >
                  <Tooltip title="Add Input">
                    <svg
                      className="w-[30px] h-[30px] text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.1"
                        d="M5 12h14m-7 7V5"
                      />
                    </svg>
                  </Tooltip>
                </a>
              </div>
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default FormBuilder;
