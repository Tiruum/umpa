import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@umpa/ui"
import { ArrowRight, Wrench } from "lucide-react"
import { Link } from "react-router"

import type { ServiceCardItem } from "@/routes"

type ServiceCardProps = {
  item: ServiceCardItem
}

export function ServiceCard({ item }: ServiceCardProps) {
  const Icon = item.icon

  return (
    <Card className="flex h-full flex-col transition-colors hover:bg-accent/40">
      <CardHeader className="flex items-start justify-between gap-3">
        <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Icon className="size-5" />
        </div>
        <Badge variant={item.route ? "default" : "secondary"}>{item.tag}</Badge>
      </CardHeader>

      <CardContent className="space-y-2">
        <CardTitle>{item.title}</CardTitle>
        <CardDescription className="leading-relaxed">
          {item.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="mt-auto">
        {item.route ? (
          <Button asChild className="w-full justify-between">
            <Link to={item.route}>
              Открыть
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        ) : (
          <Button variant="outline" className="w-full justify-between" disabled>
            Скоро будет
            <Wrench className="size-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
