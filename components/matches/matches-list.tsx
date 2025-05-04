"use client"

import type React from "react"

import { useState } from "react"
import { formatDistanceToNow } from "date-fns"
import { Play, Pause, MessageSquare, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { Match } from "@/app/matches/page"

interface MatchesListProps {
  matches: Match[]
  onChatClick: (matchId: string) => void
}

export function MatchesList({ matches, onChatClick }: MatchesListProps) {
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)
  const [audioElements, setAudioElements] = useState<Record<string, HTMLAudioElement>>({})

  const togglePlayPreview = (match: Match, event: React.MouseEvent) => {
    event.stopPropagation()

    if (!match.anthem.previewUrl) return

    const trackId = match.anthem.trackId

    if (playingTrackId === trackId) {
      // Pause current track
      if (audioElements[trackId]) {
        audioElements[trackId].pause()
      }
      setPlayingTrackId(null)
    } else {
      // Pause any currently playing track
      if (playingTrackId && audioElements[playingTrackId]) {
        audioElements[playingTrackId].pause()
      }

      // Play new track
      let audio = audioElements[trackId]

      if (!audio) {
        audio = new Audio(match.anthem.previewUrl)
        audio.onended = () => setPlayingTrackId(null)

        setAudioElements((prev) => ({
          ...prev,
          [trackId]: audio,
        }))
      }

      audio.play()
      setPlayingTrackId(trackId)
    }
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      {matches.map((match) => (
        <div
          key={match.id}
          className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors"
          onClick={() => onChatClick(match.id)}
        >
          <div className="flex items-start gap-4">
            {/* Profile photo */}
            <div className="relative">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <img
                  src={match.photoUrl || "/placeholder.svg?height=64&width=64"}
                  alt={match.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {match.lastMessage && !match.lastMessage.isRead && match.lastMessage.sentByMatch && (
                <div className="absolute -top-1 -right-1 bg-indigo-600 rounded-full p-1">
                  <Circle className="h-2 w-2 fill-white text-white" />
                </div>
              )}
            </div>

            {/* Match info */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-900 dark:text-white">
                    {match.name}, {match.age}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                    <span className="mr-2">
                      Matched {formatDistanceToNow(new Date(match.matchedAt), { addSuffix: true })}
                    </span>
                    <div className="flex items-center">
                      <span className="mr-1">Compatibility:</span>
                      <Progress value={match.compatibilityScore} className="h-1.5 w-16" />
                      <span className="ml-1 text-xs">{match.compatibilityScore}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  {match.lastMessage && (
                    <Badge
                      variant={match.lastMessage.isRead || !match.lastMessage.sentByMatch ? "outline" : "default"}
                      className={`mr-2 ${
                        match.lastMessage.isRead || !match.lastMessage.sentByMatch
                          ? "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                          : "bg-indigo-600"
                      }`}
                    >
                      <MessageSquare className="h-3 w-3 mr-1" />
                      {match.lastMessage.sentByMatch ? "New" : "Sent"}
                    </Badge>
                  )}
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-1 mt-2">
                {match.topGenres.slice(0, 3).map((genre, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-none"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>

              {/* Anthem */}
              <div className="flex items-center mt-2 bg-gray-50 dark:bg-gray-800/50 rounded-md p-2">
                <div className="w-8 h-8 flex-shrink-0 rounded overflow-hidden mr-2">
                  <img
                    src={match.anthem.albumArt || "/placeholder.svg?height=32&width=32"}
                    alt={match.anthem.trackName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{match.anthem.trackName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{match.anthem.artistName}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-full"
                  onClick={(e) => togglePlayPreview(match, e)}
                  disabled={!match.anthem.previewUrl}
                >
                  {playingTrackId === match.anthem.trackId ? (
                    <Pause className="h-3 w-3" />
                  ) : (
                    <Play className="h-3 w-3" />
                  )}
                </Button>
              </div>

              {/* Last message preview */}
              {match.lastMessage && (
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 line-clamp-1">
                  <span className="font-medium">{match.lastMessage.sentByMatch ? match.name : "You"}:</span>{" "}
                  {match.lastMessage.text}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
