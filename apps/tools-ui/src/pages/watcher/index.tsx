import * as React from "react"
import {
  type ColumnDef,
  type SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Button, Input, Muted, Skeleton, Small } from "@umpa/ui"
import { ChevronDown, ChevronUp, ChevronsUpDown, Plus } from "lucide-react"
import { toast } from "sonner"
import { Helmet } from "react-helmet"

import { PageSectionHeader } from "@/components/layout/page-section-header"
import {
  useDeleteWatcherMutation,
  useToggleWatcherMutation,
  useWatchersQuery,
} from "./api/hooks/use-watchers"
import type { Watcher } from "./types/watcher"
import { formatWatcherDate } from "./utils/watcher-formatters"
import { WatcherDeleteDialog } from "./components/watcher-list/watcher-delete-dialog"
import { WatcherMobileCards } from "./components/watcher-list/watcher-mobile-cards"
import { WatcherStatusBadge } from "./components/watcher-list/watcher-status-badge"
import { WatcherActionsMenu } from "./components/watcher-list/watcher-actions-menu"
import { WatcherTable } from "./components/watcher-list/watcher-table"
import { PageContainer } from "@/components/layout/page-container"

export type WatcherListProps = {
  watchers?: Watcher[]
  isLoading?: boolean
  onCreateWatcher?: () => void
  onViewHistory?: (watcher: Watcher) => void
}

export function WatcherPage({
  watchers,
  isLoading: isLoadingProp,
  onCreateWatcher,
  onViewHistory,
}: WatcherListProps) {
  const isExternalData = Boolean(watchers)
  const watchersQuery = useWatchersQuery(!isExternalData)
  const toggleMutation = useToggleWatcherMutation()
  const deleteMutation = useDeleteWatcherMutation()

  const [sorting, setSorting] = React.useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [watcherToDelete, setWatcherToDelete] = React.useState<Watcher | null>(
    null
  )

  const watchersData = watchers ?? watchersQuery.data ?? []
  const isLoading =
    isLoadingProp ?? (!isExternalData && watchersQuery.isLoading)

  const handleToggleStatus = React.useCallback(
    (watcher: Watcher) => {
      if (watcher.status === "error") {
        toast.error("Cannot toggle watcher in error state")
        return
      }

      toggleMutation.mutate(watcher.id)

      const nextStatus = watcher.status === "active" ? "paused" : "active"
      toast.success(
        nextStatus === "active"
          ? `Watcher "${watcher.name}" resumed`
          : `Watcher "${watcher.name}" paused`
      )
    },
    [toggleMutation]
  )

  const handleDelete = React.useCallback(
    (watcher: Watcher) => {
      deleteMutation.mutate(watcher.id)
      setWatcherToDelete(null)
      toast.success(`Watcher "${watcher.name}" deleted`)
    },
    [deleteMutation]
  )

  const handleViewHistory = React.useCallback(
    (watcher: Watcher) => {
      if (onViewHistory) {
        onViewHistory(watcher)
      } else {
        console.log("Open watcher history:", watcher.id)
      }
      toast.message(`Open history for "${watcher.name}"`)
    },
    [onViewHistory]
  )

  const columns = React.useMemo<ColumnDef<Watcher>[]>(
    () => [
      {
        accessorKey: "url",
        header: "URL",
        cell: ({ row }) => (
          <div className="max-w-85 min-w-0">
            <Small className="truncate leading-normal font-medium text-foreground">
              {row.original.name}
            </Small>
            <Muted className="truncate text-xs">{row.original.url}</Muted>
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <WatcherStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "changesCount",
        header: "Unseen changes",
        cell: ({ row }) => (
          <span className="font-medium">{row.original.changesCount}</span>
        ),
      },
      {
        accessorKey: "lastChecked",
        header: ({ column }) => (
          <Button
            variant="ghost"
            className="-ml-3"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Last checked
            {column.getIsSorted() === "asc" ? (
              <ChevronUp className="ml-1 size-4" />
            ) : column.getIsSorted() === "desc" ? (
              <ChevronDown className="ml-1 size-4" />
            ) : (
              <ChevronsUpDown className="ml-1 size-4" />
            )}
          </Button>
        ),
        sortingFn: (rowA, rowB) => {
          const a = new Date(rowA.original.lastChecked).getTime()
          const b = new Date(rowB.original.lastChecked).getTime()
          return a - b
        },
        cell: ({ row }) => (
          <span className="text-muted-foreground">
            {formatWatcherDate(row.original.lastChecked)}
          </span>
        ),
      },
      {
        id: "actions",
        enableSorting: false,
        enableHiding: false,
        cell: ({ row }) => (
          <WatcherActionsMenu
            watcher={row.original}
            onToggleStatus={handleToggleStatus}
            onViewHistory={handleViewHistory}
            onDelete={setWatcherToDelete}
          />
        ),
      },
    ],
    [handleToggleStatus, handleViewHistory]
  )

  const table = useReactTable({
    data: watchersData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _, filterValue) => {
      const query = String(filterValue).toLowerCase().trim()
      if (!query) return true
      return (
        row.original.name.toLowerCase().includes(query) ||
        row.original.url.toLowerCase().includes(query)
      )
    },
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
  })

  const rows = table.getRowModel().rows

  return (
    <PageContainer>
      <Helmet>
        <title>Watcher | Tools</title>
      </Helmet>
      <section className="space-y-6">
        <PageSectionHeader
          title="Watcher"
          description="Мониторинг изменений на веб-страницах и получение уведомлений о них."
          actions={
            <Button
              onClick={() => {
                if (onCreateWatcher) {
                  onCreateWatcher()
                  return
                }
                toast.message("Create New Watcher action placeholder")
              }}
            >
              <Plus className="size-4" />
              Создать новый Watcher
            </Button>
          }
        />

        {!isExternalData && watchersQuery.isError ? (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm">
            <Small className="font-medium text-destructive">
              Failed to load watchers.
            </Small>
            <Button
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => watchersQuery.refetch()}
            >
              Retry
            </Button>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Input
            value={globalFilter}
            onChange={(event) => setGlobalFilter(event.target.value)}
            placeholder="Filter by name or URL..."
            className="w-full sm:max-w-sm"
          />
          <Muted>
            {watchersData.length} total • page{" "}
            {table.getState().pagination.pageIndex + 1} of{" "}
            {Math.max(table.getPageCount(), 1)}
          </Muted>
        </div>

        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : (
          <>
            <WatcherTable table={table} columnsLength={columns.length} />

            <WatcherMobileCards
              watchers={rows.map((row) => row.original)}
              onToggleStatus={handleToggleStatus}
              onViewHistory={handleViewHistory}
              onDelete={setWatcherToDelete}
            />

            <footer className="flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </footer>
          </>
        )}
      </section>

      <WatcherDeleteDialog
        watcher={watcherToDelete}
        onOpenChange={(open) => {
          if (!open) setWatcherToDelete(null)
        }}
        onConfirm={handleDelete}
      />
    </PageContainer>
  )
}
