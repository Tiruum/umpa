import { Button, Muted, Small } from "@umpa/ui"
import { CirclePause, Eye, Play, Trash } from "lucide-react"

import type { Watcher } from "../../types/watcher"
import { formatWatcherDate } from "../../utils/watcher-formatters"
import { WatcherStatusBadge } from "./watcher-status-badge"

type WatcherMobileCardsProps = {
  watchers: Watcher[]
  onToggleStatus: (watcher: Watcher) => void
  onViewHistory: (watcher: Watcher) => void
  onDelete: (watcher: Watcher) => void
}

export function WatcherMobileCards({
  watchers,
  onToggleStatus,
  onViewHistory,
  onDelete,
}: WatcherMobileCardsProps) {
  return (
    <div className="space-y-3 md:hidden">
      {watchers.length ? (
        watchers.map((watcher) => {
          const isPaused = watcher.status === "paused"

          return (
            <article
              key={watcher.id}
              className="space-y-3 rounded-lg border p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <Small className="truncate leading-normal font-medium text-foreground">
                    {watcher.name}
                  </Small>
                  <Muted className="truncate text-xs">{watcher.url}</Muted>
                </div>
                <WatcherStatusBadge status={watcher.status} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <span>Last checked</span>
                <span className="text-right text-foreground">
                  {formatWatcherDate(watcher.lastChecked)}
                </span>
                <span>Unseen changes</span>
                <span className="text-right text-foreground">
                  {watcher.changesCount}
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onToggleStatus(watcher)}
                >
                  {isPaused ? (
                    <Play className="size-4" />
                  ) : (
                    <CirclePause className="size-4" />
                  )}
                  {isPaused ? "Resume" : "Pause"}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewHistory(watcher)}
                >
                  <Eye className="size-4" />
                  History
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => onDelete(watcher)}
                >
                  <Trash className="size-4" />
                  Delete
                </Button>
              </div>
            </article>
          )
        })
      ) : (
        <Muted className="rounded-lg border p-6 text-center">
          No watchers found.
        </Muted>
      )}
    </div>
  )
}
