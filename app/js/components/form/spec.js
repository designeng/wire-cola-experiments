define({
  $plugins: ["wire/debug", "wire/dom", "wire/dom/render", "wire/on", "core/plugin/template/hb", "core/plugin/validate"],
  formController: {
    create: "components/form/controller",
    properties: {
      formView: {
        $ref: 'formView'
      }
    }
  },
  formPattern: {
    module: "hbs!components/form/template.html"
  },
  formViewTemplate: {
    templateSource: {
      pattern: {
        $ref: 'formPattern'
      },
      fillWith: {
        firstName: "firstName",
        lastName: "lastName",
        phone: "phone",
        email: "email",
        save: "save",
        clear: "clear"
      }
    }
  },
  formView: {
    render: {
      template: {
        $ref: 'formViewTemplate'
      }
    },
    insert: {
      at: {
        $ref: 'slot'
      }
    },
    validate: {
      fields: {
        firstName: {
          "not longer than 20 characters": {
            rule: function(value) {
              if (value.length > 20) {
                return false;
              } else {
                return true;
              }
            },
            message: "Should not be longer than 20 characters"
          }
        }
      },
      behaviour: {
        $ref: "formController.formValidationBehaviourHandler"
      }
    }
  }
});
