define({
  $plugins: ["wire/debug", "wire/dom"],
  controller: {
    create: "components/when/experiments/promised",
    ready: {
      wrapFunc: {}
    }
  }
});
