"use client";

import { useState } from "react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, subMonths, addMonths } from "date-fns";
import { ChevronLeft, ChevronRight, CalendarIcon, ChevronDown } from "lucide-react";
import clsx from "clsx";
import Image from "next/image";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const startDate = startOfWeek(startOfMonth(currentMonth));
  const endDate = endOfWeek(endOfMonth(currentMonth));

  const days: Date[] = [];
  let day = startDate;

  while (day <= endDate) {
    days.push(day);
    day = addDays(day, 1);
  }

  const getDotColor = (day: Date) => {
    const colors = ["bg-red-500", "bg-orange-500", "bg-green-500"];
    return colors[day.getDate() % colors.length];
  };

  return (
    <div className="max-w-[1116px] mx-auto bg-[#0B0B0B] w-[1116px] h-[900px] text-white p-6 rounded-lg">
      <h2 className="text-gray-400 text-lg font-medium">CALENDAR</h2>
      
      {/* Calendar */}
      <div className="mt-4 border-t border-gray-600 pt-4 font-bold text-white flex mb-6">
        <CalendarIcon className="mr-2 text-white" /> AVAILABILITY & WORK PREFERENCES
      </div>

      <div className="bg-[#FFFFFF0D] text-white border w-[917px] h-[700px] border-white p-6 ml-14 rounded-lg">
        {/* Navigation */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center text-white underline hover:text-white cursor-pointer">
            <Image src="/arrow-go-back-line.png" alt="arrow" width={25} height={25} className="w-4 h-4 mr-2" />
            Back to calendar summary
          </div>
          <div className="flex items-center border border-gray-400 px-3 py-1 rounded-lg cursor-pointer text-[#CECDD5]">
            Filter
            <ChevronDown className="w-4 h-4 ml-2 text-gray-400" />
          </div>
        </div>

        {/* Month */}
        <div className="flex items-center justify-between bg-[#21202D] rounded-lg py-2 px-6 border border-gray-700">
          <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}>
            <ChevronLeft className="text-gray-400 hover:text-white" />
          </button>
          <h2 className="text-lg font-semibold">{format(currentMonth, "MMMM yyyy")}</h2>
          <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
            <ChevronRight className="text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Weekdays */}
        <div className="grid grid-cols-7 gap-4 text-center mt-4">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-gray-500 text-xs font-bold">
              {day}
            </div>
          ))}
          
          {/* Days Grid */}
          {days.map((dayItem) => {
            const isCurrentMonth = dayItem.getMonth() === currentMonth.getMonth();
            return (
              <div
                key={dayItem.toString()}
                className={clsx(
                  "w-[119.57px] h-[63.4px] flex flex-col items-start justify-between rounded-[12px] border border-[#FFFFFF1A] text-sm font-medium p-2 pl-3 bg-[#FFFFFF0D]",
                  "hover:bg-gray-700 cursor-pointer relative"
                )}
              >
                {isCurrentMonth && <span>{format(dayItem, "d")}</span>}
                {isCurrentMonth && <span className={`absolute bottom-2 left-3 w-2 h-2 rounded-full ${getDotColor(dayItem)}`}></span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;