"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, MessageSquare } from "lucide-react"
import { useRouter } from "next/navigation"

interface MatchModalProps {
  isOpen: boolean
  onClose: () => void
  matchData: any
}

export function MatchModal({ isOpen, onClose, matchData }: MatchModalProps) {
  const router = useRouter()
  const [isPlaying, setIsPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    // Clean up audio on unmount or when modal closes
    return () => {
      if (audio) {
        audio.pause()
        setIsPlaying(false)
      }
    }
  }, [audio, isOpen])

  // Reset playing state when modal opens/closes
  useEffect(() => {
    if (!isOpen && audio) {
      audio.pause()
      setIsPlaying(false)
    }
  }, [isOpen, audio])

  if (!matchData) return null

  const { user, superLike } = matchData

  const togglePlayPreview = () => {
    if (!user.anthem.previewUrl) return

    if (isPlaying && audio) {
      audio.pause()
      setIsPlaying(false)
    } else {
      const newAudio = new Audio(user.anthem.previewUrl)
      newAudio.onended = () => setIsPlaying(false)
      newAudio.play()
      setAudio(newAudio)
      setIsPlaying(true)
    }
  }

  const handleViewMatches = () => {
    onClose()
    router.push("/matches")
  }

  const handleStartChat = () => {
    onClose()
    // In a real app, this would navigate to the chat with this specific user
    router.push(`/matches`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md p-0 overflow-hidden bg-gradient-to-b from-indigo-600 to-purple-700 text-white border-0">
        {/* Confetti animation would go here in a real implementation */}

        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold mb-1">It's a Match!</h2>
          <p className="text-white/80 mb-6">{superLike ? "They super-liked you too!" : "You both liked each other"}</p>

          <div className="flex justify-center space-x-4 mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              {/* This would be the current user's photo */}
              <img src="/placeholder.svg?height=96&width=96" alt="You" className="w-full h-full object-cover" />
            </div>

            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img src={user.photoUrl || "/placeholder.svg"} alt={user.name} className="w-full h-full object-cover" />
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
            <h3 className="text-xl font-bold mb-1">
              {user.name}, {user.age}
            </h3>

            <div className="flex justify-center flex-wrap gap-1 mb-3">
              {user.mood.map((emoji: string, index: number) => (
                <span key={index} className="text-xl">
                  {emoji}
                </span>
              ))}
            </div>

            <p className="text-sm mb-3">{user.bio}</p>

            <div className="flex flex-wrap justify-center gap-1 mb-3">
              {user.topGenres.map((genre: string, index: number) => (
                <Badge key={index} variant="secondary" className="bg-white/20 hover:bg-white/20 text-white border-none">
                  {genre}
                </Badge>
              ))}
            </div>

            {/* Anthem info */}
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 max-w-xs mx-auto">
              <div className="w-10 h-10 flex-shrink-0 rounded overflow-hidden">
                <img
                  src={user.anthem.albumArt || "/placeholder.svg?height=40&width=40"}
                  alt={user.anthem.trackName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user.anthem.trackName}</p>
                <p className="text-xs text-gray-300 truncate">{user.anthem.artistName}</p>
              </div>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex-shrink-0"
                onClick={togglePlayPreview}
                disabled={!user.anthem.previewUrl}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="secondary"
              className="bg-white text-indigo-600 hover:bg-gray-100"
              onClick={handleStartChat}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Send Message
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/20" onClick={handleViewMatches}>
              View Matches
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
