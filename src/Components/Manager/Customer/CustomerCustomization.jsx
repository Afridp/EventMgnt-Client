import { useState } from "react";
import Appearance from "./Appearance";
import Files from "./Files";
import Contents from "./Contents";

const CustomerCustomization = () => {
  const [tab, setTab] = useState("tab1");
  return (
    <>
      <section>
        <div className="items-center px-8 mx-auto max-w-7xl lg:px-16 md:px-12">
          <div className="justify-center w-full lg:p-10 max-auto">
            <div>
              <ul className="grid grid-cols-3 mx-auto text-sm text-center text-black border-b">
                <li className="w-full -mb-px">
                  <a
                    onClick={() => setTab("tab1")}
                    className={`inline-block py-2 font-medium border-b-2 px-6 w-full  ${
                      tab === "tab1"
                        ? "bg-white text-red-800 border-red-800 border-b-2 font-semibold "
                        : ""
                    }`}
                  >
                    Content
                  </a>
                </li>
                <li className="w-full -mb-px">
                  <a
                    onClick={() => setTab("tab2")}
                    className={`inline-block py-2 font-medium border-b-2 px-6 w-full  ${
                      tab === "tab2"
                        ? "bg-white text-red-800 border-red-800 border-b-2 font-semibold"
                        : ""
                    }`}
                  >
                    Appearance
                  </a>
                </li>
                <li className="w-full -mb-px">
                  <a
                    onClick={() => setTab("tab3")}
                    className={`inline-block py-2 font-medium border-b-2 px-6 w-full ${
                      tab === "tab3"
                        ? "bg-white text-red-800 border-red-800 border-b-2 font-semibold"
                        : ""
                    }`}
                  >
                    Images
                  </a>
                </li>
              </ul>

              <div className="py-4 pt-4 text-left bg-white content">
                {tab === "tab1" && (
                  <div className="text-gray-500">
                    <Contents/>
                  </div>
                )}
                {tab === "tab2" && (
                  <div className="text-gray-500">
                    <Appearance/>
                  </div>
                )}
                {tab === "tab3" && (
                  <div className="text-gray-500">
                   <Files/>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerCustomization;
