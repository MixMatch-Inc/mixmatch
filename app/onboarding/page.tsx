"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

// Mock function to check authentication
const checkAuth = async () => {
  // In production, replace with actual API call to verify token
  const token = localStorage.getItem("auth_token")

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return !!token // Return true if token exists
}

export default function OnboardingPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const isAuthenticated = await checkAuth()

        if (!isAuthenticated) {
          // Redirect to login if not authenticated
          router.push("/")
        } else {
          setIsLoading(false)
        }
      } catch (error) {
        console.error("Auth verification error:", error)
        router.push("/")
      }
    }

    verifyAuth()
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600 dark:text-indigo-400" />
          <p className="text-gray-600 dark:text-gray-300">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome to MixMatch!</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Let's set up your profile (coming in the next step)</p>
        <p className="mt-4 text-sm text-indigo-600 dark:text-indigo-400">
          Vibe feature will be available after completing your profile
        </p>
      </div>
    </div>
  )
}
