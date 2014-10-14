define(["underscore", "jquery", "kefir", "kefirJquery"], function(_, $) {
  var Controller;
  return Controller = (function() {
    function Controller() {
      var stream, transformer;
      this.element = $("#page");
      transformer = function() {
        return $(this).find(".rect").css("width");
      };
      stream = this.element.asKefirStream("change", transformer).onValue(function(value) {
        return console.log("VALUE:::", value);
      });
      stream.log();
      this.element.trigger("change");
    }

    return Controller;

  })();
});
