define({
  $plugins: ["wire/debug", "wire/dom", "wire/dom/render", "wire/on"],
  emitterView: {
    render: {
      template: {
        module: "text!components/emitter/template.html"
      }
    },
    insert: {
      at: {
        $ref: 'slot'
      }
    }
  },
  controller: {
    create: "components/emitter/controller"
  }
});
