define({
  $plugins: ["wire/debug", "wire/dom", "wire/dom/render", "wire/on"],
  controller: {
    create: "components/emitter/controller",
    ready: {
      onReady: {}
    }
  }
});
