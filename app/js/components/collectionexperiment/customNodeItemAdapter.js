define(["jquery", "underscore"], function($, _) {
  var CustomNodeItemAdapter;
  CustomNodeItemAdapter = function(rootNode, options) {
    console.log("CustomNodeItemAdapter", rootNode, options);
    this.rootNode = rootNode;
    return this._options = options;
  };
  CustomNodeItemAdapter.prototype = {
    getOptions: function() {
      return this._options;
    },
    set: function(item) {
      console.log("SET:::", item);
      return this.rootNode.innerHTML = item.port;
    },
    update: function(item) {},
    properties: function(lambda) {
      return lambda(this._item);
    }
  };
  CustomNodeItemAdapter.canHandle = function(obj) {
    return obj && obj.tagName && obj.getAttribute && obj.setAttribute;
  };
  return CustomNodeItemAdapter;
});
