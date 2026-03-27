import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type PProps = ComponentPropsWithoutRef<"p">

export function P({ className, ...props }: PProps) {
  return <p className={cn("leading-7 not-first:mt-6", className)} {...props} />
}
