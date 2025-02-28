"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, Star } from "lucide-react"

// Mock data for the event
const eventData = {
  id: 1,
  title: "Summer Beats Festival 2025",
  date: "August 15-17, 2025",
  time: "2:00 PM - 11:00 PM",
  location: "Sunset Beach, Miami",
  image: "/placeholder.svg?height=400&width=800",
  description:
    "Get ready for the hottest beach party of the year! Summer Beats Festival brings you three days of non-stop music, featuring top DJs from around the world. Dance on the sand, enjoy refreshing drinks, and create unforgettable memories under the Miami sun.",
  ticketPrice: "$150",
  attendees: 1500,
  capacity: 2000,
}

// Mock data for assigned DJs
const assignedDJs = [
  { id: 1, name: "DJ Pulse", genre: "House", image: "/placeholder.svg?height=100&width=100", rating: 4.8 },
  { id: 2, name: "Beatmaster", genre: "Techno", image: "/placeholder.svg?height=100&width=100", rating: 4.9 },
  { id: 3, name: "Vinyl Queen", genre: "Disco", image: "/placeholder.svg?height=100&width=100", rating: 4.7 },
]

// Mock data for attendees (just names for this example)
const attendeeNames = [
  "Alex Johnson",
  "Sam Smith",
  "Emily Brown",
  "Chris Lee",
  "Jessica Wang",
  "Michael Tran",
  "Sarah Patel",
  "David Kim",
  "Olivia Martinez",
  "Ryan Taylor",
]

// Mock data for related events
const relatedEvents = [
  { id: 2, title: "Neon Nights Rave", date: "September 5, 2025", image: "/placeholder.svg?height=200&width=300" },
  { id: 3, title: "Retro Disco Party", date: "October 12, 2025", image: "/placeholder.svg?height=200&width=300" },
  { id: 4, title: "EDM Warehouse Fest", date: "November 20, 2025", image: "/placeholder.svg?height=200&width=300" },
]

export default function EventDetailsPage() {
  const [isRSVPed, setIsRSVPed] = useState(false)

  const handleRSVP = () => {
    setIsRSVPed(!isRSVPed)
    // In a real application, you would send this state to your backend
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <img
          src={eventData.image || "/placeholder.svg"}
          alt={eventData.title}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{eventData.title}</h1>
          <p className="text-xl mb-2">{eventData.date}</p>
          <p className="text-lg">{eventData.location}</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Event Details</h2>
              <p className="text-gray-600 mb-6">{eventData.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-2" />
                  <span>{eventData.date}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Clock className="w-5 h-5 mr-2" />
                  <span>{eventData.time}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  <span>{eventData.location}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-2" />
                  <span>
                    {eventData.attendees} / {eventData.capacity} attending
                  </span>
                </div>
              </div>
            </section>

            {/* Assigned DJs */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Featured DJs</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {assignedDJs.map((dj) => (
                  <div key={dj.id} className="bg-gray-50 rounded-lg p-4 flex flex-col items-center">
                    <img src={dj.image || "/placeholder.svg"} alt={dj.name} className="w-24 h-24 rounded-full mb-3" />
                    <h3 className="font-semibold text-lg">{dj.name}</h3>
                    <p className="text-gray-600">{dj.genre}</p>
                    <div className="flex items-center mt-2">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span>{dj.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Attendees */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Attendees</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {attendeeNames.slice(0, 8).map((name, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-600 font-semibold"
                  >
                    {name.charAt(0)}
                  </div>
                ))}
                {eventData.attendees > 8 && (
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-semibold">
                    +{eventData.attendees - 8}
                  </div>
                )}
              </div>
              <p className="text-gray-600">{eventData.attendees} people are attending this event</p>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* RSVP and Booking */}
            <section className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-semibold mb-4">Reserve Your Spot</h2>
              <p className="text-gray-600 mb-4">Ticket Price: {eventData.ticketPrice}</p>
              <button
                onClick={handleRSVP}
                className={`w-full py-3 px-4 rounded-md text-white font-semibold mb-4 ${
                  isRSVPed ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isRSVPed ? "Cancel RSVP" : "RSVP Now"}
              </button>
              <button className="w-full py-3 px-4 bg-purple-600 hover:bg-purple-700 rounded-md text-white font-semibold">
                Book a DJ
              </button>
            </section>

            {/* Related Events */}
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-4">Related Events</h2>
              <div className="space-y-4">
                {relatedEvents.map((event) => (
                  <div key={event.id} className="flex items-center space-x-4">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-20 h-20 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-semibold">{event.title}</h3>
                      <p className="text-sm text-gray-600">{event.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

