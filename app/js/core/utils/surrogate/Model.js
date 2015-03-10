define(function() {
  var Model;
  return Model = (function() {
    function Model(obj) {
      var addSource, domesticateSource, getHash, getProperty, setProperty, _hash;
      _hash = obj || {};
      getProperty = function(name) {
        if (name === "") {
          throw new Error("Property must not be empty!");
        }
        return _hash[name];
      };
      setProperty = function(name, value) {
        return _hash[name] = value;
      };
      addSource = function(object) {
        _hash = object;
        return this;
      };
      getHash = function() {
        return _hash;
      };
      domesticateSource = function() {
        var property, propertyValue;
        for (property in _hash) {
          propertyValue = _hash[property];
          if (this.hasOwnProperty(property)) {
            throw new Error("Source can not be domesticated - property '" + prop + "' exists!");
          } else {
            this[property] = propertyValue;
          }
        }
        return this;
      };
      return {
        getProperty: getProperty,
        setProperty: setProperty,
        addSource: addSource,
        getHash: getHash,
        domesticateSource: domesticateSource
      };
    }

    return Model;

  })();
});
