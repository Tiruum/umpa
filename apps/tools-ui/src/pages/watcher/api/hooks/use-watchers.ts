import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
} from "@tanstack/react-query"

import { watchersQueryKeys } from "../../consts/watchers-query-keys"
import {
  deleteWatcher,
  fetchWatchers,
  toggleWatcherStatus,
} from "../watchers-api"
import type { Watcher } from "../../types/watcher"

export function useWatchersQuery(enabled = true) {
  return useQuery({
    queryKey: watchersQueryKeys.all,
    queryFn: fetchWatchers,
    enabled,
  })
}

export function useToggleWatcherMutation(
  options?: UseMutationOptions<
    { watcherId: string; nextStatus: Watcher["status"] },
    Error,
    string,
    { previous?: Watcher[] }
  >
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: toggleWatcherStatus,
    onMutate: async (watcherId: string) => {
      await queryClient.cancelQueries({ queryKey: watchersQueryKeys.all })
      const previous = queryClient.getQueryData<Watcher[]>(
        watchersQueryKeys.all
      )

      queryClient.setQueryData<Watcher[]>(
        watchersQueryKeys.all,
        (current: Watcher[] = []) =>
          current.map((watcher) => {
            if (watcher.id !== watcherId) return watcher
            if (watcher.status === "error") return watcher
            return {
              ...watcher,
              status: watcher.status === "active" ? "paused" : "active",
              lastChecked: new Date().toISOString(),
            }
          })
      )

      return { previous }
    },
    onError: (_error, _watcherId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(watchersQueryKeys.all, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: watchersQueryKeys.all })
    },
    ...options,
  })
}

export function useDeleteWatcherMutation(
  options?: UseMutationOptions<
    { watcherId: string },
    Error,
    string,
    { previous?: Watcher[] }
  >
) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteWatcher,
    onMutate: async (watcherId: string) => {
      await queryClient.cancelQueries({ queryKey: watchersQueryKeys.all })
      const previous = queryClient.getQueryData<Watcher[]>(
        watchersQueryKeys.all
      )

      queryClient.setQueryData<Watcher[]>(
        watchersQueryKeys.all,
        (current: Watcher[] = []) =>
          current.filter((watcher) => watcher.id !== watcherId)
      )

      return { previous }
    },
    onError: (_error, _watcherId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(watchersQueryKeys.all, context.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: watchersQueryKeys.all })
    },
    ...options,
  })
}
