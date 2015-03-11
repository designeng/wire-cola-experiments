define(["underscore", "jquery", "wire", "text!/test/jasmine/fixtures/formFixture.html", "jasmine-jquery"], function(_, $, wire, formFixture, displaySlotFixture) {
  var callbackSpy, collectionSource, integrationSpec, noop;
  noop = function() {};
  callbackSpy = jasmine.createSpy('callbackSpy');
  collectionSource = [
    {
      one: "1",
      two: "2"
    }, {
      one: "10",
      two: "20"
    }, {
      one: "100",
      two: "200"
    }, {
      one: void 0,
      two: "200"
    }, {
      one: "1000",
      two: void 0
    }, {
      one: null,
      two: void 0
    }, {
      one: null,
      two: null
    }, {
      one: noop,
      two: {}
    }, {
      one: parseInt("10000"),
      two: Number()
    }, {}
  ];
  define('controller', function() {
    var Controller;
    return Controller = (function() {
      function Controller() {}

      Controller.prototype.onReady = function(collection) {
        return collection.addSource(collectionSource);
      };

      Controller.prototype.onBunchData = function(res) {
        return console.debug("onBunchData RES::::", res);
      };

      Controller.prototype.invokerOne = function() {
        return {
          checkForString: _.isString
        };
      };

      Controller.prototype.invokerTwo = function() {
        return {
          allowedValues: ["2", "20"]
        };
      };

      Controller.prototype.successHandler = function(res) {
        return console.debug("RES: successHandler", res);
      };

      return Controller;

    })();
  });
  integrationSpec = {
    $plugins: ['wire/debug', 'wire/on', 'wire/dom', 'wire/dom/render', 'wire/connect', 'core/plugin/data/structure/collection', 'core/plugin/form/bySelector', 'core/plugin/form/values/bunch'],
    form: {
      bySelector: {
        $ref: 'dom.first!.searchForm'
      },
      valuesBunch: {
        byFields: ["firstName", "lastName"],
        deliverTo: {
          $ref: 'controller.onBunchData'
        }
      }
    },
    controller: {
      create: "controller",
      ready: {
        onReady: {
          $ref: "firstCollection"
        }
      }
    },
    firstCollection: {
      create: "core/utils/surrogate/Collection"
    },
    secondCollection: {
      cloneStructure: {
        $ref: "firstCollection"
      }
    }
  };
  return describe("bunch plugin jasmine spec", function() {
    beforeEach(function(done) {
      var _this = this;
      setFixtures(formFixture);
      return wire(integrationSpec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        console.log("ERROR:", err);
        return done();
      });
    });
    afterEach(function(done) {
      this.ctx.destroy();
      return done();
    });
    return it("deliverToCallback should be invoked", function(done) {
      var anotherInput, form, input0, input1,
        _this = this;
      form = $(this.ctx.form);
      input0 = form.find("[name='firstName']");
      input1 = form.find("[name='lastName']");
      anotherInput = form.find("[name='anotherField']");
      input0.focus();
      input0.val("123");
      input1.focus();
      input1.val("234");
      setTimeout(function() {
        return anotherInput.focus();
      }, 300);
      return setTimeout(function() {
        return done();
      }, 1000);
    });
  });
});
