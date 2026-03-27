import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@umpa/ui"
import { ChevronsUpDown, User2 } from "lucide-react"

import type { SidebarFooterAction } from "./app-sidebar-types"

type AppSidebarFooterProps = {
  isMobile: boolean
  actions: SidebarFooterAction[]
}

function SidebarFooterActionItem({ action }: { action: SidebarFooterAction }) {
  if (action.items?.length) {
    const ActionIcon = action.icon

    return (
      <DropdownMenuSub>
        <DropdownMenuSubTrigger className="gap-2 p-2">
          <div className="flex size-6 items-center justify-center rounded-sm border">
            <ActionIcon className="size-4 shrink-0" />
          </div>
          {action.name}
        </DropdownMenuSubTrigger>
        <DropdownMenuSubContent className="min-w-44 rounded-lg">
          {action.items.map((item) => {
            const ItemIcon = item.icon

            return (
              <DropdownMenuItem
                key={item.name}
                onClick={item.onClick}
                className="gap-2 p-2"
              >
                <ItemIcon className="size-4 shrink-0" />
                {item.name}
                {item.shortcut ? (
                  <DropdownMenuShortcut>
                    <item.shortcut />
                  </DropdownMenuShortcut>
                ) : null}
              </DropdownMenuItem>
            )
          })}
        </DropdownMenuSubContent>
      </DropdownMenuSub>
    )
  }

  return (
    <DropdownMenuItem onClick={action.onClick} className="gap-2 p-2">
      <div className="flex size-6 items-center justify-center rounded-sm border">
        <action.icon className="size-4 shrink-0" />
      </div>
      {action.name}
    </DropdownMenuItem>
  )
}

export function AppSidebarFooter({ isMobile, actions }: AppSidebarFooterProps) {
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton
                size="default"
                className="data-[state=open]:text-sidebar-accent-foreground"
              >
                <User2 className="size-4" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Username</span>
                </div>
                <ChevronsUpDown className="ml-auto" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
              align="start"
              side={isMobile ? "bottom" : "right"}
              sideOffset={4}
            >
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Действия
              </DropdownMenuLabel>
              {actions.map((action) => (
                <SidebarFooterActionItem key={action.name} action={action} />
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  )
}
