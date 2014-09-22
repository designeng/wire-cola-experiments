define({
  $plugins: ["wire/debug", "wire/dom", "core/plugin/contextRouter"],
  appRouter: {
    contextRouter: {
      routes: {
        "collectionexperiment": {
          spec: "components/collectionexperiment/spec",
          slot: {
            $ref: "dom.first!#page"
          }
        },
        "handlebars": {
          spec: "components/handlebars/spec",
          slot: {
            $ref: "dom.first!#page"
          }
        }
      }
    }
  }
});
