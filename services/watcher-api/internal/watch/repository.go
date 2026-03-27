package watch

import (
	"context"
	"errors"
)

// ErrNotFound возвращается, если запись с таким ID не существует.
var ErrNotFound = errors.New("watch not found")

// Repository - интерфейс (контракт) базы данных. 
// Мы скрываем за ним любую реальную БД (память, Postgres, SQLite).
type Repository interface {
	Create(ctx context.Context, w Watch) (Watch, error)
	List(ctx context.Context) ([]Watch, error)
	GetByID(ctx context.Context, id int64) (Watch, error)
	Update(ctx context.Context, id int64, w Watch) (Watch, error)
	Delete(ctx context.Context, id int64) error
}
