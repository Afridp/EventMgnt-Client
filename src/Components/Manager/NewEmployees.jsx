import { approveNewEmployees, getNewEmployees } from "../../Api/manager";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useRef, useState } from "react";

export default function NewEmployees({ open, setOpen }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchNewEmployees = async () => {
    try {
      const res = await getNewEmployees();
      setEmployees(res?.data?.newEmployees);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  const handleApproval = async (employeeId) => {
    try {
      const res = await approveNewEmployees(employeeId);
      setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== employeeId));
      toast.success(res.data.message, { position: toast.POSITION.TOP_CENTER });
    } finally {
      console.log("done");
    }
  };
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    setLoading(true);
    fetchNewEmployees();
  }, []);

  return (
    <>
      {loading ? (
        <LoaderManager loading={loading} />
      ) : (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll="paper"
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          fullWidth
          maxWidth="md"
        >
          <DialogTitle id="scroll-dialog-title">New Employees</DialogTitle>
          <DialogContent dividers={scroll == "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Registered On</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {employees?.length > 0 ? (
                      employees.map((employee) => (
                        <tr
                          key={employee._id}
                       
                        >
                          <td>{employee.name}</td>
                          <td>{employee.email}</td>
                          <td>
                            {new Date(employee.createdAt).toLocaleDateString(
                              "en-GB"
                            )}
                          </td>
                          <td>
                            <button
                              className="group cursor-pointer outline-none hover:rotate-90 duration-300"
                              title="Add New"
                              onClick={() => handleApproval(employee._id)}
                            >
                              <svg
                                className="stroke-black fill-none group-hover:white group-active:stroke-black group-active:fill-blue-gray-600 group-active:duration-0 duration-300"
                                viewBox="0 0 24 24"
                                height="30px"
                                width="30px"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeWidth="1.5"
                                  d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                                ></path>
                                <path strokeWidth="1.5" d="M8 12H16"></path>
                                <path strokeWidth="1.5" d="M12 16V8"></path>
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center">
                          No new employees or requests
                        </td>
                      </tr>
                    )}

                    {/* row 2 */}
                  </tbody>
                </table>
              </div>
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

import PropTypes from "prop-types";
import LoaderManager from "../../Pages/ErrorPages/LoaderManager";
import { toast } from "react-toastify";

NewEmployees.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};
