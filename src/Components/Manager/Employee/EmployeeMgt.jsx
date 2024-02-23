import { Typography, Chip, Avatar } from "@material-tailwind/react";

import NewEmployees from "./AddEmployees";
import { useEffect, useState } from "react";
import { blockAndUnblockEmployee, getAllEmployees } from "../../../Api/manager";
import Search from "../Common/Search";
import Pagination from "../Common/Pagination";
import useDebounce from "../../../CustomHooks/useDebounce";
import LoaderManager from "../../../Pages/ErrorPages/LoaderManager";

const TABLE_HEAD = ["Employee", "Position", "Status", "Employed On", "Action"];

export function EmployeeMgt() {
  const [open, setOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState("");
  const [employeesPerPage] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoadig] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  const fetchAllEmployees = async () => {
    try {
      const res = await getAllEmployees({ search: debouncedSearchQuery });
      setEmployees(res?.data?.employees);
      setCurrentPage(1);
    } finally {
      setTimeout(() => {
        setLoadig(false);
      }, 200);
    }
  };

  // const handleDetails = async() =>{
  //   try {

  //   } catch (error) {

  //   }
  // }

  const handleBlockUnblock = async (employeeId) => {
    try {
      setLoadig(true);
      const res = await blockAndUnblockEmployee(employeeId);
        const updatedEmployees = employees.map((employee) => {
          if (employee._id === employeeId) {
            return {
              ...employee,
              isBlocked: res.data.isBlocked, // Assuming the response structure
            };
          }
          return employee;
        });
      setEmployees(updatedEmployees);
    } finally {
      setLoadig(false);
    }
  };

  useEffect(() => {
    setLoadig(true);
    fetchAllEmployees();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchQuery]);

  let currentEmployees;
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;

  if (employees?.length) {
    currentEmployees = employees.slice(
      indexOfFirstEmployee,
      indexOfLastEmployee
    );
  }

  const paginate = (number) => setCurrentPage(number);
  return (
    <>
      <div className="fadeef">
        <LoaderManager loading={loading} />
        <div className="container mx-auto mt-8 flex items-center justify-between">
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <button className="w-[140px] h-[40px] shadow-2xl bg-sky-600 outline outline-offset-2 outline-1 outline-sky-600 hover:bg-blue-800 hover:text-white hover:outline-none duration-300 active:scale-[0.99]">
            <a className="font-bold" onClick={() => setOpen(true)}>
              Add Employees
            </a>
          </button>
        </div>
        <NewEmployees open={open} setOpen={setOpen} />
        <div className="sm:mx-20 sm:mt-12 border rounded-lg overflow-x-auto fade-ef">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentEmployees?.length > 0 ? (
                currentEmployees?.map(
                  (
                    {
                      profile,
                      name,
                      email,
                      position,
                      status,
                      createdAt,
                      isBlocked,
                      _id,
                    },
                    index
                  ) => {
                    const isLast = index === employees.length - 1;
                    const classes = isLast
                      ? "p-4 "
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={_id}>
                        <td className={classes}>
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={
                                profile ??
                                "https://www.svgrepo.com/show/507440/user.svg"
                              }
                              alt={name}
                              size="sm"
                            />
                            <div className="flex flex-col">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {name}
                              </Typography>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal opacity-70"
                              >
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {position ?? "Nil"}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              icon={
                                status ? (
                                  <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-green-900 content-['']" />
                                ) : (
                                  <span className="mx-auto mt-1 block h-2 w-2 rounded-full bg-blue-gray-700 content-['']" />
                                )
                              }
                              value={status ? "Active" : "Inactive"}
                              color={status ? "green" : "blue-gray"}
                            />
                          </div>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {new Date(createdAt).toLocaleDateString("en-GB")}
                          </Typography>
                        </td>

                        <td className={classes}>
                          <div className="flex items-center gap-3 w-max">
                            <button>
                              <Chip
                                variant="filled"
                                onClick={() => handleBlockUnblock(_id)}
                                size="sm"
                                value={isBlocked ? "unblock" : "block"}
                                color={isBlocked ? "green" : "red"}
                              />
                            </button>

                            <button>
                              <Chip
                                variant="filled"
                                size="sm"
                                value="Details"
                                color="blue"
                                // onClick={() => handleDetails(_id)}
                              />
                            </button>
                            {/* Details Button */}
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    <h1 className="my-4 text">No Employees</h1>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-10">
          <Pagination
            datasPerPage={employeesPerPage}
            totalData={employees.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
}
