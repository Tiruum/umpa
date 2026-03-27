import { Badge } from "@umpa/ui"

import type { WatcherStatus } from "../../types/watcher"
import {
  getWatcherStatusBadgeClass,
  getWatcherStatusLabel,
} from "../../utils/watcher-formatters"

type WatcherStatusBadgeProps = {
  status: WatcherStatus
}

export function WatcherStatusBadge({ status }: WatcherStatusBadgeProps) {
  return (
    <Badge variant="outline" className={getWatcherStatusBadgeClass(status)}>
      {getWatcherStatusLabel(status)}
    </Badge>
  )
}
