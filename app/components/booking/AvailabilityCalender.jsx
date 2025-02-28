"use client";

import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { format, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data for available and booked dates
const BOOKED_DATES = [
  new Date(2025, 5, 10),
  new Date(2025, 5, 11),
  new Date(2025, 5, 17),
  new Date(2025, 5, 24),
  new Date(2025, 5, 25),
  new Date(2025, 6, 1),
  new Date(2025, 6, 2),
];

const AVAILABLE_TIMES = [
  "10:00 AM - 2:00 PM",
  "2:00 PM - 6:00 PM",
  "6:00 PM - 10:00 PM",
  "8:00 PM - 12:00 AM",
];

export default function AvailabilityCalendar({ selectedDate }) {
  const [focusedDate, setFocusedDate] =
    (useState < Date) | (undefined > selectedDate);

  // Function to check if a date is booked
  const isDateBooked = (date) => {
    return BOOKED_DATES.some((bookedDate) => isSameDay(date, bookedDate));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <h3 className="text-lg font-medium mb-4">Check Availability</h3>
          <div className="border rounded-md p-4">
            <Calendar
              mode="single"
              selected={focusedDate}
              onSelect={setFocusedDate}
              disabled={(date) => date < new Date()}
              modifiers={{
                booked: BOOKED_DATES,
              }}
              modifiersStyles={{
                booked: { backgroundColor: "hsl(var(--destructive) / 0.1)" },
              }}
              className="rounded-md border"
              components={{
                DayContent: (props) => {
                  const isBooked = isDateBooked(props.date);
                  return (
                    <div
                      className={cn(
                        "relative w-full h-full flex items-center justify-center",
                        isBooked && "text-destructive font-medium"
                      )}
                    >
                      {props.date.getDate()}
                      {isBooked && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-destructive"></div>
                      )}
                    </div>
                  );
                },
              }}
            />
          </div>
          <div className="flex items-center justify-center gap-4 mt-4 text-sm">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full bg-destructive/30"></div>
              <span>Booked</span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-medium mb-4">
            {focusedDate
              ? `Available Times for ${format(focusedDate, "MMMM d, yyyy")}`
              : "Select a date to see available times"}
          </h3>
          {focusedDate ? (
            isDateBooked(focusedDate) ? (
              <div className="border rounded-md p-6 flex items-center justify-center h-full">
                <p className="text-destructive font-medium">
                  This date is already booked. Please select another date.
                </p>
              </div>
            ) : (
              <div className="border rounded-md p-4 space-y-3">
                {AVAILABLE_TIMES.map((time) => (
                  <div
                    key={time}
                    className="p-3 border rounded-md hover:bg-accent cursor-pointer transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <span>{time}</span>
                      <Badge variant="outline" className="bg-primary/10">
                        Available
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : (
            <div className="border rounded-md p-6 flex items-center justify-center h-full">
              <p className="text-muted-foreground">
                Please select a date to view available time slots.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
