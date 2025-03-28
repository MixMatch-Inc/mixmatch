const users = [
  {
    id: "user1",
    name: "DJ Spinmaster",
    email: "dj@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "dj",
    bio: "Professional DJ with 10+ years of experience in weddings, corporate events, and nightclubs.",
    location: "New York, NY",
    genres: ["House", "EDM", "Hip Hop", "Top 40"],
    hourlyRate: 150,
    rating: 4.8,
    reviewCount: 42,
    socialLinks: {
      instagram: "djspinmaster",
      soundcloud: "djspinmaster",
      spotify: "djspinmaster",
      website: "djspinmaster.com",
    },
    createdAt: "2022-01-15T00:00:00Z",
  },
  {
    id: "user2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "organizer",
    bio: "Event planner specializing in corporate events and weddings.",
    location: "Los Angeles, CA",
    createdAt: "2022-02-10T00:00:00Z",
  },
  {
    id: "user3",
    name: "DJ Beatdropper",
    email: "beatdropper@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "dj",
    bio: "Specializing in hip-hop and R&B, I bring the perfect vibe to any party.",
    location: "Miami, FL",
    genres: ["Hip Hop", "R&B", "Trap"],
    hourlyRate: 120,
    rating: 4.6,
    reviewCount: 28,
    socialLinks: {
      instagram: "beatdropper",
      soundcloud: "beatdropper",
    },
    createdAt: "2022-03-05T00:00:00Z",
  },
  {
    id: "user4",
    name: "DJ Vinyl Queen",
    email: "vinyl@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "dj",
    bio: "Old-school vinyl DJ bringing classic vibes to your event.",
    location: "Chicago, IL",
    genres: ["Disco", "Funk", "Soul", "80s"],
    hourlyRate: 180,
    rating: 4.9,
    reviewCount: 36,
    socialLinks: {
      instagram: "vinylqueen",
      website: "vinylqueen.com",
    },
    createdAt: "2022-01-20T00:00:00Z",
  },
  {
    id: "user5",
    name: "Michael Brown",
    email: "michael@example.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "organizer",
    bio: "Wedding planner with an eye for detail and a passion for creating memorable experiences.",
    location: "Boston, MA",
    createdAt: "2022-02-15T00:00:00Z",
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@mixmatch.com",
    image: "/placeholder.svg?height=40&width=40",
    role: "admin",
    createdAt: "2022-01-01T00:00:00Z",
  },
]

// Mock Events Data
const events  = [
  {
    id: "event1",
    name: "Corporate Holiday Party",
    date: "2023-12-15",
    time: "19:00",
    location: "Grand Ballroom, NYC",
    description: "Annual holiday celebration for XYZ Corp employees and their families.",
    organizerId: "user2",
    djId: "user1",
    status: "confirmed",
    attendees: 150,
    eventType: "Corporate",
    specialRequests: "Please include some holiday classics in the playlist.",
    createdAt: "2023-10-01T00:00:00Z",
  },
  {
    id: "event2",
    name: "Smith-Johnson Wedding",
    date: "2023-06-24",
    time: "16:00",
    location: "Seaside Resort, Malibu",
    description: "Beach wedding with reception to follow.",
    organizerId: "user5",
    djId: "user3",
    status: "completed",
    attendees: 80,
    eventType: "Wedding",
    specialRequests: "Couple's first dance song: 'At Last' by Etta James",
    createdAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "event3",
    name: "Summer Launch Party",
    date: "2023-07-10",
    time: "20:00",
    location: "Rooftop Lounge, Chicago",
    description: "Product launch celebration with industry professionals.",
    organizerId: "user2",
    djId: "user4",
    status: "confirmed",
    attendees: 100,
    eventType: "Corporate",
    createdAt: "2023-05-01T00:00:00Z",
  },
  {
    id: "event4",
    name: "Charity Gala",
    date: "2023-09-30",
    time: "18:30",
    location: "Metropolitan Museum, NYC",
    description: "Annual fundraising event for children's hospital.",
    organizerId: "user5",
    status: "pending",
    attendees: 200,
    eventType: "Charity",
    createdAt: "2023-07-15T00:00:00Z",
  },
  {
    id: "event5",
    name: "Birthday Bash",
    date: "2023-08-12",
    time: "21:00",
    location: "Club Vibe, Miami",
    description: "30th birthday celebration with friends and family.",
    organizerId: "user2",
    djId: "user1",
    status: "confirmed",
    attendees: 50,
    eventType: "Birthday",
    specialRequests: "90s hip-hop focus",
    createdAt: "2023-06-01T00:00:00Z",
  },
]

