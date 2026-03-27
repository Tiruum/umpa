import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type H4Props = ComponentPropsWithoutRef<"h4">

export function H4({ className, ...props }: H4Props) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}
