import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <div className="navbar sticky top-0 left-0 w-full bg-black bg-opacity-50 backdrop-blur-md z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>Home</a>
              </li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </li>
              <li>
                <a>Item 3</a>
              </li>
            </ul>
          </div>

          <Link to='/manager/' className="text-xl text-white">Event Brigadge</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to='/manager/' className="text-white">Home</Link> 
            </li>
            <li>
              <details>
                <summary className="text-white">Manage</summary>
                <ul className="p-1 font-bold">
                  <li>
                    <Link to="/manager/events">Events</Link>
                  </li>
                  <li>
                    <Link to={"/manager/employeeMgt"}>Employees</Link>
                  </li>
                  <li>
                    <Link to={"/manager/customerMgt"}>Customers</Link>
                  </li>
                 
                </ul>
              </details>
            </li>
            <li>
              <Link to={'/manager/account'} className="text-white">Account</Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          {/* <button className="btn btn-outline btn-secondary">Subscribe</button> */}
          <Link to={"/manager/pro"} className="brightness-150 dark:brightness-100 group hover:shadow-lg transition ease-in-out hover:scale-105 p-1  bg-gradient-to-br  hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-600">
            <div className="px-6 py-2 backdrop-blur-xl bg-black/80 font-bold w-full h-full">
              <div className="group-hover:scale-100 flex group-hover:text-yellow-500 text-yellow-600 gap-1">
                <svg
                  className="w-6 h-6 stroke-yellow-600 group-hover:stroke-yellow-500 group-hover:stroke-{1.99}"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
                Upgrage
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