// Mock Bookings Data
const bookings = [
  {
    id: "booking1",
    eventId: "event1",
    djId: "user1",
    organizerId: "user2",
    status: "accepted",
    price: 750,
    paymentStatus: "paid",
    createdAt: "2023-10-05T00:00:00Z",
  },
  {
    id: "booking2",
    eventId: "event2",
    djId: "user3",
    organizerId: "user5",
    status: "completed",
    price: 600,
    paymentStatus: "paid",
    createdAt: "2023-02-01T00:00:00Z",
  },
  {
    id: "booking3",
    eventId: "event3",
    djId: "user4",
    organizerId: "user2",
    status: "accepted",
    price: 900,
    paymentStatus: "paid",
    createdAt: "2023-05-10T00:00:00Z",
  },
  {
    id: "booking4",
    eventId: "event5",
    djId: "user1",
    organizerId: "user2",
    status: "accepted",
    price: 450,
    paymentStatus: "paid",
    createdAt: "2023-06-15T00:00:00Z",
  },
]

// Mock Reviews Data
const reviews = [
  {
    id: "review1",
    rating: 5,
    comment: "DJ Spinmaster was amazing! Everyone loved the music and he was very professional.",
    eventId: "event1",
    reviewerId: "user2",
    revieweeId: "user1",
    createdAt: "2023-12-16T00:00:00Z",
  },
  {
    id: "review2",
    rating: 4,
    comment: "Great music selection, though setup took a bit longer than expected.",
    eventId: "event2",
    reviewerId: "user5",
    revieweeId: "user3",
    createdAt: "2023-06-25T00:00:00Z",
  },
  {
    id: "review3",
    rating: 5,
    comment: "DJ Vinyl Queen brought amazing energy to our event. Would definitely book again!",
    eventId: "event3",
    reviewerId: "user2",
    revieweeId: "user4",
    createdAt: "2023-07-11T00:00:00Z",
  },
  {
    id: "review4",
    rating: 5,
    comment: "Perfect music for our birthday party. DJ Spinmaster read the room perfectly.",
    eventId: "event5",
    reviewerId: "user2",
    revieweeId: "user1",
    createdAt: "2023-08-13T00:00:00Z",
  },
]

// Mock Messages Data
const messages = [
  {
    id: "message1",
    content: "Hi, I'm interested in booking you for our corporate event on December 15th. Are you available?",
    senderId: "user2",
    receiverId: "user1",
    eventId: "event1",
    read: true,
    createdAt: "2023-09-15T10:30:00Z",
  },
  {
    id: "message2",
    content: "Yes, I'm available on that date. Can you provide more details about the event?",
    senderId: "user1",
    receiverId: "user2",
    eventId: "event1",
    read: true,
    createdAt: "2023-09-15T11:45:00Z",
  },
  {
    id: "message3",
    content: "Great! It's a corporate holiday party for about 150 people. We need music from 7pm to 11pm.",
    senderId: "user2",
    receiverId: "user1",
    eventId: "event1",
    read: true,
    createdAt: "2023-09-15T13:20:00Z",
  },
  {
    id: "message4",
    content: "That works for me. My rate for a 4-hour corporate event is $750. Does that work with your budget?",
    senderId: "user1",
    receiverId: "user2",
    eventId: "event1",
    read: true,
    createdAt: "2023-09-15T14:10:00Z",
  },
  {
    id: "message5",
    content: "That's within our budget. I'll send you a booking request with all the details.",
    senderId: "user2",
    receiverId: "user1",
    eventId: "event1",
    read: true,
    createdAt: "2023-09-15T15:30:00Z",
  },
  {
    id: "message6",
    content: "Hello! Just checking in about our upcoming event. Do you have any questions?",
    senderId: "user2",
    receiverId: "user4",
    eventId: "event3",
    read: false,
    createdAt: "2023-06-25T09:15:00Z",
  },
]

