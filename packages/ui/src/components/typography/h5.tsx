import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type H5Props = ComponentPropsWithoutRef<"h5">

export function H5({ className, ...props }: H5Props) {
  return (
    <h5
      className={cn(
        "scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  )
}
