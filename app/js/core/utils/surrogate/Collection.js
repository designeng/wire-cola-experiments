define(["underscore", "signals"], function(_, Signal) {
  var Collection, setIdFor, setIdsFor;
  setIdFor = function(item) {
    return _.extend(item, {
      _id: _.uniqueId('c')
    });
  };
  setIdsFor = function(array) {
    if (array.length === 0) {
      return [];
    } else {
      return _.map(array, function(item) {
        return setIdFor(item);
      });
    }
  };
  return Collection = (function() {
    function Collection() {
      this._source = [];
      this._signal = new Signal();
    }

    Collection.prototype.addSource = function(array) {
      if (!_.isArray(array)) {
        array = [];
      }
      this._source = setIdsFor(array);
      return this._source;
    };

    Collection.prototype.getSource = function() {
      return this._source;
    };

    Collection.prototype.getSignal = function() {
      return this._signal;
    };

    Collection.prototype.destroy = function() {
      return this._signal.removeAll();
    };

    Collection.prototype.addItem = function(item) {
      item = setIdFor(item);
      this._source.push(item);
      return this._signal.dispatch("add", item);
    };

    Collection.prototype.update = function(itemAttributes, options) {
      var item, key, value;
      item = this.find(itemAttributes);
      for (key in options) {
        value = options[key];
        if (typeof value === "null" || typeof value === "undefined") {
          delete options[key];
          delete item[key];
        }
      }
      item = _.extend(item, options);
      this._signal.dispatch("update", item);
      return item;
    };

    Collection.prototype.remove = function(_id) {
      return _.remove(this._source, function(item) {
        return item["_id"] === _id;
      });
    };

    Collection.prototype.applyFilter = function(filter) {
      this._source = _.filter(this.getSource(), filter, this);
      return this._source;
    };

    Collection.prototype.getItemAt = function(index) {
      return this._source[index];
    };

    Collection.prototype.find = function(attrs) {
      var item;
      item = _.find(this._source, attrs);
      return item;
    };

    Collection.prototype.where = function(attrs) {
      var items;
      items = _.where(this._source, attrs);
      return items;
    };

    Collection.prototype.size = function() {
      return this._source.length;
    };

    Collection.prototype.each = function(iterator) {
      if (!_.isFunction(iterator)) {
        throw new Error("Iterator for Collection.each should be function!");
      }
      return _.forEach(this.source, iterator);
    };

    Collection.prototype.reset = function(items) {
      if (!items || !items.length) {
        this._source = [];
      }
      return this._signal.dispatch("reset", this.getSource());
    };

    return Collection;

  })();
});
