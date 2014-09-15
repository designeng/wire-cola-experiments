require.config({
  baseUrl: "/app/js",
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
      main: "./handlebars",
      location: "../../node_modules/handlebars/dist/amd"
    }, {
      name: "hb",
      main: "hb",
      location: "../../bower_components/requirejs-handlebars"
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
  paths: {
    "handlebars.runtime": "../../node_modules/handlebars/dist/handlebars.runtime.amd",
    "bootstrapSpec": "specs/bootstrapSpec",
    "routerMainSpec": "specs/routerMainSpec"
  },
  locale: "ru"
});

require(["wire", "hasher", "wire!bootstrapSpec", "routerMainSpec"], function(wire, hasher, bootstrapCTX, routerMainSpec) {
  return bootstrapCTX.wire(routerMainSpec).then(function(resultCTX) {
    hasher.prependHash = "";
    return hasher.init();
  });
});
