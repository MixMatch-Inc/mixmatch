"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import type { OnboardingFormData } from "./onboarding-form"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Mic, Square, Play, Pause, Upload, Trash2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Step2Props {
  formData: OnboardingFormData
  updateFormData: (data: Partial<OnboardingFormData>) => void
}

export function Step2VoiceClip({ formData, updateFormData }: Step2Props) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [error, setError] = useState("")
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const MAX_RECORDING_TIME = 10 // seconds
  const MIN_RECORDING_TIME = 3 // seconds

  useEffect(() => {
    // Initialize audio element for playback
    if (formData.voiceClipUrl) {
      setAudioUrl(formData.voiceClipUrl)
    }

    // Clean up on unmount
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
      if (audioUrl && !formData.voiceClipUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [formData.voiceClipUrl])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      mediaRecorderRef.current = new MediaRecorder(stream)
      audioChunksRef.current = []

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/mp3" })
        const url = URL.createObjectURL(audioBlob)

        setAudioUrl(url)
        updateFormData({
          voiceClip: new File([audioBlob], "voice-clip.mp3", { type: "audio/mp3" }),
          voiceClipUrl: url,
        })

        // Stop all tracks on the stream
        stream.getTracks().forEach((track) => track.stop())
      }

      // Start recording
      mediaRecorderRef.current.start()
      setIsRecording(true)
      setRecordingTime(0)
      setError("")

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          if (prev >= MAX_RECORDING_TIME) {
            stopRecording()
            return MAX_RECORDING_TIME
          }
          return prev + 1
        })
      }, 1000)
    } catch (err) {
      console.error("Error accessing microphone:", err)
      setError("Could not access your microphone. Please check permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (recordingTime < MIN_RECORDING_TIME) {
        setError(`Recording must be at least ${MIN_RECORDING_TIME} seconds long`)
      } else {
        setError("")
      }

      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (file) {
      // Check file type
      if (!file.type.startsWith("audio/")) {
        setError("Please upload an audio file")
        return
      }

      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError("File size must be less than 5MB")
        return
      }

      const url = URL.createObjectURL(file)

      // Clean up previous audio URL
      if (audioUrl && !formData.voiceClipUrl) {
        URL.revokeObjectURL(audioUrl)
      }

      setAudioUrl(url)
      updateFormData({ voiceClip: file, voiceClipUrl: url })
      setError("")
    }
  }

  const handlePlay = () => {
    if (audioRef.current && audioUrl) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const deleteRecording = () => {
    if (audioUrl && !formData.voiceClipUrl) {
      URL.revokeObjectURL(audioUrl)
    }

    setAudioUrl(null)
    updateFormData({ voiceClip: null, voiceClipUrl: null })
    setError("")
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Add a Voice Clip</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Record a short voice clip (5-10 seconds) to introduce yourself. This is optional but helps create better
          matches.
        </p>
      </div>

      {audioUrl ? (
        <Card className="p-4 bg-gray-50 dark:bg-gray-800/50">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base">Your Voice Clip</Label>
              <Button variant="destructive" size="sm" onClick={deleteRecording} className="h-8">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" onClick={handlePlay}>
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <div className="h-2 flex-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <audio ref={audioRef} src={audioUrl} onEnded={handleAudioEnded} className="hidden" />
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-col space-y-4">
            <Label className="text-base">Record a Voice Clip</Label>

            {isRecording ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse mr-2" />
                    <span>
                      Recording... {recordingTime}s / {MAX_RECORDING_TIME}s
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={stopRecording} className="h-8">
                    <Square className="h-4 w-4 mr-1" />
                    Stop
                  </Button>
                </div>
                <Progress value={(recordingTime / MAX_RECORDING_TIME) * 100} className="h-2" />
              </div>
            ) : (
              <Button
                variant="outline"
                className="flex items-center justify-center h-16 border-dashed"
                onClick={startRecording}
              >
                <Mic className="h-5 w-5 mr-2" />
                Start Recording
              </Button>
            )}
          </div>

          <div className="flex items-center">
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
            <span className="px-3 text-gray-500 text-sm">OR</span>
            <div className="flex-grow h-px bg-gray-300 dark:bg-gray-700" />
          </div>

          <div className="flex flex-col space-y-4">
            <Label htmlFor="voice-file" className="text-base">
              Upload an Audio File
            </Label>
            <div className="flex items-center justify-center h-16 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md">
              <label htmlFor="voice-file" className="cursor-pointer flex items-center justify-center w-full h-full">
                <Upload className="h-5 w-5 mr-2 text-gray-500" />
                <span className="text-gray-500">Choose a file</span>
                <input id="voice-file" type="file" accept="audio/*" className="hidden" onChange={handleFileUpload} />
              </label>
            </div>
            <p className="text-xs text-gray-500">Accepted formats: MP3, WAV, M4A. Max size: 5MB.</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center mt-1 text-red-500 text-sm">
          <AlertCircle className="h-4 w-4 mr-1" />
          {error}
        </div>
      )}

      <div className="pt-4 text-center text-sm text-gray-500">
        <p>Voice clips are optional. You can skip this step if you prefer not to add one.</p>
      </div>
    </div>
  )
}
