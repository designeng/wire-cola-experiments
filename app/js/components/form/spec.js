define({
  $plugins: ["wire/debug", "wire/dom", "wire/dom/render", "wire/on", "core/plugin/template/hb", "core/plugin/validate"],
  formController: {
    create: "components/form/controller",
    ready: {
      onReady: {}
    },
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
            rule: {
              $ref: 'formController.firstNameRule'
            },
            message: "Should not be longer than 20 characters!"
          }
        },
        email: {
          "should have word '@'": {
            rule: /@/g,
            message: "Should have word '@'!"
          }
        }
      },
      afterValidation: {
        $ref: "formController.afterValidation"
      }
    }
  }
});
