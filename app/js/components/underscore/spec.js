define(function() {
  return {
    $plugins: ['wire/debug', 'wire/on', 'wire/dom', 'wire/dom/render'],
    viewSource: {
      create: {
        module: "components/underscore/viewSource",
        args: [
          {
            $ref: 'underscoreViewTemplate'
          }, {
            $ref: 'underscoreModel'
          }
        ]
      }
    },
    underscoreViewTemplate: {
      module: "text!components/underscore/template.html"
    },
    underscoreView: {
      render: {
        template: {
          $ref: 'viewSource'
        }
      },
      insert: {
        at: {
          $ref: 'slot'
        }
      }
    },
    underscoreModel: {
      create: {
        module: 'components/underscore/modelSource'
      }
    }
  };
});
