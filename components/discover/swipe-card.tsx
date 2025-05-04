"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Profile } from "./swipe-deck"

interface SwipeCardProps {
  profile: Profile
  swipeDirection: "left" | "right" | "up" | null
  lastSwipedDirection?: "left" | "right" | "up" | null
}

export function SwipeCard({ profile, swipeDirection, lastSwipedDirection }: SwipeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showSwipeIndicator, setShowSwipeIndicator] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  // Show swipe indicator when swipe direction changes
  useEffect(() => {
    if (swipeDirection) {
      setShowSwipeIndicator(true)
    } else {
      setShowSwipeIndicator(false)
    }
  }, [swipeDirection])

  const togglePlayPreview = () => {
    if (!profile.anthem.previewUrl) return

    if (isPlaying) {
      audioRef.current?.pause()
      setIsPlaying(false)
    } else {
      if (!audioRef.current) {
        audioRef.current = new Audio(profile.anthem.previewUrl)
        audioRef.current.onended = () => setIsPlaying(false)
      }
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  // Get animation class based on swipe direction
  const getSwipeAnimation = () => {
    if (!swipeDirection) return ""

    switch (swipeDirection) {
      case "left":
        return "animate-swipe-left"
      case "right":
        return "animate-swipe-right"
      case "up":
        return "animate-swipe-up"
      default:
        return ""
    }
  }

  // Get entrance animation based on last swiped direction
  const getEntranceAnimation = () => {
    if (!lastSwipedDirection) return ""

    // Return the opposite animation of the last swipe
    switch (lastSwipedDirection) {
      case "left":
        return "animate-enter-from-right"
      case "right":
        return "animate-enter-from-left"
      case "up":
        return "animate-enter-from-bottom"
      default:
        return ""
    }
  }

  return (
    <div
      className={`relative w-full h-full rounded-xl overflow-hidden shadow-xl ${getSwipeAnimation()} ${getEntranceAnimation()}`}
      style={{ touchAction: "none" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${profile.photoUrl})` }} />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        {/* Basic info */}
        <div className="flex justify-between items-end mb-2">
          <div>
            <h2 className="text-2xl font-bold">
              {profile.name}, {profile.age}
            </h2>
            <div className="flex flex-wrap gap-1 mt-1">
              {profile.mood.map((emoji, index) => (
                <span key={index} className="text-xl">
                  {emoji}
                </span>
              ))}
            </div>
          </div>

          {/* Anthem preview button */}
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm"
            onClick={togglePlayPreview}
            disabled={!profile.anthem.previewUrl}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </div>

        {/* Bio preview */}
        <p className="text-sm text-gray-200 mb-3 line-clamp-2">{profile.bio}</p>

        {/* Genres */}
        <div className="flex flex-wrap gap-1 mb-3">
          {profile.topGenres.map((genre, index) => (
            <Badge key={index} variant="secondary" className="bg-white/20 hover:bg-white/20 text-white border-none">
              {genre}
            </Badge>
          ))}
        </div>

        {/* Anthem info */}
        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-2">
          <div className="w-10 h-10 flex-shrink-0 rounded overflow-hidden">
            <img
              src={profile.anthem.albumArt || "/placeholder.svg?height=40&width=40"}
              alt={profile.anthem.trackName}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{profile.anthem.trackName}</p>
            <p className="text-xs text-gray-300 truncate">{profile.anthem.artistName}</p>
          </div>
        </div>

        {/* Expand button */}
        <Button
          variant="ghost"
          size="sm"
          className="w-full mt-2 text-white/70 hover:text-white hover:bg-white/10"
          onClick={toggleExpanded}
        >
          <ChevronDown className={`h-4 w-4 mr-1 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
          {isExpanded ? "Less" : "More"}
        </Button>

        {/* Expanded content */}
        {isExpanded && (
          <div className="mt-2 pt-2 border-t border-white/20 animate-fade-in">
            <h3 className="text-sm font-medium mb-1">About {profile.name}</h3>
            <p className="text-sm text-gray-200 mb-3">{profile.bio}</p>

            <h3 className="text-sm font-medium mb-1">Top Genres</h3>
            <p className="text-sm text-gray-200">{profile.topGenres.join(", ")}</p>
          </div>
        )}
      </div>

      {/* Swipe indicators */}
      <div
        className={`absolute top-8 left-8 transform -rotate-12 bg-red-500 text-white px-4 py-1 rounded-lg font-bold text-xl transition-opacity ${
          swipeDirection === "left" ? "opacity-100" : "opacity-0"
        }`}
      >
        NOPE
      </div>
      <div
        className={`absolute top-8 right-8 transform rotate-12 bg-green-500 text-white px-4 py-1 rounded-lg font-bold text-xl transition-opacity ${
          swipeDirection === "right" ? "opacity-100" : "opacity-0"
        }`}
      >
        LIKE
      </div>
      <div
        className={`absolute top-8 left-1/2 transform -translate-x-1/2 bg-indigo-500 text-white px-4 py-1 rounded-lg font-bold text-xl transition-opacity ${
          swipeDirection === "up" ? "opacity-100" : "opacity-0"
        }`}
      >
        SUPER LIKE
      </div>
    </div>
  )
}
