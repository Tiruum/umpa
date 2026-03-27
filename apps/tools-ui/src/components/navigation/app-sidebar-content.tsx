import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@umpa/ui"
import { Link } from "react-router"

import type { ServiceCardItem, ServiceSection } from "@/routes"

type AppSidebarContentProps = {
  pathname: string
  sections: ServiceSection[]
}

const NavigationItem = ({
  pathname,
  item,
}: {
  pathname: string
  item: ServiceCardItem
}) => {
  const isAvailable = Boolean(item.route)

  if (isAvailable) {
    return (
      <SidebarMenuButton asChild isActive={pathname === item.route}>
        <Link to={item.route!}>
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    )
  }

  return (
    <SidebarMenuButton disabled aria-disabled className="opacity-80">
      <item.icon />
      <span>{item.title}</span>
    </SidebarMenuButton>
  )
}

export function AppSidebarContent({
  pathname,
  sections,
}: AppSidebarContentProps) {
  return (
    <SidebarContent>
      {sections.map((section) => (
        <SidebarGroup key={section.id}>
          <SidebarGroupLabel>{section.title}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {section.items.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <NavigationItem pathname={pathname} item={item} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </SidebarContent>
  )
}
