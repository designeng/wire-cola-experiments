define({
  $plugins: ["wire/dom", "wire/dom/render", "wire/on", "core/plugin/template/hb", "core/plugin/validate"],
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
    module: "hbs!components/form/template"
  },
  formViewTemplate: {
    templateSource: {
      pattern: {
        $ref: 'formPattern'
      },
      fillWith: {
        firstName: "firstName",
        email: "email",
        save: "save",
        clear: "clear"
      }
    }
  },
  formFields: {
    firstName: {
      "firstNameRule": {
        rule: /^[a-zA-Zа-яА-ЯёЁ]+[a-zA-Zа-яА-ЯёЁ\-]*$/g,
        message: "English - russian letters, etc"
      }
    },
    email: {
      "emailRule": {
        rule: /@/g,
        message: "Should have @"
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
        $ref: 'formFields'
      },
      afterFieldValidation: {
        $ref: "formController.afterFieldValidation"
      },
      onValidationComplete: {
        $ref: "formController.onValidationComplete"
      }
    }
  },
  validator: {
    wire: {
      spec: "components/form/validator/spec",
      provide: {
        form: {
          $ref: 'formView'
        },
        slot: {
          $ref: 'dom.first!.errorDisplay',
          at: 'formView'
        }
      }
    }
  }
});
