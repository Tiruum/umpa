# shadcn/ui monorepo template

This is a Vite monorepo template with shadcn/ui.

## Generators

Create frontend app:

```bash
pnpm turbo gen app
```

Create Go API service + frontend SDK package from OpenAPI:

```bash
pnpm turbo gen go-service
```

## Adding components

To add components to your app, run the following command at the root of your `web` app:

```bash
pnpm dlx shadcn@latest add button -c apps/web
```

This will place the ui components in the `packages/ui/src/components` directory.

## Using components

To use the components in your app, import them from the `ui` package.

```tsx
import { Button } from "@umpa/ui/components/button";
```
