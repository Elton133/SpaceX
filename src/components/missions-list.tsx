"use client"

import { useState, useEffect } from "react"
import type { SpaceXMission } from "@/types/spacex"
import { MissionCard } from "./mission-card"
import { Loader2, AlertCircle } from "lucide-react"

interface MissionsListProps {
  limit?: number
  showLoadMore?: boolean
}

export function MissionsList({ limit = 12, showLoadMore = true }: MissionsListProps) {
  const [missions, setMissions] = useState<SpaceXMission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [displayCount, setDisplayCount] = useState(limit)

  useEffect(() => {
    const fetchMissions = async () => {
      try {
        setLoading(true)
        const response = await fetch("https://api.spacexdata.com/v4/launches")

        if (!response.ok) {
          throw new Error("Failed to fetch missions")
        }

        const data: SpaceXMission[] = await response.json()
        // Sort by date (newest first)
        const sortedMissions = data.sort((a, b) => new Date(b.date_utc).getTime() - new Date(a.date_utc).getTime())

        setMissions(sortedMissions)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchMissions()
  }, [])

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + limit)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
        <span className="ml-2 text-gray-300">Loading missions...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center py-12">
        <AlertCircle className="w-8 h-8 text-red-400" />
        <span className="ml-2 text-red-400">Error: {error}</span>
      </div>
    )
  }

  const displayedMissions = missions.slice(0, displayCount)
  const hasMore = displayCount < missions.length

  return (
    <div className="space-y-6 flex flex-col mx-7">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedMissions.map((mission) => (
          <MissionCard key={mission.id} mission={mission} />
        ))}
      </div>

      {showLoadMore && hasMore && (
        <div className="flex justify-center pt-8">
          <button
            onClick={handleLoadMore}
            className="bg-cyan-500 hover:bg-cyan-600 text-white font-medium px-8 py-3 rounded-lg transition-colors duration-200"
          >
            Load More Missions
          </button>
        </div>
      )}

      {missions.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">No missions found.</p>
        </div>
      )}
    </div>
  )
}
