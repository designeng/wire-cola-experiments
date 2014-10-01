define(["wire", "core/plugin/utils/validatePluginUtils"], function(wire, ValidatePluginUtils) {
  var formSpec;
  define('formController', function() {
    var FormController;
    return FormController = (function() {
      function FormController() {}

      FormController.prototype.firstNameRule = function(value) {
        return true;
      };

      FormController.prototype.behaviorHandler = function() {};

      return FormController;

    })();
  });
  formSpec = {
    $plugins: ["core/plugin/validate"],
    options: {
      fields: {
        firstName: {
          "not longer than 20 characters": {
            rule: function() {
              return true;
            },
            message: "Should not be longer than 20 characters!"
          }
        },
        email: {
          "should have word '@'": {
            rule: /@/g,
            message: "Should have word '@'!"
          }
        }
      }
    },
    validationPlugin: {
      create: "core/plugin/validate"
    },
    formController: {
      create: "formController"
    }
  };
  return describe("validationPluginUtils", function() {
    beforeEach(function(done) {
      var _this = this;
      this.pluginUtils = new ValidatePluginUtils();
      return wire(formSpec.options).then(function(ctx) {
        _this.ctx = ctx;
        _this.options = _this.ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    it("rule regexp should be normalized to function", function(done) {
      var rule;
      rule = /test/;
      expect(this.pluginUtils.normalizeRule(rule)).toBeFunction();
      return done();
    });
    it("rule function should be function", function(done) {
      var rule;
      rule = function() {
        return true;
      };
      expect(this.pluginUtils.normalizeRule(rule)).toBeFunction();
      return done();
    });
    return it("pipelineStrategies returns promise", function(done) {
      var extracted, obj, _i, _len;
      extracted = this.pluginUtils.extractStrategies(this.options);
      extracted = this.pluginUtils.normalizeArray(extracted);
      console.log("extracted", extracted);
      for (_i = 0, _len = extracted.length; _i < _len; _i++) {
        obj = extracted[_i];
        expect(obj.rule).toBePromise();
      }
      return done();
    });
  });
});
