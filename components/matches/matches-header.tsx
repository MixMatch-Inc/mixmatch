import { Music } from "lucide-react"

interface MatchesHeaderProps {
  matchCount: number
}

export function MatchesHeader({ matchCount }: MatchesHeaderProps) {
  return (
    <div className="text-center mb-6">
      <h1 className="text-3xl font-bold mb-2">Your Matches</h1>
      <div className="flex items-center justify-center gap-2">
        <Music className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
        <p className="text-gray-600 dark:text-gray-300">
          {matchCount} {matchCount === 1 ? "person" : "people"} with similar music taste
        </p>
      </div>
    </div>
  )
}
