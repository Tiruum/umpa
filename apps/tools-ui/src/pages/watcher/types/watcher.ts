export type WatcherStatus = "active" | "paused" | "error"

export type Watcher = {
  id: string
  name: string
  url: string
  status: WatcherStatus
  lastChecked: Date | string
  changesCount: number
}
