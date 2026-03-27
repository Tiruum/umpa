import { Sidebar, useSidebar, useTheme } from "@umpa/ui"
import {
  Check,
  LogOut,
  Monitor,
  Moon,
  Settings,
  Sun,
  User2,
} from "lucide-react"
import { useLocation } from "react-router"

import { services } from "@/routes"
import { AppSidebarContent } from "./app-sidebar-content"
import { AppSidebarFooter } from "./app-sidebar-footer"
import { AppSidebarHeader } from "./app-sidebar-header"
import type { SidebarFooterAction } from "./app-sidebar-types"

export function AppSidebar() {
  const location = useLocation()
  const { isMobile } = useSidebar()
  const { theme, setTheme } = useTheme()

  const sidebarFooterActions: SidebarFooterAction[] = [
    {
      name: "Профиль",
      icon: User2,
      onClick: () => alert("Go to profile"),
    },
    {
      name: "Настройки",
      icon: Settings,
      onClick: () => alert("Go to settings"),
    },
    {
      name: "Тема",
      icon: theme === "light" ? Sun : theme === "dark" ? Moon : Monitor,
      items: [
        {
          name: "Светлая",
          icon: Sun,
          onClick: () => setTheme("light"),
          shortcut: theme === "light" ? Check : undefined,
        },
        {
          name: "Темная",
          icon: Moon,
          onClick: () => setTheme("dark"),
          shortcut: theme === "dark" ? Check : undefined,
        },
        {
          name: "Системная",
          icon: Monitor,
          onClick: () => setTheme("system"),
          shortcut: theme === "system" ? Check : undefined,
        },
      ],
    },
    {
      name: "Выйти",
      icon: LogOut,
      onClick: () => alert("Logout"),
    },
  ]

  return (
    <Sidebar variant="floating" collapsible="icon">
      <AppSidebarHeader />
      <AppSidebarContent pathname={location.pathname} sections={services} />
      <AppSidebarFooter isMobile={isMobile} actions={sidebarFooterActions} />
    </Sidebar>
  )
}
