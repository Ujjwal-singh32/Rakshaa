"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Calendar = ({ selected, onChange }) => {
  return (
    <DatePicker
      selected={selected}
      onChange={onChange}
      dateFormat="yyyy-MM-dd"
      className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      placeholderText="Select a date"
    />
  );
};
