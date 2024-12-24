import { useEffect, useState } from "react";
import { getNewSubmissions } from "../../../Api/manager";
import DataNotFoundManager from "../../../Pages/ErrorPages/DataNotFoundManager";
import { Link } from "react-router-dom";
import SelectCaptian from "./SelectCaptian";
import { approveEvent } from "../../../Api/manager";
import { toast } from "react-toastify";
import LoaderManager from "../../../Pages/ErrorPages/LoaderManager";

function Enquiries() {
  const [newSubmissions, setNewSubmissions] = useState([]);
  const [open, setOpen] = useState(false);
  const [submissionId, setSubmissionId] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchNewSubmissions = async () => {
    try {
      const res = await getNewSubmissions();
      setNewSubmissions(res?.data?.newSubmissions);
    } finally {
      setLoading(false);
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
    setLoading(true);
    fetchNewSubmissions();
  }, []);
  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <LoaderManager loading={loading} />
        <div className="bg-white rounded-lg shadow-lg p-6 mt-1">
          <SelectCaptian
            open={open}
            setOpen={setOpen}
            eventId={submissionId}
            handleApproval={handleApproval}
          />
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-cente">
            New Bookings
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Event Type",
                    "Client Name",
                    "Booked Date",
                    "Amount Paid",
                    "Action",
                  ].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {newSubmissions?.length > 0 ? (
                  newSubmissions.map(
                    ({ eventId, personalData, createdAt, amountPaid, _id }) => (
                      <tr
                        key={_id}
                        className="hover:bg-gray-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {eventId.eventName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-700">
                            {personalData?.name ?? "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-700">
                            {new Date(createdAt).toLocaleDateString("en-GB")}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">
                          {amountPaid ?? "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-righ text-sm font-medium">
                          <button
                            onClick={() => toggleModal(_id)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                          >
                            Approve
                          </button>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 whitespace-nowrap text-center"
                    >
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
      </div>
    </>
  );
}

export default Enquiries;
