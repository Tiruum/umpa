import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@umpa/ui"

import type { Watcher } from "../../types/watcher"

type WatcherDeleteDialogProps = {
  watcher: Watcher | null
  onOpenChange: (open: boolean) => void
  onConfirm: (watcher: Watcher) => void
}

export function WatcherDeleteDialog({
  watcher,
  onOpenChange,
  onConfirm,
}: WatcherDeleteDialogProps) {
  return (
    <AlertDialog open={Boolean(watcher)} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete watcher?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The watcher
            {watcher ? ` "${watcher.name}"` : ""} will be removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="text-destructive-foreground bg-destructive hover:bg-destructive/90"
            onClick={() => watcher && onConfirm(watcher)}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
