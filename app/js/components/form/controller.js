var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["underscore"], function(_) {
  var FormController;
  return FormController = (function() {
    function FormController() {
      this.afterFieldValidation = __bind(this.afterFieldValidation, this);
    }

    FormController.prototype.testProp = "testProp";

    FormController.prototype.onReady = function() {};

    FormController.prototype.onValidationComplete = function(target, formResult) {
      return console.log("onValidationComplete::::::::", target, formResult);
    };

    FormController.prototype.afterFieldValidation = function(target, fieldName, result) {
      console.log("afterFieldValidation::::", target, fieldName, result);
      return console.log("prop::::", this.testProp);
    };

    FormController.prototype.pluginInvoker = function(plugin, target, callback) {
      console.log("PLUGIN", plugin, this);
      console.log("TARGET IN CONTROLLER:::", target);
      return callback(1234567);
    };

    FormController.prototype.firstNameRule = function(value) {
      if (value.length > 20) {
        return false;
      } else {
        return true;
      }
    };

    return FormController;

  })();
});
