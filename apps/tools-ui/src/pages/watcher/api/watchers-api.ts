import type { Watcher, WatcherStatus } from "../types/watcher"

let watchersDb: Watcher[] = [
  {
    id: "w_1",
    name: "Blog updates",
    url: "https://tools.umpa.digital/blog",
    status: "active",
    lastChecked: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    changesCount: 3,
  },
  {
    id: "w_2",
    name: "Pricing page",
    url: "https://tools.umpa.digital/pricing",
    status: "paused",
    lastChecked: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    changesCount: 0,
  },
  {
    id: "w_3",
    name: "Status page",
    url: "https://status.umpa.digital",
    status: "error",
    lastChecked: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    changesCount: 1,
  },
  {
    id: "w_4",
    name: "Docs changelog",
    url: "https://docs.umpa.digital/changelog",
    status: "active",
    lastChecked: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
    changesCount: 8,
  },
]

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

export async function fetchWatchers(): Promise<Watcher[]> {
  await delay(500)
  return watchersDb
}

export async function toggleWatcherStatus(
  watcherId: string
): Promise<{ watcherId: string; nextStatus: WatcherStatus }> {
  await delay(250)

  watchersDb = watchersDb.map((watcher) => {
    if (watcher.id !== watcherId) return watcher
    if (watcher.status === "error") return watcher

    const nextStatus: WatcherStatus =
      watcher.status === "active" ? "paused" : "active"
    return {
      ...watcher,
      status: nextStatus,
      lastChecked: new Date().toISOString(),
    }
  })

  const updatedWatcher = watchersDb.find((watcher) => watcher.id === watcherId)
  const nextStatus = updatedWatcher?.status ?? "paused"

  return { watcherId, nextStatus }
}

export async function deleteWatcher(
  watcherId: string
): Promise<{ watcherId: string }> {
  await delay(250)
  watchersDb = watchersDb.filter((watcher) => watcher.id !== watcherId)
  return { watcherId }
}
