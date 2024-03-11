/* eslint-disable react/prop-types */

import { useState, useEffect } from "react";

function PreviewImage({ file }) {
  const [preview, setPreview] = useState(null);
  const [Loading1, setLoading1] = useState(true);

  useEffect(() => {
    if (file instanceof Blob) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreview(reader.result);
        // Simulate a delay before hiding the loading spinner (e.g., 2 seconds)
        setTimeout(() => {
          setLoading1(false);
        }, 1000);
      };
    } else {
      setPreview(file);
      setTimeout(() => {
        setLoading1(false);
      }, 1000);
    }
  }, [file]);

  return (
    <div className="mb-4 ml-20 relative">
      {Loading1 ? (
        <span className="loading loading-spinner loading-sm"></span>
      ) : (
        <img
          src={preview}
          alt="Preview"
          className="w-96 h-56 object-cover rounded-md"
        />
      )}
    </div>
  );
}

export default PreviewImage;
