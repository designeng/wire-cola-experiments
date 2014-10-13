define(["underscore", "jquery", "when"], function(_, $, When) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.form = null;

    Controller.prototype.inputs = {};

    Controller.prototype.streams = {};

    Controller.prototype.errors = {};

    Controller.prototype.checkForRegistredError = function(obj) {
      if (this.errors[obj.name]) {
        return true;
      } else {
        return false;
      }
    };

    Controller.prototype.getRegistredError = function(obj) {
      obj["error"] = this.errors[obj.name];
      return obj;
    };

    Controller.prototype.hideError = function(obj) {
      return this.errorDisplay.controller.hideError();
    };

    Controller.prototype.displayError = function(obj) {
      this.errorDisplay.controller.displayError(obj);
      return obj;
    };

    Controller.prototype.validate = function(obj) {
      var res;
      res = this.validator.validate(obj.name, obj.value);
      if (res.messages) {
        obj.error = res;
      }
      return obj;
    };

    Controller.prototype.registerError = function(obj) {
      if (obj.error) {
        this.errors[obj.name] = obj.error;
      } else {
        delete this.errors[obj.name];
      }
      return obj;
    };

    Controller.prototype.highLight = function(obj) {
      if (obj.error) {
        return this.inputs[obj.name].css("background-color", "red");
      } else {
        return this.inputs[obj.name].css("background-color", "green");
      }
    };

    Controller.prototype.validateAll = function() {
      var firstDefectObjectInForm, formData, name, obj, res, value, _i, _len, _ref;
      firstDefectObjectInForm = void 0;
      formData = {};
      _ref = this.fieldNames;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        value = this.inputs[name].val();
        formData[name] = value;
        res = this.validate({
          name: name,
          value: value
        });
        if (res.error) {
          obj = {
            name: name,
            value: value,
            error: res.error
          };
          if (!firstDefectObjectInForm) {
            firstDefectObjectInForm = obj;
          }
          this.highLight(obj);
          this.registerError(obj);
        }
      }
      if (firstDefectObjectInForm) {
        return this.displayError(firstDefectObjectInForm);
      } else {
        return this.successHandler(formData);
      }
    };

    return Controller;

  })();
});
