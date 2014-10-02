define(["underscore", "when", "when/function", "when/pipeline", "when/sequence"], function(_, When, fn, pipeline, sequence) {
  var Controller;
  return Controller = (function() {
    function Controller() {
      this.basePromise = When.promise(function(resolve, reject) {
        return resolve(1);
      });
      this.basePromiseNo = When.promise(function(resolve, reject) {
        return setTimeout(function() {
          return resolve(2);
        }, 10000);
      });
    }

    Controller.prototype.onReady = function() {
      var promise1, promise2;
      promise1 = this.basePromise.delay(1000);
      promise2 = this.basePromiseNo;
      return When.all([promise1, promise2]).then(function(res) {
        return console.log("RES:::", res);
      }).otherwise(function(reason) {
        return console.log("REJECTED:::", reason);
      });
    };

    Controller.prototype.validate = function() {
      var strategyItem, validationPoint;
      strategyItem = {
        rule: function(value) {
          if (value.length > 5) {
            return 0;
          } else {
            return 1;
          }
        },
        message: "Should not be more then 5"
      };
      validationPoint = function(item, value) {
        if (item.rule(value)) {
          return true;
        } else {
          throw {
            message: item.message
          };
        }
      };
      return fn.call(validationPoint, strategyItem, "1234567").then(function(res) {
        return console.log("RES::", res);
      }, function(err) {
        return console.log("ERR:::", err);
      });
    };

    Controller.prototype.validateWithSequence = function() {
      var fieldName, fieldValue, strategyItem_1, strategyItem_2, strategyItems, validationEnter, validationEnter2, validationEnters, validationReducer;
      fieldName = "firstName";
      fieldValue = "12345";
      strategyItem_1 = {
        rule: function(value) {
          if (value.length > 5) {
            return 0;
          } else {
            return 1;
          }
        },
        message: "Should not be more then 5"
      };
      strategyItem_2 = {
        rule: function(value) {
          if (value.match(/test/)) {
            return 0;
          } else {
            return 1;
          }
        },
        message: "Should not have 'test"
      };
      strategyItems = [strategyItem_1, strategyItem_2];
      validationReducer = function(memo, item) {
        memo = memo * item.rule(fieldValue);
        if (!memo) {
          throw {
            message: item.message
          };
        } else {
          return memo;
        }
      };
      validationEnter = function(items) {
        return _.reduce(items, validationReducer, 1);
      };
      validationEnter2 = function(items) {
        return "validationEnter2";
      };
      validationEnters = [];
      validationEnters.push(validationEnter);
      validationEnters.push(validationEnter2);
      return sequence(validationEnters, strategyItems).then(function(res) {
        return console.log("RES::", res);
      }, function(err) {
        return console.log("ERR:::", err);
      });
    };

    return Controller;

  })();
});
