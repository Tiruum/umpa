module.exports = {
  watcherApi: {
    input: {
      target: "../../services/watcher-api/internal/httpapi/docs/swagger.yaml",
    },
    output: {
      target: "./src/generated/client.ts",
      schemas: "./src/generated/model",
      client: "react-query",
      mode: "split",
      override: {
        mutator: {
          path: "./src/http/custom-instance.ts",
          name: "customInstance",
        },
      },
    },
  },
}
