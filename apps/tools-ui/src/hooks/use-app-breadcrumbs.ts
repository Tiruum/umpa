import { useLocation } from "react-router"

import { getRouteBreadcrumbs } from "@/routes"

export function useAppBreadcrumbs() {
  const location = useLocation()
  return getRouteBreadcrumbs(location.pathname)
}
