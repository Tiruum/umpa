import type { ComponentPropsWithoutRef } from "react"

import { cn } from "../../lib/utils"

type UlProps = ComponentPropsWithoutRef<"ul">
type OlProps = ComponentPropsWithoutRef<"ol">
type LiProps = ComponentPropsWithoutRef<"li">

export const Ul = ({ className, ...props }: UlProps) => {
  return (
    <ul
      className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)}
      {...props}
    />
  )
}

export const Ol = ({ className, ...props }: OlProps) => {
  return (
    <ol
      className={cn("my-6 ml-6 list-decimal [&>li]:mt-2", className)}
      {...props}
    />
  )
}

export const Li = ({ className, ...props }: LiProps) => {
  return <li className={cn(className)} {...props} />
}
