import { useState } from "react";

const CustomerAppearanceForm = () => {
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
                        ? "bg-white text-blue-500 border-blue-500 border-b-2 font-semibold "
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
                        ? "bg-white text-blue-500 border-blue-500 border-b-2 font-semibold"
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
                        ? "bg-white text-blue-500 border-blue-500 border-b-2 font-semibold"
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
                    <main>
                      <div className="py-4">
                        <div className="h-32 border border-gray-200 border-dashed rounded-lg">
                          <div>
                            <label className="sr-only" htmlFor="name">
                              Name
                            </label>
                            <input
                              className="w-full rounded-lg border-gray-200 p-3 text-sm"
                              placeholder="Name"
                              type="text"
                              id="name"
                              // value={values.name}
                              // {...getFieldProps("name")}
                            />
                            {/* <div className="label">
                    {errors.name && touched.name && (
                      <small className="text-red-800">{errors.name}</small>
                    )}
                  </div> */}
                          </div>
                        </div>
                      </div>
                    </main>
                  </div>
                )}
                {tab === "tab2" && (
                  <div className="text-gray-500">
                    <main>
                      <div className="py-4">
                        <span className="inline-flex items-center text-black">
                          <span
                            className="font-mono text-sm"
                            aria-hidden="true"
                          >
                            02
                          </span>
                          <span className="ml-3 h-3.5 w-px bg-black"></span>
                          <span className="ml-3 text-base font-medium tracking-tight">
                            Tab content
                          </span>
                        </span>
                        <div className="h-32 border border-gray-200 border-dashed rounded-lg"></div>
                      </div>
                    </main>
                  </div>
                )}
                {tab === "tab3" && (
                  <div className="text-gray-500">
                    <main>
                      <div className="py-4">
                        <span className="inline-flex items-center text-black">
                          <span
                            className="font-mono text-sm"
                            aria-hidden="true"
                          >
                            03
                          </span>
                          <span className="ml-3 h-3.5 w-px bg-black"></span>
                          <span className="ml-3 text-base font-medium tracking-tight">
                            Tab content
                          </span>
                        </span>
                        <div className="h-32 border border-gray-200 border-dashed rounded-lg"></div>
                      </div>
                    </main>
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

export default CustomerAppearanceForm;
