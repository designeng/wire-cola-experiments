require.config({
  baseUrl: "/app/js",
  paths: {
    "bootstrapSpec": "specs/bootstrapSpec",
    "routerMainSpec": "specs/routerMainSpec"
  },
  packages: [
    {
      name: "wire",
      main: "wire",
      location: "../../bower_components/wire"
    }, {
      name: "when",
      main: "when",
      location: "../../bower_components/when"
    }, {
      name: "meld",
      main: "meld",
      location: "../../bower_components/meld"
    }, {
      name: "cola",
      main: "cola",
      location: "../../bower_components/cola"
    }, {
      name: "rest",
      main: "rest",
      location: "../../bower_components/rest"
    }, {
      name: "handlebars",
      main: "handlebars-v2.0.0",
      location: "../../bower_components/oldHandlebars"
    }, {
      name: "hbs",
      main: "hbs",
      location: "../../bower_components/requirejs-hbs"
    }, {
      name: "crossroads",
      main: "crossroads",
      location: "../../bower_components/crossroads/dist"
    }, {
      name: "signals",
      main: "signals",
      location: "../../bower_components/signals/dist"
    }, {
      name: "hasher",
      main: "hasher",
      location: "../../bower_components/hasher/dist/js"
    }, {
      name: "underscore",
      main: "underscore",
      location: "../../bower_components/underscore"
    }, {
      name: "underscore.string",
      main: "underscore.string",
      location: "../../bower_components/underscore.string/lib"
    }, {
      name: "moment",
      main: "moment",
      location: "../../bower_components/moment"
    }, {
      name: "mousetrap",
      main: "mousetrap",
      location: "../../bower_components/mousetrap"
    }, {
      name: "jquery",
      main: "jquery",
      location: "../../bower_components/jquery/dist"
    }, {
      name: "text",
      main: "text",
      location: "../../bower_components/text"
    }, {
      name: "i18n",
      main: "i18n",
      location: "../../bower_components/requirejs-i18n"
    }, {
      name: "css",
      main: "css",
      location: "../../bower_components/require-css"
    }, {
      name: "domReady",
      main: "domReady",
      location: "../../bower_components/requirejs-domready"
    }
  ],
  shim: {
    "underscore.string": {
      deps: ["underscore"]
    }
  },
  locale: "ru",
  hbs: {
    templateExtension: ".html"
  }
});

var jasmineJquery;

requirejs.s.contexts._.config.paths["jasmine"] = '/test/jasmine/js/lib/jasmine-2.0.0/jasmine';

requirejs.s.contexts._.config.paths["jasmine-html"] = '/test/jasmine/js/lib/jasmine-2.0.0/jasmine-html';

requirejs.s.contexts._.config.paths["boot"] = '/test/jasmine/js/lib/jasmine-2.0.0/boot';

jasmineJquery = {
  name: "jasmine-jquery",
  main: "jasmine-jquery",
  location: "../../bower_components/jasmine-jquery/lib"
};

requirejs.s.contexts._.config.packages.push(jasmineJquery);

requirejs.s.contexts._.config.shim["jasmine"] = {
  exports: "jasmine"
};

requirejs.s.contexts._.config.shim["jasmine-html"] = {
  deps: ['jasmine'],
  exports: 'jasmine'
};

requirejs.s.contexts._.config.shim["boot"] = {
  deps: ['jasmine', 'jasmine-html'],
  exports: 'jasmine'
};

require(["underscore", "js/SpecIndex.js", "/test/jasmine/js/common/beforeEach.js"], function(_, indexSpecs) {
  var extention, pathToSpec, specs;
  pathToSpec = "/test/jasmine/js/spec/";
  extention = ".js";
  specs = _.map(indexSpecs, function(spec) {
    return spec = pathToSpec + spec + extention;
  });
  return require(specs, function(specs) {
    return window.onload();
  });
});
