import { useEffect, useState } from "react";
import { styleSubNotification } from "../../JsStyles/Styles";
import { Box, Modal } from "@mui/material";
import { Link } from "react-router-dom";
import { getTodaysEvents } from "../../Api/manager";
import { TvOffSharp } from "@mui/icons-material";

function Dashboard() {
  const [subNotification, setSubNotification] = useState(false);
  const [todaysEvents, setTodaysEvent] = useState([]);
  console.log(todaysEvents);
  const [loading, setLoading] = useState(false);

  const handleOpenNotification = () => {
    setTimeout(() => {
      setSubNotification(true);
    }, 4000);
  };
  const handleClose = () => {
    setSubNotification(false);
  };

  const fetchTodaysEvents = async () => {
    try {
      const res = await getTodaysEvents();
      console.log(res?.data?.todaysEvents);
      setTodaysEvent(res?.data?.todaysEvents);
    } finally {
      setLoading(true);
    }
  };

  useEffect(() => {
    handleOpenNotification();
    fetchTodaysEvents();
  }, []);

  return (
    <div className="mt-16 bg-blue-gray-300">
      <Modal
        open={subNotification}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleSubNotification}>
          <section className="dark:bg-dark">
            <div className="container mx-auto">
              <div className="relative z-10 overflow-hidden rounded bg-primary py-12 px-8 md:p-[70px]">
                <div className="flex flex-wrap items-center -mx-4">
                  <div className="w-full px-4 lg:w-1/2">
                    <span className="block mb-4 text-base font-medium text-white">
                      Find Your Next Dream App
                    </span>
                    <h2 className="mb-6 text-3xl font-bold leading-tight text-white sm:mb-8 sm:text-[40px]/[48px] lg:mb-0">
                      <span className="xs:block"> Get started with </span>
                      <span>our free trial</span>
                    </h2>
                  </div>
                  <div className="w-full px-4 lg:w-1/2">
                    <div className="flex flex-wrap lg:justify-end">
                      <Link
                        to={"/manager/pro"}
                        href="javascript:void(0)"
                        className="inline-flex py-3 my-1 mr-4 text-base font-medium transition bg-white rounded-md hover:bg-yellow-300 hover:text-black hover:border-yellow-700 hover:border  text-primary px-7"
                      >
                        Get Premium Now
                      </Link>
                      <a
                        href="javascript:void(0)"
                        className="inline-flex py-3 my-1 text-base font-medium text-white transition rounded-md bg-secondary px-7 hover:bg-opacity-90 hover:border hover:border-white"
                      >
                        Start Free Trial
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <span className="absolute top-0 left-0 z-[-1]">
                    <svg
                      width="189"
                      height="162"
                      viewBox="0 0 189 162"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="16"
                        cy="-16.5"
                        rx="173"
                        ry="178.5"
                        transform="rotate(180 16 -16.5)"
                        fill="url(#paint0_linear)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="-157"
                          y1="-107.754"
                          x2="98.5011"
                          y2="-106.425"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="white" stopOpacity="0.07" />
                          <stop offset="1" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                  <span className="absolute bottom-0 right-0 z-[-1]">
                    <svg
                      width="191"
                      height="208"
                      viewBox="0 0 191 208"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <ellipse
                        cx="173"
                        cy="178.5"
                        rx="173"
                        ry="178.5"
                        fill="url(#paint0_linear)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear"
                          x1="-3.27832e-05"
                          y1="87.2457"
                          x2="255.501"
                          y2="88.5747"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stopColor="white" stopOpacity="0.07" />
                          <stop offset="1" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </section>
        </Box>
      </Modal>
      <div
        className="carousel-container"
        style={{ backgroundColor: "rgba(240, 240, 240, 0.7)", padding: "20px" }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontFamily: "sans-serif",
          }}
        >
          ONGOING EVENTS
        </h2>

        <div className="carousel carousel-end rounded-box">
          {todaysEvents?.map((event) => (
            <div
              key={event._id}
              className="carousel-item"
              style={{ marginRight: "10px" }}
            >
              <img
                src={
                  event?.themeImage ??
                  "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                }
                alt="Drink"
              />
            </div>
          ))}
        </div>
      </div>

      <div
        className="carousel-container"
        style={{
          backgroundColor: "rgba(240, 240, 240, 0.7)",
          padding: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontFamily: "sans-serif",
          }}
        >
          UPCOMING EVENTS
        </h2>
        <div className="carousel carousel-end rounded-box">
          <div className="carousel-item" style={{ marginRight: "10px" }}>
            <img
              src="https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"
              alt="Drink"
            />
          </div>
          <div className="carousel-item" style={{ marginRight: "10px" }}>
            <img
              src="https://daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.jpg"
              alt="Drink"
            />
          </div>
          <div className="carousel-item" style={{ marginRight: "10px" }}>
            <img
              src="https://daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.jpg"
              alt="Drink"
            />
          </div>
          <div className="carousel-item" style={{ marginRight: "10px" }}>
            <img
              src="https://daisyui.com/images/stock/photo-1494253109108-2e30c049369b.jpg"
              alt="Drink"
            />
          </div>
          <div className="carousel-item" style={{ marginRight: "10px" }}>
            <img
              src="https://daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.jpg"
              alt="Drink"
            />
          </div>
          <div className="carousel-item" style={{ marginRight: "10px" }}>
            <img
              src="https://daisyui.com/images/stock/photo-1559181567-c3190ca9959b.jpg"
              alt="Drink"
            />
          </div>
          <div className="carousel-item" style={{ marginRight: "10px" }}>
            <img
              src="https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg"
              alt="Drink"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
