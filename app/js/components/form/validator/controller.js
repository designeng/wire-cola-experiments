define(["underscore", "jquery", "kefir", "kefirJquery"], function(_, $, kefir) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.$form = null;

    Controller.prototype.onReady = function() {
      var fields, streams;
      console.log(this.form);
      this.$form = $(this.form);
      fields = this.getFileds(["lastName", "email"]);
      streams = this.getStreams(fields);
      return console.log(streams);
    };

    Controller.prototype.getFileds = function(fieldNames) {
      var fields,
        _this = this;
      return fields = _.map(fieldNames, function(name) {
        return _this.$form.find("input[name='" + name + "']");
      });
    };

    Controller.prototype.getValues = function(fields) {
      var values;
      return values = _.map(fields, function(field) {
        return field.val();
      });
    };

    Controller.prototype.getStreams = function(fields, event) {
      var streams;
      return streams = _.map(fields, function(field) {
        return field.asKefirStream(event);
      });
    };

    return Controller;

  })();
});