// Mock Subscriptions Data
const subscriptions = [
  {
    id: "sub1",
    userId: "user1",
    plan: "pro",
    price: 29.99,
    startDate: "2023-01-01T00:00:00Z",
    endDate: "2024-01-01T00:00:00Z",
    status: "active",
    features: ["Featured profile", "Priority in search results", "Analytics dashboard", "Unlimited bookings"],
  },
  {
    id: "sub2",
    userId: "user2",
    plan: "basic",
    price: 9.99,
    startDate: "2023-02-01T00:00:00Z",
    endDate: "2024-02-01T00:00:00Z",
    status: "active",
    features: ["Up to 10 bookings per month", "Basic analytics", "Email support"],
  },
  {
    id: "sub3",
    userId: "user3",
    plan: "basic",
    price: 9.99,
    startDate: "2023-03-01T00:00:00Z",
    endDate: "2024-03-01T00:00:00Z",
    status: "active",
    features: ["Up to 10 bookings per month", "Basic analytics", "Email support"],
  },
  {
    id: "sub4",
    userId: "user4",
    plan: "premium",
    price: 49.99,
    startDate: "2023-01-15T00:00:00Z",
    endDate: "2024-01-15T00:00:00Z",
    status: "active",
    features: [
      "Featured profile",
      "Priority in search results",
      "Advanced analytics dashboard",
      "Unlimited bookings",
      "Priority support",
      "Custom branding",
    ],
  },
  {
    id: "sub5",
    userId: "user5",
    plan: "pro",
    price: 29.99,
    startDate: "2023-02-15T00:00:00Z",
    endDate: "2024-02-15T00:00:00Z",
    status: "active",
    features: ["Featured profile", "Priority in search results", "Analytics dashboard", "Unlimited bookings"],
  },
]

// Mock Payments Data
const payments = [
  {
    id: "payment1",
    userId: "user2",
    amount: 750,
    currency: "USD",
    status: "completed",
    type: "booking",
    bookingId: "booking1",
    transactionId: "tx_123456",
    createdAt: "2023-10-05T00:00:00Z",
  },
  {
    id: "payment2",
    userId: "user5",
    amount: 600,
    currency: "USD",
    status: "completed",
    type: "booking",
    bookingId: "booking2",
    transactionId: "tx_234567",
    createdAt: "2023-02-01T00:00:00Z",
  },
  {
    id: "payment3",
    userId: "user1",
    amount: 29.99,
    currency: "USD",
    status: "completed",
    type: "subscription",
    subscriptionId: "sub1",
    transactionId: "tx_345678",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "payment4",
    userId: "user2",
    amount: 9.99,
    currency: "USD",
    status: "completed",
    type: "subscription",
    subscriptionId: "sub2",
    transactionId: "tx_456789",
    createdAt: "2023-02-01T00:00:00Z",
  },
  {
    id: "payment5",
    userId: "user2",
    amount: 900,
    currency: "USD",
    status: "completed",
    type: "booking",
    bookingId: "booking3",
    transactionId: "tx_567890",
    createdAt: "2023-05-10T00:00:00Z",
  },
]

// Mock API functions
export async function fetchCurrentUser(){
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // For demo purposes, randomly return a user or null (not logged in)
  // In a real app, this would check authentication state
  const loggedIn = true // Set to true to simulate logged in state

  if (loggedIn) {
    // Return a random user for demo purposes
    return users.find((user) => user.role === "dj") || null
  }

  return null
}

