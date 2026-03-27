import type { PropsWithChildren } from "react"

import { cn } from "@umpa/ui"

type PageContainerProps = PropsWithChildren<{
  className?: string
}>

export function PageContainer({ className, children }: PageContainerProps) {
  return (
    <main
      className={cn(
        "mx-auto w-full max-w-6xl px-4 py-4 md:px-6 md:py-6",
        className
      )}
    >
      {children}
    </main>
  )
}
