define(["jquery", "when", "underscore", "cola/dom/adapter/NodeList"], function($, When, _, NodeListAdapter) {
  var CollectionViewController;
  return CollectionViewController = (function() {
    function CollectionViewController() {}

    CollectionViewController.prototype.onReady = function() {
      var _this = this;
      When(true).delay(200).then(function() {
        return _this.townsCollection.addSource(_this.townsCollectionSource);
      });
      return When(true).delay(400).then(function() {
        var byId, compareByLast, dest, querySelector;
        byId = function(o) {
          return o && o.id;
        };
        querySelector = function(selector, node) {
          return node.querySelector(selector);
        };
        compareByLast = function(a, b) {
          return 1;
        };
        dest = new NodeListAdapter(_this.namesListView, {
          comparator: compareByLast,
          identifier: byId,
          querySelector: querySelector,
          bindings: {
            name: '.name'
          }
        });
        _this.namesCollection.addSource(_this.namesCollectionSource);
        _this.namesCollection.addSource(dest);
        return $("ul").find("[data-cola-id='Tokio']").append(_this.namesListView);
      });
    };

    return CollectionViewController;

  })();
});
