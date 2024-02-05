/* eslint-disable react/prop-types */

const DateFormatter = ({ createdAt }) => {
  const joinedOnDate = new Date(createdAt);
  const formattedJoinedOnDate = joinedOnDate.toLocaleDateString("en-GB");

  return <span className="font-bold">{formattedJoinedOnDate}</span>;
};

export default DateFormatter;