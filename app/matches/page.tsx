"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { isAuthenticated } from "@/lib/auth"

export default function MatchesPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
      router.push("/")
      return
    }

    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [router])

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-indigo-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
        <div className="text-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-indigo-600 dark:text-indigo-400" />
          <p className="text-gray-600 dark:text-gray-300">Loading your matches...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-rose-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Your Matches</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          This is where your matches will appear. Coming in the next step!
        </p>
        <div className="p-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg">
          <p className="text-lg">Coming in the next step: Matches List</p>
        </div>
      </div>
    </div>
  )
}
