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
        message: "Это поле может содержать только русские и английские буквы, дефис и пробел"
      }
    },
    cpid: {
      "cpidRule": {
        rule: /^(([\da-zA-Z]{6})|(\d{3}\-?\d{3}\-?\d{3}\-?))$/g,
        message: ["Минимальное количество символов в этом поле: 6", "Номер заказа может включать только цифры, английские буквы и дефис"]
      }
    },
    secretCode: {
      "secretCodeRule": {
        rule: /^\d{6}$/g,
        message: "Код состоит из 6 цифр"
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
        }
      }
    }
  }
});
