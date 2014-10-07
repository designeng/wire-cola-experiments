define({
  $plugins: ["wire/debug", "wire/dom", "wire/dom/render", "wire/on", "wire/aop", "core/plugin/validate"],
  controller: {
    create: "components/form/validator/controller",
    properties: {
      form: {
        $ref: 'form'
      }
    },
    ready: {
      onReady: {}
    }
  }
});
