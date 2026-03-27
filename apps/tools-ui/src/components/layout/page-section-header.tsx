import type { PropsWithChildren, ReactNode } from "react"
import { H3, Muted } from "@umpa/ui"

type PageSectionHeaderProps = PropsWithChildren<{
  title: string
  description?: string
  actions?: ReactNode
}>

export function PageSectionHeader({
  title,
  description,
  actions,
  children,
}: PageSectionHeaderProps) {
  return (
    <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-1">
        <H3>{title}</H3>
        {description ? <Muted>{description}</Muted> : null}
        {children}
      </div>
      {actions}
    </header>
  )
}
