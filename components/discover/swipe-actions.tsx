"use client"

import { X, Heart, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SwipeActionsProps {
  onSwipe: (direction: "left" | "right" | "up") => void
}

export function SwipeActions({ onSwipe }: SwipeActionsProps) {
  return (
    <div className="flex justify-center items-center space-x-4">
      <Button
        variant="outline"
        size="icon"
        className="h-14 w-14 rounded-full bg-white/90 dark:bg-gray-800/90 border-red-500 text-red-500 hover:bg-red-500 hover:text-white shadow-lg"
        onClick={() => onSwipe("left")}
      >
        <X className="h-6 w-6" />
        <span className="sr-only">Skip</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-14 w-14 rounded-full bg-white/90 dark:bg-gray-800/90 border-indigo-500 text-indigo-500 hover:bg-indigo-500 hover:text-white shadow-lg"
        onClick={() => onSwipe("up")}
      >
        <Star className="h-6 w-6" />
        <span className="sr-only">Super Like</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="h-14 w-14 rounded-full bg-white/90 dark:bg-gray-800/90 border-green-500 text-green-500 hover:bg-green-500 hover:text-white shadow-lg"
        onClick={() => onSwipe("right")}
      >
        <Heart className="h-6 w-6" />
        <span className="sr-only">Like</span>
      </Button>
    </div>
  )
}
