define({
  $plugins: ["wire/debug", "wire/dom", "wire/dom/render", "wire/on"],
  display: {
    render: {
      template: {
        module: "text!components/form/validator/display/display.html"
      }
    },
    insert: {
      at: {
        $ref: 'displaySlot'
      }
    }
  },
  controller: {
    create: "components/form/validator/display/controller",
    properties: {
      display: {
        $ref: 'display'
      },
      displaySlot: {
        $ref: 'displaySlot'
      }
    },
    ready: {
      onReady: {}
    }
  }
});
