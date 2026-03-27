package memory

import (
	"context"
	"sync"

	"github.com/Tiruum/umpa/services/watcher-api/internal/watch"
)

// WatchRepository - фейковая база данных в оперативной памяти (slice/массив).
type WatchRepository struct {
	mu      sync.Mutex // замок для многопоточного безопасного доступа (Go = много потоков)
	nextID  int64
	watches []watch.Watch
}

func NewWatchRepository() *WatchRepository {
	return &WatchRepository{
		nextID: 1,
	}
}

func (r *WatchRepository) Create(ctx context.Context, w watch.Watch) (watch.Watch, error) {
	r.mu.Lock()
	defer r.mu.Unlock() // unlock выполнится в конце функции

	w.ID = r.nextID
	r.nextID++
	r.watches = append(r.watches, w)
	return w, nil
}

func (r *WatchRepository) List(ctx context.Context) ([]watch.Watch, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	result := make([]watch.Watch, len(r.watches))
	copy(result, r.watches) // отдаем клон, чтобы никто не сломал наш приватный массив
	return result, nil
}

func (r *WatchRepository) GetByID(ctx context.Context, id int64) (watch.Watch, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	for _, w := range r.watches {
		if w.ID == id {
			return w, nil
		}
	}
	return watch.Watch{}, watch.ErrNotFound
}

func (r *WatchRepository) Update(ctx context.Context, id int64, w watch.Watch) (watch.Watch, error) {
	r.mu.Lock()
	defer r.mu.Unlock()

	for i, existing := range r.watches {
		if existing.ID == id {
			r.watches[i] = w
			return w, nil
		}
	}
	return watch.Watch{}, watch.ErrNotFound
}

func (r *WatchRepository) Delete(ctx context.Context, id int64) error {
	r.mu.Lock()
	defer r.mu.Unlock()

	for i, w := range r.watches {
		if w.ID == id {
			// [1, 2, 3] удалить "2" = склеить [до 2] + [после 2]
			r.watches = append(r.watches[:i], r.watches[i+1:]...)
			return nil
		}
	}
	return watch.ErrNotFound
}
