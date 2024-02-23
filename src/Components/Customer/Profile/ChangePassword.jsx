import { Modal } from "antd";
import { useState } from "react";
import { changePassword } from "../../../Api/customer";
import { useFormik } from "formik";
import { changePasswordValidation } from "../../../ValidationSchemas/customerValidation/changePassword";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
function ChangePassword({ customerId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePasswordChange = async () => {
    try {
      const res = await changePassword(values, customerId);
      toast.success(res?.data?.message, {
        position: toast.POSITION.TOP_CENTER,
      });
    } finally {
      setIsModalOpen(!isModalOpen);
    }
  };
  const { values, errors, handleBlur, handleChange, handleSubmit, touched } =
    useFormik({
      initialValues: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
      validationSchema: changePasswordValidation,
      onSubmit: handlePasswordChange,
    });

  return (
    <>
      <button
        className="group relative inline-block text-sm font-medium text-white"
        onClick={toggleModal}
      >
        <span className="absolute inset-0 border border-red-800 group-active:border-red-800"></span>
        <span className="block border border-red-800 bg-red-800 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1">
          Change Password
        </span>
      </button>

      {isModalOpen && (
        <Modal
          title="Change Password"
          centered
          open
          onOk={handleSubmit}
          onCancel={toggleModal}
          width={900}
          className="sm:w-full md:w-3/4 lg:w-2/3 xl:w-1/2"
          okButtonProps={{
            className: "bg-red-800 hover:bg-red-400  text-white",
            // Add any other button props or styles as needed
          }}
        >
          <form className="flex flex-col gap-4">
            <label
              htmlFor="currentPassword"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                id="currentPassword"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Current Password"
                type="password"
                value={values.currentPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Current Password
              </span>
            </label>
            {errors.currentPassword && touched.currentPassword && (
              <small className="text-red-800">{errors.currentPassword}</small>
            )}

            <label
              htmlFor="newPassword"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                id="newPassword"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="New Password"
                type="password"
                value={values.newPassword}
                onBlur={handleBlur}
                onChange={handleChange}
              />

              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                New Password
              </span>
            </label>
            {errors.newPassword && touched.newPassword && (
              <small className="text-red-800">{errors.newPassword}</small>
            )}
            <label
              htmlFor="confirmNewPassword"
              className="relative block rounded-md border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
            >
              <input
                id="confirmPassword"
                className="peer border-none bg-transparent placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0"
                placeholder="Confirm New Password"
                type="password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <span className="pointer-events-none absolute start-2.5 top-0 -translate-y-1/2 bg-white p-0.5 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs">
                Confirm New Password
              </span>
            </label>
            {errors.confirmPassword && touched.confirmPassword && (
              <small className="text-red-800">{errors.confirmPassword}</small>
            )}
          </form>
        </Modal>
      )}
    </>
  );
}

export default ChangePassword;
