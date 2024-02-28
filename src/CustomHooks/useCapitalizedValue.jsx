

const useCapitalizedValue = () => {
  const capitalizeFirstLetter = (str) => {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return { capitalizeFirstLetter };
};

export default useCapitalizedValue;
