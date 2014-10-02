var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["underscore"], function(_) {
  var FormController;
  return FormController = (function() {
    function FormController() {
      this.afterValidation = __bind(this.afterValidation, this);
    }

    FormController.prototype.testProp = "testProp";

    FormController.prototype.onReady = function() {};

    FormController.prototype.afterValidation = function(target, errors) {
      console.log("afterValidation::::", target, errors);
      return console.log("prop::::", this.testProp);
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
