import type { SpaceXMission } from "@/types/spacex"
import { Calendar, ExternalLink, Rocket } from "lucide-react"

interface MissionCardProps {
  mission: SpaceXMission
}

export function MissionCard({ mission }: MissionCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getStatusColor = (success: boolean | null) => {
    if (success === null) return "bg-gray-500"
    return success ? "bg-green-500" : "bg-red-500"
  }

  const getStatusText = (success: boolean | null) => {
    if (success === null) return "Pending"
    return success ? "Success" : "Failed"
  }

  return (
    <div className="relative  rounded-lg p-6 group overflow-hidden">
      {/* Animated border overlay */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-150">
        <div
          className="absolute inset-0 rounded-lg bg-white animate-spin ]"
          style={{
            background: "white",
            animation: "spin 4s linear infinite",
          }}
        ></div>
        <div className="absolute inset-[0.5px] bg-slate-800 rounded-lg"></div>
      </div>

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            {mission.links.patch.small ? (
              <img
                src={mission.links.patch.small || "/placeholder.svg"}
                alt={`${mission.name} patch`}
                className="w-12 h-12 rounded-full"
              />
            ) : (
              <div className="w-12 h-12 bg-slate-700 rounded-full flex items-center justify-center">
                <Rocket className="w-6 h-6 text-cyan-400" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-bold text-white">{mission.name}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">{formatDate(mission.date_utc)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(mission.success)}`}
            >
              {getStatusText(mission.success)}
            </span>
          </div>
        </div>

        {mission.details && <p className="text-gray-300 text-sm mb-4 line-clamp-3">{mission.details}</p>}

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            Rocket ID: <span className="text-cyan-400">{mission.rocket}</span>
          </div>
          <div className="flex space-x-2">
            {mission.links.webcast && (
              <a
                href={mission.links.webcast}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
            {mission.links.wikipedia && (
              <a
                href={mission.links.wikipedia}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
