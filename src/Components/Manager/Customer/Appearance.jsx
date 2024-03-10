import { useMemo, useState } from "react";
import { ColorPicker } from "antd";

function Appearance() {
  const [color, setColor] = useState("#1677ff");
  const bgColor = useMemo(
    () => (typeof color === "string" ? color : color.toHexString()),
    [color]
  );
  const btnStyle = {
    backgroundColor: bgColor,
  };
  return (
    <>
      <main>
        <div className="py-4">
          <div className="border h-full border-gray-200 border-dashed rounded-lg p-5 flex justify-evenly my-4 gap-52">
            <div className="">
              <ColorPicker value={color} onChange={setColor} className="">
                <button className="bg-blue-800 p-3 text-white " type="primary">
                  Change Color
                </button>
              </ColorPicker>
            </div>
            <div className="border h-72 w-72  rounded-md">
              <nav
                className="border-b h-10 text-xs flex justify-center gap-2 pt-3"
                style={btnStyle}
              >
                <p>home</p>
                <p>events</p>
              </nav>
              <div
                className="border mt-24 ml-10 h-6 w-14 "
                style={btnStyle}
              ></div>
            </div>
          </div>
          {/* <div className="border h-full border-gray-200 border-dashed rounded-lg p-5 flex justify-evenly gap-52">

          </div> */}
        </div>
      </main>
    </>
  );
}

export default Appearance;
