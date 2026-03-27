package watch

// Watch - это наша главная сущность (как interface в TypeScript).
type Watch struct {
	ID       int64  `json:"id"`
	Name     string `json:"name"`
	URL      string `json:"url"`
	Selector string `json:"selector"`
}
