define({
  $plugins: ["wire/debug", "wire/dom"],
  controller: {
    create: "components/transducer/controller3",
    ready: {
      onReady: {}
    }
  }
});
