

const useFileToDataURLConverter = () => {
  const convertFileToDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  return { convertFileToDataURL };
};

export default useFileToDataURLConverter;
