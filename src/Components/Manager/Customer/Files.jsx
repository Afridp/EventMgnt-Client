import { Space } from "antd";
import { useRef, useState } from "react";
import useFileToDataURLConverter from "../../../CustomHooks/useFileToDataURLConverter";
import { fileUploads } from "../../../Api/manager";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoaderManager from "../../../Pages/ErrorPages/LoaderManager";

function Files() {
  const { manager } = useSelector((state) => state.managerSlice);
  const [homePageImage, setHomePageImage] = useState("");
  const [logo, setLogo] = useState("");
  const [loading, setLoading] = useState(false);
  const { convertFileToDataURL } = useFileToDataURLConverter();
  const fileInputRef = useRef(null);
  const fileInputRefLogo = useRef(null);

  const handleUpload = async (e, type) => {
    const { files } = e.target;

    if (type === "homePage") {
      setHomePageImage(files[0]);
    } else if (type === "logo") {
      setLogo(files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const logoBlob = await convertFileToDataURL(logo);
      const homePageImageBlob = await convertFileToDataURL(homePageImage);
      const res = await fileUploads({
        logoBlob,
        homePageImageBlob,
        managerId: manager._id,
      });
      toast.success(res.data.message);
    } finally {
      // Handle error
      setLoading(false);
    }
  };

  return (
    <>
      <main>
        <LoaderManager loading={loading} />
        <div className="py-4">
          <div className="h-full border border-gray-200 border-dashed shadow-lg rounded-lg p-10">
            <div>
              <div className="grid grid-row gap-8">
                <div>
                  <label className="label">
                    <span className="label-text text-base font-semibold">
                      1. Upload Home Page Jumbotron Image.
                    </span>
                  </label>
                  <div className="p-5">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept=".jpg,.jpeg,.png"
                      // style={{ display: "none" }}
                      onChange={(e) => handleUpload(e, "homePage")}
                      hidden
                    />
                    <Space>
                      <button
                        className="border rounded-md text-black p-2 flex items-center gap-2"
                        onClick={() => {
                          fileInputRef.current.click();
                        }}
                      >
                        <svg
                          viewBox="0 0 640 512"
                          fill="black"
                          height="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                        </svg>
                        Upload
                      </button>

                      <div className="flex">
                        {homePageImage && (
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="green"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {/* <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="red"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg> */}
                      </div>
                    </Space>
                  </div>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-base font-semibold">
                      2. Upload Company Logo Image.
                    </span>
                  </label>
                  <div className="p-5">
                    <input
                      type="file"
                      ref={fileInputRefLogo}
                      accept=".jpg,.jpeg,.png"
                      // style={{ display: "none" }}
                      onChange={(e) => handleUpload(e, "logo")}
                      hidden
                    />
                    <Space>
                      <button
                        className="border rounded-md text-black p-2 flex items-center gap-2"
                        onClick={() => {
                          fileInputRefLogo.current.click();
                        }}
                      >
                        <svg
                          viewBox="0 0 640 512"
                          fill="black"
                          height="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M144 480C64.5 480 0 415.5 0 336c0-62.8 40.2-116.2 96.2-135.9c-.1-2.7-.2-5.4-.2-8.1c0-88.4 71.6-160 160-160c59.3 0 111 32.2 138.7 80.2C409.9 102 428.3 96 448 96c53 0 96 43 96 96c0 12.2-2.3 23.8-6.4 34.6C596 238.4 640 290.1 640 352c0 70.7-57.3 128-128 128H144zm79-217c-9.4 9.4-9.4 24.6 0 33.9s24.6 9.4 33.9 0l39-39V392c0 13.3 10.7 24 24 24s24-10.7 24-24V257.9l39 39c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-80-80c-9.4-9.4-24.6-9.4-33.9 0l-80 80z"></path>
                        </svg>
                        Upload
                      </button>

                      <div className="flex">
                        {logo && (
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-white transition-opacity"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="green"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                        {/* <svg
                          className="w-6 h-6 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="red"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                          />
                        </svg> */}
                      </div>
                    </Space>
                  </div>
                </div>
              </div>
              <div className="flex justify-end p-6">
                <button
                  type="submit"
                  className="bg-black px-5 py-3 font-medium text-white"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default Files;
