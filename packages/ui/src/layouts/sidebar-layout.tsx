import { Fragment, type ReactNode } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../components/breadcrumb"
import { Separator } from "../components/separator"

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/sidebar"

export type SidebarLayoutBreadcrumb = {
  label: string
  href?: string
}

type SidebarLayoutProps = {
  sidebar: ReactNode
  children: ReactNode
  breadcrumbs?: SidebarLayoutBreadcrumb[]
  renderBreadcrumbLink?: (item: SidebarLayoutBreadcrumb) => ReactNode
}

export function SidebarLayout({
  sidebar,
  children,
  breadcrumbs = [
    { label: "Build Your Application", href: "#" },
    { label: "Data Fetching" },
  ],
  renderBreadcrumbLink,
}: SidebarLayoutProps) {
  const lastIndex = breadcrumbs.length - 1

  return (
    <SidebarProvider>
      {sidebar}
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4 data-[orientation=vertical]:self-auto"
            />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => {
                  const isLast = index === lastIndex

                  return (
                    <Fragment key={`${item.label}-${index}`}>
                      <BreadcrumbItem
                        className={!isLast ? "hidden md:block" : undefined}
                      >
                        {isLast ? (
                          <BreadcrumbPage>{item.label}</BreadcrumbPage>
                        ) : renderBreadcrumbLink ? (
                          renderBreadcrumbLink(item)
                        ) : (
                          <BreadcrumbLink href={item.href ?? "#"}>
                            {item.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {!isLast ? (
                        <BreadcrumbSeparator className="hidden md:block" />
                      ) : null}
                    </Fragment>
                  )
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 pt-0 md:p-6 md:pt-0">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
