import { type LucideIcon } from "lucide-react"

export type BreadcrumbConfig = {
  label: string
  href?: string
}

export type ServiceCardItem = {
  id: string
  title: string
  description: string
  route?: string
  tag: string
  icon: LucideIcon
}

export type ServiceSection = {
  id: string
  title: string
  description: string
  items: ServiceCardItem[]
}

export type ServicesConfig = ServiceSection[]
