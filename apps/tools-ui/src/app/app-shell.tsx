import { BreadcrumbLink, SidebarLayout } from "@umpa/ui"
import { Link, Route, Routes } from "react-router"

import { AppSidebar } from "@/components/navigation/app-sidebar"
import { WatcherPage } from "@/pages/watcher"
import { useAppBreadcrumbs } from "@/hooks/use-app-breadcrumbs"
import { MainPage } from "@/pages/main"
import { ROUTES } from "@/routes"

export function AppShell() {
  const breadcrumbs = useAppBreadcrumbs()

  return (
    <SidebarLayout
      sidebar={<AppSidebar />}
      breadcrumbs={breadcrumbs}
      renderBreadcrumbLink={(item) => (
        <BreadcrumbLink asChild>
          <Link to={item.href ?? ROUTES.TOOLS_MAIN}>{item.label}</Link>
        </BreadcrumbLink>
      )}
    >
      <Routes>
        <Route path={ROUTES.TOOLS_MAIN} element={<MainPage />} />
        <Route path={ROUTES.TOOLS_WATCHER} element={<WatcherPage />} />
      </Routes>
    </SidebarLayout>
  )
}