export async function fetchDJs(filters) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  let filteredDJs = users.filter((user) => user.role === "dj")

  if (filters) {
    if (filters.genre) {
      filteredDJs = filteredDJs.filter((dj) =>
        dj.genres?.some((genre) => genre.toLowerCase().includes(filters.genre!.toLowerCase())),
      )
    }

    if (filters.location) {
      filteredDJs = filteredDJs.filter((dj) => dj.location?.toLowerCase().includes(filters.location!.toLowerCase()))
    }

    if (filters.minRating) {
      filteredDJs = filteredDJs.filter((dj) => (dj.rating || 0) >= filters.minRating!)
    }

    if (filters.maxPrice) {
      filteredDJs = filteredDJs.filter((dj) => (dj.hourlyRate || 0) <= filters.maxPrice!)
    }
  }

  return filteredDJs
}

export async function fetchDJById(id) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const dj = users.find((user) => user.id === id && user.role === "dj")
  return dj || null
}

export async function fetchUserEvents(userId){
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // Find events where the user is either the organizer or the DJ
  const userEvents = events.filter((event) => event.organizerId === userId || event.djId === userId)

  // Populate organizer and DJ data
  return userEvents.map((event) => ({
    ...event,
    organizer: users.find((user) => user.id === event.organizerId),
    dj: event.djId ? users.find((user) => user.id === event.djId) : undefined,
  }))
}

export async function fetchEventById(id) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  const event = events.find((event) => event.id === id)

  if (!event) return null

  // Populate organizer and DJ data
  return {
    ...event,
    organizer: users.find((user) => user.id === event.organizerId),
    dj: event.djId ? users.find((user) => user.id === event.djId) : undefined,
  }
}

export async function fetchUserBookings(userId){
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  // Find bookings where the user is either the organizer or the DJ
  const userBookings = bookings.filter((booking) => booking.organizerId === userId || booking.djId === userId)

  // Populate event, organizer, and DJ data
  return userBookings.map((booking) => ({
    ...booking,
    event: events.find((event) => event.id === booking.eventId),
    organizer: users.find((user) => user.id === booking.organizerId),
    dj: users.find((user) => user.id === booking.djId),
  }))
}

export async function fetchUserReviews(userId) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Find reviews where the user is either the reviewer or the reviewee
  const userReviews = reviews.filter((review) => review.reviewerId === userId || review.revieweeId === userId)

  // Populate event, reviewer, and reviewee data
  return userReviews.map((review) => ({
    ...review,
    event: events.find((event) => event.id === review.eventId),
    reviewer: users.find((user) => user.id === review.reviewerId),
    reviewee: users.find((user) => user.id === review.revieweeId),
  }))
}

export async function fetchUserMessages(userId){
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  // Find messages where the user is either the sender or the receiver
  const userMessages = messages.filter((message) => message.senderId === userId || message.receiverId === userId)

  // Populate sender, receiver, and event data
  return userMessages.map((message) => ({
    ...message,
    sender: users.find((user) => user.id === message.senderId),
    receiver: users.find((user) => user.id === message.receiverId),
    event: message.eventId ? events.find((event) => event.id === message.eventId) : undefined,
  }))
}

export async function fetchUserSubscription(userId) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  const subscription = subscriptions.find((sub) => sub.userId === userId && sub.status === "active")

  if (!subscription) return null

  return {
    ...subscription,
    user: users.find((user) => user.id === subscription.userId),
  }
}

export async function fetchUserPayments(userId) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const userPayments = payments.filter((payment) => payment.userId === userId)

  // Populate user, booking, and subscription data
  return userPayments.map((payment) => ({
    ...payment,
    user: users.find((user) => user.id === payment.userId),
    booking: payment.bookingId ? bookings.find((booking) => booking.id === payment.bookingId) : undefined,
    subscription: payment.subscriptionId ? subscriptions.find((sub) => sub.id === payment.subscriptionId) : undefined,
  }))
}

// Export mock data for direct access if needed
export { users, events, bookings, reviews, messages, subscriptions, payments }