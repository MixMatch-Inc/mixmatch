"use client"

import type React from "react"

import { useState } from "react"
import type { OnboardingFormData } from "./onboarding-form"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { AlertCircle } from "lucide-react"

const MOODS = [
  { emoji: "🎉", label: "Party" },
  { emoji: "😌", label: "Chill" },
  { emoji: "💪", label: "Workout" },
  { emoji: "😢", label: "Sad" },
  { emoji: "❤️", label: "Romantic" },
  { emoji: "🤘", label: "Rock" },
  { emoji: "🎵", label: "Jazz" },
  { emoji: "🎸", label: "Acoustic" },
  { emoji: "🌊", label: "Ambient" },
  { emoji: "🔥", label: "Energetic" },
  { emoji: "🌙", label: "Night" },
  { emoji: "☀️", label: "Morning" },
]

interface Step1Props {
  formData: OnboardingFormData
  updateFormData: (data: Partial<OnboardingFormData>) => void
}

export function Step1MoodBio({ formData, updateFormData }: Step1Props) {
  const [bioError, setBioError] = useState("")
  const [moodError, setMoodError] = useState("")

  const MAX_BIO_LENGTH = 140
  const MAX_MOODS = 3

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value

    if (value.length > MAX_BIO_LENGTH) {
      setBioError(`Bio must be ${MAX_BIO_LENGTH} characters or less`)
    } else {
      setBioError("")
      updateFormData({ bio: value })
    }
  }

  const toggleMood = (mood: string) => {
    const currentMoods = [...formData.mood]
    const index = currentMoods.indexOf(mood)

    if (index === -1) {
      // Add mood if not already selected
      if (currentMoods.length >= MAX_MOODS) {
        setMoodError(`You can only select up to ${MAX_MOODS} moods`)
        return
      }

      updateFormData({ mood: [...currentMoods, mood] })
      setMoodError("")
    } else {
      // Remove mood if already selected
      currentMoods.splice(index, 1)
      updateFormData({ mood: currentMoods })
      setMoodError("")
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Tell us about yourself</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This information helps us find people with similar music tastes.
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="bio" className="text-base">
            Your Bio{" "}
            <span className="text-gray-500">
              ({formData.bio.length}/{MAX_BIO_LENGTH})
            </span>
          </Label>
          <Textarea
            id="bio"
            placeholder="Tell others about yourself in a few words..."
            className="mt-1 resize-none h-24"
            value={formData.bio}
            onChange={handleBioChange}
          />
          {bioError && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {bioError}
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label className="text-base">
            Your Music Mood <span className="text-gray-500">(Select up to {MAX_MOODS})</span>
          </Label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 mt-1">
            {MOODS.map((mood) => (
              <Badge
                key={mood.label}
                variant={formData.mood.includes(mood.emoji) ? "default" : "outline"}
                className={`py-2 px-3 cursor-pointer text-base ${
                  formData.mood.includes(mood.emoji)
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
                onClick={() => toggleMood(mood.emoji)}
              >
                <span className="mr-2">{mood.emoji}</span>
                <span>{mood.label}</span>
              </Badge>
            ))}
          </div>
          {moodError && (
            <div className="flex items-center mt-1 text-red-500 text-sm">
              <AlertCircle className="h-4 w-4 mr-1" />
              {moodError}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
