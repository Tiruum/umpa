import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@umpa/ui"
import { CirclePause, Eye, MoreHorizontal, Play, Trash } from "lucide-react"

import type { Watcher } from "../../types/watcher"

type WatcherActionsMenuProps = {
  watcher: Watcher
  onToggleStatus: (watcher: Watcher) => void
  onViewHistory: (watcher: Watcher) => void
  onDelete: (watcher: Watcher) => void
}

export function WatcherActionsMenu({
  watcher,
  onToggleStatus,
  onViewHistory,
  onDelete,
}: WatcherActionsMenuProps) {
  const isPaused = watcher.status === "paused"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label={`Actions for ${watcher.name}`}
        >
          <MoreHorizontal className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem onClick={() => onToggleStatus(watcher)}>
          {isPaused ? (
            <Play className="size-4" />
          ) : (
            <CirclePause className="size-4" />
          )}
          {isPaused ? "Resume" : "Pause"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onViewHistory(watcher)}>
          <Eye className="size-4" />
          View history
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
          onClick={() => onDelete(watcher)}
        >
          <Trash className="size-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
