define(function() {
  var innerListTransformation;
  return innerListTransformation = function(fieldName) {
    console.log("innerListTransformation::::", fieldName, this[fieldName]);
    return "innerListTransformation here";
  };
});
