define(["underscore"], function(_) {
  var innerListTransformation, sum, transform;
  sum = function(memo, text) {
    return memo + text;
  };
  transform = function(list) {
    var item, _i, _len;
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      item = list[_i];
      if (_.isObject(item)) {
        item["name"] = "NAME:::" + item["name"];
        item["hash"] = "HASH:::" + item["hash"];
      }
    }
    return list;
  };
  return innerListTransformation = function() {
    return function(fieldName) {
      return transform(this[fieldName]);
    };
  };
});
