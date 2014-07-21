define(["underscore", "when"], function(_, When) {
  var viewSource;
  return viewSource = function(template, model) {
    var html;
    html = _.template(template, model);
    return html;
  };
});
