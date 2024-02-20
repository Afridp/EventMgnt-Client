
import { useDispatch } from "react-redux";
import { logoutEmployee } from "../../Redux/slice/employeeSlice";
import { toast } from "react-toastify";

function Sidebar() {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    localStorage.removeItem("employeeToken");
    dispatch(logoutEmployee());
    window.location.reload();
    toast.success("Logout successful", { Position: toast.POSITION.TOP_CENTER });
  };

  return (
    <>
      <nav className="flex flex-col justify-between w-20 bg-black border-r">
        <div className="mt-10 mb-10">
          <a href="#">
            <img
              src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              className="object-cover w-10 h-10 mx-auto mb-3 rounded-full"
              alt=""
            />
          </a>
          <div className="mt-10">
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition duration-200 ease-in-out transform hover:text-blue-500 focus:shadow-outline hover:scale-95"
                >
                  <p className="mx-auto text-center">
                    <ion-icon
                      className="w-5 h-5 mx-auto md hydrated"
                      name="home-outline"
                      role="img"
                      aria-label="home outline"
                    />
                    <span className="sr-only">home</span>
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition duration-200 ease-in-out transform hover:text-blue-500 focus:shadow-outline hover:scale-95"
                >
                  <p className="mx-auto text-center">
                    <ion-icon
                      className="w-5 h-5 mx-auto md hydrated"
                      name="notifications-outline"
                      role="img"
                      aria-label="notifications outline"
                    />
                    <span className="sr-only">Notifications</span>
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition duration-200 ease-in-out transform hover:text-blue-500 focus:shadow-outline hover:scale-95"
                >
                  <p className="mx-auto text-center">
                    <ion-icon
                      className="w-5 h-5 mx-auto md hydrated"
                      name="analytics-outline"
                      role="img"
                      aria-label="analytics outline"
                    />
                    <span className="sr-only">analytics</span>
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition duration-200 ease-in-out transform hover:text-blue-500 focus:shadow-outline hover:scale-95"
                >
                  <p className="mx-auto text-center">
                    <ion-icon
                      className="w-5 h-5 mx-auto md hydrated"
                      name="documents-outline"
                      role="img"
                      aria-label="documents outline"
                    />
                    <span className="sr-only">Reports</span>
                  </p>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 transition duration-200 ease-in-out transform hover:text-blue-500 focus:shadow-outline hover:scale-95"
                >
                  <p className="mx-auto text-center">
                    <ion-icon
                      className="w-5 h-5 mx-auto md hydrated"
                      name="people-outline"
                      role="img"
                      aria-label="people outline"
                    />
                    <span className="sr-only">account</span>
                  </p>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-4">
          <a
            href="#"
            className="text-gray-500 transition duration-200 ease-in-out transform hover:text-blue-500 focus:shadow-outline hover:scale-95"
          >
            <p className="mx-auto text-center">
              <ion-icon
                className="w-5 h-5 mx-auto md hydrated"
                name="log-out-outline"
                role="img"
                aria-label="log out outline"
                onClick={() => handleLogout}
              />
              <span className="sr-only">logout</span>
            </p>
          </a>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
