define(["underscore"], function(_) {
  var FormController;
  return FormController = (function() {
    function FormController() {}

    FormController.prototype.onReady = function() {};

    FormController.prototype.formValidationBehaviourHandler = function(target, errors) {};

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
