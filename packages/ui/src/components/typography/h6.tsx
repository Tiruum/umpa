import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type H6Props = ComponentPropsWithoutRef<"h6">

export function H6({ className, ...props }: H6Props) {
  return (
    <h6
      className={cn(
        "scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}
