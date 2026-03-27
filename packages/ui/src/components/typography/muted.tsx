import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type MutedProps = ComponentPropsWithoutRef<"p">

export function Muted({ className, ...props }: MutedProps) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  )
}
