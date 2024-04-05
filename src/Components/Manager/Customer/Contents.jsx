import { useState } from "react";
import { contentPost } from "../../../Api/manager";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoaderManager from "../../../Pages/ErrorPages/LoaderManager";

function Contents() {
  const { manager } = useSelector((state) => state.managerSlice);
  const [jumbotronHeading, setJumbotronHeading] = useState("We invest in the world’s potential");
  const [jumbotronParagraph, setJumbotronParagraph] = useState("Lorem ipsum dolor sit amet consectetur adipisicing elit. Est accusamus expedita quaerat, a ipsa necessitatibus fugit atque ullam dicta nobis beatae saepe odit quam fuga, debitis maxime quasi ab amet?");
  const [aboutUs, setAboutUs] = useState("Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam finibus eros nec neque placerat eleifend. Nullam scelerisque tincidunt turpis, nec cursus augue faucibus a. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti ex placeat soluta aut sunt magni harum ipsam ducimus fugiat at, architecto, voluptatum ipsum eveniet velit minima alias non dolorum laborum.");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const res = await contentPost({
        heading: jumbotronHeading,
        paragraph: jumbotronParagraph,
        aboutUs: aboutUs,
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
          <div className="border border-gray-200 border-dashed shadow-md rounded-lg p-10 space-y-5">
            <div className="space-y-2">
              <label className="label">
                <span className="label-text text-base font-semibold">
                  1. Jumbotron Heading.
                </span>
              </label>
              <input
                className="w-full rounded-md border-gray-200 p-3 text-sm"
                placeholder="Type Here"
                type="text"
                id="jumborton heading"
                value={jumbotronHeading}
                onChange={(e) => setJumbotronHeading(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="label">
                <span className="label-text text-base font-semibold">
                  2. Jumbotron Paragraph.
                </span>
              </label>
              <input
                className="w-full rounded-md border-gray-200 p-3 text-sm"
                placeholder="Type Here"
                type="text"
                id="jumborton Paragraph"
                value={jumbotronParagraph}
                onChange={(e) => setJumbotronParagraph(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="label">
                <span className="label-text text-base font-semibold">
                  3. About Us.
                </span>
              </label>
              <textarea
                className="w-full rounded-md border-gray-200 p-3 text-sm"
                placeholder="Type Here"
                type="text"
                rows={10}
                id="aboutus"
                value={aboutUs}
                onChange={(e) => setAboutUs(e.target.value)}
              />
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
      </main>
    </>
  );
}

export default Contents;
