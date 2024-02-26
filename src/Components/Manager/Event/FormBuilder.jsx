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

// eslint-disable-next-line react/prop-types
function FormBuilder({ isModalOpen, setIsModalOpen, eventUUID, eventName }) {
  const [Loading, setLoading] = useState(false);
  const [dataLoader, setDataLoader] = useState(false);
  const [fields, setFields] = useState([]);

  useEffect(() => {
    setLoading(true);
    setDataLoader(true);
    fetchEventForm();
  }, [isModalOpen]);

  const handleAddFields = () => {
    setFields([...fields, { label: "", type: "", required: true }]);
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
    setFields(
      fields.map((field, i) =>
        i === index ? { ...field, [name]: value } : field
      )
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
    }, 2000);
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
        fullWidth={true} // Set fullWidth to true to make the dialog take up the full width of its container
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
              <div className="dialog-content-text">
                {fields?.map((field, index) => (
                  <div
                    key={index}
                    className="flex mt-4 font-normal text-black"
                  >
                    <div className="w-8/12">
                      <input
                        type="text"
                        id={`label-${index}`}
                        name="label"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
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
                        <option value="dropdown">Dropdown</option>
                        <option value="select">Select</option>
                        <option value="file">File</option>
                      </select>
                    </div>

                    <a
                      className="w-1/12 pl-6 mt-2 cursor-pointer"
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
