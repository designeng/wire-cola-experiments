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
      module: "hb!components/handlebars/towns.html"
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
    }
  };
});
