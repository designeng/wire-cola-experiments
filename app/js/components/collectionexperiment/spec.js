define(function() {
  return {
    $plugins: ['wire/debug', 'wire/on', 'wire/dom', 'wire/dom/render', 'core/plugin/template/source', 'cola'],
    contentView: {
      render: {
        template: {
          module: "text!components/collectionexperiment/template.html"
        }
      },
      insert: {
        at: {
          $ref: 'slot'
        }
      }
    },
    townsViewTemplate: {
      module: "text!components/collectionexperiment/towns.html"
    },
    customNodeItemAdapter: {
      module: "components/collectionexperiment/customNodeItemAdapter"
    },
    townsView: {
      render: {
        template: {
          $ref: 'townsViewTemplate'
        }
      },
      insert: {
        at: {
          $ref: 'dom.first!.left',
          at: {
            $ref: 'contentView'
          }
        }
      },
      bind: {
        to: {
          $ref: 'townsCollection'
        },
        bindings: {
          port: ".port",
          chance: ".chance",
          test: [
            {
              handler: {
                $ref: 'controller.allHandler'
              }
            }
          ]
        },
        adapter: {
          $ref: 'customNodeItemAdapter'
        }
      },
      on: {
        "click:li": "controller.onClickLi"
      }
    },
    townsUnderscoreCollectionSource: {
      create: "components/collectionexperiment/townsUnderscoreCollectionSource"
    },
    townsUnderscoreViewHtml: {
      module: "text!components/collectionexperiment/towns_underscore.html"
    },
    townItemUnderscoreViewHtml: {
      module: "text!components/collectionexperiment/townItem_underscore.html"
    },
    innerListItemViewHtml: {
      module: "text!components/collectionexperiment/innerList_underscore.html"
    },
    innerListTransformation: {
      create: {
        module: "components/collectionexperiment/transformations/innerListTransformation",
        args: [
          {
            $ref: 'innerListItemViewHtml'
          }
        ]
      }
    },
    townsCollectionSource: {
      create: "components/collectionexperiment/townsCollectionSource"
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
      },
      ready: {
        addSource: {
          $ref: 'townsCollectionSource'
        }
      }
    },
    controller: {
      create: "components/collectionexperiment/controller",
      ready: {
        onReady: {}
      }
    }
  };
});
