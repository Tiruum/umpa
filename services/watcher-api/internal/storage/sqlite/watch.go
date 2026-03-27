package sqlite

import (
	"context"
	"database/sql"
	"errors"

	"github.com/Tiruum/umpa/services/watcher-api/internal/watch"
	_ "modernc.org/sqlite"
)

// WatchRepository хранит ссылку на sql.DB.
// sql.DB внутри сам управляет пулом соединений.
type WatchRepository struct {
	db *sql.DB
}

func NewWatchRepository(dbPath string) (*WatchRepository, error) {
	db, err := sql.Open("sqlite", dbPath)
	if err != nil {
		return nil, err
	}

	if err := db.Ping(); err != nil {
		_ = db.Close()
		return nil, err
	}

	repo := &WatchRepository{db: db}
	if err := repo.initSchema(context.Background()); err != nil {
		_ = db.Close()
		return nil, err
	}

	return repo, nil
}

func (r *WatchRepository) Close() error {
	return r.db.Close()
}

func (r *WatchRepository) initSchema(ctx context.Context) error {
	const query = `
	CREATE TABLE IF NOT EXISTS watches (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		name TEXT NOT NULL,
		url TEXT NOT NULL,
		selector TEXT NOT NULL
	);`

	_, err := r.db.ExecContext(ctx, query)
	return err
}

func (r *WatchRepository) Create(ctx context.Context, w watch.Watch) (watch.Watch, error) {
	const query = `INSERT INTO watches (name, url, selector) VALUES (?, ?, ?)`

	result, err := r.db.ExecContext(ctx, query, w.Name, w.URL, w.Selector)
	if err != nil {
		return watch.Watch{}, err
	}

	id, err := result.LastInsertId()
	if err != nil {
		return watch.Watch{}, err
	}

	w.ID = id
	return w, nil
}

func (r *WatchRepository) List(ctx context.Context) ([]watch.Watch, error) {
	const query = `SELECT id, name, url, selector FROM watches ORDER BY id ASC`

	rows, err := r.db.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	result := make([]watch.Watch, 0)
	for rows.Next() {
		var w watch.Watch
		if err := rows.Scan(&w.ID, &w.Name, &w.URL, &w.Selector); err != nil {
			return nil, err
		}
		result = append(result, w)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return result, nil
}

func (r *WatchRepository) GetByID(ctx context.Context, id int64) (watch.Watch, error) {
	const query = `SELECT id, name, url, selector FROM watches WHERE id = ?`

	var w watch.Watch
	err := r.db.QueryRowContext(ctx, query, id).Scan(&w.ID, &w.Name, &w.URL, &w.Selector)
	if errors.Is(err, sql.ErrNoRows) {
		return watch.Watch{}, watch.ErrNotFound
	}
	if err != nil {
		return watch.Watch{}, err
	}

	return w, nil
}

func (r *WatchRepository) Update(ctx context.Context, id int64, w watch.Watch) (watch.Watch, error) {
	const query = `UPDATE watches SET name = ?, url = ?, selector = ? WHERE id = ?`

	result, err := r.db.ExecContext(ctx, query, w.Name, w.URL, w.Selector, id)
	if err != nil {
		return watch.Watch{}, err
	}

	affected, err := result.RowsAffected()
	if err != nil {
		return watch.Watch{}, err
	}
	if affected == 0 {
		return watch.Watch{}, watch.ErrNotFound
	}

	w.ID = id
	return w, nil
}

func (r *WatchRepository) Delete(ctx context.Context, id int64) error {
	const query = `DELETE FROM watches WHERE id = ?`

	result, err := r.db.ExecContext(ctx, query, id)
	if err != nil {
		return err
	}

	affected, err := result.RowsAffected()
	if err != nil {
		return err
	}
	if affected == 0 {
		return watch.ErrNotFound
	}

	return nil
}
