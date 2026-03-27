import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type InlineCodeProps = ComponentPropsWithoutRef<"code">

export function InlineCode({ className, ...props }: InlineCodeProps) {
  return (
    <code
      className={cn(
        "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
        className
      )}
      {...props}
    />
  )
}
