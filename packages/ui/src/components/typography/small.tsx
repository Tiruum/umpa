import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type SmallProps = ComponentPropsWithoutRef<"small">

export function Small({ className, ...props }: SmallProps) {
  return (
    <small
      className={cn("text-sm leading-none font-medium", className)}
      {...props}
    />
  )
}
