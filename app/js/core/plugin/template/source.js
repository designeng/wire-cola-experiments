define(["underscore", "when"], function(_, When) {
  var acceptTransformations, processCollection, sum;
  sum = function(memo, text) {
    return memo + text;
  };
  processCollection = function(rootElement, itemPattern, list, zeroPattern) {
    var item, result, resultHtml, _i, _len;
    result = [];
    if (!list.length && (zeroPattern != null)) {
      result.push(zeroPattern);
    } else {
      for (_i = 0, _len = list.length; _i < _len; _i++) {
        item = list[_i];
        result.push(_.template(itemPattern, item));
      }
    }
    result.unshift("<" + rootElement + ">");
    result.push("</" + rootElement + ">");
    resultHtml = _.reduce(result, sum, "");
    return resultHtml;
  };
  acceptTransformations = function(list, itemTransformations) {
    var fieldCount, fieldName, fields, item, transformations, _i, _j, _len, _len1;
    if (_.isEmpty(itemTransformations)) {
      return list;
    }
    fields = _.keys(itemTransformations);
    transformations = _.values(itemTransformations);
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      item = list[_i];
      fieldCount = 0;
      for (_j = 0, _len1 = fields.length; _j < _len1; _j++) {
        fieldName = fields[_j];
        item[fieldName] = transformations[fieldCount].call(item, fieldName);
      }
    }
    return list;
  };
  return function(options) {
    return {
      factories: {
        templateSource: function(resolver, componentDef, wire) {
          return wire(componentDef.options).then(function(options) {
            var fillWith, itemPattern, itemTransformations, pattern, rootElement, zeroPattern;
            pattern = options.pattern;
            fillWith = options.fillWith;
            itemPattern = options.itemPattern;
            rootElement = options.rootElement;
            zeroPattern = options.zeroPattern;
            itemTransformations = options.itemTransformations;
            if (fillWith != null) {
              if (fillWith instanceof Array) {
                if (rootElement == null) {
                  rootElement = "ul";
                }
                if (itemPattern == null) {
                  throw new Error("itemPattern option should be defined!");
                }
                if (itemTransformations != null) {
                  fillWith = acceptTransformations(fillWith, itemTransformations);
                }
                return processCollection(rootElement, itemPattern, fillWith, zeroPattern);
              } else {
                if (pattern == null) {
                  throw new Error("pattern option should be defined!");
                }
                return _.template(pattern, fillWith);
              }
            } else {
              return pattern;
            }
          }).then(resolver.resolve, resolver.reject);
        }
      }
    };
  };
});
