"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  Edit,
  Trash2,
  Music,
  Users,
  MapPin,
  CheckCircle,
  XCircle,
  Search,
  Plus,
  Filter,
  MoreHorizontal,
  ChevronDown,
} from "lucide-react"

export default function OrganizerDashboard() {
  const [activeTab, setActiveTab] = useState("events")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingEvent, setEditingEvent] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [deleteEventId, setDeleteEventId] = useState(null)

  // Mock data for events
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Summer Beach Party",
      date: "2025-07-15",
      time: "8:00 PM",
      location: "Sunset Beach Club",
      status: "upcoming",
      attendees: 120,
      thumbnail: "/placeholder.svg?height=100&width=180",
      description: "Annual summer beach party with live music and drinks.",
    },
    {
      id: 2,
      title: "Downtown Music Festival",
      date: "2025-08-22",
      time: "6:00 PM",
      location: "City Center Plaza",
      status: "upcoming",
      attendees: 350,
      thumbnail: "/placeholder.svg?height=100&width=180",
      description: "Three-day music festival featuring local and international artists.",
    },
    {
      id: 3,
      title: "Techno Night",
      date: "2025-06-10",
      time: "10:00 PM",
      location: "Underground Club",
      status: "upcoming",
      attendees: 85,
      thumbnail: "/placeholder.svg?height=100&width=180",
      description: "All night techno event with guest DJs from Europe.",
    },
    {
      id: 4,
      title: "Jazz & Wine Evening",
      date: "2025-05-30",
      time: "7:00 PM",
      location: "Vineyard Terrace",
      status: "completed",
      attendees: 75,
      thumbnail: "/placeholder.svg?height=100&width=180",
      description: "Elegant evening of jazz music paired with fine wines.",
    },
  ])

  // Mock data for bookings
  const [bookings, setBookings] = useState([
    {
      id: 101,
      eventId: 1,
      customerName: "Sarah Johnson",
      email: "sarah.j@example.com",
      tickets: 2,
      bookingDate: "2025-06-20",
      status: "confirmed",
      totalAmount: "$120.00",
    },
    {
      id: 102,
      eventId: 1,
      customerName: "Michael Brown",
      email: "michael.b@example.com",
      tickets: 4,
      bookingDate: "2025-06-22",
      status: "confirmed",
      totalAmount: "$240.00",
    },
    {
      id: 103,
      eventId: 2,
      customerName: "Emily Davis",
      email: "emily.d@example.com",
      tickets: 3,
      bookingDate: "2025-07-05",
      status: "pending",
      totalAmount: "$195.00",
    },
    {
      id: 104,
      eventId: 3,
      customerName: "David Wilson",
      email: "david.w@example.com",
      tickets: 1,
      bookingDate: "2025-05-28",
      status: "confirmed",
      totalAmount: "$55.00",
    },
    {
      id: 105,
      eventId: 2,
      customerName: "Jessica Miller",
      email: "jessica.m@example.com",
      tickets: 2,
      bookingDate: "2025-07-10",
      status: "confirmed",
      totalAmount: "$130.00",
    },
  ])

  // Mock data for DJ applications
  const [djApplications, setDjApplications] = useState([
    {
      id: 201,
      eventId: 1,
      djName: "DJ Pulse",
      email: "djpulse@example.com",
      genre: "House",
      experience: "5 years",
      portfolio: "https://soundcloud.com/djpulse",
      status: "pending",
      appliedDate: "2025-06-15",
    },
    {
      id: 202,
      eventId: 2,
      djName: "BeatMaster",
      email: "beatmaster@example.com",
      genre: "Hip Hop",
      experience: "8 years",
      portfolio: "https://soundcloud.com/beatmaster",
      status: "approved",
      appliedDate: "2025-06-10",
    },
    {
      id: 203,
      eventId: 1,
      djName: "Vinyl Queen",
      email: "vinylqueen@example.com",
      genre: "Disco",
      experience: "6 years",
      portfolio: "https://soundcloud.com/vinylqueen",
      status: "pending",
      appliedDate: "2025-06-18",
    },
    {
      id: 204,
      eventId: 3,
      djName: "Techno Tim",
      email: "technotim@example.com",
      genre: "Techno",
      experience: "10 years",
      portfolio: "https://soundcloud.com/technotim",
      status: "rejected",
      appliedDate: "2025-06-05",
    },
    {
      id: 205,
      eventId: 2,
      djName: "Melody Mixer",
      email: "melodymixer@example.com",
      genre: "EDM",
      experience: "3 years",
      portfolio: "https://soundcloud.com/melodymixer",
      status: "pending",
      appliedDate: "2025-06-20",
    },
  ])

  // Function to handle event editing
  const handleEditEvent = (event) => {
    setEditingEvent({ ...event })
    setShowEditModal(true)
  }

  // Function to save edited event
  const saveEditedEvent = () => {
    setEvents(events.map((event) => (event.id === editingEvent.id ? editingEvent : event)))
    setShowEditModal(false)
    setEditingEvent(null)
  }

  // Function to handle event deletion
  const handleDeleteEvent = (eventId) => {
    setDeleteEventId(eventId)
    setShowDeleteConfirm(true)
  }

  // Function to confirm event deletion
  const confirmDeleteEvent = () => {
    setEvents(events.filter((event) => event.id !== deleteEventId))
    setShowDeleteConfirm(false)
    setDeleteEventId(null)
  }

  // Function to handle DJ application approval/rejection
  const handleDjApplicationStatus = (applicationId, newStatus) => {
    setDjApplications(djApplications.map((app) => (app.id === applicationId ? { ...app, status: newStatus } : app)))
  }

  // Filter events based on search query
  const filteredEvents = events.filter(
    (event) =>
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Get event name by ID
  const getEventNameById = (eventId) => {
    const event = events.find((e) => e.id === eventId)
    return event ? event.title : "Unknown Event"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Organizer Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center">
              <span className="font-medium">AO</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("events")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "events"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Event Listings
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "bookings"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Bookings
            </button>
            <button
              onClick={() => setActiveTab("dj-applications")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "dj-applications"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              DJ Applications
            </button>
          </nav>
        </div>

        {/* Events Tab Content */}
        {activeTab === "events" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Manage Events</h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                <Plus className="h-4 w-4 mr-2" />
                Add New Event
              </button>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">Filter</span>
                  <div className="flex items-center space-x-1 text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    <span>All Events</span>
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
                <div className="text-sm text-gray-500">Showing {filteredEvents.length} events</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {filteredEvents.map((event) => (
                  <div
                    key={event.id}
                    className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <img
                      src={event.thumbnail || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <div className="flex justify-between items-start">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{event.title}</h3>
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            event.status === "upcoming" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {event.status === "upcoming" ? "Upcoming" : "Completed"}
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">{event.description}</p>

                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Calendar className="h-4 w-4 mr-2" />
                        {event.date}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.time}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mb-3">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees} attendees
                      </div>

                      <div className="flex justify-end space-x-2 mt-4">
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="flex items-center text-sm text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event.id)}
                          className="flex items-center text-sm text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Bookings Tab Content */}
        {activeTab === "bookings" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">Manage Bookings</h2>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </button>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Booking ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Event
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Customer
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Tickets
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Booking Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{booking.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getEventNameById(booking.eventId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{booking.customerName}</div>
                          <div className="text-sm text-gray-500">{booking.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.tickets}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.bookingDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {booking.totalAmount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <button className="text-blue-600 hover:text-blue-900">
                            <MoreHorizontal className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* DJ Applications Tab Content */}
        {activeTab === "dj-applications" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-800">DJ Applications</h2>
              <div className="flex items-center space-x-2">
                <select className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="all">All Applications</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        DJ
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Event
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Genre
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Experience
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Applied Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {djApplications.map((application) => (
                      <tr key={application.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                              <Music className="h-5 w-5 text-gray-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{application.djName}</div>
                              <div className="text-sm text-gray-500">{application.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getEventNameById(application.eventId)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.genre}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.experience}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{application.appliedDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              application.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : application.status === "rejected"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {application.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {application.status === "pending" ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleDjApplicationStatus(application.id, "approved")}
                                className="text-green-600 hover:text-green-900 flex items-center"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </button>
                              <button
                                onClick={() => handleDjApplicationStatus(application.id, "rejected")}
                                className="text-red-600 hover:text-red-900 flex items-center"
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </button>
                            </div>
                          ) : (
                            <a
                              href={application.portfolio}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-900"
                            >
                              View Portfolio
                            </a>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Edit Event Modal */}
      {showEditModal && editingEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Edit Event</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                  <input
                    type="text"
                    value={editingEvent.title}
                    onChange={(e) => setEditingEvent({ ...editingEvent, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={editingEvent.location}
                    onChange={(e) => setEditingEvent({ ...editingEvent, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    value={editingEvent.date}
                    onChange={(e) => setEditingEvent({ ...editingEvent, date: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={editingEvent.time}
                    onChange={(e) => setEditingEvent({ ...editingEvent, time: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editingEvent.status}
                    onChange={(e) => setEditingEvent({ ...editingEvent, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Attendees</label>
                  <input
                    type="number"
                    value={editingEvent.attendees}
                    onChange={(e) => setEditingEvent({ ...editingEvent, attendees: Number.parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={editingEvent.description}
                  onChange={(e) => setEditingEvent({ ...editingEvent, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={saveEditedEvent}
                className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 overflow-hidden">
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Deletion</h3>
              <p className="text-gray-600">Are you sure you want to delete this event? This action cannot be undone.</p>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteEvent}
                className="px-4 py-2 bg-red-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-700"
              >
                Delete Event
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

