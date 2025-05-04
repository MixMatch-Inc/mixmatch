"use client"

import React from "react"

import { useState, useEffect, useRef } from "react"
import TinderCard from "react-tinder-card"
import { SwipeCard } from "./swipe-card"
import { SwipeActions } from "./swipe-actions"
import { SwipeEmpty } from "./swipe-empty"
import { MatchModal } from "./match-modal"
import { Loader2 } from "lucide-react"

// Mock API function to fetch deck
const mockFetchDeck = async () => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock data
  return [
    {
      id: "user1",
      name: "Alex",
      age: 28,
      mood: ["🎵", "🎸", "🎉"],
      bio: "Music producer and guitarist. Always looking for new sounds and inspiration.",
      topGenres: ["Rock", "Alternative", "Indie"],
      anthem: {
        trackId: "spotify:track:4cOdK2wGLETKBW3PvgPWqT",
        trackName: "Stairway to Heaven",
        artistName: "Led Zeppelin",
        albumArt: "https://i.scdn.co/image/ab67616d00001e02c5eaeb2c94brandom",
        previewUrl: "https://p.scdn.co/mp3-preview/random",
      },
      photoUrl: "/placeholder.svg?height=500&width=400",
    },
    {
      id: "user2",
      name: "Jamie",
      age: 25,
      mood: ["😌", "🌊", "🌙"],
      bio: "Ambient music enthusiast. Let's connect over chill vibes and deep conversations.",
      topGenres: ["Ambient", "Electronic", "Lo-fi"],
      anthem: {
        trackId: "spotify:track:5ihDGnhQgMA0F0tk9fNLlA",
        trackName: "Midnight City",
        artistName: "M83",
        albumArt: "https://i.scdn.co/image/ab67616d00001e02random",
        previewUrl: "https://p.scdn.co/mp3-preview/random2",
      },
      photoUrl: "/placeholder.svg?height=500&width=400",
    },
    {
      id: "user3",
      name: "Taylor",
      age: 30,
      mood: ["🔥", "💪", "🤘"],
      bio: "Fitness instructor by day, metal head by night. Looking for concert buddies.",
      topGenres: ["Metal", "Rock", "Punk"],
      anthem: {
        trackId: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b",
        trackName: "Master of Puppets",
        artistName: "Metallica",
        albumArt: "https://i.scdn.co/image/ab67616d00001e02random3",
        previewUrl: "https://p.scdn.co/mp3-preview/random3",
      },
      photoUrl: "/placeholder.svg?height=500&width=400",
    },
    {
      id: "user4",
      name: "Jordan",
      age: 27,
      mood: ["❤️", "☀️", "🎵"],
      bio: "Singer-songwriter looking for collaborators and inspiration.",
      topGenres: ["Pop", "R&B", "Soul"],
      anthem: {
        trackId: "spotify:track:3w1WjD2zJqjBjDz5fwqQPJ",
        trackName: "Redbone",
        artistName: "Childish Gambino",
        albumArt: "https://i.scdn.co/image/ab67616d00001e02random4",
        previewUrl: "https://p.scdn.co/mp3-preview/random4",
      },
      photoUrl: "/placeholder.svg?height=500&width=400",
    },
    {
      id: "user5",
      name: "Casey",
      age: 29,
      mood: ["🎉", "🔥", "❤️"],
      bio: "DJ and electronic music producer. Always on the lookout for new sounds.",
      topGenres: ["House", "Techno", "Electronic"],
      anthem: {
        trackId: "spotify:track:5QO79kh1waicV47BqGRL3g",
        trackName: "Strobe",
        artistName: "Deadmau5",
        albumArt: "https://i.scdn.co/image/ab67616d00001e02random5",
        previewUrl: "https://p.scdn.co/mp3-preview/random5",
      },
      photoUrl: "/placeholder.svg?height=500&width=400",
    },
  ]
}

// Mock API function to record swipe
const mockRecordSwipe = async (userId: string, action: "like" | "skip" | "super-like") => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  console.log(`Swiped ${action} on user ${userId}`)

  // Simulate match (only for user3 with like or super-like)
  if (userId === "user3" && (action === "like" || action === "super-like")) {
    return {
      match: true,
      user: {
        id: "user3",
        name: "Taylor",
        age: 30,
        mood: ["🔥", "💪", "🤘"],
        bio: "Fitness instructor by day, metal head by night. Looking for concert buddies.",
        topGenres: ["Metal", "Rock", "Punk"],
        anthem: {
          trackId: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b",
          trackName: "Master of Puppets",
          artistName: "Metallica",
          albumArt: "https://i.scdn.co/image/ab67616d00001e02random3",
          previewUrl: "https://p.scdn.co/mp3-preview/random3",
        },
        photoUrl: "/placeholder.svg?height=500&width=400",
      },
      matchedAt: new Date().toISOString(),
      superLike: action === "super-like",
    }
  }

  return { match: false }
}

