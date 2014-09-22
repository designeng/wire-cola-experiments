define(function() {
  return {
    $plugins: ['wire/debug', 'wire/on', 'wire/dom', 'wire/dom/render', 'core/plugin/template/hb'],
    contentView: {
      render: {
        template: {
          module: "text!components/handlebars/template.html"
        }
      },
      insert: {
        at: {
          $ref: 'slot'
        }
      }
    },
    townsViewHtml: {
      module: "hbs!components/handlebars/towns"
    },
    townsViewTemplate: {
      templateSource: {
        pattern: {
          $ref: 'townsViewHtml'
        },
        fillWith: {
          port: "Model",
          chance: "only",
          location: "rendered"
        }
      }
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
      }
    },
    collectionSource: {
      create: "components/handlebars/collectionSource"
    },
    collectionItemViewHtml: {
      module: "hbs!components/handlebars/collectionItem"
    },
    collectionInnerListPartial: {
      module: "hbs!components/handlebars/collectionInnerListPartial"
    },
    innerListTransformation: {
      create: "components/handlebars/transformations/innerListTransformation"
    },
    collectionViewTemplate: {
      templateSource: {
        rootElement: "ul",
        itemPattern: {
          $ref: 'collectionItemViewHtml'
        },
        fillWith: {
          $ref: 'collectionSource'
        },
        partials: {
          "innerListPartial": {
            $ref: 'collectionInnerListPartial'
          }
        },
        itemTransformations: {
          "innerList": {
            $ref: 'innerListTransformation'
          }
        }
      }
    },
    collectionView: {
      render: {
        template: {
          $ref: 'collectionViewTemplate'
        }
      },
      insert: {
        at: {
          $ref: 'dom.first!.right',
          at: {
            $ref: 'contentView'
          }
        }
      },
      on: {
        "click:li": "controller.onClick",
        "click:li.inner": "controller.onClickInner"
      }
    },
    controller: {
      create: "components/handlebars/controller",
      properties: {
        collectionView: {
          $ref: 'collectionView'
        }
      },
      ready: {
        onReady: {}
      }
    }
  };
});
