import type { WatcherStatus } from "../types/watcher"

export function formatWatcherDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value)
  return new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date)
}

export function getWatcherStatusLabel(status: WatcherStatus) {
  if (status === "active") return "Active"
  if (status === "paused") return "Paused"
  return "Error"
}

export function getWatcherStatusBadgeClass(status: WatcherStatus) {
  if (status === "active") {
    return "border-emerald-500/30 bg-emerald-500/15 text-emerald-600"
  }

  if (status === "paused") {
    return "border-amber-500/30 bg-amber-500/15 text-amber-600"
  }

  return "border-rose-500/30 bg-rose-500/15 text-rose-600"
}
