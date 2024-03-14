import { useEffect, useState } from "react";
import { getNewSubmissions } from "../../../Api/manager";
import DataNotFoundManager from "../../../Pages/ErrorPages/DataNotFoundManager";
import { Link } from "react-router-dom";
import SelectCaptian from "./SelectCaptian";
import { approveEvent } from "../../../Api/manager";
import { toast } from "react-toastify";

function Enquiries() {
  const [newSubmissions, setNewSubmissions] = useState([]);
  const [open, setOpen] = useState(false);
  const [submissionId, setSubmissionId] = useState("");

  const fetchNewSubmissions = async () => {
    try {
      const res = await getNewSubmissions();
      setNewSubmissions(res.data.newSubmissions);
    } catch (error) {
      console.error(error.message);
    }
  };
  const handleApproval = async () => {
    try {
      const res = await approveEvent(submissionId);
      const updatedSubmissions = newSubmissions.filter((event) => {
        return event._id !== res?.data?.updatedEvent;
      });
      setNewSubmissions(updatedSubmissions);
      toast.success(res.data.message);
    } finally {
      setOpen(false);
    }
  };
  const toggleModal = (id) => {
    setSubmissionId(id);
    setOpen(true);
  };
  useEffect(() => {
    fetchNewSubmissions();
  }, []);
  return (
    <>
      <div className="border-black p- mt-10 mx-">
        <SelectCaptian
          open={open}
          setOpen={setOpen}
          eventId={submissionId}
          handleApproval={handleApproval}
        />
        {/* <h2 className="m-8 text-2xl font-semibold">New Bookings</h2> */}
        <div className="container p-2 mx-auto sm:p-0 text-black ">
          <div className="overflow-x-auto">
            <table className="min-w-full ">
              <colgroup>
                <col />
                <col />
                <col />
                <col />
                <col />
                <col className="w-24" />
              </colgroup>
              <thead className="dark:bg-gray-700 bg-blue-gray-100 ">
                <tr className="text-left ">
                  <th className="p-3">Event Type</th>
                  <th className="p-3">Client Name</th>
                  <th className="p-3">Booked Date</th>
                  {/* <th className="p-3">Due Date</th> */}
                  <th className="p-3 ">Amount Paid</th>
                  <th className="p-3"></th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {newSubmissions?.length > 0 ? (
                  newSubmissions.map(
                    ({
                      eventId,
                      personalData,
                      createdAt,
                      amountPaid,
                      _id,
                      
                    }) => (
                      <tr
                        key={_id}
                        className="border-b text-xs border-opacity-20 dark:border-gray-700 dark:bg-gray-900 font-semibold"
                      >
                        <td className="p-5">
                          <p>{eventId.eventName}</p>
                        </td>
                        <td className="p-3">
                          <p>{personalData.name}</p>
                        </td>
                        <td className="p-3">
                          <p>
                            {new Date(createdAt).toLocaleDateString("en-GB")}
                          </p>
                          {/* <p className="dark:text-gray-400">adsfkj</p> */}
                        </td>
                        {/* <td className="p-3">
                        <p>01 Feb 2022</p>
                        <p className="dark:text-gray-400">Tuesday</p>
                      </td> */}
                        <td className="p-3 ">
                          <p>{amountPaid}</p>
                        </td>
                        <td className="p-3 ">
                          <p className="text-blue-700">
                            <Link to={`/manager/newEventViewMore/${_id}`}>
                              View
                            </Link>
                          </p>
                        </td>
                        <td className="p-3 ">
                          <span className="font-semibold round bg-red-800 dark:bg-violet-400 text-white p-2 dark:text-gray-900 cursor-pointer hover:border ">
                            <a onClick={() => toggleModal(_id)}>
                              {/* {isAccepted ? "approved" : "approve"} */} Approve
                            </a>
                          </span>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center">
                      <div className="my-8">
                        <DataNotFoundManager />
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        ;
      </div>
    </>
  );
}

export default Enquiries;
