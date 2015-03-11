define(function() {
  return {
    $plugins: ['wire/debug', 'wire/on', 'wire/dom', 'wire/dom/render', 'wire/aop', 'wire/connect', 'core/plugin/data/structure/collection', 'core/plugin/form/values/bunch'],
    form: {
      render: {
        template: {
          module: "text!components/collection/template.html"
        }
      },
      insert: {
        at: {
          $ref: 'slot'
        }
      },
      valuesBunch: {
        byFields: ["firstName", "lastName"],
        deliverTo: {
          $ref: 'controller.onBunchData'
        }
      }
    },
    originalCollection: {
      create: "core/utils/surrogate/Collection"
    },
    documentTypesCollection: {
      cloneStructure: {
        $ref: 'originalCollection'
      },
      connect: {
        "applyFilter": "getSource | controller.onCollectionFiltered"
      }
    },
    source: [
      {
        one: 1,
        two: 2
      }, {
        one: 123,
        two: 234
      }, {
        one: "abc",
        two: "def"
      }
    ],
    controller: {
      create: "components/collection/controller",
      properties: {
        documentTypesCollection: {
          $ref: 'documentTypesCollection'
        },
        originalCollection: {
          $ref: 'originalCollection'
        }
      },
      ready: {
        addSourceToOriginal: [
          {
            $ref: 'source'
          }
        ],
        onReady: {}
      }
    }
  };
});
