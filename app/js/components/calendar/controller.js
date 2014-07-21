define(["moment", "jquery"], function(moment, $) {
  var CalendarController;
  return CalendarController = (function() {
    function CalendarController() {}

    CalendarController.prototype.onReady = function() {
      return console.log("___@collection", this.collection);
    };

    CalendarController.prototype.aNodeHandlerFunction = function(node, data, info, doDefault) {
      console.log("___aNodeHandlerFunction", node, data, info);
      $(node).text(data.day);
      if (data.day % 7 === 0) {
        return $(node).addClass("weekend");
      }
    };

    return CalendarController;

  })();
});
