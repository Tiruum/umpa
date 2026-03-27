import { H5, Muted } from "@umpa/ui"

import { PageContainer } from "@/components/layout/page-container"
import { PageSectionHeader } from "@/components/layout/page-section-header"
import { services } from "@/routes"
import { ServiceCard } from "./components/service-card"
import { Helmet } from "react-helmet"

export const MainPage = () => {
  return (
    <PageContainer className="space-y-8">
      <Helmet>
        <title>Tools</title>
      </Helmet>
      <PageSectionHeader
        title="Tools Dashboard"
        description="Единая панель внутренних инструментов tools.umpa.digital для мониторинга, анализа данных и утилит разработчика."
      >
        <Muted className="max-w-3xl leading-relaxed">
          Здесь собраны сервисы для операционных задач: watcher уже доступен, а
          JSON, diff и дополнительные инструменты будут добавляться поэтапно.
        </Muted>
      </PageSectionHeader>

      <div className="space-y-8">
        {services.map((service) => (
          <section
            key={service.id}
            aria-label={service.title}
            className="space-y-3"
          >
            <div className="space-y-1">
              <H5>{service.title}</H5>
              <Muted>{service.description}</Muted>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {service.items.map((item) => (
                <ServiceCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageContainer>
  )
}
