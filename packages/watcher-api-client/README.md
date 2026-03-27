# @umpa/watcher-api-client

Generated API client and TanStack Query hooks for Watcher API.

## Source of truth

Source of truth is backend Go code + swagger annotations.

OpenAPI schema is generated from code to:

- `services/watcher-api/internal/httpapi/docs/swagger.yaml`

This package reads generated schema and produces TS types + hooks.

## Generate

From repo root:

```bash
pnpm api:gen:frontend
```

Or run full pipeline (Go + frontend):

```bash
pnpm api:gen
```

## Use in app

```ts
import { useListWatches } from "@umpa/watcher-api-client";
```

Optional axios instance customization:

```ts
import { AXIOS_INSTANCE } from "@umpa/watcher-api-client";

AXIOS_INSTANCE.defaults.baseURL = "http://localhost:8001";
```
