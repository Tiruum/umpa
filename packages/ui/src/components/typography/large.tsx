import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type LargeProps = ComponentPropsWithoutRef<"div">

export function Large({ className, ...props }: LargeProps) {
  return <div className={cn("text-lg font-semibold", className)} {...props} />
}
