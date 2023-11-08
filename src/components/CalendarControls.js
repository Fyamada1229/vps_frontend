import React from "react";

const CalendarControls = ({ onNextMonth, onPreviousMonth }) => {
  console.log(onNextMonth);
  return (
    <div className="flex justify-between mb-4">
      <button
        onClick={onPreviousMonth}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        前の月
      </button>
      <button
        onClick={onNextMonth}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        次の月
      </button>
    </div>
  );
};

export default CalendarControls;
