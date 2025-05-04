"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Step1MoodBio } from "./step1-mood-bio"
import { Step2VoiceClip } from "./step2-voice-clip"
import { Step3Anthem } from "./step3-anthem"
import { StepIndicator } from "./step-indicator"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export type OnboardingFormData = {
  mood: string[]
  bio: string
  voiceClip: File | null
  voiceClipUrl: string | null
  anthem: {
    trackId: string
    trackName: string
    artistName: string
    albumArt: string
    previewUrl: string | null
  } | null
}

// Mock API functions
const mockUpdateProfile = async (data: { mood: string[]; bio: string }) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log("Profile updated with:", data)
  return { success: true }
}

const mockUploadVoiceClip = async (file: File) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000))
  console.log("Voice clip uploaded:", file.name)
  return {
    success: true,
    voiceClipUrl: "https://example.com/voice-clips/sample.mp3",
  }
}

const mockSetAnthem = async (anthem: OnboardingFormData["anthem"]) => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))
  console.log("Anthem set:", anthem)
  return { success: true }
}

export function OnboardingForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<OnboardingFormData>({
    mood: [],
    bio: "",
    voiceClip: null,
    voiceClipUrl: null,
    anthem: null,
  })

  const totalSteps = 3

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
      window.scrollTo(0, 0)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo(0, 0)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Step 1: Update profile with mood and bio
      // In production, replace with actual API call
      // await fetchWithAuth("/api/users/me", {
      //   method: "PUT",
      //   body: JSON.stringify({ mood: formData.mood, bio: formData.bio })
      // })
      await mockUpdateProfile({ mood: formData.mood, bio: formData.bio })

      // Step 2: Upload voice clip if exists
      if (formData.voiceClip) {
        // In production, replace with actual API call
        // const formDataObj = new FormData()
        // formDataObj.append("file", formData.voiceClip)
        // await fetchWithAuth("/api/users/me/voice-clip", {
        //   method: "POST",
        //   body: formDataObj,
        //   headers: {} // Remove Content-Type header for multipart/form-data
        // })
        await mockUploadVoiceClip(formData.voiceClip)
      }

      // Step 3: Set anthem if selected
      if (formData.anthem) {
        // In production, replace with actual API call
        // await fetchWithAuth("/api/users/me/anthem", {
        //   method: "POST",
        //   body: JSON.stringify({
        //     trackId: formData.anthem.trackId,
        //     previewUrl: formData.anthem.previewUrl
        //   })
        // })
        await mockSetAnthem(formData.anthem)
      }

      // Redirect to discover page
      router.push("/discover")
    } catch (error) {
      console.error("Error submitting onboarding form:", error)
      // Handle error (show error message)
    } finally {
      setIsSubmitting(false)
    }
  }

  const updateFormData = (data: Partial<OnboardingFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  return (
    <div className="space-y-6">
      <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />

      <Card className="p-6 shadow-lg border-0 bg-white/90 backdrop-blur-sm dark:bg-gray-950/90">
        {currentStep === 1 && <Step1MoodBio formData={formData} updateFormData={updateFormData} />}

        {currentStep === 2 && <Step2VoiceClip formData={formData} updateFormData={updateFormData} />}

        {currentStep === 3 && <Step3Anthem formData={formData} updateFormData={updateFormData} />}

        <div className="flex justify-between mt-8">
          <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1 || isSubmitting}>
            Previous
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              disabled={(currentStep === 1 && (formData.mood.length === 0 || !formData.bio)) || isSubmitting}
            >
              Next
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!formData.anthem || isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Complete Profile"
              )}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
