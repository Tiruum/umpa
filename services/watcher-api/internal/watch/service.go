package watch

import "context"

// Service - класс бизнес-логики.
type Service struct {
	repo Repository
}

func NewService(repo Repository) *Service {
	return &Service{
		repo: repo,
	}
}

// CreateWatchInput - DTO (Data Transfer Object) для создания. ID не передаем.
type CreateWatchInput struct {
	Name     string `json:"name"`
	URL      string `json:"url"`
	Selector string `json:"selector"`
}

func (s *Service) Create(ctx context.Context, input CreateWatchInput) (Watch, error) {
	w := Watch{
		Name:     input.Name,
		URL:      input.URL,
		Selector: input.Selector,
	}
	return s.repo.Create(ctx, w)
}

// UpdateWatchInput - Поля-указатели (*string). 
// nil означает, что клиент вообще не прислал это поле и его не нужно перезаписывать пустой строкой.
type UpdateWatchInput struct {
	Name     *string `json:"name"`
	URL      *string `json:"url"`
	Selector *string `json:"selector"`
}

func (s *Service) List(ctx context.Context) ([]Watch, error) {
	return s.repo.List(ctx)
}

func (s *Service) GetByID(ctx context.Context, id int64) (Watch, error) {
	return s.repo.GetByID(ctx, id)
}

func (s *Service) Update(ctx context.Context, id int64, input UpdateWatchInput) (Watch, error) {
	w, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return Watch{}, err
	}

	if input.Name != nil {
		w.Name = *input.Name
	}
	if input.URL != nil {
		w.URL = *input.URL
	}
	if input.Selector != nil {
		w.Selector = *input.Selector
	}

	return s.repo.Update(ctx, id, w)
}

func (s *Service) Delete(ctx context.Context, id int64) error {
	return s.repo.Delete(ctx, id)
}
