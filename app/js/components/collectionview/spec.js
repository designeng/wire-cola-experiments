define(function() {
  return {
    $plugins: ['wire/debug', 'wire/on', 'wire/dom', 'wire/dom/render', 'cola'],
    townsListView: {
      render: {
        template: {
          module: "text!components/collectionview/towns.html"
        },
        css: {
          module: "css!components/collectionview/styles.css"
        }
      },
      insert: {
        at: {
          $ref: 'slot'
        }
      },
      bind: {
        to: {
          $ref: 'townsCollection'
        },
        bindings: {
          port: '.port'
        }
      }
    },
    controller: {
      create: "components/collectionview/controller",
      properties: {
        townsListView: {
          $ref: 'townsListView'
        },
        townsCollection: {
          $ref: 'townsCollection'
        },
        townsCollectionSource: {
          $ref: 'townsCollectionSource'
        },
        namesListView: {
          $ref: 'namesListView'
        },
        namesCollection: {
          $ref: 'namesCollection'
        },
        namesCollectionSource: {
          $ref: 'namesCollectionSource'
        }
      },
      ready: {
        "onReady": {}
      }
    },
    identifyByPort: {
      create: {
        module: 'cola/identifier/property',
        args: ['port']
      }
    },
    townsCollection: {
      create: {
        module: 'cola/Collection',
        args: {
          identifier: {
            $ref: 'identifyByPort'
          }
        }
      }
    },
    namesListView: {
      render: {
        template: {
          module: "text!components/collectionview/names.html"
        },
        css: {
          module: "css!components/collectionview/styles.css"
        }
      }
    },
    namesCollection: {
      create: {
        module: 'cola/Collection'
      }
    },
    townsCollectionSource: {
      create: "components/collectionview/townsCollectionSource"
    },
    namesCollectionSource: {
      create: "components/collectionview/namesCollectionSource"
    }
  };
});
