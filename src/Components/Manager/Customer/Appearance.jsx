import { useMemo, useState } from "react";
import { ColorPicker } from "antd";
import { appearencePost } from "../../../Api/manager";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoaderManager from "../../../Pages/ErrorPages/LoaderManager";

function Appearance() {
  const { manager } = useSelector((state) => state.managerSlice);
  const [color, setColor] = useState("");
  const [loading, setLoading] = useState(false);
  const bgColor = useMemo(
    () => (typeof color === "string" ? color : color.toHexString()),
    [color]
  );
  const btnStyle = {
    backgroundColor: bgColor,
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await appearencePost({
        themeColor: bgColor,
        managerId: manager._id,
      });
      toast.success(res.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <main>
        <LoaderManager loading={loading} />
        <div className="py-4">
          <div className="border border-gray-200 border-dashed shadow-md rounded-lg p-10">
            <label className="label">
              <span className="label-text text-base font-semibold">
                1. Select Color of Your Choice.
              </span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 my-4">
              <div>
                <ColorPicker value={color} onChange={setColor} className="">
                  <button className="bg-red-900 rounded-md p-2 text-white" type="primary">
                    Change Color
                  </button>
                </ColorPicker>
              </div>
              <div className="border h-48 md:h-72 w-48 md:w-72 rounded-md">
                <nav
                  className="border-b h-8 md:h-10 text-xs flex justify-center gap-2 pt-2 md:pt-3"
                  style={btnStyle}
                >
                  <p>Home</p>
                  <p>Events</p>
                </nav>
                <div
                  className="border mt-16 md:mt-24 ml-6 md:ml-10 h-4 w-10 md:h-6 md:w-14"
                  style={btnStyle}
                ></div>
              </div>
            </div>
            {/* <label className="label">
            <span className="label-text text-base font-semibold">
              2. Select Your Preference.
            </span>
          </label> */}
            {/* Add your preference selection components here */}
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
      </main>
    </>
  );
}

export default Appearance;
