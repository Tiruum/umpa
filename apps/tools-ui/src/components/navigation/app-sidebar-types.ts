import type { LucideIcon } from "lucide-react"

export type SidebarFooterAction = {
  name: string
  icon: LucideIcon
  onClick?: () => void
  shortcut?: LucideIcon
  items?: SidebarFooterAction[]
}
