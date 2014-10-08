define({
  $plugins: ["wire/dom", "wire/dom/render", "wire/on", "core/plugin/template/hb", "core/plugin/doValidate"],
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
  formFieldsStrategy: {
    firstName: {
      "firstNameRule": {
        rule: /^[a-zA-Zа-яА-ЯёЁ]+[a-zA-Zа-яА-ЯёЁ\-]*$/g,
        message: "English - russian letters, etc"
      },
      "notLonger": {
        rule: function(value) {
          if (value.length > 10) {
            return false;
          } else {
            return true;
          }
        },
        message: "Not longer 10"
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
      strategy: {
        $ref: 'formFieldsStrategy'
      },
      displaySlot: {
        $ref: 'dom.first!.errorDisplay',
        at: 'formView'
      }
    }
  }
});
