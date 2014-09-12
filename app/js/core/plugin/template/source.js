define(["underscore", "when"], function(_, When) {
  var processCollection, removeTabs, tabulationRegexp, tagRegexp, trim;
  tagRegexp = /^<([a-z]+)([^<]+)*(?:>(.*)<\/\1>|\s+\/>)$/;
  tabulationRegexp = /\t\n/g;
  trim = function(str) {
    return str.replace(/^\s+|\s+$/g, '');
  };
  removeTabs = function(str) {
    return str.replace(tabulationRegexp, '');
  };
  processCollection = function(pattern, list) {
    var itemPattern, matched, matched_li, result;
    pattern = trim(pattern);
    pattern = removeTabs(pattern);
    console.log("PATTERN:::", pattern);
    matched = pattern.match(tagRegexp);
    if (matched[1] === "ul") {
      matched_li = matched[3].match(tagRegexp);
      if (matched_li[1] === "li") {
        itemPattern = matched_li[0];
        console.log("ITEM PATTERN::::", itemPattern);
      }
    }
    result = "";
    return result;
  };
  return function(options) {
    return {
      factories: {
        templateSource: function(resolver, componentDef, wire) {
          return wire(componentDef.options).then(function(options) {
            var fillWith, pattern;
            pattern = options.pattern;
            fillWith = options.fillWith;
            if (pattern == null) {
              throw new Error("Pattern option should be defined!");
            }
            if (fillWith != null) {
              if (fillWith instanceof Array) {
                return processCollection(pattern, fillWith);
              } else {
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
