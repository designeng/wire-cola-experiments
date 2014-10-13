define(["underscore", "jquery", "when/pipeline", "kefir", "kefirJquery"], function(_, $, pipeline) {
  var normalize;
  normalize = function(target) {
    return $(target);
  };
  return function(options) {
    var pluginObject, streamsFacet;
    streamsFacet = function(resolver, facet, wire) {
      return wire(facet.options).then(function(options) {
        var controller, events, form, handlers, submitEvent;
        controller = facet.target;
        form = controller.form = normalize(controller.form);
        _.each(controller.fieldNames, function(name) {
          return this.inputs[name] = form.find("input[name='" + name + "']");
        }, controller);
        events = _.keys(options);
        handlers = _.values(options);
        submitEvent = "submit";
        _.map(events, function(event) {
          var beforeAll, filters, methods, tasks;
          methods = _.map(options[event].split("|"), function(method) {
            return $.trim(method);
          });
          filters = _.filter(methods, function(method) {
            if (method.match(/filter:/g)) {
              return true;
            } else {
              return false;
            }
          });
          beforeAll = _.filter(methods, function(method) {
            if (method.match(/before:/g)) {
              return true;
            } else {
              return false;
            }
          });
          tasks = _.difference(methods, _.union(filters, beforeAll));
          filters = _.map(filters, function(item) {
            var filter;
            filter = item.split(":")[1];
            _.bindAll(this, filter);
            return this[filter];
          }, this);
          beforeAll = _.map(beforeAll, function(item) {
            var method;
            method = item.split(":")[1];
            _.bindAll(this, method);
            return this[method];
          }, this);
          tasks = _.map(tasks, function(task) {
            _.bindAll(this, task);
            return this[task];
          }, this);
          if (event !== submitEvent) {
            return _.each(this.fieldNames, function(name) {
              var beforeAllFilterFunc, filterFunc, getFieldData;
              getFieldData = (function(target, name) {
                return function() {
                  var obj;
                  obj = {
                    event: event,
                    name: name,
                    value: target.inputs[name].val()
                  };
                  return obj;
                };
              })(this, name);
              beforeAllFilterFunc = function() {
                var args;
                args = Array.prototype.slice.call(arguments, 0);
                return _.each(beforeAll, function(method) {
                  return method.apply(null, args);
                });
              };
              filterFunc = function() {
                var args, res;
                args = Array.prototype.slice.call(arguments, 0);
                res = _.reduce(filters, function(res, filter) {
                  return res && filter.apply(null, args);
                }, true);
                return res;
              };
              this.streams[event] = this.inputs[name].asKefirStream(event, getFieldData).tap(beforeAllFilterFunc).filter(filterFunc);
              return this.streams[event].onValue(function(data) {
                return pipeline(tasks, data);
              });
            }, this);
          } else if (event === submitEvent) {
            return this.streams[submitEvent] = form.asKefirStream(submitEvent).onValue(function(value) {
              return pipeline(tasks, value);
            });
          }
        }, controller);
        return resolver.resolve();
      });
    };
    pluginObject = {
      context: {
        destroy: function(resolver, wire) {
          return resolver.resolve();
        }
      },
      facets: {
        streams: {
          ready: streamsFacet
        }
      }
    };
    return pluginObject;
  };
});