export type Profile = {
  id: string
  name: string
  age: number
  mood: string[]
  bio: string
  topGenres: string[]
  anthem: {
    trackId: string
    trackName: string
    artistName: string
    albumArt: string
    previewUrl: string | null
  }
  photoUrl: string
}

export function SwipeDeck() {
  const [profiles, setProfiles] = useState<Profile[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showMatch, setShowMatch] = useState(false)
  const [matchData, setMatchData] = useState<any>(null)
  const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | "up" | null>(null)
  const [lastSwipedDirection, setLastSwipedDirection] = useState<"left" | "right" | "up" | null>(null)

  // References for card swiping
  const currentIndexRef = useRef(currentIndex)
  const childRefs = useRef<any[]>([])

  // Update the ref whenever currentIndex changes
  useEffect(() => {
    currentIndexRef.current = currentIndex
  }, [currentIndex])

  // Initialize childRefs with the number of profiles
  useEffect(() => {
    childRefs.current = Array(profiles.length)
      .fill(0)
      .map((_, i) => childRefs.current[i] || React.createRef())
  }, [profiles])

  // Fetch profiles on component mount
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // In production, replace with actual API call
        // const response = await fetchWithAuth("/api/deck")
        // const data = await response.json()
        const data = await mockFetchDeck()

        setProfiles(data)
        setCurrentIndex(data.length - 1)
        currentIndexRef.current = data.length - 1
      } catch (err) {
        console.error("Error fetching profiles:", err)
        setError("Failed to load profiles. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfiles()
  }, [])

  const handleSwipe = async (direction: "left" | "right" | "up", index: number) => {
    // Store the last swiped direction for animation
    setLastSwipedDirection(direction)

    // Update current index
    setCurrentIndex(index - 1)

    // Get the profile that was swiped
    const swipedProfile = profiles[index]

    // Map direction to action
    const action = direction === "left" ? "skip" : direction === "right" ? "like" : "super-like"

    try {
      // In production, replace with actual API call
      // const response = await fetchWithAuth("/api/swipe", {
      //   method: "POST",
      //   body: JSON.stringify({
      //     targetUserId: swipedProfile.id,
      //     action
      //   })
      // })
      // const data = await response.json()
      const data = await mockRecordSwipe(swipedProfile.id, action)

      // Check if it's a match
      if (data.match) {
        // Add a small delay before showing the match modal for better UX
        setTimeout(() => {
          setMatchData(data)
          setShowMatch(true)
        }, 500)
      }
    } catch (err) {
      console.error("Error recording swipe:", err)
      // Optionally show an error toast
    }
  }

  // Programmatically trigger swipes from buttons
  const swipe = async (direction: "left" | "right" | "up") => {
    if (currentIndex < 0) return

    setSwipeDirection(direction)

    // Reset swipe direction after animation
    setTimeout(() => {
      setSwipeDirection(null)
    }, 300)

    // Trigger the swipe on the card
    await childRefs.current[currentIndex]?.swipe(direction)
  }

  // Handle match modal close
  const handleCloseMatch = () => {
    setShowMatch(false)
    setMatchData(null)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-indigo-600 dark:text-indigo-400 mb-4" />
        <p className="text-gray-600 dark:text-gray-300">Loading profiles...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-lg mb-4">
          <p>{error}</p>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="relative h-[600px] w-full">
      {/* Swipe cards */}
      <div className="absolute w-full h-full">
        {profiles.map((profile, index) => (
          <div key={profile.id} className={index === currentIndex ? "" : "hidden"}>
            <TinderCard
              ref={(el) => (childRefs.current[index] = el)}
              className="absolute w-full h-full"
              onSwipe={(dir) => handleSwipe(dir as "left" | "right" | "up", index)}
              preventSwipe={["down"]}
            >
              <SwipeCard
                profile={profile}
                swipeDirection={currentIndex === index ? swipeDirection : null}
                lastSwipedDirection={lastSwipedDirection}
              />
            </TinderCard>
          </div>
        ))}
      </div>

      {/* Empty state when no more profiles */}
      {currentIndex < 0 && <SwipeEmpty />}

      {/* Action buttons */}
      {currentIndex >= 0 && (
        <div className="absolute bottom-4 left-0 right-0">
          <SwipeActions onSwipe={swipe} />
        </div>
      )}

      {/* Match modal */}
      <MatchModal isOpen={showMatch} onClose={handleCloseMatch} matchData={matchData} />
    </div>
  )
}
