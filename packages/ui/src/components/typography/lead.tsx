import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type LeadProps = ComponentPropsWithoutRef<"p">

export const Lead = ({ className, ...props }: LeadProps) => {
  return (
    <p className={cn("text-xl text-muted-foreground", className)} {...props} />
  )
}
