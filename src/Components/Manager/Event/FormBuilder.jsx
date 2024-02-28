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
import useCapitalizedValue from '../../../CustomHooks/useCapitalizedValue';



// eslint-disable-next-line react/prop-types
function FormBuilder({ isModalOpen, setIsModalOpen, eventUUID, eventName }) {
  const { capitalizeFirstLetter } = useCapitalizedValue()
  const [Loading, setLoading] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);
  const [fields, setFields] = useState([]);
  const [newSelects, setNewSelects] = useState("");
  const [selectOptions, setSelectOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  

  useEffect(() => {
    setLoading(true);
    setDataLoader(true);
    fetchEventForm();
  }, [isModalOpen]);

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
  const handleAddOptions = (index) => {
    setFields(
      fields.map((field, i) => {
        if (i === index && field.type === "checkbox") {
          const maxOptions = 2;

          if (field.options && Object.keys(field.options).length > maxOptions) {
            alert("Limit exceeded");
            return field;
          }
          const optionLabel = `Option ${
            field.options ? Object.keys(field.options).length + 1 : 1
          }`;
          const newOptions = {
            ...field.options,
            [optionLabel]: "",
          };
          return { ...field, options: newOptions };
        }
        return field;
      })
    );
  };

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
      return;
    }
  };

  /**
   * Removes a field from the fields array at the provided index.
   * Updates the fields state by filtering out the field to remove.
   * This will return all exept not matching the index,that will be set to the field
   */
  const handleRemoveFields = (index) => {
    setFields(fields.filter((_, i) => i !== index));
  };

  /**
   * Updates the field at the provided index when input changes.
   * Maps through all fields, returning new field object if index matches,
   * otherwise returning existing field. Updates fields state with new array.
   */
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const titleCasedValue = capitalizeFirstLetter(value)
    setFields(
      fields.map((field, i) =>
        i === index ? { ...field, [name]: titleCasedValue } : field
      )
    );
  };

  const handleOptionInputChange = (index, optionLabel, e) => {
    const { value } = e.target;
    setFields(
      fields.map((field, i) => {
        if (i === index && field.options) {
          const updatedOption = { ...field.options, [optionLabel]: value };
          return { ...field, options: updatedOption };
        }
        return field;
      })
    );
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await submitForm({ eventUUID, fields });
      toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
    } finally {
      setLoading(false);
      handleClose();
    }
  };

  const fetchEventForm = async () => {
    try {
      const res = await getEventForm(eventUUID);
      setFields(res.data.fields);
    } finally {
      setLoading(false);
    }
    setTimeout(() => {
      setDataLoader(false);
    }, 600);
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
            <h1 className="flex-1">{eventName}</h1>

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
        </DialogTitle>
        {dataLoader ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-spinner loading-sm"></span>
          </div>
        ) : (
          <DialogContent dividers={scroll == "paper"}>
            <DialogContentText id="scroll-dialog-description" tabIndex={-1}>
              <div className="dialog-content-text fade-ef">
                {fields?.map((field, index) => (
                  <div
                    key={index}
                    className="flex flex-col mt-4 font-normal text-black border border-dashed rounded-sm p-3"
                  >
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
                          <option value="text">Text</option>
                          <option value="number">Number</option>
                          <option value="email">Email</option>
                          <option value="date">Date</option>
                          <option value="time">Time</option>
                          <option value="textarea">Textarea</option>
                          <option value="checkbox">Checkbox</option>
                          <option value="select">Select</option>
                          <option value="file">File</option>
                          <option value="map">Map</option>
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

                    {field.type === "checkbox" && (
                      <div className="mt-2 flex flex-row items-center">
                        {field.options &&
                          Object.entries(field.options).map(
                            ([optionLabel, optionValue]) => (
                              <input
                                key={optionLabel}
                                type="text"
                                className="w-30 px-4 py-2 mr-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none capitalize"
                                placeholder={optionLabel}
                                value={optionValue}
                                onChange={(e) =>
                                  handleOptionInputChange(index, optionLabel, e)
                                }
                              />
                            )
                          )}

                        <a
                          onClick={() => handleAddOptions(index)}
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

                    {field.type === "select" && (
                      <div className="mt-2 flex flex-row items-center">
                        <input
                          type="text"
                          placeholder="Type options here"
                          className="w-30 px-4 py-2 mr-2 rounded-sm border text-gray-500 border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none capitalize"
                          onChange={(e) => setNewSelects(e.target.value)}
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
                ))}
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
