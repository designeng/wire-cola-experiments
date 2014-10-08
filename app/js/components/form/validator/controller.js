define(["underscore", "jquery", "when", "kefir", "kefirJquery"], function(_, $, When, kefir) {
  var Controller;
  return Controller = (function() {
    function Controller() {}

    Controller.prototype.$form = null;

    Controller.prototype.onReady = function() {
      var field, fields, name, names, zip, zippedFields, _i, _len, _results,
        _this = this;
      _.bindAll(this, "getStoredError");
      this.$form = $(this.form);
      names = ["firstName", "email"];
      fields = this.getFields(names);
      zippedFields = this.getZippedFields(names, fields);
      _results = [];
      for (_i = 0, _len = zippedFields.length; _i < _len; _i++) {
        zip = zippedFields[_i];
        name = zip[0], field = zip[1];
        this.fieldPropety(field, "change").onValue(function(v) {
          return console.log("VALUE:::", v);
        });
        _results.push(When(this.onFieldFocus(field, "focus", name, this.getStoredError)).then(function(error) {
          console.log("DEFFERED ERROR:::", error);
          if (error) {
            return _this.displayError(error);
          }
        }));
      }
      return _results;
    };

    Controller.prototype.getFields = function(fieldNames) {
      var fields,
        _this = this;
      return fields = _.map(fieldNames, function(name) {
        return _this.$form.find("input[name='" + name + "']");
      });
    };

    Controller.prototype.getZippedFields = function(names, fields) {
      return _.zip(names, fields);
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

    Controller.prototype.fieldPropety = function(field, event) {
      var getValue;
      getValue = function() {
        return field.val();
      };
      return field.asKefirStream(event, getValue).toProperty(getValue());
    };

    Controller.prototype.onFieldFocus = function(field, event, name, getStored) {
      var deffered, onValueFn;
      deffered = When.defer();
      onValueFn = function() {
        var storedError;
        storedError = getStored(name);
        console.log("storedError:::", storedError);
        return deffered.resolve(storedError);
      };
      field.asKefirStream("focus").onValue(onValueFn);
      return deffered.promise;
    };

    Controller.prototype.getStoredError = function(fieldName) {
      return this.errorStorage.getValue(fieldName);
    };

    Controller.prototype.storeError = function(fieldName, error) {
      return this.errorStorage.getValue(fieldName, error);
    };

    Controller.prototype.displayError = function(error) {
      return this.errorDisplay.controller.displayError(error);
    };

    return Controller;

  })();
});
