define({
  $plugins: ["wire/debug", "wire/dom", "core/plugin/contextRouter"],
  appRouter: {
    contextRouter: {
      routes: {
        "autocomplete": {
          spec: "components/autocomplete/spec",
          slot: {
            $ref: "dom.first!#page"
          }
        },
        "calendar": {
          spec: "components/calendar/spec",
          slot: {
            $ref: "dom.first!#page"
          }
        },
        "collectionview": {
          spec: "components/collectionview/spec",
          slot: {
            $ref: "dom.first!#page"
          }
        },
        "underscore": {
          spec: "components/underscore/spec",
          slot: {
            $ref: "dom.first!#page"
          }
        },
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
        },
        "form": {
          spec: "components/form/spec",
          slot: {
            $ref: "dom.first!#page"
          }
        }
      }
    }
  }
});
