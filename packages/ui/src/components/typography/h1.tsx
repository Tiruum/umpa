import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type H1Props = ComponentPropsWithoutRef<"h1">

export function H1({ className, ...props }: H1Props) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance",
        className
      )}
      {...props}
    />
  )
}
