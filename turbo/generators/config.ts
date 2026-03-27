import type { PlopTypes } from "@turbo/gen"

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("app", {
    description: "React + Vite app in apps/",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "App name (e.g. my-app):",
        validate: (value: string) => {
          if (!value.trim()) return "App name is required"
          if (!/^[a-z][a-z0-9-]*$/.test(value)) {
            return "Use lowercase letters, numbers, and dashes only (must start with a letter)"
          }
          return true
        },
      },
      {
        type: "input",
        name: "port",
        message: "Dev server port (e.g. 3000):",
        default: "3000",
        validate: (value: string) => {
          const port = parseInt(value, 10)
          if (isNaN(port) || port < 1024 || port > 65535) {
            return "Enter a valid port number (1024–65535)"
          }
          return true
        },
      },
    ],
    actions: [
      {
        type: "addMany",
        destination: "{{ turbo.paths.root }}/apps/{{name}}",
        base: "templates/app",
        templateFiles: "templates/app/**/*",
        verbose: true,
      },
    ],
  })

  plop.setGenerator("go-service", {
    description: "Production-ready Go API service in services/ + generated frontend SDK in packages/",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "Service name (e.g. watcher):",
        validate: (value: string) => {
          if (!value.trim()) return "Service name is required"
          if (!/^[a-z][a-z0-9-]*$/.test(value)) {
            return "Use lowercase letters, numbers, and dashes only (must start with a letter)"
          }
          return true
        },
      },
      {
        type: "input",
        name: "port",
        message: "HTTP port (e.g. 8080):",
        default: "8000",
        validate: (value: string) => {
          const port = parseInt(value, 10)
          if (isNaN(port) || port < 1024 || port > 65535) {
            return "Enter a valid port number (1024–65535)"
          }
          return true
        },
      },
    ],
    actions: [
      {
        type: "add",
        path: "{{ turbo.paths.root }}/services/{{name}}-api/.gitignore",
        templateFile: "templates/go-service/.gitignore.hbs",
      },
      {
        type: "add",
        path: "{{ turbo.paths.root }}/services/{{name}}-api/.env.example",
        templateFile: "templates/go-service/.env.example.hbs",
      },
      {
        type: "addMany",
        destination: "{{ turbo.paths.root }}/services/{{name}}-api",
        base: "templates/go-service",
        templateFiles: "templates/go-service/**/*",
        verbose: true,
      },
      {
        type: "addMany",
        destination: "{{ turbo.paths.root }}/packages/{{name}}-sdk",
        base: "templates/go-sdk",
        templateFiles: "templates/go-sdk/**/*",
        verbose: true,
      },
    ],
  })
}
