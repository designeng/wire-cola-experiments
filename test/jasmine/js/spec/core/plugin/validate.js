define(["wire", "core/plugin/utils/validatePluginUtils"], function(wire, ValidatePluginUtils) {
  var formSpec;
  define('formController', function() {
    var FormController;
    return FormController = (function() {
      function FormController() {}

      FormController.prototype.firstNameRule = function() {
        return true;
      };

      FormController.prototype.behaviorHandler = function() {};

      return FormController;

    })();
  });
  formSpec = {
    $plugins: ["core/plugin/validate"],
    options: {
      literal: {
        fields: {
          firstName: {
            "not longer than 20 characters": {
              rule: {
                $ref: 'formController.firstNameRule'
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
      wire(formSpec).then(function(ctx) {
        _this.ctx = ctx;
        _this.options = _this.ctx.options;
        console.log("@options", _this.options);
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
      return done();
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
      var extracted;
      extracted = this.pluginUtils.extractStrategies(this.options);
      extracted = this.pluginUtils.normalizeArray(extracted);
      return done();
    });
  });
});
