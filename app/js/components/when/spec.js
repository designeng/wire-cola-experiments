define({
  $plugins: ["wire/debug", "wire/dom"],
  controller: {
    create: "components/when/controller",
    ready: {
      validateWithSequence: {}
    }
  }
});
