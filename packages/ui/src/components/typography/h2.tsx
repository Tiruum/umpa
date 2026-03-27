import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type H2Props = ComponentPropsWithoutRef<"h2">

export function H2({ className, ...props }: H2Props) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  )
}
