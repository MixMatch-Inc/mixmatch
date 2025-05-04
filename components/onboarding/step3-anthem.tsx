"use client"

import { useState, useRef, useEffect } from "react"
import type { OnboardingFormData } from "./onboarding-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { AlertCircle, Search, Play, Pause, Music } from "lucide-react"

interface Step3Props {
  formData: OnboardingFormData
  updateFormData: (data: Partial<OnboardingFormData>) => void
}

// Mock Spotify search results
const mockSpotifySearch = async (query: string) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  if (!query.trim()) return []

  // Mock data
  return [
    {
      id: "spotify:track:4cOdK2wGLETKBW3PvgPWqT",
      name: "Never Gonna Give You Up",
      artist: "Rick Astley",
      album: "Whenever You Need Somebody",
      albumArt: "https://i.scdn.co/image/ab67616d00001e02c5eaeb2c94brandom",
      previewUrl: "https://p.scdn.co/mp3-preview/random",
    },
    {
      id: "spotify:track:5ihDGnhQgMA0F0tk9fNLlA",
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      albumArt: "https://i.scdn.co/image/ab67616d00001e02random",
      previewUrl: "https://p.scdn.co/mp3-preview/random2",
    },
    {
      id: "spotify:track:0VjIjW4GlUZAMYd2vXMi3b",
      name: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      albumArt: "https://i.scdn.co/image/ab67616d00001e02random3",
      previewUrl: "https://p.scdn.co/mp3-preview/random3",
    },
    {
      id: "spotify:track:3w1WjD2zJqjBjDz5fwqQPJ",
      name: "Cruel Summer",
      artist: "Taylor Swift",
      album: "Lover",
      albumArt: "https://i.scdn.co/image/ab67616d00001e02random4",
      previewUrl: "https://p.scdn.co/mp3-preview/random4",
    },
    {
      id: "spotify:track:5QO79kh1waicV47BqGRL3g",
      name: "Save Your Tears",
      artist: "The Weeknd",
      album: "After Hours",
      albumArt: "https://i.scdn.co/image/ab67616d00001e02random5",
      previewUrl: "https://p.scdn.co/mp3-preview/random5",
    },
  ]
}

type Track = {
  id: string
  name: string
  artist: string
  album: string
  albumArt: string
  previewUrl: string | null
}

export function Step3Anthem({ formData, updateFormData }: Step3Props) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<Track[]>([])
  const [error, setError] = useState("")
  const [playingTrackId, setPlayingTrackId] = useState<string | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Clean up audio on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
      }
    }
  }, [])

  useEffect(() => {
    // Debounced search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (searchQuery.trim().length > 2) {
      setIsSearching(true)

      searchTimeoutRef.current = setTimeout(async () => {
        try {
          // In production, replace with actual API call
          // const response = await fetchWithAuth(`/api/spotify/search?q=${encodeURIComponent(searchQuery)}`)
          // const data = await response.json()
          const results = await mockSpotifySearch(searchQuery)
          setSearchResults(results)
        } catch (err) {
          console.error("Error searching tracks:", err)
          setError("Failed to search for tracks. Please try again.")
        } finally {
          setIsSearching(false)
        }
      }, 500)
    } else {
      setSearchResults([])
    }
  }, [searchQuery])

  const handleTrackSelect = (track: Track) => {
    updateFormData({
      anthem: {
        trackId: track.id,
        trackName: track.name,
        artistName: track.artist,
        albumArt: track.albumArt,
        previewUrl: track.previewUrl,
      },
    })

    // Stop any playing audio
    if (audioRef.current) {
      audioRef.current.pause()
      setPlayingTrackId(null)
    }
  }

  const togglePlayPreview = (track: Track) => {
    if (!track.previewUrl) {
      setError("No preview available for this track")
      return
    }

    if (playingTrackId === track.id) {
      // Pause current track
      if (audioRef.current) {
        audioRef.current.pause()
        setPlayingTrackId(null)
      }
    } else {
      // Play new track
      if (audioRef.current) {
        audioRef.current.pause()
      }

      audioRef.current = new Audio(track.previewUrl)
      audioRef.current.play()
      audioRef.current.onended = () => setPlayingTrackId(null)
      setPlayingTrackId(track.id)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Choose Your Anthem</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select a song that represents you. This will be featured on your profile.
        </p>
      </div>

      {formData.anthem ? (
        <Card className="p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden">
              <img
                src={formData.anthem.albumArt || "/placeholder.svg"}
                alt={formData.anthem.trackName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-base font-medium truncate">{formData.anthem.trackName}</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{formData.anthem.artistName}</p>
            </div>

            <div className="flex-shrink-0">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-full"
                onClick={() =>
                  formData.anthem &&
                  togglePlayPreview({
                    id: formData.anthem.trackId,
                    name: formData.anthem.trackName,
                    artist: formData.anthem.artistName,
                    album: "",
                    albumArt: formData.anthem.albumArt,
                    previewUrl: formData.anthem.previewUrl,
                  })
                }
              >
                {playingTrackId === formData.anthem.trackId ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex-shrink-0">
              <Button variant="ghost" size="sm" onClick={() => updateFormData({ anthem: null })}>
                Change
              </Button>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="track-search" className="text-base">
              Search for a song
            </Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                id="track-search"
                placeholder="Search by song title or artist..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {isSearching ? (
            <div className="text-center py-8">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-current border-r-transparent" />
              <p className="mt-2 text-sm text-gray-500">Searching...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-2 max-h-80 overflow-y-auto pr-2">
              {searchResults.map((track) => (
                <Card
                  key={track.id}
                  className="p-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer"
                  onClick={() => handleTrackSelect(track)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 flex-shrink-0 rounded-md overflow-hidden">
                      <img
                        src={track.albumArt || "/placeholder.svg"}
                        alt={track.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium truncate">{track.name}</h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{track.artist}</p>
                    </div>

                    <div className="flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation()
                          togglePlayPreview(track)
                        }}
                      >
                        {playingTrackId === track.id ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : searchQuery.trim().length > 2 ? (
            <div className="text-center py-8 text-gray-500">
              <Music className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No tracks found. Try a different search term.</p>
            </div>
          ) : searchQuery.trim().length > 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>Type at least 3 characters to search</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Music className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>Search for your favorite song</p>
            </div>
          )}
        </div>
      )}

      {error && (
        <div className="flex items-center mt-1 text-red-500 text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}
    </div>
  )
}
