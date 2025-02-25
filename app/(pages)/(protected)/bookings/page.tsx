import React from "react";
import { CalendarIcon, Clock3, MapPin } from "lucide-react";
import Image from "next/image";
import mapImage from "/public/images/profile/map.png";

const Bookings = () => {
  return (
    <div className="bg-black min-h-screen p-6 text-white">
      <div className="max-w-6xl mx-auto">
        <div className="p-1 lg:p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <CalendarIcon className="text-white" /> AVAILABILITY & WORK PREFERENCES
          </h3>

          <div className="flex flex-col lg:flex-row items-start lg:mt-16 md:mt-14 mt-12 gap-6 max-w-[917px]">
            {/* Left Section */}
            <div className="flex flex-col gap-3 w-full lg:w-[534px] rounded-md">
              {/* Availability Status */}
              <div className="lg:p-2 md:p-2 p-0 bg-[#1b1112] lg:h-[60px] md:h-[60px] border border-[#2a2a2a] rounded-md shadow-md flex justify-between items-center">
                <div className="flex items-center gap-2 bg-[#1b1112] border border-[#2a2a2a] text-orange-400 text-sm font-semibold lg:pl-3  sm:p-0 rounded-[8px]">
                  <Clock3 className="w-4 h-4" />
                  <span>Fully booked this month!</span>
                  <div className="flex items-center gap-2 bg-[#29252e] text-gray-300 text-sm px-3 rounded-[8px] lg:h-7">
                    <CalendarIcon className="w-4 h-4" />
                    <span>Next available in December!</span>
                  </div>
                </div>
              </div>

              {/* Availability List */}
              <div className="bg-[#151515] rounded-md p-3 flex flex-col gap-2 border border-[#292929]">
                {[
                  { month: "November", status: "Fully Booked", color: "text-pink-200" },
                  { month: "December", status: "Open for Bookings", color: "text-green-400" },
                  { month: "January", status: "Limited Dates", color: "text-orange-400" }
                ].map(({ month, status, color }, index) => (
                  <div key={index} className="bg-[#21202c] border border-[#292929] p-2 rounded-md flex justify-between items-center h-11">
                    <span className="p-1">{month}</span>
                    <span className={`flex items-center ${color}`}>
                      <Clock3 className="mr-2 truncate" /> {status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="flex lg:flex-row flex-col justify-between items-center">
                <p className="text-white text-sm lg:p-0 p-4">Check my full calendar for my availability</p>
                <button className="bg-violet-100 text-sm p-1 rounded-full border-[3px] border-violet-300 text-violet-600 hover:bg-violet-600 transition hover:text-violet-200 h-9 w-40">
                  Check availability →
                </button>
              </div>
            </div>

            {/* Right Section */}
            <div className="bg-[#1b1b1b] p-4 rounded-lg shadow-md border border-[#292929] w-full lg:max-w-[359px]">
              <h3 className="text-lg">DREAM VENUE/EVENT</h3>
              <p className="text-gray-400 mt-2">
                I’ve always dreamed of DJing at Coachella—it’s the ultimate stage for any DJ.
              </p>

              <h4 className="mt-4 font-semibold">OPEN TO DJING IN:</h4>
              <div className="flex flex-wrap gap-2 mt-2">
                {["Los Angeles", "New York", "Miami", "International Destinations"].map((city, index) => (
                  <span
                    key={index}
                    className={`flex items-center p-1 rounded-full bg-gray-800 truncate hover:bg-gray-300 hover:text-black group`}
                  >
                    <MapPin className="mr-1 stroke-current transition-all duration-200 ease-in-out group-hover:stroke-black group-hover:fill-transparent" />

                    {city}
                  </span>
                ))}
              </div>

              <Image
                src={mapImage}
                alt="Los Angeles Map"
                className="w-full rounded-md h-12 object-cover mt-2"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bookings;