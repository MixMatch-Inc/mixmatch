"use client"

import { Search, Users, MessageSquare, Music } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface MatchesEmptyProps {
  searchQuery?: string
  filterType?: "messages" | "new"
}

export function MatchesEmpty({ searchQuery = "", filterType }: MatchesEmptyProps) {
  const router = useRouter()

  const getIcon = () => {
    if (searchQuery) return <Search className="h-12 w-12 text-gray-400" />
    if (filterType === "messages") return <MessageSquare className="h-12 w-12 text-gray-400" />
    if (filterType === "new") return <Music className="h-12 w-12 text-gray-400" />
    return <Users className="h-12 w-12 text-gray-400" />
  }

  const getMessage = () => {
    if (searchQuery) {
      return {
        title: "No matches found",
        description: `We couldn't find any matches for "${searchQuery}"`,
      }
    }

    if (filterType === "messages") {
      return {
        title: "No messages yet",
        description: "You haven't started any conversations with your matches",
      }
    }

    if (filterType === "new") {
      return {
        title: "No new matches",
        description: "You've already messaged all your matches",
      }
    }

    return {
      title: "No matches yet",
      description: "Start swiping to find your musical matches",
    }
  }

  const message = getMessage()

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-gray-100 dark:bg-gray-800/50 rounded-full p-4 mb-4">{getIcon()}</div>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{message.title}</h3>
      <p className="text-gray-500 dark:text-gray-400 mb-6">{message.description}</p>

      {!searchQuery && !filterType && (
        <Button onClick={() => router.push("/discover")} className="bg-indigo-600 hover:bg-indigo-700">
          Find Matches
        </Button>
      )}

      {searchQuery && (
        <Button variant="outline" onClick={() => window.location.reload()}>
          Clear Search
        </Button>
      )}
    </div>
  )
}
