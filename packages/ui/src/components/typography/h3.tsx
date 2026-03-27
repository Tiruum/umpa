import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type H3Props = ComponentPropsWithoutRef<"h3">

export function H3({ className, ...props }: H3Props) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}
