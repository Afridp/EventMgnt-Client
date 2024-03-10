import { UploadOutlined } from "@ant-design/icons";
import { Button, Space, Upload } from "antd";
import { useState } from "react";

function Files() {
  const [homePageImage, setHomePageImage] = useState("");
  const [logo, setLogo] = useState("");

  const handleUpload = (e, type) => {
    const { file } = e;
    console.log(file.url);
    const thumbUrl = file.thumbUr;

    // console.log(url);
    if (type === "homePage") {
      setHomePageImage(thumbUrl);
    } else if (type === "logo") {
      setLogo(thumbUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      console.log(homePageImage);
      console.log(logo);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <main>
        <div className="py-4">
          <div className="h-full border border-gray-200 border-dashed shadow-lg rounded-lg p-10">
            <form onSubmit={handleSubmit}>
              <div className="grid grid-row gap-8">
                <div>
                  <label className="label">
                    <span className="label-text text-base font-semibold">
                      1. Upload Home Page Jumbotron Image.
                    </span>
                  </label>
                  <div className="p-5">
                    <Space
                      direction="vertical"
                      style={{
                        width: "100%",
                      }}
                      size="large"
                    >
                      <Upload
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture"
                        maxCount={1}
                        onChange={(e) => handleUpload(e, "homePage")}
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Space>
                  </div>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-base font-semibold">
                      2. Upload Company Logo Image.
                    </span>
                  </label>
                  <div className="p-4">
                    <Space
                      direction="vertical"
                      style={{
                        width: "100%",
                      }}
                      size="large"
                    >
                      <Upload
                        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                        listType="picture"
                        maxCount={1}
                        onChange={(e) => handleUpload(e, "logo")}
                      >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                      </Upload>
                    </Space>
                  </div>
                </div>
              </div>
              <div className="flex justify-end p-6">
                <button
                  type="submit"
                  className="bg-black px-5 py-3 font-medium text-white"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Files;
