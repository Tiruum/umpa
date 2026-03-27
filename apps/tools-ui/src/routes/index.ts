import {
  Activity,
  ArrowLeftRight,
  Bug,
  ClipboardList,
  Code2,
  FileSearch,
  FileText,
  Filter,
  Logs,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react"
import type { BreadcrumbConfig, ServicesConfig } from "./types"

export const ROUTES = {
  TOOLS_MAIN: "/",
  TOOLS_WATCHER: "/watcher",
} as const

export const services: ServicesConfig = [
  {
    id: "monitoring",
    title: "Monitoring",
    description:
      "Сервисы для наблюдения за доступностью, изменениями и состоянием систем.",
    items: [
      {
        id: "watcher",
        title: "Watcher",
        description:
          "Мониторинг страниц и сервисов: отслеживание изменений, статусов и истории проверок.",
        route: ROUTES.TOOLS_WATCHER,
        tag: "Live",
        icon: Activity,
      },
      {
        id: "uptime-checks",
        title: "Uptime Checks",
        description:
          "Периодические проверки endpoint-ов и алерты по деградации доступности.",
        tag: "Soon",
        icon: ShieldCheck,
      },
      {
        id: "incident-board",
        title: "Incident Board",
        description:
          "Панель инцидентов с таймлайном, приоритизацией и статусами расследований.",
        tag: "Soon",
        icon: ClipboardList,
      },
      {
        id: "log-lens",
        title: "Log Lens",
        description:
          "Быстрый просмотр логов с фильтрами, группировкой и поиском по ключевым событиям.",
        tag: "Soon",
        icon: Logs,
      },
    ],
  },
  {
    id: "data-tools",
    title: "Data Tools",
    description:
      "Утилиты для работы с JSON, diff и аналитикой структурированных данных.",
    items: [
      {
        id: "json-tools",
        title: "JSON Tools",
        description:
          "Форматирование, валидация и быстрый поиск ошибок в JSON-конфигурациях.",
        tag: "Soon",
        icon: Code2,
      },
      {
        id: "diff-viewer",
        title: "Diff Viewer",
        description:
          "Сравнение JSON/текста с подсветкой изменений и удобной навигацией.",
        tag: "Soon",
        icon: ArrowLeftRight,
      },
      {
        id: "smart-search",
        title: "Smart Search",
        description:
          "Интеллектуальный поиск по данным и логам с фильтрацией по ключам и значениям.",
        tag: "Soon",
        icon: Search,
      },
      {
        id: "schema-explorer",
        title: "Schema Explorer",
        description:
          "Обзор JSON-схем, связей и ограничений с автогенерацией примеров payload.",
        tag: "Soon",
        icon: Network,
      },
    ],
  },
  {
    id: "developer-utilities",
    title: "Developer Utilities",
    description:
      "Прикладные инструменты для ежедневной диагностики и ускорения разработки.",
    items: [
      {
        id: "regex-lab",
        title: "Regex Lab",
        description:
          "Песочница для проверки регулярных выражений с предпросмотром матчей в реальном времени.",
        tag: "Soon",
        icon: Sparkles,
      },
      {
        id: "request-inspector",
        title: "Request Inspector",
        description:
          "Просмотр и отладка HTTP-запросов/ответов с разбором заголовков и тела.",
        tag: "Soon",
        icon: FileSearch,
      },
      {
        id: "payload-sanitizer",
        title: "Payload Sanitizer",
        description:
          "Очистка чувствительных данных и маскирование персональных полей в payload.",
        tag: "Soon",
        icon: Filter,
      },
      {
        id: "error-playbook",
        title: "Error Playbook",
        description:
          "Каталог типовых ошибок, причин и рекомендуемых шагов для быстрого recovery.",
        tag: "Soon",
        icon: Bug,
      },
      {
        id: "release-notes",
        title: "Release Notes Builder",
        description:
          "Сборка release notes из изменений и задач с шаблонами публикации.",
        tag: "Soon",
        icon: FileText,
      },
    ],
  },
]

const routeLabelMap = new Map(
  services
    .flatMap((section) => section.items)
    .filter((item) => Boolean(item.route))
    .map((item) => [item.route as string, item.title])
)

export function getRouteBreadcrumbs(pathname: string): BreadcrumbConfig[] {
  if (pathname === ROUTES.TOOLS_MAIN) {
    return [{ label: "Tools", href: ROUTES.TOOLS_MAIN }]
  }

  const routeLabel = routeLabelMap.get(pathname)
  if (!routeLabel) {
    return [{ label: "Tools", href: ROUTES.TOOLS_MAIN }]
  }

  return [{ label: "Tools", href: ROUTES.TOOLS_MAIN }, { label: routeLabel }]
}

export * from "./types"
